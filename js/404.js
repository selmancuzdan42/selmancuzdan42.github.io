/* ============================================================
   404.js — honeypot şakası. Dil tercihi ana siteyle ortak.
   ============================================================ */
(function () {
  'use strict';

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // js/content.js içindeki PROMPT ile aynı tutulmalı
  var PROMPT = 'root@s3lm4n';

  var lang = 'tr';
  try {
    var saved = localStorage.getItem('sfc-lang');
    if (saved === 'tr' || saved === 'en') lang = saved;
  } catch (e) {}

  var COPY = {
    tr: {
      back: 'Güvenli bölgeye dön',
      title: '404 — burada bir şey yok',
      lines: [
        { t: 'warn', k: '[UYARI]', v: ' Yetkisiz dizin erişimi tespit edildi.' },
        { t: 'warn', k: '[TARAMA]', v: ' Ziyaretçi niyeti ......... [ŞÜPHELİ]' },
        { t: 'warn', k: '[SONUÇ]', v: ' Kullanıcı olmayan dizinlerde açık arıyor.' },
        { gap: true },
        { t: 'out', v: 'İyi denemeydi. Burada SQL injection yok,' },
        { t: 'out', v: 'gizli flag yok, backdoor yok. Sadece boşluk var.' },
        { t: 'out', v: 'Bir de auth.log içinde senin IP adresin.' },
        { gap: true },
        { t: 'cmd', v: './ban.sh --hemen' },
        { t: 'out', v: '>> Ban protokolü çalıştırılıyor...' },
        { t: 'out', v: '>> Şaka şaka. (Yoksa değil mi?)' },
        { gap: true },
        { t: 'cmd', v: '', caret: true }
      ]
    },
    en: {
      back: 'Back to safety',
      title: '404 — nothing here',
      lines: [
        { t: 'warn', k: '[ALERT]', v: ' Unauthorized directory access detected.' },
        { t: 'warn', k: '[SCAN]', v: '  Visitor intent ......... [SUSPICIOUS]' },
        { t: 'warn', k: '[RESULT]', v: ' User is hunting for bugs in directories that do not exist.' },
        { gap: true },
        { t: 'out', v: 'Nice try. No SQL injection here, no hidden flags,' },
        { t: 'out', v: 'no backdoors. Just void.' },
        { t: 'out', v: 'And your IP address in auth.log.' },
        { gap: true },
        { t: 'cmd', v: './ban.sh --now' },
        { t: 'out', v: '>> Running ban protocol...' },
        { t: 'out', v: '>> Just kidding. (Or am I?)' },
        { gap: true },
        { t: 'cmd', v: '', caret: true }
      ]
    }
  };

  var copy = COPY[lang];
  var log = document.getElementById('log');

  document.documentElement.lang = lang;
  document.title = copy.title;
  document.getElementById('back').textContent = copy.back;

  function make(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  copy.lines.forEach(function (line, i) {
    if (line.gap) { log.appendChild(make('span', 'crt__gap')); return; }

    var row = make('span', 'crt__line');

    if (line.t === 'cmd') {
      row.appendChild(make('span', 'crt__prompt', PROMPT + ':~/honeypot$'));
      if (line.v) row.appendChild(document.createTextNode(' ' + line.v));
      if (line.caret) row.appendChild(make('span', 'crt__cursor'));
    } else if (line.t === 'warn') {
      row.appendChild(make('span', 'lost__tag', line.k));
      row.appendChild(make('span', 'crt__out', line.v));
    } else {
      row.appendChild(make('span', 'crt__out', '  ' + line.v));
    }

    if (!calm) {
      row.style.opacity = '0';
      row.style.transition = 'opacity .3s ease-out';
      setTimeout(function () { row.style.opacity = '1'; }, 180 + i * 95);
    }

    log.appendChild(row);
  });
})();
