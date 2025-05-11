document.addEventListener('DOMContentLoaded', function() {
  // --- Tema claro/oscuro ---
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  function setTheme(theme) {
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    themeToggle.querySelector('span[aria-hidden]')?.replaceWith(theme === 'theme-dark' ? '🌙' : '☀️');
  }
  function toggleTheme() {
    const current = root.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    setTheme(current === 'theme-dark' ? 'theme-light' : 'theme-dark');
  }
  if(themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    const saved = localStorage.getItem('theme');
    setTheme(saved || 'theme-dark');
  }

  // --- Menú móvil accesible ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  if(menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      mainMenu.hidden = expanded;
      mainMenu.classList.toggle('show', !expanded);
      if(!expanded) mainMenu.querySelector('a')?.focus();
    });
    // Cerrar menú con Escape
    mainMenu.addEventListener('keydown', function(e) {
      if(e.key === 'Escape') {
        mainMenu.hidden = true;
        menuToggle.setAttribute('aria-expanded','false');
        menuToggle.focus();
      }
    });
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
      if(!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mainMenu.hidden = true;
        menuToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // --- Animación fade-in en scroll ---
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.animationDelay = '0s';
        entry.target.classList.add('animated');
        entry.target.style.opacity = 1;
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => {
    el.style.opacity = 0;
    fadeObserver.observe(el);
  });

  // Scroll to top button (accesible)
  const scrollToTopButton = document.querySelector('.scrollToTop');
  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add('visible');
      } else {
        scrollToTopButton.classList.remove('visible');
      }
    });
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollToTopButton.blur();
    });
    scrollToTopButton.setAttribute('aria-label', 'Subir al inicio');
    scrollToTopButton.setAttribute('tabindex', '0');
    scrollToTopButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.setAttribute('data-text', heroTitle.textContent);
  }

  const glitchElements = document.querySelectorAll('h2.section-title, .cta-button, nav a');
  function addRandomGlitch() {
    const r = Math.floor(Math.random() * glitchElements.length),
      e = glitchElements[r];
    e.classList.add('glitch'),
      e.setAttribute('data-text', e.textContent),
      setTimeout(() => {
        e.classList.remove('glitch'),
          e.removeAttribute('data-text');
      }, 3e3);
  }
  setInterval(() => {
    Math.random() > 0.5 && addRandomGlitch();
  }, 5e3 + 5e3 * Math.random());

  const flyerModal = document.getElementById('flyerModal'),
    flyerImage = document.getElementById('flyer-image'),
    modalEventName = document.getElementById('modal-event-name'),
    closeButton = document.querySelector('.close-button'),
    viewFlyerButtons = document.querySelectorAll('.flyer-btn');
  if (flyerModal && flyerImage && modalEventName && closeButton) {
    flyerModal.setAttribute('role','dialog');
    flyerModal.setAttribute('aria-modal','true');
    flyerModal.setAttribute('aria-labelledby','modal-event-name');
    let lastFocusedElement;
    viewFlyerButtons.forEach(e => {
      e.addEventListener('click', function() {
        lastFocusedElement = document.activeElement;
        const t = this.parentNode,
          a = t.getAttribute('data-flyer'),
          n = t.getAttribute('data-event-name');
        flyerImage.src = a,
          modalEventName.textContent = n,
          flyerModal.style.display = 'block';
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('keydown', function(e) {
      if(flyerModal.style.display==='block'){
        if(e.key==='Escape') closeModal();
        // Focus trap
        if(e.key==='Tab'){
          e.preventDefault();
          closeButton.focus();
        }
      }
    });
    window.addEventListener('click', e => {
      if (e.target == flyerModal) closeModal();
    });
    function closeModal(){
      flyerModal.style.display = 'none';
      if(lastFocusedElement) lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(e => {
    e.addEventListener('click', function(t) {
      t.preventDefault();
      const n = document.querySelector(this.getAttribute('href'));
      n && n.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.track-play').forEach(e => {
    e.addEventListener('click', function() {
      document.querySelectorAll('.track-play').forEach(t => {
        t.textContent = '▶',
          t.classList.remove('playing');
      }),
        this.classList.contains('playing')
          ? (this.textContent = '▶',
            this.classList.remove('playing'))
          : (this.textContent = '⏸',
            this.classList.add('playing'));
    });
  });

  const contactForm = document.querySelector('.contact-form');
  contactForm &&
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(),
        alert('¡Gracias por tu mensaje! Te responderemos pronto.'),
        this.reset();
    });
});
