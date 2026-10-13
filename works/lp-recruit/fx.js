/* 訪問看護ステーション こもれび坂 — 演出（外部ライブラリなし） */
(function () {
  'use strict';
  window.FX_READY = true;
  var d = document, html = d.documentElement, w = window;
  if (!html.classList.contains('fx')) return;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var vh = w.innerHeight;

  $$('.hero__facts li').forEach(function (li, i) { li.style.setProperty('--i', i); });
  $$('.pay__break div').forEach(function (el, i) { el.style.setProperty('--i', i); });

  // 縦書きの一文を1文字ずつ
  var vt = $('.hero__vertical');
  if (vt) {
    var txt = vt.textContent; vt.textContent = '';
    Array.from(txt).forEach(function (ch, i) { var s = d.createElement('span'); s.className = 'vc'; s.style.setProperty('--i', i); s.textContent = ch; vt.appendChild(s); });
  }

  // 見えたら現れる
  function mark(sel, step) { $$(sel).forEach(function (el, i) { el.classList.add('rv'); if (step) el.style.setProperty('--d', (i % 6) * step + 's'); }); }
  mark('.title > *', .1);
  mark('.perks li', .07);
  mark('.voice', .12);
  mark('.req-table tr', .05);
  mark('.apply__box');
  mark('.pay__model');

  // 数字が増える（小数1桁まで）
  function countNode(node, dur) {
    var m = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(node.textContent);
    if (!m) return;
    var to = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length, t0 = performance.now();
    (function step(t) {
      var k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
      node.textContent = m[1] + (to * e).toFixed(dec) + m[3];
      if (k < 1) w.requestAnimationFrame(step);
    })(t0);
  }
  function countIn(el) {
    $$('b', el).forEach(function (b) { var n = b.firstChild; if (n && n.nodeType === 3 && /^\d/.test(n.textContent)) countNode(n, 1400); });
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target;
      t.classList.add('is-in');
      if (t.classList.contains('ws__item')) countIn($('.ws__data', t));
      if (t.classList.contains('pay__main')) {
        var amt = $('.pay__amount', t);
        Array.prototype.slice.call(amt.childNodes).forEach(function (n) { if (n.nodeType === 3 && /\d/.test(n.textContent)) countNode(n, 1600); });
      }
      io.unobserve(t);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  $$('.rv, .title, .ws__item, .pay__main, .day-side').forEach(function (el) { io.observe(el); });

  // 1日の流れ：線が伸び、点が時刻をたどる
  var day = $('.day'), items = $$('.day li'), now = d.createElement('span');
  now.className = 'day__now'; now.setAttribute('aria-hidden', 'true');
  day.appendChild(now);
  var lastTop = 0;
  function measureDay() {
    var last = items[items.length - 1];
    lastTop = last.offsetTop;
    day.style.setProperty('--len', lastTop + 'px');
  }
  // ファーストビューのイラスト：層ごとにずれて動く
  var house = $('.art-house'), nurse = $('.art-nurse'), leaves = $('.art-leaves');
  function onScroll() {
    var r = day.getBoundingClientRect();
    var line = vh * .6;
    var p = clamp((line - r.top - 34) / Math.max(1, lastTop), 0, 1);
    day.style.setProperty('--p', p.toFixed(4));
    now.style.setProperty('--y', (p * lastTop).toFixed(1) + 'px');
    items.forEach(function (li) { li.classList.toggle('is-on', li.offsetTop <= p * lastTop + 6); });
    var y = w.pageYOffset;
    if (y < vh * 1.2) {
      house.style.transform = 'translate(0,' + (y * -.04).toFixed(1) + 'px)';
      nurse.style.transform = 'translate(0,' + (y * -.1).toFixed(1) + 'px)';
      leaves.style.transform = 'translate(0,' + (y * -.18).toFixed(1) + 'px)';
    }
  }
  w.addEventListener('scroll', function () { w.requestAnimationFrame(onScroll); }, { passive: true });
  w.addEventListener('resize', function () { vh = w.innerHeight; measureDay(); onScroll(); });
  w.addEventListener('load', function () { measureDay(); onScroll(); });
  measureDay(); onScroll();
})();
