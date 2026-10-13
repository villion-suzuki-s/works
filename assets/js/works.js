/* ==========================================================================
   VILLION Works — works.js（外部ライブラリなし）
   - scroll は requestAnimationFrame で1フレーム1回にまとめる
   - 画面に入っている演出だけを IntersectionObserver で動かす
   - html.motion が無いとき（動きを減らす設定）は、演出をつけない
   ========================================================================== */
(function () {
  'use strict';
  window.VW = true;

  /* 会社サイトのURL（公開後はここを差し替える。HTML側の href も同じ値を初期値として持っている） */
  var COMPANY_URL = 'https://villion.co.jp/';

  var d = document, html = d.documentElement, w = window;
  var motion = html.classList.contains('motion');
  var mqNarrow = w.matchMedia('(max-width: 900px)');
  var vh = w.innerHeight, vw = w.innerWidth;

  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  $$('[data-company]').forEach(function (a) { a.setAttribute('href', COMPANY_URL); });

  /* ---------- SVG要素の実数（「つくり方」の数字） ---------- */
  var liveCount = $('[data-live-count]');
  if (liveCount) {
    var n = $$('svg *').filter(function (el) { return !/^(defs|title|desc|stop|pattern|symbol|linearGradient)$/i.test(el.tagName); }).length;
    liveCount.setAttribute('data-count', n);
    liveCount.textContent = n.toLocaleString('ja-JP');
  }

  /* ---------- ヘッダー（スクロールで隠す／黒い面の上では白く） ---------- */
  var hd = $('.hd');
  var lastY = w.pageYOffset;
  var darkEls = $$('[data-dark]');
  var navLinks = $$('.hd__nav a, .rail a');
  var rail = $('.rail');
  var works = $$('.work');
  function updateHeader() {
    var y = w.pageYOffset;
    hd.classList.toggle('is-scrolled', y > 10);
    if (y > 480 && y > lastY + 4) hd.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 480) hd.classList.remove('is-hidden');
    lastY = y;
    var probe = 36, dark = false, i, r;
    for (i = 0; i < darkEls.length; i++) {
      r = darkEls[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom >= probe) { dark = true; break; }
    }
    hd.classList.toggle('is-dark', dark);
    // いま見ている制作例
    var cur = '';
    for (i = 0; i < works.length; i++) {
      r = works[i].getBoundingClientRect();
      if (r.top <= vh * .5 && r.bottom >= vh * .5) { cur = '#' + works[i].id; break; }
    }
    for (i = 0; i < navLinks.length; i++) {
      var on = navLinks[i].getAttribute('href') === cur;
      navLinks[i].classList.toggle('is-current', on);
      navLinks[i].classList.toggle('is-on', on);
    }
    if (rail) rail.classList.toggle('is-shown', !!cur);
  }

  if (!motion) {
    w.addEventListener('scroll', function () { w.requestAnimationFrame(updateHeader); }, { passive: true });
    updateHeader();
    return;
  }

  /* ---------- 文字を1文字ずつに分ける ---------- */
  $$('[data-split]').forEach(function (el) {
    var n = 0, plain = el.textContent;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = d.createDocumentFragment();
          Array.from(c.textContent).forEach(function (ch) {
            if (/\s/.test(ch)) { frag.appendChild(d.createTextNode(ch)); return; }
            var s = d.createElement('span');
            s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
            s.style.setProperty('--i', n++); s.textContent = ch;
            frag.appendChild(s);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') { walk(c); }
      });
    })(el);
    var sr = d.createElement('span');
    sr.className = 'sr'; sr.textContent = plain.replace(/\s+/g, ' ').trim();
    el.insertBefore(sr, el.firstChild);
  });

  /* ---------- 見えたら現れる／数字が増える ---------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count')) || 0;
    if (!to) { el.textContent = '0'; return; }
    var t0 = performance.now(), dur = 1600;
    (function step(t) {
      var k = easeOut(clamp((t - t0) / dur, 0, 1));
      el.textContent = Math.round(to * k).toLocaleString('ja-JP');
      if (k < 1) w.requestAnimationFrame(step);
    })(t0);
  }
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      $$('[data-count]', en.target).forEach(countUp);
      revealIO.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
  $$('[data-reveal], [data-split], .work__text, .ft__mark').forEach(function (el) { revealIO.observe(el); });
  $$('.hero [data-split]').forEach(function (el) { el.classList.add('is-in'); revealIO.unobserve(el); });

  /* ---------- iframe で「実際のページ」を縮小表示する ---------- */
  // file:// で開いたときは中のページを操作できないので、表示だけになる
  function Live(screen) {
    var src = screen.getAttribute('data-live');
    var baseW = parseFloat(screen.getAttribute('data-w')) || 1280;
    var self = { el: screen, ready: false, win: null, max: 0, scale: 1, h: 0, onready: null, sections: null };
    var ifr = null;
    self.load = function () {
      if (ifr) return;
      if (mqNarrow.matches && !screen.hasAttribute('data-mobile')) return;
      if (!screen.offsetWidth) return;
      ifr = d.createElement('iframe');
      ifr.setAttribute('tabindex', '-1');
      ifr.setAttribute('aria-hidden', 'true');
      ifr.setAttribute('scrolling', 'no');
      ifr.setAttribute('title', '');
      ifr.addEventListener('load', function () {
        try { self.win = ifr.contentWindow; void self.win.document.body; } catch (e) { self.win = null; }
        self.ready = true;
        self.measure();
        setTimeout(function () { ifr.classList.add('is-ready'); }, 250);
        setTimeout(self.measure, 1200);
        if (self.onready) self.onready(self);
        requestTick();
      });
      self.fit();
      ifr.src = src;
      screen.appendChild(ifr);
    };
    self.fit = function () {
      if (!ifr) return;
      var cw = screen.clientWidth, ch = screen.clientHeight;
      if (!cw) return;
      self.scale = cw / baseW;
      self.h = ch / self.scale;
      ifr.style.width = baseW + 'px';
      ifr.style.height = Math.ceil(self.h) + 'px';
      ifr.style.transform = 'scale(' + self.scale.toFixed(5) + ')';
    };
    self.measure = function () {
      if (!self.win) return;
      try {
        var de = self.win.document.documentElement;
        self.max = Math.max(0, de.scrollHeight - self.win.innerHeight);
      } catch (e) { self.win = null; }
    };
    self.scrollTo = function (q) {
      if (!self.win || !self.max) return;
      var y = Math.round(q * self.max);
      if (y === self._y) return;
      self._y = y;
      try { self.win.scrollTo({ top: y, left: 0, behavior: 'instant' }); } catch (e) { self.win = null; }
    };
    self.call = function (fn) { if (self.win) { try { fn(self.win); } catch (e) { } } };
    return self;
  }
  var lives = [];
  function livesIn(el) { return $$('.screen[data-live]', el).map(function (s) { var l = Live(s); lives.push(l); return l; }); }

  /* ---------- スクロール連動の演出 ---------- */
  var scenes = [];
  var sceneIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var s = en.target._scene;
      s.active = en.isIntersecting;
      if (s.active && s.lives) s.lives.forEach(function (l) { l.load(); });
    });
    requestTick();
  }, { rootMargin: '60% 0px 60% 0px' });

  function addScene(el, fn, opts) {
    var s = { el: el, fn: fn, active: false, mode: (opts && opts.mode) || 'sticky', target: el };
    if (opts && opts.init) opts.init(s);
    el._scene = s;
    scenes.push(s);
    sceneIO.observe(el);
    return s;
  }
  function stickyProgress(r) { var dist = r.height - vh; return dist > 0 ? clamp(-r.top / dist, 0, 1) : (r.top < 0 ? 1 : 0); }

  // 制作例は PC ではセクション全体、スマホでは画面部分（.work__stage）で進み具合を測る
  function workTarget(s) {
    var stage = $('.work__stage', s.el);
    s.target = (mqNarrow.matches && stage) ? stage : s.el;
  }

  /* --- ファーストビュー --- */
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  $$('[data-scene="hero"]').forEach(function (el) {
    var center = $('.hero__center', el), lts = $$('.hero__word .lt', el), scroll = $('.hero__scroll', el);
    var cards = $$('.fcard', el).map(function (c, i) {
      return { el: c, depth: parseFloat(c.getAttribute('data-depth')) || 1, r: parseFloat(c.getAttribute('data-r')) || 0, dir: [[-1, -1], [1, -1], [-1, 1], [1, 1]][i] };
    });
    var s = addScene(el, function (s, p) {
      var e = easeInOut(seg(p, 0, 1));
      center.style.transform = 'translate3d(0,' + (-e * 70).toFixed(1) + 'px,0) scale(' + (1 - e * .08).toFixed(4) + ')';
      center.style.opacity = (1 - seg(p, .5, 1)).toFixed(3);
      for (var i = 0; i < lts.length; i++) lts[i].style.transform = e > 0 ? 'translate3d(' + ((i - 2.5) * e * 26).toFixed(1) + 'px,0,0)' : '';
      var sp = Math.min(vw, 1400);
      for (var k = 0; k < cards.length; k++) {
        var c = cards[k];
        var x = c.dir[0] * e * sp * .22 * c.depth + mouse.x * 26 * c.depth;
        var y = c.dir[1] * e * vh * .35 * c.depth - e * vh * .25 + mouse.y * 20 * c.depth;
        var sc = 1 + e * .25 * c.depth;
        c.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + (c.r * (1 - e * .6)).toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
      }
      if (scroll) scroll.style.visibility = p > .04 ? 'hidden' : '';
    });
    s.always = true;
    setTimeout(function () { el.classList.add('is-loaded'); }, 400);
  });

  /* --- 01 デバイスの中でページが流れる --- */
  $$('[data-scene="device"]').forEach(function (el) {
    var laptop = $('.laptop', el), phone = $('.phone', el), now = $('.dev__sec', el);
    var ls = livesIn(el);
    var sections = null, secIdx = -1;
    ls.forEach(function (l) {
      if (l.el.classList.contains('phone__screen')) {
        l.onready = function () {
          l.call(function (win) {
            sections = $$('main > section', win.document).map(function (sec, i) {
              var h = sec.querySelector('h2');
              return { top: sec.offsetTop, label: i === 0 ? 'ファーストビュー' : (h ? h.textContent.trim() : '') };
            });
          });
        };
      }
    });
    el.style.setProperty('--h', '320vh');
    el.style.setProperty('--hm', '260vh');
    addScene(el, function (s, p) {
      var intro = easeOut(seg(p, 0, .14));
      var q = easeInOut(seg(p, .1, .94));
      if (!mqNarrow.matches) {
        laptop.style.transform = 'translate3d(' + ((1 - intro) * 60).toFixed(1) + 'px,' + ((1 - intro) * 30).toFixed(1) + 'px,0)';
        phone.style.transform = 'translate3d(' + ((1 - intro) * -40).toFixed(1) + 'px,' + ((1 - intro) * 90 - q * 24).toFixed(1) + 'px,0) rotate(' + ((1 - intro) * -4).toFixed(2) + 'deg)';
      } else {
        laptop.style.transform = ''; phone.style.transform = 'translate3d(0,' + ((1 - intro) * 40).toFixed(1) + 'px,0)';
      }
      for (var i = 0; i < ls.length; i++) ls[i].scrollTo(q);
      // いま画面に出ているセクション名
      var ph = ls.filter(function (l) { return l.el.classList.contains('phone__screen'); })[0];
      if (sections && ph && ph.max) {
        var y = q * ph.max + ph.h * .35, idx = 0;
        for (var k = 0; k < sections.length; k++) if (sections[k].top <= y) idx = k;
        if (idx !== secIdx) { secIdx = idx; now.textContent = pad2(idx + 1) + ' — ' + sections[idx].label; }
      }
    }, { init: function (s) { s.lives = ls; s.measure = function () { workTarget(s); }; } });
  });

  /* --- 02 線画 → 配色 → 実装 --- */
  $$('[data-scene="draw"]').forEach(function (el) {
    var svg = $('svg.draw', el), steps = $$('.drawbox__steps li', el);
    var strokes = $$('.w', svg).map(function (g) {
      var L = 0;
      try { L = Math.ceil(g.getTotalLength()) + 2; } catch (e) { L = 0; }
      if (!g.classList.contains('ph')) { g.style.strokeDasharray = L + ' ' + L; }
      g.style.strokeDashoffset = L;
      return { el: g, L: L };
    });
    var ls = livesIn(el);
    el.style.setProperty('--h', '300vh');
    el.style.setProperty('--hm', '240vh');
    var stage = -1;
    addScene(el, function (s, p) {
      var dp = seg(p, .04, .46) * (strokes.length + 4);
      for (var k = 0; k < strokes.length; k++) {
        var st = strokes[k], t = clamp((dp - k) / 5, 0, 1);
        var o = ((1 - t) * st.L).toFixed(1);
        if (st._o !== o) { st._o = o; st.el.style.strokeDashoffset = o; }
      }
      var f = easeInOut(seg(p, .48, .66));
      svg.style.setProperty('--f', f.toFixed(3));
      svg.style.setProperty('--s', (1 - seg(p, .6, .7)).toFixed(3));
      var live = seg(p, .74, .8);
      var cur = p < .48 ? 0 : (p < .74 ? 1 : 2);
      ls.forEach(function (l) {
        var ifr = $('iframe', l.el);
        if (ifr && l.ready) ifr.style.opacity = live.toFixed(3);
        l.scrollTo(easeInOut(seg(p, .8, 1)) * .55);
      });
      if (!ls.some(function (l) { return l.ready; })) cur = Math.min(cur, 1);
      if (cur !== stage) { stage = cur; steps.forEach(function (li, i) { li.classList.toggle('is-on', i <= cur); }); }
    }, { init: function (s) { s.lives = ls; s.measure = function () { workTarget(s); }; } });
  });

  /* --- 03 横に流れるギャラリー --- */
  $$('[data-scene="gallery"]').forEach(function (el) {
    var track = $('.hs__track', el), intro = $('.hs__intro', el), bar = $('.hs__bar', el), dist = 0;
    var frames = $$('.frame', el).map(function (f) { return { el: f, live: null }; });
    var ls = livesIn(el);
    frames.forEach(function (f, i) { f.live = ls[i]; });
    addScene(el, function (s, p) {
      if (mqNarrow.matches) return;
      var e = seg(p, .03, .97);
      var x = -e * dist;
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      intro.style.transform = 'translate3d(' + (x * 1.15).toFixed(1) + 'px,0,0)';
      intro.style.opacity = (1 - seg(-x, vw * .1, vw * .38)).toFixed(3);
      if (bar) bar.style.setProperty('--p', e.toFixed(4));
      for (var i = 0; i < frames.length; i++) {
        var f = frames[i], c = f.cx + x, dd = (c - vw / 2) / vw;
        f.el.style.transform = 'rotateY(' + clamp(-dd * 16, -22, 22).toFixed(2) + 'deg) scale(' + (1 - Math.min(Math.abs(dd), 1) * .08).toFixed(4) + ')';
        if (f.live) f.live.scrollTo(clamp(.62 - dd * 1.1, 0, 1) * .7);
      }
    }, {
      init: function (s) {
        s.lives = ls;
        s.measure = function () {
          s.target = el;
          if (mqNarrow.matches) {
            el.style.height = ''; track.style.transform = ''; intro.style.transform = ''; intro.style.opacity = '';
            frames.forEach(function (f) { f.el.style.transform = ''; });
            return;
          }
          track.style.transform = '';
          dist = Math.max(0, track.scrollWidth - vw);
          frames.forEach(function (f) { f.cx = f.el.offsetLeft + f.el.offsetWidth / 2; });
          el.style.height = (dist * 1.1 + vh * 1.3) + 'px';
        };
      }
    });
  });

  /* --- 04 提案資料：スクロールでスライドが進む --- */
  $$('[data-scene="deck"]').forEach(function (el) {
    var screen = $('.deck3d__screen', el), g1 = $('.deck3d__ghost--1', el), g2 = $('.deck3d__ghost--2', el);
    var cur = $('.deckinfo__cur', el), label = $('.deckinfo__label', el), bar = $('.deck3d__bar', el);
    var names = ['表紙', '課題', 'なぜ今か', '解決策', '仕組み', '主な機能', '最初の顧客', 'ビジネスモデル', '収益の試算', '位置づけ', 'ロードマップ', '次のステップ'];
    var ls = livesIn(el), live = ls[0], idx = -1;
    el.style.setProperty('--h', '420vh');
    el.style.setProperty('--hm', '320vh');
    if (live) live.onready = function () { idx = -1; requestTick(); };
    addScene(el, function (s, p) {
      var t = easeOut(seg(p, 0, .16));
      screen.style.transform = 'rotateX(' + ((1 - t) * 28).toFixed(2) + 'deg) rotateZ(' + ((1 - t) * -7).toFixed(2) + 'deg) translate3d(0,' + ((1 - t) * 60).toFixed(1) + 'px,0) scale(' + (.86 + t * .14).toFixed(4) + ')';
      var q = seg(p, .14, .96);
      var i = Math.min(names.length - 1, Math.floor(q * names.length));
      var sub = q * names.length - i;
      var kick = i === names.length - 1 ? 0 : easeInOut(seg(sub, .82, 1));
      g1.style.transform = 'translate3d(' + (3 + kick * 2).toFixed(2) + '%,' + (4 - kick * 2).toFixed(2) + '%,0) scale(' + (.96 + kick * .02).toFixed(3) + ')';
      g2.style.transform = 'translate3d(' + (6 + kick * 2).toFixed(2) + '%,' + (8 - kick * 2).toFixed(2) + '%,0) scale(' + (.92 + kick * .02).toFixed(3) + ')';
      bar.style.setProperty('--p', ((i + 1) / names.length).toFixed(4));
      if (i !== idx) {
        idx = i;
        cur.textContent = pad2(i + 1);
        label.textContent = names[i];
        if (live) live.call(function (win) { if (win.deck) win.deck.go(i); });
      }
    }, { init: function (s) { s.lives = ls; s.measure = function () { workTarget(s); }; } });
  });

  /* --- 流れる帯（スクロールの速さで加速） --- */
  var mq = $('.mq__track'), mqX = 0, mqW = 0, vel = 0, lastScroll = w.pageYOffset, mqDir = 1, mqOn = false;
  if (mq) {
    new IntersectionObserver(function (es) { mqOn = es[0].isIntersecting; if (mqOn) w.requestAnimationFrame(mqLoop); }).observe(mq);
  }
  function mqLoop() {
    if (!mqOn) return;
    var y = w.pageYOffset, dy = y - lastScroll; lastScroll = y;
    if (dy) mqDir = dy > 0 ? 1 : -1;
    vel = lerp(vel, Math.abs(dy), .1);
    if (!mqW) mqW = mq.scrollWidth / 2;
    mqX -= (0.6 + vel * .35) * mqDir;
    if (mqX <= -mqW) mqX += mqW;
    if (mqX > 0) mqX -= mqW;
    mq.style.transform = 'translate3d(' + mqX.toFixed(1) + 'px,0,0) skewX(' + clamp(-vel * .25 * mqDir, -8, 8).toFixed(2) + 'deg)';
    w.requestAnimationFrame(mqLoop);
  }

  /* ---------- 1フレームに1回だけ計算する ---------- */
  var ticking = false;
  function requestTick() { if (!ticking) { ticking = true; w.requestAnimationFrame(tick); } }
  function tick() {
    ticking = false;
    var i, s;
    for (i = 0; i < scenes.length; i++) { s = scenes[i]; if (s.active) s.rect = s.target.getBoundingClientRect(); }
    for (i = 0; i < scenes.length; i++) { s = scenes[i]; if (s.active) s.fn(s, stickyProgress(s.rect)); }
    updateHeader();
  }
  function measure() {
    vh = w.innerHeight; vw = w.innerWidth; mqW = 0;
    scenes.forEach(function (s) { if (s.measure) s.measure(); });
    lives.forEach(function (l) { l.fit(); l.measure(); });
    scenes.forEach(function (s) { s.rect = s.target.getBoundingClientRect(); s.fn(s, stickyProgress(s.rect)); });
    requestTick();
  }
  w.addEventListener('scroll', requestTick, { passive: true });
  var rz;
  w.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(measure, 120); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(measure);
  w.addEventListener('load', measure);
  measure();

  /* ---------- ページ遷移のフェード ---------- */
  var pt = d.createElement('div');
  pt.className = 'pt'; pt.setAttribute('aria-hidden', 'true');
  d.body.appendChild(pt);
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    var href = a.getAttribute('href');
    if (!href || /^(mailto:|tel:|javascript:|https?:)/i.test(href)) return;
    if (href.charAt(0) === '#') {
      // ページ内リンクはなめらかに
      var t = d.getElementById(href.slice(1));
      if (t) { e.preventDefault(); w.scrollTo({ top: t.getBoundingClientRect().top + w.pageYOffset, behavior: 'smooth' }); history.replaceState(null, '', href); }
      return;
    }
    e.preventDefault();
    html.classList.add('is-leaving');
    setTimeout(function () { location.href = a.href; }, 420);
  });
  w.addEventListener('pageshow', function (e) { if (e.persisted) html.classList.remove('is-leaving'); });

  /* ---------- マウスに反応する細かい動き（PCのみ） ---------- */
  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;

  // ファーストビューの画面がマウスに合わせて少し動く
  d.addEventListener('mousemove', function (e) {
    mouse.tx = (e.clientX / vw - .5) * 2; mouse.ty = (e.clientY / vh - .5) * 2;
  }, { passive: true });
  (function heroLoop() {
    var dx = mouse.tx - mouse.x, dy = mouse.ty - mouse.y;
    if (Math.abs(dx) > .001 || Math.abs(dy) > .001) {
      mouse.x += dx * .06; mouse.y += dy * .06;
      if (w.pageYOffset < vh * 2) requestTick();
    }
    w.requestAnimationFrame(heroLoop);
  })();

  // カスタムカーソル
  var ring = d.createElement('div'), dot = d.createElement('div');
  ring.className = 'cursor'; dot.className = 'cursor-dot';
  ring.innerHTML = '<span>View</span>';
  ring.setAttribute('aria-hidden', 'true'); dot.setAttribute('aria-hidden', 'true');
  d.body.appendChild(ring); d.body.appendChild(dot);
  var mx = -100, my = -100, rx = -100, ry = -100, running = false;
  function loop() {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
    if (Math.abs(mx - rx) > .2 || Math.abs(my - ry) > .2) w.requestAnimationFrame(loop); else running = false;
  }
  d.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    html.classList.add('has-cursor');
    if (!running) { running = true; w.requestAnimationFrame(loop); }
  }, { passive: true });
  d.addEventListener('mouseleave', function () { html.classList.remove('has-cursor'); });
  d.addEventListener('mousedown', function () { ring.classList.add('is-down'); });
  d.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });
  d.addEventListener('mouseover', function (e) {
    var t = e.target;
    var view = !!(t.closest && t.closest('[data-view]'));
    ring.classList.toggle('is-view', view);
    dot.classList.toggle('is-hide', view);
    ring.classList.toggle('is-link', !view && !!(t.closest && t.closest('a, button, [data-magnetic]')));
  });

  // 磁石のように少し吸い寄せられるボタン
  $$('.btn, [data-magnetic]').forEach(function (b) {
    var strength = b.hasAttribute('data-magnetic') ? .35 : .2;
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      b.style.transform = 'translate3d(' + (x * strength).toFixed(1) + 'px,' + (y * strength * 1.2).toFixed(1) + 'px,0)';
    });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });

  // 目次：マウスについてくるプレビュー
  var peek = $('.peek'), peekUse = peek && $('use', peek);
  if (peek) {
    var px = 0, py = 0, tx = 0, ty = 0, pOn = false, pRun = false;
    var pLoop = function () {
      px += (tx - px) * .14; py += (ty - py) * .14;
      var rot = clamp((tx - px) * .05, -8, 8);
      peek.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg)';
      if (pOn || Math.abs(tx - px) > .3) w.requestAnimationFrame(pLoop); else pRun = false;
    };
    $$('[data-peek]').forEach(function (a) {
      a.addEventListener('mouseenter', function (e) {
        peekUse.setAttribute('href', '#' + a.getAttribute('data-peek'));
        if (!pOn) { px = tx = e.clientX; py = ty = e.clientY; }
        pOn = true; peek.classList.add('is-on');
        if (!pRun) { pRun = true; w.requestAnimationFrame(pLoop); }
      });
      a.addEventListener('mousemove', function (e) { tx = e.clientX + 60; ty = e.clientY; });
      a.addEventListener('mouseleave', function () { pOn = false; peek.classList.remove('is-on'); });
    });
  }
})();
