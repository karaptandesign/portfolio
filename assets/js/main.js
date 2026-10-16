/* Kateryna Karaptan — portfolio interactions
   - theme toggle (dark / light), remembered per visitor
   - mobile menu
   - reveal-on-scroll
   - current year in footer */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ---- Theme toggle ----
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('kk-theme', theme); } catch (e) { /* storage unavailable */ }
    var btns = document.querySelectorAll('.theme-toggle');
    btns.forEach(function (b) {
      b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  });
  setTheme(root.getAttribute('data-theme') || 'dark');

  // ---- Mobile menu ----
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); });
  }

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
