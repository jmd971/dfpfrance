/* ──────────────────────────────────────────────
   DFP France — Widget chatbot flottant
   Inclure via : <script src="js/chatbot-widget.js" defer></script>
   ────────────────────────────────────────────── */
(function () {
  'use strict';

  // Ne pas charger sur la page diagnostic elle-même
  if (window.location.pathname.includes('diagnostic')) return;

  const CSS = `
    #dfp-widget-btn {
      position: fixed;
      bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: .6rem;
      padding: .75rem 1.25rem .75rem .85rem;
      background: #0E1013;
      color: #F6F3EC;
      font-family: 'Manrope', sans-serif;
      font-size: .88rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(14,16,19,.18), 0 1px 4px rgba(14,16,19,.12);
      transition: background .2s ease, transform .2s ease;
      text-decoration: none;
    }
    #dfp-widget-btn:hover { background: #C26A3A; transform: translateY(-2px); }
    #dfp-widget-btn .wdot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #2BB8B2;
      flex-shrink: 0;
      animation: wpulse 2s infinite;
    }
    @keyframes wpulse {
      0%,100%{ box-shadow: 0 0 0 0 rgba(43,184,178,.5); }
      50%    { box-shadow: 0 0 0 5px rgba(43,184,178,0); }
    }
    #dfp-widget-btn .wicon {
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    /* Masquer sur mobile si la barre CTA mobile est déjà présente */
    @media (max-width: 640px) { #dfp-widget-btn { display: none; } }
  `;

  // Injecter le CSS
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // Créer le bouton
  const btn = document.createElement('a');
  btn.id   = 'dfp-widget-btn';
  btn.href = 'diagnostic.html';
  btn.setAttribute('aria-label', 'Lancer le diagnostic gratuit');
  btn.innerHTML = `
    <span class="wdot"></span>
    <span class="wicon">🔍</span>
    Diagnostic gratuit
  `;

  // Ajuster le chemin si on est dans un sous-dossier
  const depth = window.location.pathname.split('/').length - 2;
  if (depth > 0) btn.href = '../'.repeat(depth) + 'diagnostic.html';

  document.body.appendChild(btn);
})();
