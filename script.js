// Tim Bowman — site script (v3 swiss)
(function () {
  const html = document.documentElement;
  const KEY = 'tb-v3';
  const VALID = { accent: ['lime','blue','amber','ink'], mode: ['light','dark'] };

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.keys(saved).forEach(k => {
      if (VALID[k] && VALID[k].includes(saved[k])) html.setAttribute('data-' + k, saved[k]);
    });
  } catch (e) {}
  if (!html.getAttribute('data-mode')) html.setAttribute('data-mode', 'light');

  function sync() {
    document.querySelectorAll('.twk-seg').forEach(seg => {
      const key = seg.getAttribute('data-key');
      const cur = html.getAttribute('data-' + key);
      seg.querySelectorAll('button').forEach(b => {
        b.setAttribute('aria-pressed', b.getAttribute('data-val') === cur ? 'true' : 'false');
      });
    });
  }
  document.querySelectorAll('.twk-seg').forEach(seg => {
    const key = seg.getAttribute('data-key');
    seg.addEventListener('click', e => {
      const btn = e.target.closest('button[data-val]');
      if (!btn) return;
      const val = btn.getAttribute('data-val');
      html.setAttribute('data-' + key, val);
      try {
        const s = JSON.parse(localStorage.getItem(KEY) || '{}');
        s[key] = val; localStorage.setItem(KEY, JSON.stringify(s));
      } catch (e) {}
      sync();
    });
  });

  const fab = document.getElementById('tweaksFab');
  const panel = document.getElementById('tweaks');
  const close = document.getElementById('tweaksClose');
  function open() { panel.hidden = false; fab.hidden = true; sync(); }
  function shut() { panel.hidden = true; fab.hidden = false; }
  fab.addEventListener('click', open);
  close.addEventListener('click', shut);
  shut();
  sync();
})();
