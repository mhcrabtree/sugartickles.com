// SugarTickles — Walkthroughs
// Progress checkboxes, screenshot/video stubs, and table-of-contents behavior.
(function () {
  const page = document.body.dataset.walkthrough || location.pathname;
  const storeKey = 'st-walkthrough:' + page;
  const lastKey = storeKey + ':last';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey)) || {}; } catch (e) { saved = {}; }

  // Key each step by its chapter + text so editing one step only resets that step.
  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  const steps = [];
  document.querySelectorAll('.chapter').forEach(function (chapter) {
    chapter.querySelectorAll('ol.steps > li').forEach(function (li) {
      const key = chapter.id + ':' + hash(li.textContent.trim());
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.setAttribute('aria-label', 'Mark step done');
      box.checked = !!saved[key];
      li.classList.toggle('checked', box.checked);
      box.addEventListener('change', function () {
        if (box.checked) saved[key] = 1; else delete saved[key];
        li.classList.toggle('checked', box.checked);
        localStorage.setItem(storeKey, JSON.stringify(saved));
        // The bookmark follows the step you most recently checked off.
        if (box.checked) localStorage.setItem(lastKey, key);
        else if (localStorage.getItem(lastKey) === key) localStorage.removeItem(lastKey);
        updateProgress();
        updateBookmark();
      });
      li.prepend(box);
      // Optional steps can be checked, but don't hold back a chapter's ✓.
      const optional = /^optional\b/i.test(li.textContent.trim());
      steps.push({ chapter: chapter.id, box: box, key: key, li: li, optional: optional });
    });
  });

  function updateProgress() {
    const done = steps.filter(function (s) { return s.box.checked; }).length;
    const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
    const bar = document.querySelector('.progress .bar span');
    const label = document.querySelector('.progress .count');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = done + ' / ' + steps.length + ' steps · ' + pct + '%';

    document.querySelectorAll('.toc a[href^="#"]').forEach(function (a) {
      const id = a.getAttribute('href').slice(1);
      const mine = steps.filter(function (s) { return s.chapter === id; });
      const mark = a.querySelector('.done');
      if (!mark || !mine.length) return;
      const required = mine.filter(function (s) { return !s.optional; });
      const checked = mine.filter(function (s) { return s.box.checked; }).length;
      const complete = required.every(function (s) { return s.box.checked; });
      // ✓ when every required step is done; otherwise show how far along you are.
      mark.textContent = complete ? '✓' : checked ? checked + '/' + mine.length : '';
      mark.classList.toggle('partial', !complete && checked > 0);
    });
  }

  const reset = document.querySelector('.progress button');
  if (reset) {
    reset.addEventListener('click', function () {
      if (!confirm('Clear all checked steps?')) return;
      saved = {};
      localStorage.removeItem(storeKey);
      localStorage.removeItem(lastKey);
      steps.forEach(function (s) { s.box.checked = false; s.box.closest('li').classList.remove('checked'); });
      updateProgress();
      updateBookmark();
    });
  }

  // Screenshots: <figure class="shot" data-src="shots/x.jpg"> shows the image if the
  // file exists, otherwise a labeled stub so it's obvious what still needs capturing.
  document.querySelectorAll('figure.shot[data-src]').forEach(function (fig) {
    const src = fig.dataset.src;
    const caption = fig.querySelector('figcaption');
    const stub = document.createElement('div');
    stub.className = 'stub';
    stub.innerHTML = '<div><div class="icon">📷</div><div>Screenshot coming soon</div><div class="file"></div></div>';
    stub.querySelector('.file').textContent = src;
    fig.insertBefore(stub, caption);

    const img = new Image();
    img.alt = caption ? caption.textContent : '';
    img.loading = 'lazy';
    img.onload = function () { fig.replaceChild(img, stub); };
    img.src = src;
  });

  // Video: <figure class="video" data-youtube="VIDEO_ID"> embeds; empty id shows a stub.
  document.querySelectorAll('figure.video').forEach(function (fig) {
    const id = (fig.dataset.youtube || '').trim();
    const caption = fig.querySelector('figcaption');
    let el;
    if (id) {
      el = document.createElement('iframe');
      el.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id);
      el.title = caption ? caption.textContent : 'Gameplay video';
      el.loading = 'lazy';
      el.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
      el.allowFullscreen = true;
    } else {
      el = document.createElement('div');
      el.className = 'stub';
      el.innerHTML = '<div><div class="icon">🎬</div><div>Gameplay video coming soon</div></div>';
    }
    fig.insertBefore(el, caption);
  });

  // Mobile TOC toggle
  const toggle = document.querySelector('.toc-toggle');
  const toc = document.querySelector('.toc');
  if (toggle && toc) {
    toggle.addEventListener('click', function () {
      toc.classList.toggle('open');
      toggle.setAttribute('aria-expanded', toc.classList.contains('open'));
    });
    toc.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth <= 900) toc.classList.remove('open');
    });
  }

  // Highlight the chapter currently on screen
  const links = {};
  document.querySelectorAll('.toc a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !links[entry.target.id]) return;
        Object.values(links).forEach(function (a) { a.classList.remove('active'); });
        links[entry.target.id].classList.add('active');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('.chapter, .reference').forEach(function (s) { observer.observe(s); });
  }

  const top = document.querySelector('.back-to-top');
  if (top) {
    window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 800); }, { passive: true });
  }

  // Bookmark: the step you last checked off (or, failing that, the furthest checked step).
  // Opening the page jumps straight there, so you can pick up mid-game without scrolling.
  function bookmarkStep() {
    const last = localStorage.getItem(lastKey);
    const byKey = steps.find(function (s) { return s.key === last && s.box.checked; });
    if (byKey) return byKey;
    for (let i = steps.length - 1; i >= 0; i--) if (steps[i].box.checked) return steps[i];
    return null;
  }

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'bookmark-fab';
  fab.setAttribute('aria-label', 'Jump to where you left off');
  fab.title = 'Jump to where you left off';
  fab.textContent = '🔖';
  document.body.appendChild(fab);

  const jump = document.createElement('button');
  jump.type = 'button';
  jump.className = 'bookmark-jump';
  jump.textContent = '🔖 Jump to where I left off';
  const progressBox = document.querySelector('.toc .progress');
  if (progressBox) progressBox.appendChild(jump);

  function chapterTitle(step) {
    const h = document.querySelector('#' + step.chapter + ' h3');
    return h ? h.textContent.trim() : '';
  }

  function updateBookmark() {
    const step = bookmarkStep();
    document.querySelectorAll('li.bookmarked').forEach(function (li) { li.classList.remove('bookmarked'); });
    if (step) step.li.classList.add('bookmarked');
    fab.classList.toggle('show', !!step);
    jump.hidden = !step;
  }

  function goToBookmark() {
    const step = bookmarkStep();
    if (!step) return;
    // Land the bookmarked step about a third of the way down, below the sticky top bar,
    // so the next unchecked step is right underneath it.
    const bar = document.querySelector('.topbar');
    const offset = (bar ? bar.offsetHeight : 0) + window.innerHeight * 0.2;
    const top = step.li.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    step.li.classList.remove('flash');
    void step.li.offsetWidth;
    step.li.classList.add('flash');
    if (toc && window.innerWidth <= 900) toc.classList.remove('open');
  }

  fab.addEventListener('click', function () { goToBookmark(); });
  jump.addEventListener('click', function () { goToBookmark(); });

  function showResumeNote(step) {
    const note = document.createElement('div');
    note.className = 'resume-note';
    note.setAttribute('role', 'status');
    note.innerHTML = '<span>🔖 Picked up where you left off<small></small></span><button type="button" class="to-top">↑ Start at top</button><button type="button" class="close" aria-label="Dismiss">✕</button>';
    note.querySelector('small').textContent = chapterTitle(step);
    document.body.appendChild(note);
    function dismiss() { note.classList.add('hide'); setTimeout(function () { note.remove(); }, 300); }
    note.querySelector('.to-top').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'instant' }); dismiss(); });
    note.querySelector('.close').addEventListener('click', dismiss);
    setTimeout(dismiss, 9000);
  }

  updateProgress();
  updateBookmark();

  // Auto-resume on open, unless the link points somewhere specific (e.g. #chapter).
  const resumeStep = bookmarkStep();
  if (resumeStep && !location.hash) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    goToBookmark();
    // Fonts and images can shift the layout after first paint; settle on the step once loaded.
    let touched = false;
    ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, function () { touched = true; }, { once: true, passive: true });
    });
    window.addEventListener('load', function () { if (!touched) goToBookmark(); });
    showResumeNote(resumeStep);
  }
})();

// Spell pages: free-text search plus reagent filter chips.
(function () {
  const box = document.querySelector('.filters input[type="search"]');
  if (!box) return;
  const chips = Array.from(document.querySelectorAll('.filters button.chip'));
  const rows = Array.from(document.querySelectorAll('.spell-table tbody tr'));
  const empty = document.querySelector('.no-results');

  function apply() {
    const q = box.value.trim().toLowerCase();
    const want = chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; })
      .map(function (c) { return c.dataset.reagent; });
    let shown = 0;
    rows.forEach(function (tr) {
      const has = (tr.dataset.reagents || '').split(' ');
      const ok = (!q || tr.textContent.toLowerCase().includes(q)) &&
        want.every(function (r) { return has.includes(r); });
      tr.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll('.circle').forEach(function (sec) {
      sec.hidden = !sec.querySelector('tbody tr:not([hidden])');
    });
    if (empty) empty.style.display = shown ? 'none' : 'block';
  }

  box.addEventListener('input', apply);
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      apply();
    });
  });
})();

// Character and item tooltips: pages that load npcs.js (window.ST_NPCS) and items.js
// (window.ST_ITEMS) get a small card on <span class="npc">, <span class="item">, and bold
// item names in the steps. Hover or focus on desktop, tap on touch screens.
(function () {
  const npcs = window.ST_NPCS || {};
  const items = window.ST_ITEMS || {};
  if (!window.ST_NPCS && !window.ST_ITEMS) return;

  const tip = document.createElement('div');
  tip.className = 'npc-tip';
  tip.id = 'npc-tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.appendChild(tip);
  let current = null;

  function show(el) {
    const name = el.textContent.trim();
    const isItem = el.dataset.tip === 'item';
    const info = (isItem ? items : npcs)[name];
    if (!info) return;
    current = el;
    tip.classList.toggle('is-item', isItem);
    tip.innerHTML = '<strong></strong><span class="role"></span><span class="where"></span>';
    tip.querySelector('strong').textContent = name;
    tip.querySelector('.role').textContent = info[0];
    tip.querySelector('.where').textContent = info[1];
    tip.hidden = false;
    el.setAttribute('aria-describedby', 'npc-tip');

    // Prefer above the name; flip below if it would run off the top. Keep it on screen sideways.
    const r = el.getBoundingClientRect();
    const w = tip.offsetWidth, h = tip.offsetHeight, pad = 8;
    let left = Math.min(Math.max(pad, r.left + r.width / 2 - w / 2), window.innerWidth - w - pad);
    let top = r.top - h - 8;
    tip.classList.toggle('below', top < pad);
    if (top < pad) top = r.bottom + 8;
    tip.style.left = (left + window.scrollX) + 'px';
    tip.style.top = (top + window.scrollY) + 'px';
  }

  function hide() {
    if (current) current.removeAttribute('aria-describedby');
    current = null;
    tip.hidden = true;
  }

  function attach(el, kind) {
    el.dataset.tip = kind;
    el.classList.add('has-tip');
    el.tabIndex = 0;
    el.addEventListener('mouseenter', function () { show(el); });
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focus', function () { show(el); });
    el.addEventListener('blur', hide);
    el.addEventListener('click', function (e) { e.stopPropagation(); show(el); });
  }

  document.querySelectorAll('.npc').forEach(function (el) {
    if (npcs[el.textContent.trim()]) attach(el, 'npc');
  });
  // Tagged items, plus bold words in the steps and callouts that name an item.
  document.querySelectorAll('main .item, main li strong, main .callout strong').forEach(function (el) {
    if (items[el.textContent.trim()] && !el.dataset.tip) attach(el, 'item');
  });

  document.addEventListener('click', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
})();

// Copy buttons on code blocks (install instructions).
(function () {
  document.querySelectorAll('.chapter pre').forEach(function (pre) {
    const code = pre.querySelector('code') || pre;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      const text = code.textContent;
      const done = function () { btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = 'Press ⌘C'; });
      } else {
        const range = document.createRange();
        range.selectNodeContents(code);
        const sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
        try { document.execCommand('copy'); done(); } catch (e) { btn.textContent = 'Press ⌘C'; }
      }
    });
    pre.appendChild(btn);
  });
})();
