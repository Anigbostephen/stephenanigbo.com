/* stephenanigbo.com v6 */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* footer year */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* mobile menu */
  const menu = $('.menu'), nav = $('#nav');
  if (menu && nav) {
    const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; };
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close' : 'Menu';
    });
    $$('a', nav).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* header: glass on scroll, hide on scroll-down, show on scroll-up; reading progress */
  const header = $('.site-header');
  const progress = $('.progress');
  let lastY = window.scrollY, ticking = false;
  const onScroll = () => {
    const sy = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', sy > 24);
      if (!reduce) {
        const down = sy > lastY && sy > 160;
        header.classList.toggle('hidden', down && !nav?.classList.contains('open'));
      }
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, sy / max).toFixed(4) : 0);
    }
    lastY = sy; ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* split the motto into words so they can stagger in */
  $$('.quote').forEach(q => {
    if (q.dataset.split) return;
    const words = q.textContent.trim().split(/\s+/);
    q.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w'; s.style.setProperty('--i', i); s.textContent = w;
      q.appendChild(s);
      if (i < words.length - 1) q.appendChild(document.createTextNode(' '));
    });
    q.dataset.split = '1';
  });

  /* count-up for numeric facts */
  const countUp = el => {
    const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
    if (isNaN(target) || reduce) { el.textContent = target.toLocaleString() + suffix; return; }
    const dur = 1400, t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* reveal on scroll */
  const els = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      $$('[data-count]', e.target).forEach(countUp);
      if (e.target.matches('[data-count]')) countUp(e.target);
      obs.unobserve(e.target);
    }), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    els.forEach(el => { el.classList.add('visible'); $$('[data-count]', el).forEach(countUp); });
  }

  /* cards: spotlight follows the pointer */
  if (window.matchMedia('(hover: hover)').matches) {
    $$('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
      });
    });

    /* portrait: gentle parallax toward the pointer */
    const portrait = $('.portrait-wrap img');
    const hero = $('.hero');
    if (portrait && hero && !reduce) {
      let raf = 0;
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          portrait.style.setProperty('--px', (dx * -10).toFixed(1) + 'px');
          portrait.style.setProperty('--py', (dy * -8).toFixed(1) + 'px');
        });
      });
      hero.addEventListener('pointerleave', () => { portrait.style.setProperty('--px', '0px'); portrait.style.setProperty('--py', '0px'); });
    }
  }
})();
