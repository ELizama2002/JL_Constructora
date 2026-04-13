/* ============================================================
   JL Diseño & Construcción — main.js
   Descripción: JavaScript principal para todo el sitio web
   ============================================================ */

/* ===== NAVBAR — Scroll effect ===== */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
})();

/* ===== HAMBURGER MENU ===== */
(function initHamburger() {
  const toggle = document.querySelector('.navbar-toggle');
  const overlay = document.querySelector('.navbar-overlay');
  const closeBtn = document.querySelector('.close-overlay');

  if (!toggle || !overlay) return;

  function openMenu() {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.style.display = 'flex';
    // Force reflow for animation
    overlay.offsetHeight;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }

  toggle.addEventListener('click', function () {
    if (overlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close when clicking a nav link inside the overlay
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

/* ===== ACTIVE NAV LINK ===== */
(function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop() || 'index.html';

  // Set active class on navbar links
  document.querySelectorAll('.navbar-menu a, .navbar-overlay a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize: treat '' and 'index.html' as the same
    const normalizedHref = href === '' ? 'index.html' : href;
    const normalizedCurrent = filename === '' ? 'index.html' : filename;

    if (normalizedHref === normalizedCurrent) {
      link.classList.add('active');
    }
  });
})();

/* ===== SCROLL ANIMATIONS (Intersection Observer) ===== */
(function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');

  if (!targets.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ===== PORTFOLIO FILTER ===== */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;

        if (matches) {
          card.style.display = '';
          // Trigger fade-in animation again for filtered items
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* ===== CONTACT FORM ===== */
(function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#telefono');
    const message = form.querySelector('#mensaje');
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.input-error').forEach(function (el) {
      el.remove();
    });
    form.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(function (el) {
      el.style.borderColor = '';
    });

    function showError(field, msg) {
      field.style.borderColor = '#e53e3e';
      const err = document.createElement('span');
      err.className = 'input-error';
      err.style.cssText = 'color:#e53e3e;font-size:0.8rem;margin-top:2px;display:block;';
      err.textContent = msg;
      field.parentNode.appendChild(err);
      isValid = false;
    }

    if (!name || !name.value.trim()) {
      showError(name, 'Por favor ingresa tu nombre.');
    }
    if (!phone || !phone.value.trim()) {
      showError(phone, 'Por favor ingresa tu teléfono.');
    }
    if (!email || !email.value.trim()) {
      showError(email, 'Por favor ingresa tu correo electrónico.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Por favor ingresa un correo válido.');
    }
    if (!message || !message.value.trim()) {
      showError(message, 'Por favor describe tu proyecto.');
    }

    if (!isValid) return;

    // Simulate sending — show success
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';

    setTimeout(function () {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';

      // Show success message
      let successMsg = form.querySelector('.form-success');
      if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML =
          '✅ <strong>¡Gracias por contactarnos!</strong> Recibimos tu mensaje y nos pondremos en contacto contigo a la brevedad.';
        form.appendChild(successMsg);
      }
      successMsg.classList.add('show');

      // Reset the form
      form.reset();

      // Scroll to success message
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Hide after 6 seconds
      setTimeout(function () {
        successMsg.classList.remove('show');
      }, 6000);
    }, 1200);
  });
})();

/* ===== LOGO IMAGE FALLBACK ===== */
(function initLogoFallback() {
  const logoImgs = document.querySelectorAll('.navbar-logo-img');
  logoImgs.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback && fallback.classList.contains('logo-fallback')) {
        fallback.style.display = 'flex';
      }
    });
  });
})();

/* ===== ANIMATED COUNTERS ===== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function animateCounter(el) {
    const raw = el.textContent.trim();
    // Extract number and suffix (+ or %)
    const suffix = raw.replace(/[0-9]/g, '');
    const target = parseInt(raw.replace(/\D/g, ''), 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ===== BEFORE / AFTER SLIDER ===== */
(function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider');
  if (!sliders.length) return;

  sliders.forEach(function (slider) {
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let isDragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      after.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
    }

    // Mouse events
    slider.addEventListener('mousedown', function (e) {
      isDragging = true;
      setPosition(e.clientX);
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) setPosition(e.clientX);
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // Touch events
    slider.addEventListener('touchstart', function (e) {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  });
})();
