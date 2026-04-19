/* DFP France — interactions client-side (vanilla JS, zero dependency) */
(function() {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close when clicking a nav link (mobile)
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        if (window.innerWidth <= 960) {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ---------- Sticky header border on scroll ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Scroll reveal ----------
  const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-10% 0px', threshold: 0.1 }) : null;

  if (observer) {
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  // ---------- Form mock submit (to replace with real endpoint later) ----------
  document.querySelectorAll('form[data-form="quote"]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Envoi en cours…'; btn.disabled = true; }
      // Simulate async (replace with fetch to real API endpoint)
      setTimeout(function() {
        form.innerHTML = '<div style="padding: 2rem 0; text-align: center;">' +
          '<p style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 300; color: var(--amber-deep); margin-bottom: 0.5rem;">Merci !</p>' +
          '<p style="color: var(--slate);">Votre demande est bien reçue. Nous revenons vers vous sous 24h ouvrées.</p>' +
          '</div>';
      }, 900);
    });
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      const id = a.getAttribute('href');
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
