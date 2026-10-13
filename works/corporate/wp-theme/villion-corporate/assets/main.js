(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('global-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.querySelector('.screen-reader-text').textContent = open ? 'メニューを開く' : 'メニューを閉じる';
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.click();
        toggle.focus();
      }
    });
  }
  var form = document.querySelector('form.js-contact');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('is-done');
      var done = form.querySelector('.form-done');
      if (done) done.focus();
    });
  }
})();

/* ---------- 演出（html.fx のときだけ。外部ライブラリなし） ---------- */
(function () {
  'use strict';
  window.FX_READY = true;
  var d = document, html = d.documentElement, w = window;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var header = $('.site-header');
  function headerShadow() { if (header) header.classList.toggle('is-scrolled', w.pageYOffset > 8); }
  w.addEventListener('scroll', function () { w.requestAnimationFrame(headerShadow); }, { passive: true });
  headerShadow();
  if (!html.classList.contains('fx')) return;

  // 図面を線で描く
  var drawing = $('.hero__drawing svg');
  if (drawing) {
    var i = 0;
    $$('line, rect, circle, path', drawing).forEach(function (el) {
      var cs = w.getComputedStyle(el);
      var dashed = el.getAttribute('stroke-dasharray') || (el.parentNode.getAttribute && el.parentNode.getAttribute('stroke-dasharray'));
      if (cs.stroke !== 'none' && !dashed && el.getTotalLength && cs.fill === 'none') {
        el.style.setProperty('--len', Math.ceil(el.getTotalLength()) + 2);
        el.classList.add('dr');
      } else {
        el.classList.add('dr-keep');
      }
      el.style.setProperty('--dd', (.35 + Math.min(i++, 20) * .06).toFixed(2) + 's');
    });
    // マウスの位置を図面の座標で表示（CAD のカーソル）
    var box = drawing.parentNode, cad = d.createElement('div');
    cad.className = 'cad'; cad.setAttribute('aria-hidden', 'true');
    cad.innerHTML = '<i class="cx"></i><i class="cy"></i><b></b>';
    box.appendChild(cad);
    var label = $('b', cad);
    box.addEventListener('mousemove', function (e) {
      var r = cad.getBoundingClientRect();
      var x = clamp(e.clientX - r.left, 0, r.width), y = clamp(e.clientY - r.top, 0, r.height);
      cad.style.setProperty('--x', x + 'px'); cad.style.setProperty('--y', y + 'px');
      label.textContent = 'X ' + (x / r.width * 520).toFixed(2) + '  Y ' + (y / r.height * 340).toFixed(2);
      label.classList.toggle('is-flip', x > r.width - 150);
    });
  }

  // 「±0.01」の数字が合わさる
  var num = $('.hero h1 .num');
  if (num) {
    var final = num.textContent, t0 = 0;
    var run = function (t) {
      if (!t0) t0 = t;
      var k = (t - t0) / 1100;
      if (k >= 1) { num.textContent = final; return; }
      num.textContent = final.replace(/\d/g, function (c, idx) { return k > .4 + idx * .08 ? c : String(Math.floor(Math.random() * 10)); });
      w.requestAnimationFrame(run);
    };
    setTimeout(function () { w.requestAnimationFrame(run); }, 450);
  }

  // 数字が増える（「1,850」のような区切りも保つ）
  function countUp(dd, delay) {
    var node = dd.firstChild;
    if (!node || node.nodeType !== 3) return;
    var raw = node.textContent.trim(), to = parseInt(raw.replace(/,/g, ''), 10);
    if (!to) return;
    var comma = raw.indexOf(',') >= 0, from = to > 1900 && to < 2100 ? 1900 : 0;
    node.textContent = comma ? from.toLocaleString('ja-JP') : String(from);
    setTimeout(function () {
      var s = performance.now();
      (function step(t) {
        var k = clamp((t - s) / 1300, 0, 1), e = 1 - Math.pow(1 - k, 4), v = Math.round(from + (to - from) * e);
        node.textContent = comma ? v.toLocaleString('ja-JP') : String(v);
        if (k < 1) w.requestAnimationFrame(step);
      })(s);
    }, delay || 0);
  }
  $$('.hero__spec dd').forEach(function (dd) { countUp(dd, 1500); });

  // 見えたら現れる
  function mark(sel, step) { $$(sel).forEach(function (el, n) { el.classList.add('rv'); if (step) el.style.setProperty('--d', (n % 6) * step + 's'); }); }
  mark('.section-head > *', .08);
  mark('.service', .1);
  mark('.facts div', .08);
  mark('.news li', .06);
  mark('.cta-band__in > *', .1);
  mark('.biz > div:last-child');
  mark('.table-wrap, .chips, .profile, .access > div, .message__body, .contact-side > *, .form', .08);
  $$('.biz ul.check li').forEach(function (li, n) { li.style.setProperty('--i', n); });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target;
      t.classList.add('is-in');
      if (t.matches('.facts div')) countUp($('dd', t), 200);
      io.unobserve(t);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  $$('.rv, .section-head, .biz, .message__quote, .access__map').forEach(function (el) { io.observe(el); });

  // 流れ・沿革：スクロールに合わせて順に点灯
  var process = $('.process'), meter = null;
  if (process) { meter = d.createElement('span'); meter.className = 'process__meter'; meter.setAttribute('aria-hidden', 'true'); process.appendChild(meter); }
  var history = $('.history');
  function steps() {
    var line = w.innerHeight * .7, p;
    if (process) {
      var items = $$('li', process), on = 0;
      items.forEach(function (li, n) { var hit = li.getBoundingClientRect().top < line - n * 0; li.classList.toggle('is-on', hit); if (hit) on = n + 1; });
      // PCでは横並びなので、全体の位置から順に点灯させる
      if (w.innerWidth >= 960) {
        var r = process.getBoundingClientRect();
        p = clamp((line - r.top) / (w.innerHeight * .45), 0, 1);
        process.style.setProperty('--p', p.toFixed(4));
        items.forEach(function (li, n) { li.classList.toggle('is-on', p >= (n + .5) / items.length); });
      }
    }
    if (history) {
      var hr = history.getBoundingClientRect();
      p = clamp((line - hr.top) / hr.height, 0, 1);
      history.style.setProperty('--p', p.toFixed(4));
      $$('li', history).forEach(function (li) { li.classList.toggle('is-on', li.getBoundingClientRect().top + 10 < line); });
    }
  }
  w.addEventListener('scroll', function () { w.requestAnimationFrame(steps); }, { passive: true });
  w.addEventListener('resize', steps);
  steps();
})();
