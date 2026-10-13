/* みずまわり119 港南 — 演出（外部ライブラリなし） */
(function () {
  'use strict';
  window.FX_READY = true;
  var d = document, html = d.documentElement, w = window;
  var fx = html.classList.contains('fx');
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function stagger(sel) { $$(sel).forEach(function (el, i) { el.style.setProperty('--i', i); }); }

  // ヘッダーの影
  var hd = d.querySelector('.hd');
  var fix = d.querySelector('.fixcta'), hero = d.querySelector('.hero');
  function onScroll() {
    hd.classList.toggle('is-scrolled', w.pageYOffset > 8);
    if (fix) fix.classList.toggle('is-shown', !fx || hero.getBoundingClientRect().bottom < w.innerHeight * .35);
  }
  w.addEventListener('scroll', function () { w.requestAnimationFrame(onScroll); }, { passive: true });
  onScroll();

  // FAQ：高さをなめらかに変える（動きを減らす設定では標準の開閉のまま）
  if (fx) {
    $$('.faq details').forEach(function (det) {
      var sum = det.querySelector('summary'), body = det.querySelector('.a');
      sum.addEventListener('click', function (e) {
        e.preventDefault();
        var open = det.open;
        if (!open) det.open = true;
        var h = body.scrollHeight;
        var anim = body.animate(open ? [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }] : [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
        anim.onfinish = function () { if (open) det.open = false; };
      });
    });
  }

  if (!fx) return;


  $$('.area__map g[stroke] path').forEach(function (p, i) { p.style.setProperty('--k', i); });

  // 見えたら現れる
  function mark(sel, cls, step) {
    $$(sel).forEach(function (el, i) { el.classList.add('rv'); if (cls) el.classList.add(cls); if (step) el.style.setProperty('--d', (i % 6) * step + 's'); });
  }
  mark('.sec__head > *');
  mark('.trouble li', 'rv--pop', .06);
  mark('.reason', '', .08);
  mark('.price-note');
  mark('.price-wrap', '', .1);
  mark('.price-foot');
  mark('.area__list', 'rv--right');
  mark('.faq details', '', .05);
  mark('.contact__quick', 'rv--left');
  mark('.form', 'rv--right');
  $$('.price tbody tr').forEach(function (tr, i) { tr.style.setProperty('--r', i % 4); });

  // 料金の数字が増える
  function countUp(td) {
    var node = td.firstChild;
    if (!node || node.nodeType !== 3) return;
    var to = parseInt(node.textContent.replace(/,/g, ''), 10);
    if (!to) return;
    var t0 = performance.now(), dur = 900;
    (function step(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      node.textContent = (k < 1 ? Math.round(to * e / 10) * 10 : to).toLocaleString('ja-JP');
      if (k < 1) w.requestAnimationFrame(step);
    })(t0);
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target;
      t.classList.add('is-in');
      if (t.classList.contains('price-wrap')) $$('.yen', t).forEach(countUp);
      io.unobserve(t);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  $$('.rv, .sec__head, .area__map').forEach(function (el) { io.observe(el); });

  // 流れ：画面の6割の位置を越えたステップから点灯
  var steps = $$('.flow li');
  function flow() {
    var line = w.innerHeight * .68;
    steps.forEach(function (li) { li.classList.toggle('is-on', li.getBoundingClientRect().top < line); });
  }
  w.addEventListener('scroll', function () { w.requestAnimationFrame(flow); }, { passive: true });
  flow();
})();
