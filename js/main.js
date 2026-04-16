/* ==========================================================================
   4 Colorado Kids — Main JavaScript (Premium Redesign)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Mobile Nav Toggle ----------
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ---------- Sticky Nav Background ----------
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    window.addEventListener('scroll', function () {
      navWrap.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Animated Counter ----------
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#donate' || href === '#form') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });

        // Close mobile menu if open
        if (toggle && menu) {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ---------- Active Section Highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // ---------- Ticker Pause on Hover ----------
  const ticker = document.querySelector('.top-bar__ticker-text');
  if (ticker) {
    ticker.addEventListener('mouseenter', function () { this.style.animationPlayState = 'paused'; });
    ticker.addEventListener('mouseleave', function () { this.style.animationPlayState = 'running'; });
  }

});
