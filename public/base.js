// Pasta onde o site está publicado: "" no servidor local (raiz) e "/mundoconcreto" em farol.pro/mundoconcreto.
// Ajusta sozinho os endereços que começam com "/" (fetch, src, href e fundos dos cards).
(function () {
  const BASE = new URL('.', document.currentScript.src).pathname.replace(/\/$/, '');
  const U = p => (typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') && !(BASE && (p === BASE || p.startsWith(BASE + '/')))) ? BASE + p : p;
  window.BASE = BASE; window.U = U;
  if (!BASE) return;
  const f = window.fetch.bind(window);
  window.fetch = (u, o) => f(typeof u === 'string' ? U(u) : u, o);
  const abrir = window.open.bind(window);
  window.open = (u, ...r) => abrir(U(u), ...r);
  const ajusta = el => {
    for (const a of ['src', 'href', 'action']) { const v = el.getAttribute?.(a); if (v && U(v) !== v) el.setAttribute(a, U(v)); }
    const st = el.getAttribute?.('style');
    if (st && st.includes("url('/")) { const novo = st.replace(/url\('(\/[^']*)'\)/g, (m, p) => `url('${U(p)}')`); if (novo !== st) el.setAttribute('style', novo); }
  };
  const varre = n => { if (n.nodeType !== 1) return; ajusta(n); n.querySelectorAll?.('[src],[href],[action],[style]').forEach(ajusta); };
  new MutationObserver(ms => ms.forEach(m => m.type === 'attributes' ? ajusta(m.target) : m.addedNodes.forEach(varre)))
    .observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'href', 'action', 'style'] });
})();
