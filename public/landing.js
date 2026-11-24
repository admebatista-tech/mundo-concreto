// Card → landing page interna (blocos editados no /admin). Clique no card amplia a partir dele;
// fecha clicando fora, no × ou com Esc. Links "#lp-<slug>" abrem a landing de outro card; "#bloco-N" rola até o bloco N.
(function () {
  const U = window.U || (x => x);
  const lp = document.getElementById('lp'), fundo = document.getElementById('lp-fundo');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // *texto* vira destaque colorido (como o "destaque" da Agrela)
  const rico = s => esc(s).replace(/\*([^*]+)\*/g, '<em class="hl">$1</em>');
  const paragrafos = (s, cls = 'mc-sub') => String(s || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    .map(p => `<p class="${cls}">${rico(p).replace(/\n/g, '<br>')}</p>`).join('');
  const externo = l => /^https?:/i.test(l);
  const alvo = l => externo(l) ? ' target="_blank" rel="noopener"' : '';
  let origem = null, aberto = null, animando = false, observador = null;
  const reduz = () => window.A11Y?.reduzMovimento();
  const cards = () => window.HP_CARDS || [];

  function botoes(lista) {
    const bs = (lista || []).filter(b => b.texto);
    if (!bs.length) return '';
    return `<div class="mc-acoes" data-sobe>${bs.map(b => `<a class="mc-btn mc-btn-${esc(b.estilo || 'amarelo')}" href="${esc(b.link || '#')}"${alvo(b.link)}>${esc(b.texto)}</a>`).join('')}</div>`;
  }
  function cabecalho(x, nivel) {
    const h = nivel === 1 ? `<h2 class="mc-h1" id="lp-titulo">${rico(x.titulo)}</h2>` : (x.titulo ? `<h3 class="mc-h2">${rico(x.titulo)}</h3>` : '');
    return `${x.tag ? `<p class="mc-eyebrow" data-sobe>${esc(x.tag)}</p>` : ''}<div data-sobe>${h}</div>${x.texto ? `<div data-sobe>${paragrafos(x.texto)}</div>` : ''}`;
  }
  const ehLogo = u => /logo|simbolo|podcast|\.png$/i.test(u || '') && !/\.jpe?g$/i.test(u || '');
  const foto = (u, alt = '') => u ? `<figure class="mc-foto${ehLogo(u) ? ' contem' : ''}" data-sobe><span class="paralelogramo" aria-hidden="true"></span><img src="${esc(U(u))}" alt="${esc(alt)}" loading="lazy"></figure>` : '';
  const cor = c => c ? ` mc-cor-${esc(c)}` : '';

  function itens(b) {
    const its = (b.itens || []).filter(i => i.titulo || i.texto || i.img || i.destaque);
    if (!its.length) return '';
    switch (b.tipo) {
      case 'numeros':
        return `<dl class="mc-numeros">${its.map(i => `<div class="mc-numero${cor(i.cor)}" data-sobe><span class="mc-regua" aria-hidden="true"></span>
          <dt class="mc-valor">${esc(i.destaque || '')}</dt><dd style="margin:0"><p class="mc-h3">${esc(i.titulo)}</p>${i.texto ? `<p>${esc(i.texto)}</p>` : ''}</dd></div>`).join('')}</dl>`;
      case 'galeria':
        return `<div class="mc-galeria">${its.filter(i => i.img).map(i => `<figure data-sobe><img src="${esc(U(i.img))}" alt="${esc(i.titulo)}" loading="lazy">${i.titulo ? `<figcaption>${esc(i.titulo)}</figcaption>` : ''}</figure>`).join('')}</div>`;
      case 'logos':
        return `<ul class="mc-logos" style="padding:0">${its.map(i => `<li data-sobe>${i.img ? `<img src="${esc(U(i.img))}" alt="${esc(i.titulo)}" loading="lazy">` : esc(i.titulo)}</li>`).join('')}</ul>`;
      case 'etiquetas':
        return `<ul class="mc-selos" data-sobe>${its.map(i => `<li class="mc-selo">${esc(i.titulo)}</li>`).join('')}</ul>`;
      case 'lista':
        return `<ul class="mc-lista">${its.map(i => `<li data-sobe><span><b>${esc(i.titulo)}</b>${i.texto ? `<span>${esc(i.texto)}</span>` : ''}</span></li>`).join('')}</ul>`;
      default: { // cards
        const n = its.length, col = n % 4 === 0 && n >= 4 ? 'mc-g4' : n === 2 || n === 4 ? 'mc-g2' : 'mc-g3';
        return `<div class="mc-grade ${col}">${its.map(i => {
          const num = /^\d{1,2}$/.test(i.destaque || '');
          const tag = i.link ? 'a' : 'article';
          const href = i.link ? ` href="${esc(i.link)}"${alvo(i.link)}` : '';
          const imagem = i.img ? `<div class="mc-cartao-img${ehLogo(i.img) ? ' contem' : ''}"><img src="${esc(U(i.img))}" alt="" loading="lazy"></div>` : '';
          const topo = num ? `<span class="mc-num">${esc(i.destaque)}</span>` : (i.destaque && !i.link ? `<p class="mc-rotulo">${esc(i.destaque)}</p>` : '');
          const ver = i.link ? `<span class="mc-ver">${esc(i.destaque && !num ? i.destaque : 'Ver mais')}</span>` : '';
          return `<${tag} class="mc-cartao${cor(i.cor)}"${href} data-sobe>${imagem}${topo}${i.titulo ? `<h4 class="mc-h3">${esc(i.titulo)}</h4>` : ''}${i.texto ? `<p>${esc(i.texto)}</p>` : ''}${ver}</${tag}>`;
        }).join('')}</div>`;
      }
    }
  }

  function bloco(b, n, fundoPadrao) {
    const f = b.fundo || fundoPadrao;
    if (b.tipo === 'citacao') {
      return `<section class="mc-sec mc-${esc(f)}" id="lp-bloco-${n}"><div class="mc-caixa"><figure class="mc-citacao" data-sobe><span class="mc-aspas" aria-hidden="true">“</span>
        <blockquote>${esc(b.texto)}</blockquote>${b.titulo ? `<figcaption>${esc(b.titulo)}</figcaption>` : ''}</figure></div></section>`;
    }
    const cab = cabecalho(b, 2) + botoes(b.botoes);
    const topo = b.imagem ? `<div class="mc-cab-grade"><div>${cab}</div>${foto(b.imagem, b.titulo)}</div>` : cab;
    return `<section class="mc-sec mc-${esc(f)}" id="lp-bloco-${n}"><div class="mc-caixa">${topo}${itens(b)}</div></section>`;
  }

  function conteudo(c) {
    const l = c.landing || {};
    const f = l.fundo || 'claro';
    const hero = `<section class="mc-sec mc-hero mc-${esc(f)}"><div class="mc-caixa"><div class="mc-hero-grade${l.imagem ? '' : ' sem-foto'}">
      <div>${cabecalho({ tag: l.tag, titulo: l.titulo || c.title, texto: l.texto }, 1)}${botoes(l.botoes)}</div>${foto(l.imagem, c.title)}</div></div></section>`;
    const blocos = (l.blocos || []).map((b, i) => bloco(b, i + 1, i % 2 ? f : (f === 'claro' ? 'papel' : 'claro'))).join('');
    return `<div class="lp-barra"><img src="${U('/mc/marca/logo-mundo-concreto-horizontal.png')}" alt="Mundo Concreto"><span class="lp-barra-nome">${esc(c.title)}</span>
        <button type="button" class="lp-fechar" aria-label="Fechar página de ${esc(c.title)}">×</button></div>
      <div class="lp-conteudo">${hero}${blocos}</div>`;
  }

  function animarEntradas() {
    observador?.disconnect();
    const els = lp.querySelectorAll('[data-sobe]');
    if (reduz() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visivel')); return; }
    observador = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visivel'); observador.unobserve(e.target); } }), { root: lp, threshold: .12 });
    els.forEach(e => observador.observe(e));
  }

  // volta ao topo sem animação (o scroll-behavior suave atrasava e às vezes deixava a página no meio)
  function topo() { lp.style.scrollBehavior = 'auto'; lp.scrollTop = 0; requestAnimationFrame(() => { lp.scrollTop = 0; lp.style.scrollBehavior = ''; }); }
  function preencher(c) {
    aberto = c;
    lp.innerHTML = conteudo(c);
    topo();
    lp.querySelector('.lp-fechar').addEventListener('click', fechar);
    animarEntradas();
    history.replaceState(null, '', '#lp-' + (c.slug || c.id));
  }

  const doCard = rCard => { const r = lp.getBoundingClientRect(); return `translate(${rCard.left - r.left}px, ${rCard.top - r.top}px) scale(${rCard.width / r.width}, ${rCard.height / r.height})`; };

  function abrir(c, el) {
    if (animando) return;
    origem = el;
    fundo.hidden = false; lp.hidden = false;
    document.documentElement.classList.add('lp-aberta');
    preencher(c);
    if (!reduz() && el) {
      animando = true;
      fundo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: 'ease-out' });
      lp.animate([{ transform: doCard(el.getBoundingClientRect()), borderRadius: '0px', opacity: .6 }, { transform: 'none', borderRadius: '1rem', opacity: 1 }],
        { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' }).finished.finally(() => { animando = false; topo(); });
    }
    lp.focus({ preventScroll: true }); topo();
  }

  function fechar() {
    if (!aberto || animando) return;
    const terminar = () => {
      lp.hidden = true; fundo.hidden = true; lp.innerHTML = ''; lp.removeAttribute('style');
      document.documentElement.classList.remove('lp-aberta');
      history.replaceState(null, '', location.pathname);
      origem?.querySelector('a')?.focus({ preventScroll: true });
      aberto = null; animando = false; observador?.disconnect();
    };
    if (reduz() || !origem) return terminar();
    animando = true;
    fundo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'forwards' });
    lp.animate([{ transform: 'none', opacity: 1 }, { transform: doCard(origem.getBoundingClientRect()), opacity: .4 }], { duration: 360, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' })
      .finished.then(() => { fundo.getAnimations().forEach(x => x.cancel()); lp.getAnimations().forEach(x => x.cancel()); terminar(); });
  }

  const cardDoEl = el => cards().find(x => x.id === el.dataset.id);
  const elDoCard = c => document.querySelector(`.hp-card:not(.hp-copia)[data-id="${CSS.escape(c.id)}"]`);
  const porSlug = s => cards().find(x => (x.slug || x.id) === s || x.id === s);

  // clique no card da vitrine
  document.addEventListener('click', e => {
    const a = e.target.closest('.hp-card a'); if (!a) return;
    const el = a.closest('.hp-card'), c = cardDoEl(el);
    e.preventDefault();
    if (!c) return;
    if (c.landing && c.landing.ativa === false) { if (c.link && c.link !== '#') window.open(c.link, externo(c.link) ? '_blank' : '_self'); return; }
    abrir(c, el);
  });
  // links dentro da landing
  lp.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const h = a.getAttribute('href');
    let m;
    if ((m = h.match(/^#lp-(.+)$/))) {
      e.preventDefault();
      const c = porSlug(m[1]);
      if (c && c.landing?.ativa !== false) { origem = elDoCard(c) || origem; preencher(c); lp.focus({ preventScroll: true }); }
    } else if ((m = h.match(/^#bloco-(\d+)$/))) {
      e.preventDefault(); lp.querySelector('#lp-bloco-' + m[1])?.scrollIntoView({ behavior: reduz() ? 'auto' : 'smooth', block: 'start' });
    } else if (h === '#') e.preventDefault();
  });
  fundo.addEventListener('click', fechar);
  document.addEventListener('keydown', e => {
    if (!aberto) return;
    if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
    if (e.key === 'Tab') {
      const f = [...lp.querySelectorAll('button, a[href]')];
      if (!f.length) return;
      const prim = f[0], ult = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === prim || document.activeElement === lp)) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); prim.focus(); }
    }
  });
  // endereço direto (#lp-slug ou #card-id) abre a landing
  // prévia do admin (previa.html): desenha a landing sem abrir a janela
  window.LPRender = {
    mostrar(c, bloco) {
      const y = lp.scrollTop;
      lp.innerHTML = conteudo(c);
      lp.querySelectorAll('[data-sobe]').forEach(e => e.classList.add('visivel'));
      lp.style.scrollBehavior = 'auto';
      if (bloco === 'topo') lp.scrollTop = 0;
      else if (bloco != null) lp.querySelector('#lp-bloco-' + (bloco + 1))?.scrollIntoView({ block: 'start' });
      else lp.scrollTop = y;
    },
  };
  function peloEndereco() {
    const m = location.hash.match(/^#(?:lp|card)-(.+)$/); if (!m) return;
    const c = porSlug(decodeURIComponent(m[1])); if (!c || c.landing?.ativa === false || aberto?.id === c.id) return;
    if (aberto) { origem = elDoCard(c) || origem; preencher(c); } else abrir(c, elDoCard(c));
  }
  document.addEventListener('hp:cards', peloEndereco);
  addEventListener('hashchange', peloEndereco);
})();
