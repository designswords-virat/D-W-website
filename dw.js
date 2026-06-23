/* ===== D&W shared scripts ===== */
(function () {
  'use strict';

  // reveal + line masks
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal,[data-stagger],.lm').forEach(function (el) { io.observe(el); });

  // count up
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, t = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', dec = parseInt(el.dataset.dec || '0'), s = null;
      function step(ts) { if (!s) s = ts; var k = Math.min((ts - s) / 1500, 1), v = 1 - Math.pow(1 - k, 3);
        el.textContent = (t * v).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step); else el.textContent = t.toFixed(dec) + suf; }
      requestAnimationFrame(step); cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count').forEach(function (el) { cio.observe(el); });

  // nav scroll state
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  // mobile menu
  var burger = document.getElementById('burger'), menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.add('hidden'); }); });
  }

  // custom cursor
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var cur = document.querySelector('.cur');
    if (cur) {
      var x = 0, y = 0, cx = 0, cy = 0;
      document.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
      (function loop() { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
      document.addEventListener('mouseover', function (e) { if (e.target.closest('a,button,[data-cur],input,textarea,.svc,.card')) cur.classList.add('grow'); });
      document.addEventListener('mouseout', function (e) { if (e.target.closest('a,button,[data-cur],input,textarea,.svc,.card')) cur.classList.remove('grow'); });
    }
  }

  // contact form (front-end demo)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = form.querySelector('#form-ok'); if (ok) ok.classList.remove('hidden');
      var btn = form.querySelector('button[type=submit] span'); if (btn) btn.textContent = 'Sent ✓';
    });
    form.querySelectorAll('[data-chip]').forEach(function (c) {
      c.addEventListener('click', function () { c.classList.toggle('chip-on'); });
    });
  }
})();
