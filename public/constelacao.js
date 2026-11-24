// ConstelaçãoMundoConcreto em JS puro (mesmas posições, tamanhos e ajustes do componente React do site Mundo Concreto).
(function () {
  const U = window.U || (x => x);
  const lugar = document.getElementById('constelacao');
  if (!lugar) return;
  lugar.removeAttribute('role'); lugar.setAttribute('aria-hidden', 'true');
  const palco = document.createElement('div');
  palco.className = 'hp-const-palco';
  palco.setAttribute('role', 'group');
  palco.setAttribute('aria-label', 'Mapa das áreas da Mundo Concreto: obra, projeto e gestão.');
  lugar.appendChild(palco);
  const ICONES = [
    ['01-tijolo', 'Bloco e tijolo', ['obra'], 26.5, 18.5, 13], ['02-engenheiro', 'Engenharia', ['projeto', 'gestao'], 41.5, 14, 13],
    ['03-predios', 'Construção civil', ['obra', 'projeto'], 58.5, 21, 19], ['04-documento', 'Documentação', ['projeto', 'gestao'], 76, 18, 11],
    ['05-projeto-assinatura', 'Projeto aprovado', ['projeto'], 16.5, 33.5, 15], ['06-guindaste-obra', 'Obra em andamento', ['obra'], 34, 35, 18],
    ['07-cabeca-engrenagens', 'Estratégia', ['gestao'], 84.5, 40.5, 16], ['08-lampada-ideia', 'Inovação', ['gestao', 'projeto'], 59.5, 47.5, 23],
    ['09-whatsapp', 'Atendimento', ['gestao'], 15, 55, 13.5], ['10-caminhao-betoneira', 'Concreto usinado', ['obra'], 34.5, 56.5, 21.5],
    ['11-planta-computador', 'Projeto digital', ['projeto'], 79.5, 67, 21], ['12-aperto-de-maos', 'Parcerias', ['gestao'], 25.5, 79.5, 17.5],
    ['13-fabrica', 'Fábrica de artefatos', ['obra', 'gestao'], 50, 75, 20], ['14-desempenadeira', 'Acabamento', ['obra'], 67, 89.5, 12],
    ['15-planta-baixa', 'Planta baixa', ['projeto'], 50.5, 93, 8.5],
  ].map(([f, title, tags, x, y, size]) => ({ src: `/constelacao/${f}.png`, title, tags, x, y, size }));
  const PONTOS = [[64.2, 8.4, 2.5], [15.8, 22.3, 2.5], [45.7, 31.1, 2.5], [69.2, 32.1, 2.5], [86.2, 27.5, 2.5], [7.8, 40.9, 2.5], [45.3, 47.5, 1.8],
    [90.7, 52.7, 2.5], [63.8, 57.7, 2.5], [13.6, 72.7, 2.5], [34.2, 72.1, 2.5], [76.1, 81.2, 3.8], [36.6, 93.8, 1.8]];
  const NOMES = { obra: 'Obra', projeto: 'Projeto', gestao: 'Gestão' };
  const CFG = { autoplayInterval: 8300, idle: 2400, drift: 8, driftSpeed: 0.35 };

  function mulberry32(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const rnd = mulberry32(8);
  const fases = [...ICONES, ...PONTOS].map(() => ({ px: rnd() * Math.PI * 2, py: rnd() * Math.PI * 2, fx: 0.18 + rnd() * 0.12, fy: 0.14 + rnd() * 0.12 }));

  const pontos = PONTOS.map(([x, y, s]) => { const d = document.createElement('span'); d.className = 'mc-ponto'; d.setAttribute('aria-hidden', 'true');
    Object.assign(d.style, { left: x + '%', top: y + '%', width: s + '%' }); palco.appendChild(d); return d; });
  const botoes = ICONES.map((it, i) => {
    const w = document.createElement('div'); w.className = 'mc-item';
    Object.assign(w.style, { left: it.x + '%', top: it.y + '%', width: it.size + '%', aspectRatio: '1' });
    w.innerHTML = `<button type="button" aria-pressed="false" aria-label="${it.title} — ${it.tags.map(t => NOMES[t]).join(', ')}"><img src="${U(it.src)}" alt="${it.title}" decoding="async" draggable="false"></button>`;
    palco.appendChild(w);
    return w.firstElementChild;
  });

  // Clique mostra o nome do ícone (clickMode "name"); Esc fecha.
  let nomeado = null;
  function nomear(i) {
    palco.querySelectorAll('.mc-nome').forEach(n => n.remove());
    botoes.forEach(b => b.setAttribute('aria-pressed', 'false'));
    nomeado = nomeado === i ? null : i;
    if (nomeado === null) return;
    const n = document.createElement('span'); n.className = 'mc-nome'; n.setAttribute('aria-live', 'polite'); n.textContent = ICONES[i].title;
    botoes[i].appendChild(n); botoes[i].setAttribute('aria-pressed', 'true');
    botoes[i].parentElement.style.zIndex = 30;
  }
  // o ícone da engenharia é a porta do admin (pede usuário e senha)
  const iEng = ICONES.findIndex(x => /engenheiro/.test(x.src));
  if (iEng >= 0) botoes[iEng].setAttribute('aria-label', 'Engenharia — entrar na área administrativa (abre em nova aba)');
  // os demais ícones são só decoração: fora do teclado e do leitor de tela
  botoes.forEach((b, i) => { if (i !== iEng) { b.tabIndex = -1; b.removeAttribute('aria-pressed'); b.parentElement.setAttribute('aria-hidden', 'true'); b.style.cursor = 'default'; } });
  botoes.forEach((b, i) => b.addEventListener('click', () => { ultimoToque = performance.now(); if (i === iEng) window.open('/admin', '_blank', 'noopener'); }));  // os outros ícones não mostram nome ao clicar
  

  // Destaque automático: acende uma constelação de cada vez (obra → projeto → gestão).
  let ultimoToque = -Infinity, sobre = null, cursor = -1;
  const tags = [...new Set(ICONES.flatMap(i => i.tags))];
  palco.addEventListener('pointermove', () => { ultimoToque = performance.now(); });
  botoes.forEach((b, i) => {
    b.addEventListener('pointerenter', () => { sobre = i; acender(); }); b.addEventListener('pointerleave', () => { sobre = null; acender(); });
    b.addEventListener('focus', () => { sobre = i; acender(); }); b.addEventListener('blur', () => { sobre = null; acender(); });
  });
  let autoTag = null;
  function acender() {
    const ativas = sobre !== null ? ICONES[sobre].tags : (autoTag && !A11Y.reduzMovimento() ? [autoTag] : null);
    botoes.forEach((b, i) => { if (ativas) b.dataset.membro = String(ICONES[i].tags.some(t => ativas.includes(t))); else delete b.dataset.membro; });
  }
  function tique() {
    const parado = performance.now() - ultimoToque > CFG.idle;
    if (!parado || sobre !== null || A11Y.reduzMovimento()) autoTag = null;
    else { cursor = (cursor + 1) % tags.length; autoTag = tags[cursor]; }
    acender();
  }
  tique(); setInterval(tique, CFG.autoplayInterval);

  // Flutuação suave dos ícones e dos pontos.
  let relogio = 0, antes = 0, raf = 0;
  function quadro(t) {
    raf = 0;
    if (!antes) antes = t;
    relogio += ((t - antes) / 1000) * CFG.driftSpeed; antes = t;
    const parado = A11Y.reduzMovimento();
    const mover = (el, f, amp) => { const dx = parado ? 0 : Math.sin(relogio * f.fx * Math.PI * 2 + f.px) * amp, dy = parado ? 0 : Math.cos(relogio * f.fy * Math.PI * 2 + f.py) * amp; el.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px`; };
    botoes.forEach((b, i) => mover(b, fases[i], CFG.drift));
    pontos.forEach((d, j) => mover(d, fases[ICONES.length + j], CFG.drift * 0.8));
    if (!parado && !document.hidden) raf = requestAnimationFrame(quadro);
  }
  const ligar = () => { if (!raf) { antes = 0; raf = requestAnimationFrame(quadro); } };
  document.addEventListener('visibilitychange', ligar);
  document.addEventListener('a11y:change', () => { ligar(); acender(); });
  ligar();

  // ---------- Movimento com a rolagem (computador) ----------
  // 1) desce da direita até o centro da tela; 2) no centro, os ícones se espalham e esmaecem até sumir quando os cards chegam na metade da tela.
  const sec = document.getElementById('parallax');
  const largo = window.matchMedia('(min-width: 768px)');
  const els = [...botoes.map((b, i) => ({ el: b.parentElement, x: ICONES[i].x, y: ICONES[i].y })), ...pontos.map((d, j) => ({ el: d, x: PONTOS[j][0], y: PONTOS[j][1] }))];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const suave = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  let fixo = false;
  const cabecalho = document.querySelector('.hp-header');

  function estatico() {
    fixo = false; palco.classList.remove('fixo'); lugar.appendChild(palco);
    cabecalho.style.opacity = '';
    palco.removeAttribute('style'); els.forEach(e => { e.el.style.opacity = ''; e.el.style.transform = ''; });
  }
  function posicionar() {
    if (A11Y.reduzMovimento() || !largo.matches) { if (fixo || palco.parentElement !== lugar) estatico(); return; }
    if (!fixo) { fixo = true; palco.classList.add('fixo'); document.body.appendChild(palco); }
    const vw = innerWidth, vh = innerHeight, sy = scrollY;
    const r = lugar.getBoundingClientRect();           // onde ela fica sem rolagem
    const w = r.width, h = r.height;
    const secTopo = sec.getBoundingClientRect().top + sy;
    const fimEtapa1 = secTopo + vh * 3 * 0.2;            // quando os cards terminam de endireitar
    const t = suave(clamp(sy / Math.max(1, fimEtapa1), 0, 1));
    // a frase esmaece e some antes de a constelação tomar o centro (até 55% do caminho)
    cabecalho.style.opacity = (1 - suave(clamp(sy / (fimEtapa1 * 0.55), 0, 1))).toFixed(3);
    const x = r.left + ((vw - w) / 2 - r.left) * t;
    // linha de cima dos cards (já endireitados, translateY final 500 px)
    const palcoCards = document.getElementById('palco');
    const linhaCards = secTopo + palcoCards.offsetTop + Number(palcoCards.dataset.tyFim || 500) - sy;
    const yAlvo = 16;                                     // sobe para o topo da tela antes da explosão
    const topo0 = r.top + sy;                            // posição na tela antes de rolar
    const y = topo0 + (yAlvo - topo0) * t;
    // Etapa 2: já no centro, ao continuar rolando os ícones se espalham e esmaecem até ficarem translúcidos.
    // termina quando o topo dos cards chega a 20% da altura da tela
    const cardsNoMeio = linhaCards + sy - vh * 0.2;
    const f = suave(clamp((sy - fimEtapa1) / Math.max(1, cardsNoMeio - fimEtapa1), 0, 1));
    palco.style.left = x + 'px'; palco.style.top = y + 'px';
    palco.style.width = w + 'px'; palco.style.height = h + 'px';
    palco.style.transform = '';
    palco.style.setProperty('--fundo', (1 - f).toFixed(3));
    palco.style.pointerEvents = f > 0.3 ? 'none' : '';
    const fimSecao = sec.getBoundingClientRect().bottom;
    palco.style.visibility = (fimSecao < 0 || f >= 1) ? 'hidden' : '';
    const espalha = 1 + f * 1.6;                          // até 2,6× mais longe do centro
    els.forEach(e => {
      const dx = ((e.x - 50) / 100) * w * (espalha - 1);
      const dy = ((e.y - 100) / 100) * h * (espalha - 1);   // espalha para os lados e para cima: a base fica na linha dos cards
      e.el.style.transform = `translate(-50%, -50%) translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      e.el.style.opacity = (1 - f).toFixed(3);           // some por completo
    });
  }
  let pedido = 0;
  const agendar = () => { if (!pedido) pedido = requestAnimationFrame(() => { pedido = 0; posicionar(); }); };
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
  largo.addEventListener('change', agendar);
  document.addEventListener('a11y:change', agendar);
  addEventListener('load', agendar);
  new ResizeObserver(agendar).observe(document.querySelector('.hp-topo') || lugar);
  posicionar();
})();
