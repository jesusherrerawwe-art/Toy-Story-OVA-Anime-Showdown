/* ============================================
   Toy Story OVA: Anime Showdown — Main JS
   Navigation, Dark Mode, Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initHamburger();
  initTypewriter();
  initScrollAnimations();
});

/* ---------- Dark Mode ---------- */
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  const stored = localStorage.getItem('ts-ova-dark-mode');
  if (stored === 'true') {
    document.body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('ts-ova-dark-mode', isDark);
    toggle.textContent = isDark ? '☀️' : '🌙';
  });
}

/* ---------- Hamburger Menu ---------- */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click (mobile)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Typewriter Effect ---------- */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const text = el.getAttribute('data-text') || el.textContent;
  el.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);

  let i = 0;
  const speed = 45;

  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    }
  }

  // Start after a short delay
  setTimeout(type, 800);
}

/* ---------- Scroll Fade-In Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}
