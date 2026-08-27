/* ============================================================
   main.js — render, dil değiştirme, hareket
   İçeriği değiştirmek için js/content.js dosyasına bak.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'sfc-lang';
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'tr';

  var el = {
    board: document.getElementById('board'),
    facts: document.getElementById('facts'),
    cards: document.getElementById('cards'),
    racks: document.getElementById('racks'),
    links: document.getElementById('links'),
    tally: document.getElementById('tally'),
    ticker: document.getElementById('ticker'),
    code: document.getElementById('code-body'),
    codeFile: document.getElementById('code-file'),
    timeline: document.getElementById('timeline'),
    crt: document.getElementById('crt-screen'),
    bar: document.getElementById('progress-bar'),
    boot: document.getElementById('boot'),
    bootCmd: document.getElementById('boot-cmd'),
    bootFill: document.getElementById('boot-fill'),
    bootPct: document.getElementById('boot-pct'),
    year: document.getElementById('year')
  };

  function t(key) {
    return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.tr[key] || key;
  }

  function make(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ── Hero sayaçları ──────────────────────────────────── */
  function renderTally() {
    el.tally.textContent = '';

    TALLY.forEach(function (item) {
      var wrap = make('div', 'tally__item');
      wrap.appendChild(make('dt', 'tally__n', item.n));
      wrap.appendChild(make('dd', 'tally__l', item[lang]));
      el.tally.appendChild(wrap);
    });
  }

  /* ── Araç şeridi (kesintisiz akış için iki kopya) ────── */
  function renderTicker() {
    el.ticker.textContent = '';

    for (var pass = 0; pass < 2; pass++) {
      TICKER.forEach(function (name) {
        el.ticker.appendChild(make('span', 'ticker__item', name));
      });
    }
  }


  /* ── Hakkımda: veriden JS nesnesi üret ve renklendir ─── */
  function tok(cls, text) { return make('span', cls, text); }

  function renderAbout() {
    el.codeFile.textContent = ABOUT.file;
    el.code.textContent = '';

    var rows = ABOUT[lang];
    var pad = 0;
    rows.forEach(function (r) { pad = Math.max(pad, r[0].length); });

    function line() {
      var node = make('span', 'code__line');
      for (var i = 0; i < arguments.length; i++) node.appendChild(arguments[i]);
      el.code.appendChild(node);
    }

    function spaces(n) { return new Array(n + 1).join(' '); }

    line(tok('tk-kw', 'const'), tok('', ' '), tok('tk-var', ABOUT.varName),
         tok('', ' '), tok('tk-pun', '='), tok('', ' '), tok('tk-pun', '{'));

    rows.forEach(function (row, idx) {
      var key = row[0];
      var val = row[1];
      var gap = spaces(pad - key.length);
      var comma = idx < rows.length - 1 ? ',' : '';

      if (typeof val === 'string') {
        line(tok('', '  '), tok('tk-key', key), tok('', gap + ' '), tok('tk-pun', ':'),
             tok('', ' '), tok('tk-str', '"' + val + '"'), tok('tk-pun', comma));
        return;
      }

      line(tok('', '  '), tok('tk-key', key), tok('', gap + ' '), tok('tk-pun', ':'),
           tok('', ' '), tok('tk-pun', '['));

      val.forEach(function (v, i) {
        line(tok('', '    '), tok('tk-str', '"' + v + '"'),
             tok('tk-pun', i < val.length - 1 ? ',' : ''));
      });

      line(tok('', '  '), tok('tk-pun', ']' + comma));
    });

    line(tok('tk-pun', '};'));
  }

  /* ── Geçmiş rayı ─────────────────────────────────────── */
  function renderTimeline() {
    el.timeline.textContent = '';

    TIMELINE.forEach(function (e) {
      var copy = e[lang];
      var item = make('li', e.highlight ? 'rail__item rail__item--star' : 'rail__item');

      var top = make('p', 'rail__year');
      top.appendChild(document.createTextNode(e.year));
      if (copy.tag) top.appendChild(make('span', 'rail__tag', copy.tag));
      item.appendChild(top);

      item.appendChild(make('h3', 'rail__title', copy.title));
      item.appendChild(make('p', 'rail__note', copy.note));
      el.timeline.appendChild(item);
    });
  }

  /* ── Liderlik tablosu ────────────────────────────────── */
  function renderBoard() {
    el.board.textContent = '';

    RESULTS.forEach(function (r) {
      var copy = r[lang];
      var row = make('li', 'board__row');
      row.setAttribute('data-reveal', '');

      var rank = make('span', 'board__rank');
      rank.appendChild(document.createTextNode(r.rank));
      if (/^\d+$/.test(r.rank) && t('rank.suffix')) {
        rank.appendChild(make('span', 'board__suffix', t('rank.suffix')));
      }

      var body = make('div', 'board__body');
      body.appendChild(make('h3', 'board__name', copy.name));
      body.appendChild(make('p', 'board__org', copy.org + ' · ' + copy.note));

      var meta = make('div', 'board__meta');
      var scope = make('span', 'board__scope', t('scope.' + r.scope));
      scope.setAttribute('data-scope', r.scope);
      var year = make('span', 'board__year', r.year);
      if (r.year === '????') year.setAttribute('data-pending', 'true');
      meta.appendChild(scope);
      meta.appendChild(year);

      row.appendChild(rank);
      row.appendChild(body);
      row.appendChild(make('span', 'board__leader'));
      row.appendChild(meta);
      spotlight(row);
      el.board.appendChild(row);
    });
  }

  /* ── Saha bilgileri ──────────────────────────────────── */
  function renderFacts() {
    el.facts.textContent = '';

    FACTS.forEach(function (f) {
      var item = make('div', 'fact');
      item.setAttribute('data-reveal', '');
      item.appendChild(make('span', 'fact__k', f[lang].k));
      item.appendChild(make('span', 'fact__v', f[lang].v));
      el.facts.appendChild(item);
    });
  }

  /* ── Projeler ────────────────────────────────────────── */
  function renderCards() {
    el.cards.textContent = '';

    PROJECTS.forEach(function (p) {
      var card = make('article', p.wide ? 'card card--wide' : 'card');
      card.setAttribute('data-reveal', '');

      var head = make('div', 'card__head');
      head.appendChild(make('h3', 'card__name', p.name));
      if (!p.url) head.appendChild(make('span', 'card__badge', t('work.private')));
      card.appendChild(head);

      card.appendChild(make('p', 'card__desc', p[lang]));

      var stack = make('ul', 'card__stack');
      p.stack.forEach(function (s) { stack.appendChild(make('li', null, s)); });
      card.appendChild(stack);

      if (p.url) {
        var link = make('a', 'card__link');
        link.href = p.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.appendChild(document.createTextNode(t('work.view')));
        link.appendChild(make('span', null, '→'));
        card.appendChild(link);
      }

      spotlight(card);
      el.cards.appendChild(card);
    });
  }

  /* ── Cephanelik ──────────────────────────────────────── */
  function renderRacks() {
    el.racks.textContent = '';

    RACKS.forEach(function (r) {
      var rack = make('div', 'rack');
      rack.setAttribute('data-reveal', '');

      var title = make('h3', 'rack__title');
      title.appendChild(document.createTextNode(r[lang].title));
      if (r[lang].tag) title.appendChild(make('span', 'rack__tag', r[lang].tag));
      rack.appendChild(title);

      var items = make('ul', 'rack__items');
      r.items.forEach(function (i) { items.appendChild(make('li', null, i)); });
      rack.appendChild(items);

      el.racks.appendChild(rack);
    });
  }

  /* ── İletişim ────────────────────────────────────────── */
  function icon(name) {
    var d = ICONS[name];
    if (!d) return null;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'link__icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);

    return svg;
  }

  function renderLinks() {
    el.links.textContent = '';

    LINKS.forEach(function (l) {
      var item = make('li', 'link');

      var head = make('span', 'link__head');
      var glyph = icon(l.icon);
      if (glyph) head.appendChild(glyph);
      head.appendChild(make('span', 'link__label', l.label));
      item.appendChild(head);

      if (l.url) {
        var a = make('a', 'link__value', l.value);
        a.href = l.url;
        if (l.url.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
        item.appendChild(a);
        item.appendChild(make('span', null, ''));
      } else {
        item.appendChild(make('span', 'link__value', l.value));
        var btn = make('button', 'link__copy', t('contact.copy'));
        btn.type = 'button';
        btn.addEventListener('click', function () { copy(l.value, btn); });
        item.appendChild(btn);
      }

      el.links.appendChild(item);
    });
  }

  function copy(text, btn) {
    var done = function () {
      btn.textContent = t('contact.copied');
      btn.classList.add('is-done');
      setTimeout(function () {
        btn.textContent = t('contact.copy');
        btn.classList.remove('is-done');
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
      return;
    }

    var tmp = document.createElement('textarea');
    tmp.value = text;
    tmp.setAttribute('readonly', '');
    tmp.style.position = 'absolute';
    tmp.style.left = '-9999px';
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(tmp);
  }

  /* ── İmleç takipli spot ışığı ────────────────────────── */
  function spotlight(node) {
    if (calm) return;

    node.addEventListener('mousemove', function (e) {
      var box = node.getBoundingClientRect();
      node.style.setProperty('--mx', (e.clientX - box.left) + 'px');
      node.style.setProperty('--my', (e.clientY - box.top) + 'px');
    });
  }

  /* ── CRT terminal — dil değişince yeniden "derlenir" ─── */
  var crtTimers = [];

  function renderCrt() {
    var title = document.querySelector('.crt .crt__title');
    if (title) title.textContent = PROMPT + ' — bash';

    crtTimers.forEach(clearTimeout);
    crtTimers = [];
    el.crt.textContent = '';

    var lines = [];

    CRT[lang].forEach(function (line) {
      if (line.gap) { lines.push(make('span', 'crt__gap')); return; }

      var node = make('span', 'crt__line');

      if (line.p) {
        node.appendChild(make('span', 'crt__prompt', PROMPT + ':~$'));
        if (line.cmd) node.appendChild(document.createTextNode(' ' + line.cmd));
        if (line.cursor) node.appendChild(make('span', 'crt__cursor'));
      } else {
        node.appendChild(make('span', 'crt__out', '  ' + line.out));
      }

      lines.push(node);
    });

    lines.forEach(function (node, i) {
      if (!calm) {
        node.style.opacity = '0';
        node.style.transition = 'opacity .3s ease-out';
      }
      el.crt.appendChild(node);

      if (!calm) {
        crtTimers.push(setTimeout(function () { node.style.opacity = '1'; }, 300 + i * 70));
      }
    });
  }

  /* ── Statik metinler ─────────────────────────────────── */
  function applyStrings() {
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    document.documentElement.lang = lang;
    document.title = lang === 'tr'
      ? 'Selman Farisi Cüzdan — Ofansif Güvenlik Araştırmacısı'
      : 'Selman Farisi Cüzdan — Offensive Security Researcher';
  }

  /* ── Scroll reveal ───────────────────────────────────── */
  var observer = null;

  var sdt = !calm && window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (sdt) document.documentElement.classList.add('sdt');

  function watchReveals() {
    // Scroll-driven destekleniyorsa bölümleri CSS hallediyor
    var sel = sdt
      ? '.hero [data-reveal]:not(.is-in)'
      : '[data-reveal]:not(.is-in)';
    var targets = document.querySelectorAll(sel);

    if (calm || !('IntersectionObserver' in window)) {
      targets.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var node = entry.target;
          setTimeout(function () { node.classList.add('is-in'); }, i * 70);
          observer.unobserve(node);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    }

    targets.forEach(function (n) { observer.observe(n); });
  }

  /* ── Scroll ilerleme çubuğu ──────────────────────────── */
  function trackProgress() {
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      el.bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ── Dil değiştirici ─────────────────────────────────── */
  function paint(fn) {
    if (calm || !document.startViewTransition) { fn(); return; }
    try { document.startViewTransition(fn); } catch (e) { fn(); }
  }

  function setLang(next) {
    paint(function () { applyLang(next); });
  }

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem(STORE_KEY, next); } catch (e) {}

    document.querySelectorAll('.langswitch__btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === next;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    applyStrings();
    renderTally();
    renderAbout();
    renderTimeline();
    renderBoard();
    renderFacts();
    renderCards();
    renderRacks();
    renderLinks();
    renderCrt();
    watchReveals();
  }


  /* ── Kaydırdıkça menüde aktif bölüm ──────────────────── */
  function trackSections() {
    var links = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });

    var sections = Object.keys(links)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    var seen = {};

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });

      var current = null;
      sections.forEach(function (sec) { if (seen[sec.id]) current = current || sec.id; });

      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('is-active', id === current);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (sec) { io.observe(sec); });
  }

  /* ── Açılış dizisi ───────────────────────────────────── */
  function runBoot(done) {
    var root = document.documentElement;

    // Hareket tercihi kapalıysa ya da bu sekmede bir kez gösterildiyse atla
    var seen = false;
    try { seen = sessionStorage.getItem('sfc-boot') === '1'; } catch (e) {}

    if (calm || seen || !el.boot) {
      if (el.boot) el.boot.parentNode.removeChild(el.boot);
      done();
      return;
    }

    try { sessionStorage.setItem('sfc-boot', '1'); } catch (e) {}
    root.classList.add('is-booting');

    var cmd = './selman --init';
    var i = 0;
    var timers = [];
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      root.classList.remove('is-booting');
      el.boot.classList.add('is-done');
      setTimeout(function () {
        if (el.boot.parentNode) el.boot.parentNode.removeChild(el.boot);
      }, 700);
      done();
    }

    // Kullanıcı beklemek istemezse geçebilsin
    ['click', 'keydown', 'wheel', 'touchstart'].forEach(function (evt) {
      window.addEventListener(evt, finish, { once: true, passive: true });
    });

    function type() {
      el.bootCmd.textContent = cmd.slice(0, ++i);
      if (i < cmd.length) { timers.push(setTimeout(type, 34)); return; }
      timers.push(setTimeout(meter, 120));
    }

    function meter() {
      var clock = window.performance && performance.now
        ? function () { return performance.now(); }
        : function () { return Date.now(); };
      var start = clock();
      var span = 620;

      function step() {
        if (finished) return;
        var p = Math.min(1, (clock() - start) / span);
        var eased = 1 - Math.pow(1 - p, 2);
        el.bootFill.style.width = (eased * 100).toFixed(1) + '%';
        el.bootPct.textContent = Math.round(eased * 100);
        if (p < 1) { window.requestAnimationFrame(step); return; }
        timers.push(setTimeout(finish, 190));
      }

      window.requestAnimationFrame(step);
    }

    // rAF takılsa bile açılış ekranı kilitlenmesin
    timers.push(setTimeout(finish, 1800));
    timers.push(setTimeout(type, 220));
  }

  /* ── Boot ────────────────────────────────────────────── */
  try {
    var saved = localStorage.getItem(STORE_KEY);
    if (saved === 'tr' || saved === 'en') lang = saved;
  } catch (e) {}

  el.year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('.langswitch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = btn.getAttribute('data-lang');
      if (next !== lang) setLang(next);
    });
  });

  renderTicker();
  applyLang(lang);
  trackProgress();
  trackSections();

  function enterHero() {
    document.querySelectorAll('.hero [data-reveal]').forEach(function (node, i) {
      if (calm) { node.classList.add('is-in'); return; }
      setTimeout(function () { node.classList.add('is-in'); }, 90 + i * 110);
    });
    renderCrt();
  }

  runBoot(enterHero);
})();
