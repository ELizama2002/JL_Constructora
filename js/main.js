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

/* ===== LIGHTBOX — Gallery data & viewer ===== */
(function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  // ---- Gallery definitions ----
  var galleries = {
    'bacheo': {
      title: 'Bacheo y Reparación de Calles',
      media: [
        {src:'img/bacheo-01.jpeg',type:'image',alt:'Bacheo de calles — imagen 1'},
        {src:'img/bacheo-02.jpeg',type:'image',alt:'Bacheo de calles — imagen 2'},
        {src:'img/bacheo-03.jpeg',type:'image',alt:'Bacheo de calles — imagen 3'},
        {src:'img/bacheo-04.jpeg',type:'image',alt:'Bacheo de calles — imagen 4'},
        {src:'img/bacheo-05.jpeg',type:'image',alt:'Bacheo de calles — imagen 5'},
        {src:'img/bacheo-06.jpeg',type:'image',alt:'Bacheo de calles — imagen 6'},
        {src:'img/bacheo-07.jpeg',type:'image',alt:'Bacheo de calles — imagen 7'},
        {src:'img/bacheo-08.jpeg',type:'image',alt:'Bacheo de calles — imagen 8'},
        {src:'img/bacheo-09.jpeg',type:'image',alt:'Bacheo de calles — imagen 9'}
      ]
    },
    'casa2niveles': {
      title: 'Casa Habitación de 2 Niveles',
      media: (function(){var a=[];for(var i=1;i<=18;i++){a.push({src:'img/casa2niveles-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Casa 2 niveles — foto '+i});}return a;})()
    },
    'impermeabilizacion': {
      title: 'Impermeabilización Profesional',
      media: (function(){var a=[];for(var i=1;i<=7;i++){a.push({src:'img/impermeabilizacion-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Impermeabilización — foto '+i});}return a;})()
    },
    'mantenimiento': {
      title: 'Mantenimiento de Instalaciones Industriales',
      media: (function(){var a=[];for(var i=1;i<=21;i++){a.push({src:'img/mantenimiento-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Mantenimiento industrial — foto '+i});}return a;})()
    },
    'modelo-brasil': {
      title: 'Modelo Brasil — Casa Residencial',
      media: (function(){
        var a=[];
        for(var i=1;i<=23;i++){a.push({src:'img/modelo-brasil-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Modelo Brasil — foto '+i});}
        a.push({src:'img/modelo-brasil-video.mp4',type:'video',alt:'Modelo Brasil — video recorrido'});
        return a;
      })()
    },
    'modelo-hacienda': {
      title: 'Modelo Hacienda — Casa Residencial',
      media: (function(){var a=[];for(var i=1;i<=17;i++){a.push({src:'img/modelo-hacienda-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Modelo Hacienda — foto '+i});}return a;})()
    },
    'modelo-mediterraneo': {
      title: 'Modelo Mediterráneo — Casa Residencial',
      media: (function(){var a=[];for(var i=1;i<=20;i++){a.push({src:'img/modelo-mediterraneo-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Modelo Mediterráneo — foto '+i});}return a;})()
    },
    'piscina-sanignacio': {
      title: 'Piscina Residencial — San Ignacio',
      media: (function(){var a=[];for(var i=1;i<=10;i++){a.push({src:'img/piscina-sanignacio-'+String(i).padStart(2,'0')+'.jpeg',type:'image',alt:'Piscina San Ignacio — foto '+i});}return a;})()
    }
  };

  var currentMedia = [];
  var currentIndex = 0;
  var mediaWrapper = lightbox.querySelector('.lightbox-media-wrapper');
  var titleEl = lightbox.querySelector('.lightbox-title');
  var counterEl = lightbox.querySelector('.lightbox-counter');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');

  function openLightbox(galleryId) {
    var g = galleries[galleryId];
    if (!g) return;
    currentMedia = g.media;
    currentIndex = 0;
    titleEl.textContent = g.title;
    renderMedia(currentIndex);
    lightbox.classList.add('lb-open');
    requestAnimationFrame(function(){ lightbox.classList.add('lb-active'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lb-active');
    document.body.style.overflow = '';
    var v = mediaWrapper.querySelector('video');
    if (v) v.pause();
    setTimeout(function(){ lightbox.classList.remove('lb-open'); }, 300);
  }

  function renderMedia(index) {
    var item = currentMedia[index];
    counterEl.textContent = (index + 1) + ' / ' + currentMedia.length;
    var v = mediaWrapper.querySelector('video');
    if (v) v.pause();
    mediaWrapper.innerHTML = '';

    if (item.type === 'video') {
      var video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.setAttribute('playsinline', '');
      mediaWrapper.appendChild(video);
    } else {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      mediaWrapper.appendChild(img);
    }
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % currentMedia.length;
    renderMedia(currentIndex);
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    renderMedia(currentIndex);
  }

  // Open on card click
  document.querySelectorAll('.portfolio-card[data-gallery-id]').forEach(function(card) {
    card.addEventListener('click', function() {
      openLightbox(card.getAttribute('data-gallery-id'));
    });
  });

  // Controls
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  // Click outside to close
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('lb-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });

  // Touch swipe
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  });
})();
