(function () {
  var deck = document.getElementById('deck');
  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var cur = document.getElementById('cur');
  var bar = document.getElementById('bar');
  var index = 0;

  document.getElementById('total').textContent = slides.length;

  function fit() {
    var w = stage.clientWidth, h = stage.clientHeight;
    var pad = w < 700 ? 8 : 32;
    var scale = Math.min((w - pad * 2) / 1280, (h - pad * 2) / 720);
    deck.style.transform = 'scale(' + Math.max(scale, 0.1) + ')';
  }

  function go(i, push) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, n) {
      var on = n === index;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
      if ('inert' in s) s.inert = !on;
    });
    cur.textContent = index + 1;
    bar.style.width = ((index + 1) / slides.length * 100) + '%';
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    if (push !== false) history.replaceState(null, '', '#' + (index + 1));
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
    }
  });
  prev.addEventListener('click', function () { go(index - 1); });
  next.addEventListener('click', function () { go(index + 1); });

  // スワイプ
  var sx = null;
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    sx = null;
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () {
    var n = parseInt(location.hash.slice(1), 10);
    if (n && n - 1 !== index) go(n - 1, false);
  });

  fit();
  var start = parseInt(location.hash.slice(1), 10);
  go(start ? start - 1 : 0, false);
  requestAnimationFrame(function () { requestAnimationFrame(function () { deck.classList.remove('no-anim'); }); });
})();
