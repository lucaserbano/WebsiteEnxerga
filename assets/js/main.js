
  // ── HAMBURGER MENU ──
  function toggleNav() {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('nav-toggle');
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open', !isOpen);
    toggle.classList.toggle('open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  }
  function closeNav() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('nav-toggle').classList.remove('open');
    document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
  }

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Nav active states
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(l => l.style.color = l.getAttribute('href') === '#' + en.target.id ? '#fff' : '#aaa');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObs.observe(s));

