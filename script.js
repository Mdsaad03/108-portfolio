/* ========================================
   108 PORTFOLIO — JAVASCRIPT
   ======================================== */

(function () {
  'use strict';

  // ---- DOM REFS ----
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  // ---- HEADER SCROLL EFFECT ----
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 40;

  function onScroll() {
    const y = window.scrollY;
    if (y > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  // ---- MOBILE NAV TOGGLE ----
  function openMobileNav() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function () {
    const isOpen = mobileOverlay.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
      closeMobileNav();
      mobileToggle.focus();
    }
  });

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update URL without scroll jump
        history.pushState(null, null, targetId);
      }
    });
  });

  // ---- SCROLL REVEAL ----
  const revealElements = [];

  function setupReveal() {
    // Add reveal class to elements that should animate
    const selectors = [
      '.service-card',
      '.project-card',
      '.contact-card',
      '.section-header',
      '.about-text',
      '.about-visual',
      '.hero-content > *',
    ];

    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
        revealElements.push(el);
      });
    });

    // Add stagger classes to grids
    document.querySelectorAll('.services-grid, .work-grid, .contact-grid').forEach(function (grid) {
      grid.classList.add('reveal-stagger');
    });
  }

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 80;

    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  }

  setupReveal();

  // Observe with IntersectionObserver for performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal();
  }

  // ---- ACTIVE NAV LINK HIGHLIGHT ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ---- CURSOR GLOW EFFECT ON CARDS ----
  document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
})();
