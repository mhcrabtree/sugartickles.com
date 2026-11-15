/* SugarTickles walkthroughs: on small screens, tuck the sticky top bar away while
   scrolling down and bring it back on any scroll up. Desktop is unaffected. */
(function () {
  const bar = document.querySelector('.topbar');
  if (!bar) return;
  const small = window.matchMedia('(max-width: 600px), (max-height: 500px)');
  let last = window.scrollY;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (!small.matches || y < 60) bar.classList.remove('tuck');
    else if (y > last + 4) bar.classList.add('tuck');
    else if (y < last - 4) bar.classList.remove('tuck');
    last = y;
  }, { passive: true });
  bar.addEventListener('focusin', function () { bar.classList.remove('tuck'); });
})();
