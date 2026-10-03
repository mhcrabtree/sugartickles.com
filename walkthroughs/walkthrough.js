// SugarTickles — Walkthroughs
// Progress checkboxes, screenshot/video stubs, and table-of-contents behavior.
(function () {
  const page = document.body.dataset.walkthrough || location.pathname;
  const storeKey = 'st-walkthrough:' + page;
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
        updateProgress();
      });
      li.prepend(box);
      steps.push({ chapter: chapter.id, box: box });
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
      mark.textContent = mine.every(function (s) { return s.box.checked; }) ? '✓' : '';
    });
  }

  const reset = document.querySelector('.progress button');
  if (reset) {
    reset.addEventListener('click', function () {
      if (!confirm('Clear all checked steps?')) return;
      saved = {};
      localStorage.removeItem(storeKey);
      steps.forEach(function (s) { s.box.checked = false; s.box.closest('li').classList.remove('checked'); });
      updateProgress();
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

  updateProgress();
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
