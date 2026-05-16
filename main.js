/* ============================================
   CheeseyCek — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ck-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ── STAR RATING (feedback page) ── */
  const stars = document.querySelectorAll('.star-rating label');
  stars.forEach((star, i) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, j) => {
        s.style.background = j <= i ? 'var(--pink)' : '';
        s.style.borderColor = j <= i ? 'var(--pink-deep)' : '';
      });
    });
    star.addEventListener('mouseout', () => {
      const checked = document.querySelector('.star-rating input:checked');
      stars.forEach((s, j) => {
        const checkedIdx = checked ? parseInt(checked.value) - 1 : -1;
        s.style.background = j <= checkedIdx ? 'var(--pink)' : '';
        s.style.borderColor = j <= checkedIdx ? 'var(--pink-deep)' : '';
      });
    });
  });

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      showToast('✨ Message sent! We\'ll get back to you soon.');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* ── FEEDBACK FORM ── */
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!feedbackForm.checkValidity()) {
        feedbackForm.classList.add('was-validated');
        return;
      }
      showToast('🎂 Thank you for your feedback! You\'re sweet as our cheesecake.');
      feedbackForm.reset();
      feedbackForm.classList.remove('was-validated');
      // Reset star highlight
      document.querySelectorAll('.star-rating label').forEach(s => {
        s.style.background = '';
        s.style.borderColor = '';
      });
    });
  }

  /* ── TOAST NOTIFICATION ── */
  function showToast(msg) {
    let toast = document.getElementById('ckToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ckToast';
      toast.className = 'ck-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4200);
  }

  /* ── NAVBAR SCROLL SHADOW ── */
  const navbar = document.querySelector('.ck-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 4px 28px rgba(212,103,154,0.18)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(212,103,154,0.08)';
      }
    });
  }

  /* ── COUNTER ANIMATION (stats bar) ── */
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });
        statObserver.disconnect();
      }
    }, { threshold: 0.4 });
    statObserver.observe(statsBar);
  }

  /* ── MOBILE NAV AUTO-CLOSE ── */
  document.querySelectorAll('.ck-navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        toggler.click();
      }
    });
  });

});
