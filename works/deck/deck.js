(function () {
  var html = document.documentElement;
  var deck = document.getElementById('deck');
  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var cur = document.getElementById('cur');
  var bar = document.getElementById('bar');
  var gridBtn = document.getElementById('grid');
  var embed = /(^|[?&])embed\b/.test(location.search);
  var fx = html.classList.contains('fx');
  var index = 0, overview = false, last = -1;
  window.DECK_READY = true;
  if (embed) html.classList.add('is-embed');

  document.getElementById('total').textContent = slides.length;

  /* ---------- 登場演出の準備：スライドごとに順番を振る ---------- */
  var ITEMS = '.s-head, .s-title, .s-lead, .s-foot, .cover__tag, .cover__title, .cover__sub, .cover__mark, .flowpic, .pain li, .card, .diagram, .feat article, .cluster, .target > div, .plan, .chart, .assume, .matrix, .road li, .ask > div';
  slides.forEach(function (s) {
    Array.prototype.slice.call(s.querySelectorAll(ITEMS)).forEach(function (el, i) {
      el.classList.add('a-in');
      el.style.setProperty('--k', i);
    });
    // 線で描く（図の矢印・点線）
    Array.prototype.slice.call(s.querySelectorAll('.diagram path[stroke], .flowpic path, .cluster circle[stroke]')).forEach(function (p) {
      if (!p.getTotalLength) return;
      var L = Math.ceil(p.getTotalLength()) + 2;
      p.classList.add('a-draw');
      p.style.setProperty('--len', L);
    });
  });

  function fit() {
    var w = stage.clientWidth, h = stage.clientHeight;
    var pad = embed ? 0 : (w < 700 ? 8 : 32);
    if (overview) {
      var cols = w < 700 ? 3 : 4, gap = 56, rows = Math.ceil(slides.length / cols);
      var W = cols * 1280 + (cols - 1) * gap, H = rows * 720 + (rows - 1) * gap;
      slides.forEach(function (s, n) {
        var x = (n % cols) * (1280 + gap) - (W - 1280) / 2;
        var y = Math.floor(n / cols) * (720 + gap) - (H - 720) / 2;
        s.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      var so = Math.min((w - 48) / W, (h - 48) / H);
      deck.style.transform = 'scale(' + Math.max(so, 0.02) + ')';
      return;
    }
    slides.forEach(function (s) { s.style.transform = ''; });
    var scale = Math.min((w - pad * 2) / 1280, (h - pad * 2) / 720);
    deck.style.transform = 'scale(' + Math.max(scale, 0.1) + ')';
  }

  function go(i, push) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    var dir = index >= last ? 1 : -1;
    slides.forEach(function (s, n) {
      var on = n === index;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on || overview ? 'false' : 'true');
      if ('inert' in s) s.inert = overview ? true : !on;
      if (on && n !== last) {
        // 同じスライドに戻ったときも、登場をもう一度見せる
        s.classList.remove('is-in');
        s.style.setProperty('--dir', dir);
        void s.offsetWidth;
        requestAnimationFrame(function () { s.classList.add('is-in'); });
      }
    });
    last = index;
    cur.textContent = index + 1;
    bar.style.width = ((index + 1) / slides.length * 100) + '%';
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    if (push !== false && !embed) history.replaceState(null, '', '#' + (index + 1));
  }

  function setOverview(on) {
    overview = on;
    deck.classList.add('is-zooming');
    clearTimeout(setOverview.t);
    setOverview.t = setTimeout(function () { deck.classList.remove('is-zooming'); }, 800);
    deck.classList.toggle('is-overview', on);
    if (gridBtn) { gridBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    slides.forEach(function (s, n) {
      s.setAttribute('aria-hidden', on || n === index ? 'false' : 'true');
      if ('inert' in s) s.inert = on ? true : n !== index;
      if (on) s.classList.add('is-in');
    });
    fit();
  }

  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); go(index + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); go(index - 1); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(slides.length - 1); break;
      case 'g': case 'G': e.preventDefault(); setOverview(!overview); break;
      case 'Escape': if (overview) { e.preventDefault(); setOverview(false); } break;
      case 'Enter': if (overview) { e.preventDefault(); setOverview(false); } break;
    }
  });
  prev.addEventListener('click', function () { go(index - 1); });
  next.addEventListener('click', function () { go(index + 1); });
  if (gridBtn) gridBtn.addEventListener('click', function () { setOverview(!overview); });
  stage.addEventListener('click', function (e) {
    if (!overview) return;
    var s = e.target.closest && e.target.closest('.slide');
    if (!s) return;
    go(slides.indexOf(s));
    setOverview(false);
  });

  // スワイプ
  var sx = null;
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null || overview) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    sx = null;
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () {
    var n = parseInt(location.hash.slice(1), 10);
    if (n && n - 1 !== index) go(n - 1, false);
  });

  // 制作例の一覧ページから、スクロールに合わせてスライドを進めるための窓口
  window.deck = { go: function (i) { go(i, false); }, count: slides.length };

  fit();
  var start = embed ? 0 : parseInt(location.hash.slice(1), 10);
  go(start ? start - 1 : 0, false);
  requestAnimationFrame(function () { requestAnimationFrame(function () { deck.classList.remove('no-anim'); }); });
  if (!fx) slides.forEach(function (s) { s.classList.add('is-in'); });
})();
