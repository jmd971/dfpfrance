-- Un client = un sous-compte GHL = un numéro WhatsApp = un bot.
-- ghl_private_token n'est lisible que côté serveur (clé service_role), jamais exposé au client.
create table if not exists clients (
  client_id text primary key,               -- ex: 'dfpfrance'
  ghl_location_id text not null,            -- ex: 'setFPuJOKHpohCiQUhf4'
  ghl_private_token text not null,          -- Private Integration Token du sous-compte GHL
  system_prompt text not null,
  claude_model text not null default 'claude-sonnet-5',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists whatsapp_messages (
  id bigint generated always as identity primary key,
  client_id text not null references clients (client_id),
  contact_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_messages_client_contact_idx
  on whatsapp_messages (client_id, contact_id, created_at);
