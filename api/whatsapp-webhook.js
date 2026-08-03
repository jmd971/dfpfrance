const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const HISTORY_LIMIT = 20;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ces quatre champs doivent être envoyés par le Workflow GHL de CHAQUE client en "Custom Data" :
  // secret    -> valeur fixe, doit matcher WEBHOOK_SECRET (protège l'endpoint, partagé entre clients)
  // clientId  -> identifiant fixe du client, ex: 'dfpfrance' (à saisir en dur dans le Workflow, un par client)
  // contactId -> {{contact.id}}
  // message   -> {{message.body}}
  // GHL imbrique les Custom Data d'un webhook de workflow sous req.body.customData
  // (le reste — contact, location, workflow... — reste à la racine, cf. "données standard").
  const { secret, clientId, contactId, message } = (req.body && req.body.customData) || {};

  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!clientId || !contactId || !message) {
    return res.status(400).json({ error: 'clientId, contactId et message requis' });
  }

  try {
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('client_id', clientId)
      .eq('active', true)
      .single();

    if (clientError || !client) {
      return res.status(404).json({ error: `Client inconnu ou inactif: ${clientId}` });
    }

    const { error: insertUserError } = await supabase.from('whatsapp_messages').insert({
      client_id: clientId,
      contact_id: contactId,
      role: 'user',
      content: message,
    });
    if (insertUserError) throw insertUserError;

    const { data: history, error: historyError } = await supabase
      .from('whatsapp_messages')
      .select('role, content')
      .eq('client_id', clientId)
      .eq('contact_id', contactId)
      .order('created_at', { ascending: false })
      .limit(HISTORY_LIMIT);
    if (historyError) throw historyError;

    const claudeMessages = history
      .slice()
      .reverse()
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      }));

    const completion = await anthropic.messages.create({
      model: client.claude_model,
      max_tokens: 500,
      system: client.system_prompt,
      messages: claudeMessages,
    });

    const reply = completion.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    if (!reply) {
      throw new Error('Réponse vide de Claude');
    }

    const { error: insertAssistantError } = await supabase.from('whatsapp_messages').insert({
      client_id: clientId,
      contact_id: contactId,
      role: 'assistant',
      content: reply,
    });
    if (insertAssistantError) throw insertAssistantError;

    const ghlResponse = await fetch(`${GHL_API_BASE}/conversations/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${client.ghl_private_token}`,
        Version: 'v3',
      },
      body: JSON.stringify({
        type: 'WhatsApp',
        contactId,
        message: reply,
      }),
    });

    if (!ghlResponse.ok) {
      const errorBody = await ghlResponse.text();
      throw new Error(`Erreur envoi GHL (${ghlResponse.status}): ${errorBody}`);
    }

    return res.status(200).json({ ok: true, reply });
  } catch (err) {
    console.error('whatsapp-webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
};
