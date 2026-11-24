// Recriação do HeroParallax (Aceternity UI) em JavaScript puro.
// useScroll({ offset: ["start start", "end start"] }) + useTransform + useSpring({ stiffness: 300, damping: 30 })
(async function () {
  const U = window.U || (x => x);
  const sec = document.getElementById('parallax');
  const palco = document.getElementById('palco');

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const [site, cards] = await Promise.all([fetch('/api/site').then(r => r.json()), fetch('/api/cards').then(r => r.json())]);
  document.querySelector('.hp-titulo').innerHTML = esc(site.title).replace(/&lt;br\s*\/?&gt;/gi, '<br>')
    + (site.logo ? `<img class="hp-logo" src="${esc(U(site.logo))}" alt="${esc(site.logoAlt || '')}">` : '');
  document.querySelector('.hp-sub').textContent = site.subtitle;
  document.title = site.title.replace(/<br\s*\/?>/gi, ' ');

  const ativos = cards.filter(c => c.active !== false);
  if (!ativos.length) { palco.innerHTML = '<p class="hp-vazio">Nenhum card cadastrado. Cadastre em <a href="/admin">/admin</a>.</p>'; return; }

  // Filas de 3 cards na ordem do admin (1, 2, 3 na primeira fila, da esquerda para a direita).
  // Cada fila ganha cópias dos cards vizinhos nas pontas (os anteriores à esquerda, os próximos à direita),
  // para que, ao deslizar, nunca apareça espaço vazio.
  // Celular: 2 cards por fila (maiores); computador: 3.
  const celular = matchMedia('(max-width: 767px)');
  const SOBRA = 3, n = ativos.length;
  let POR_FILA = celular.matches ? 2 : 3;
  const fazerCard = (c, copia) => {
    const el = document.createElement('div');
    el.className = 'hp-card' + (copia ? ' hp-copia' : '');
    el.dataset.id = c.id;
    el.innerHTML = `<div class="hp-card-in"><a href="#card-${esc(c.id)}" aria-haspopup="dialog" aria-label="${esc(c.title)}: abrir página"${copia ? ' tabindex="-1"' : ''}>
      ${window.CardRender?.usa(c) ? CardRender.html(c) : `<img src="${esc(U(c.thumbnail))}" width="600" height="480" alt="${copia ? '' : esc(c.title)}">`}</a>
      <div class="hp-veu"></div><h2 aria-hidden="true">${esc(c.title)}</h2></div>`;
    if (copia) el.setAttribute('aria-hidden', 'true');
    return el;
  };
  let linhas = [];
  function montarFilas() {
  palco.innerHTML = ''; linhas = [];
  for (let ini = 0; ini < n; ini += POR_FILA) {
    const fila = document.createElement('div');
    fila.className = 'hp-linha' + (linhas.length % 2 ? ' hp-reversa' : '');
    fila.style.setProperty('--sobra', SOBRA);
    const fim = Math.min(n, ini + POR_FILA);
    for (let k = SOBRA; k > 0; k--) fila.appendChild(fazerCard(ativos[((ini - k) % n + n) % n], true));
    for (let i = ini; i < fim; i++) fila.appendChild(fazerCard(ativos[i], false));
    for (let k = 0; k < SOBRA + (POR_FILA - (fim - ini)); k++) fila.appendChild(fazerCard(ativos[(fim + k) % n], true));
    palco.appendChild(fila); linhas.push(fila);
  }
  }
  montarFilas();
  window.HP_CARDS = ativos;
  document.dispatchEvent(new CustomEvent('hp:cards'));

  // ---- matemática igual ao framer-motion ----
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const map = (p, [i0, i1], [o0, o1]) => o0 + (o1 - o0) * clamp((p - i0) / (i1 - i0), 0, 1);
  const alvos = p => ({
    rx: map(p, [0, .2], [15, 0]), op: map(p, [0, .2], [.2, 1]),
    rz: map(p, [0, .2], [20, 0]), ty: map(p, [0, .2], [-700, tyFim()]),
    ...deslizes(),
  });
  // Posição final dos cards: o topo deles para em 65% da altura da tela quando terminam de endireitar,
  // já aparecendo por baixo da constelação (no original era fixo em 500 px).
  function tyFim() {
    const r = sec.getBoundingClientRect(), topoSec = r.top + scrollY;
    const v = innerHeight * 0.65 + (topoSec + innerHeight * 3 * 0.2) - (topoSec + palco.offsetTop);
    palco.dataset.tyFim = v.toFixed(1);
    return v;
  }
  // Deslize de cada fila: começa deslocada meio card (1ª fila: só a metade direita do 1º card aparece na esquerda)
  // e desliza até mostrar os seus 3 cards inteiros, conforme a fila sobe de 65% para 15% da altura da tela.
  // Filas 1, 3, 5 deslizam para a direita; 2 e 4 para a esquerda.
  function deslizes() {
    const card = linhas[0].querySelector('.hp-card:not(.hp-copia)');
    const gap = parseFloat(getComputedStyle(linhas[0]).columnGap) || 0;
    const meia = card.offsetWidth / 2 + gap;
    const topoSec = sec.getBoundingClientRect().top + scrollY;
    const ty = Number(palco.dataset.tyFim || 0), vh = innerHeight;
    const out = {}, maxRol = document.documentElement.scrollHeight - vh;
    linhas.forEach((l, i) => {
      const base = topoSec + palco.offsetTop + ty + l.offsetTop;         // topo da fila já endireitada, na página
      const topo = base - scrollY;                                          // ... e na tela
      const fimT = Math.min(vh * 0.6, Math.max(vh * 0.15, base - maxRol));  // a última fila fecha no fim da página
      const t = clamp((vh * 0.65 - topo) / Math.max(1, vh * 0.65 - fimT), 0, 1);
      out['f' + i] = (i % 2 ? meia : -meia) * (1 - t);
    });
    return out;
  }
  const K = 300, C = 30, M = 1; // stiffness, damping, massa
  // progresso medido sobre 3 telas (como no original), mesmo que a seção fique mais alta para caber todas as filas
  const progresso = () => { const r = sec.getBoundingClientRect(); return clamp(-r.top / (innerHeight * 3), 0, 1); };
  function ajustarAltura() {
    if (window.A11Y?.reduzMovimento()) { sec.style.height = ''; return; }
    // a seção termina logo depois da última fila (sem espaço em branco no fim da página)
    const gap = parseFloat(getComputedStyle(linhas[0]).columnGap) || 0;
    sec.style.height = Math.ceil(palco.offsetTop + tyFim() + palco.offsetHeight + gap) + 'px';
  }
  ajustarAltura();
  const atual = alvos(progresso());
  const vel = Object.fromEntries(Object.keys(atual).map(k => [k, 0]));

  function pintar(s) {
    palco.style.transform = `translateY(${s.ty}px) rotateX(${s.rx}deg) rotateZ(${s.rz}deg)`;
    palco.style.opacity = s.op;
    linhas.forEach((l, i) => l.style.transform = `translateX(${s['f' + i]}px)`);
  }

  let ultimo = performance.now(), rodando = false;
  function quadro(t) {
    let dt = Math.min(0.064, (t - ultimo) / 1000); ultimo = t;
    const alvo = alvos(progresso());
    let parado = true;
    const passos = Math.ceil(dt / 0.004); const h = dt / passos;
    for (const k in alvo) { if (!(k in atual)) atual[k] = alvo[k]; vel[k] = vel[k] || 0;
      for (let i = 0; i < passos; i++) {
        const a = (-K * (atual[k] - alvo[k]) - C * vel[k]) / M;
        vel[k] += a * h; atual[k] += vel[k] * h;
      }
      const lim = k === 'op' ? 0.001 : 0.05;
      if (Math.abs(vel[k]) > lim || Math.abs(atual[k] - alvo[k]) > lim) parado = false;
      else { atual[k] = alvo[k]; vel[k] = 0; }
    }
    pintar(atual);
    if (parado) rodando = false; else requestAnimationFrame(quadro);
  }
  function acordar() {
    if (window.A11Y?.reduzMovimento()) return;
    if (!rodando) { rodando = true; ultimo = performance.now(); requestAnimationFrame(quadro); }
  }
  function modo() {
    ajustarAltura();
    if (window.A11Y?.reduzMovimento()) { palco.style.transform = ''; palco.style.opacity = ''; linhas.forEach(l => l.style.transform = ''); }
    else { Object.assign(atual, alvos(progresso())); pintar(atual); }
  }
  window.addEventListener('scroll', acordar, { passive: true });
  window.addEventListener('resize', () => { ajustarAltura(); acordar(); });
  celular.addEventListener('change', () => { POR_FILA = celular.matches ? 2 : 3; montarFilas(); document.dispatchEvent(new CustomEvent('hp:filas')); modo(); acordar(); });
  document.addEventListener('a11y:change', modo);
  modo();
})();
