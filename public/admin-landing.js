// Editor da landing page do card (topo + botões + blocos com itens). Usado pelo admin.js.
(function () {
  const U = window.U || (x => x);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const FUNDOS = [['claro', 'Branco'], ['papel', 'Gelo (névoa clara)'], ['marinho', 'Marinho'], ['ardosia', 'Ardósia'], ['grafite', 'Grafite']];
  const TIPOS = [['cards', 'Cartões'], ['numeros', 'Números'], ['galeria', 'Galeria de fotos'], ['logos', 'Logos'], ['etiquetas', 'Etiquetas'], ['lista', 'Lista com setas'], ['citacao', 'Citação'], ['texto', 'Só texto']];
  const ESTILOS = [['amarelo', 'Amarelo (principal)'], ['ardosia', 'Ardósia'], ['contorno', 'Contorno'], ['teal', 'Verde-água'], ['spotify', 'Spotify']];
  const CORES = [['', 'Cor da seção'], ['verde', 'Verde-água'], ['amarelo', 'Amarelo'], ['azul', 'Azul'], ['laranja', 'Laranja']];
  const DICA = {
    cards: 'Cada item é um cartão com barra colorida. "Destaque": número (01, 02…) ou rótulo pequeno (data, "Ver o sistema"). Com link, o cartão inteiro vira botão.',
    numeros: 'Cada item é um número grande com régua colorida. "Destaque" = o número (ex.: 1.000+); "Título" = a legenda.',
    galeria: 'Cada item é uma foto. "Título" vira a legenda.', logos: 'Cada item é um logo. "Título" = nome da marca (texto alternativo).',
    etiquetas: 'Cada item é uma etiqueta. Só o "Título" é usado.', lista: 'Cada item é uma linha com seta: "Título" em negrito e "Texto" ao lado.',
    citacao: 'A citação usa o "Texto" do bloco; o "Título" vira o autor. Itens não são usados.', texto: 'Só o cabeçalho do bloco (etiqueta, título, texto, imagem e botões).',
  };
  const NOMES_TIPO = Object.fromEntries(TIPOS);
  const novoItem = () => ({ titulo: '', texto: '', destaque: '', img: '', cor: '', link: '' });
  const novoBotao = () => ({ texto: '', link: '#', estilo: 'amarelo' });
  const novoBloco = tipo => ({ tipo: tipo || 'cards', fundo: '', tag: '', titulo: '', texto: '', imagem: '', botoes: [], itens: tipo === 'citacao' || tipo === 'texto' ? [] : [novoItem()] });
  const PADRAO = () => ({ ativa: true, fundo: 'claro', tag: '', titulo: '', texto: '', imagem: '', botoes: [], blocos: [] });

  let estado = PADRAO(), raiz = null, abertos = new Set(), avisar = () => {}, aoMudar = () => {};
  const CORFUNDO = { claro: '#ffffff', papel: '#F4F6F9', marinho: '#041436', ardosia: '#445057', grafite: '#2E373C', '': 'linear-gradient(90deg,#fff 50%,#F4F6F9 50%)' };

  const pegar = (obj, caminho) => caminho.split('.').reduce((o, k) => o?.[k], obj);
  const pai = caminho => { const p = caminho.split('.'); const k = p.pop(); return [p.length ? pegar(estado, p.join('.')) : estado, k]; };
  const op = (v, lista) => lista.map(([k, t]) => `<option value="${k}"${k === (v ?? '') ? ' selected' : ''}>${esc(t)}</option>`).join('');
  const campo = (rot, caminho, v, extra = '') => `<label>${rot}<input data-c="${caminho}" value="${esc(v)}" ${extra}></label>`;
  const area = (rot, caminho, v, linhas = 3) => `<label>${rot}<textarea data-c="${caminho}" rows="${linhas}">${esc(v)}</textarea></label>`;
  const sel = (rot, caminho, v, lista) => `<label>${rot}<select data-c="${caminho}">${op(v, lista)}</select></label>`;
  const imagem = (rot, caminho, v) => `<label class="lpe-img">${rot}<span class="lpe-linha"><input data-c="${caminho}" value="${esc(v)}" placeholder="/mc/… ou https://…">
      <button type="button" class="btn btn-sec lpe-mini" data-enviar="${caminho}">Enviar</button></span>${v ? `<img src="${esc(U(v))}" alt="" class="lpe-previa">` : ''}</label>`;
  const ctrl = (caminho, rot) => `<span class="lpe-ctrl">
      <button type="button" data-a="subir" data-p="${caminho}" aria-label="Subir ${rot}">↑</button>
      <button type="button" data-a="descer" data-p="${caminho}" aria-label="Descer ${rot}">↓</button>
      <button type="button" data-a="duplicar" data-p="${caminho}" aria-label="Duplicar ${rot}">⧉</button>
      <button type="button" data-a="remover" data-p="${caminho}" aria-label="Remover ${rot}" class="lpe-rem">✕</button></span>`;

  function htmlBotoes(base, lista) {
    return `<div class="lpe-sub"><p class="lpe-titulo-sub">Botões</p>${lista.map((b, i) => `<div class="lpe-botao">
        ${campo('Texto', `${base}.${i}.texto`, b.texto)}${campo('Link <small>(#lp-slug abre outra landing)</small>', `${base}.${i}.link`, b.link)}
        ${sel('Estilo', `${base}.${i}.estilo`, b.estilo, ESTILOS)}${ctrl(`${base}.${i}`, 'botão ' + (i + 1))}</div>`).join('')}
      <button type="button" class="btn btn-sec lpe-mini" data-a="add-botao" data-p="${base}">+ Botão</button></div>`;
  }
  function htmlItens(base, tipo, lista) {
    if (tipo === 'citacao' || tipo === 'texto') return '';
    return `<div class="lpe-sub"><p class="lpe-titulo-sub">Itens <small>${esc(DICA[tipo] || '')}</small></p>${lista.map((it, i) => `<div class="lpe-item">
        <span class="lpe-n">${i + 1}</span>
        <div class="lpe-item-campos">
          ${campo('Destaque', `${base}.${i}.destaque`, it.destaque)}${campo('Título', `${base}.${i}.titulo`, it.titulo)}
          ${sel('Cor', `${base}.${i}.cor`, it.cor, CORES)}${campo('Link', `${base}.${i}.link`, it.link, 'placeholder="vazio = sem link"')}
          ${area('Texto', `${base}.${i}.texto`, it.texto, 2)}${imagem('Imagem', `${base}.${i}.img`, it.img)}
        </div>${ctrl(`${base}.${i}`, 'item ' + (i + 1))}</div>`).join('')}
      <button type="button" class="btn btn-sec lpe-mini" data-a="add-item" data-p="${base}">+ Item</button></div>`;
  }
  function render() {
    const l = estado;
    raiz.innerHTML = `
      <div class="lpe-topo" id="lpe-topo"><p class="lpe-titulo-sub lpe-sec-tit">Topo da página <small>(a primeira tela que aparece ao abrir o card)</small></p>
        <label class="check"><input type="checkbox" data-c="ativa"${l.ativa !== false ? ' checked' : ''}> Landing ligada <small>(desligada: o card não abre página)</small></label>
        <div class="lpe-grade">
          ${sel('Fundo do topo', 'fundo', l.fundo, FUNDOS)}${campo('Etiqueta (acima do título)', 'tag', l.tag)}
          ${campo('Título <small>(*palavras* ficam coloridas)</small>', 'titulo', l.titulo)}${imagem('Imagem do topo', 'imagem', l.imagem)}
        </div>
        ${area('Texto <small>(linha em branco separa parágrafos)</small>', 'texto', l.texto, 4)}
        ${htmlBotoes('botoes', l.botoes)}
      </div>
      <p class="lpe-titulo-sub lpe-blocos-tit">Blocos da página <small>(aparecem abaixo do topo, nesta ordem)</small></p>
      ${l.blocos.map((b, i) => `<details class="lpe-bloco" id="lpe-bloco-${i}" data-i="${i}"${abertos.has(i) ? ' open' : ''}>
        <summary><span class="lpe-n">${i + 1}</span><span class="lpe-cor" style="background:${CORFUNDO[b.fundo || '']}" title="Fundo do bloco"></span><b>${esc(NOMES_TIPO[b.tipo] || b.tipo)}</b><span class="lpe-resumo">${esc(b.titulo || b.tag || '(sem título)')}</span>${ctrl('blocos.' + i, 'bloco ' + (i + 1))}</summary>
        <div class="lpe-corpo">
          <div class="lpe-grade">
            ${sel('Tipo', `blocos.${i}.tipo`, b.tipo, TIPOS)}${sel('Fundo', `blocos.${i}.fundo`, b.fundo, [['', 'Automático (alterna)'], ...FUNDOS])}
            ${campo('Etiqueta', `blocos.${i}.tag`, b.tag)}${campo(b.tipo === 'citacao' ? 'Autor' : 'Título <small>(*palavras* coloridas)</small>', `blocos.${i}.titulo`, b.titulo)}
          </div>
          ${area(b.tipo === 'citacao' ? 'Citação' : 'Texto', `blocos.${i}.texto`, b.texto, 3)}
          ${b.tipo === 'citacao' ? '' : imagem('Imagem ao lado do título', `blocos.${i}.imagem`, b.imagem)}
          ${b.tipo === 'citacao' ? '' : htmlBotoes(`blocos.${i}.botoes`, b.botoes)}
          ${htmlItens(`blocos.${i}.itens`, b.tipo, b.itens)}
        </div></details>`).join('')}
      <div class="lpe-add"><select id="lpe-novo-tipo" aria-label="Tipo do novo bloco">${op('cards', TIPOS)}</select>
        <button type="button" class="btn btn-sec" data-a="add-bloco">+ Adicionar bloco</button></div>`;
  }

  function mover(caminho, d) {
    const [lista, k] = pai(caminho), i = +k, j = i + d;
    if (!Array.isArray(lista) || j < 0 || j >= lista.length) return;
    [lista[i], lista[j]] = [lista[j], lista[i]];
    if (caminho.startsWith('blocos.') && caminho.split('.').length === 2) { const ai = abertos.has(i), aj = abertos.has(j); abertos.delete(i); abertos.delete(j); if (ai) abertos.add(j); if (aj) abertos.add(i); }
  }

  function ligar() {
    raiz.addEventListener('input', e => {
      const c = e.target.dataset.c; if (!c) return;
      const [o, k] = pai(c);
      o[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      aoMudar({ bloco: (c.match(/^blocos\.(\d+)/) || [])[1] != null ? +c.match(/^blocos\.(\d+)/)[1] : 'topo' });
      if (/\.tipo$/.test(c) || /(img|imagem)$/.test(c)) { guardarAbertos(); render(); }
      else if (/^blocos\.\d+\.(titulo|tag)$/.test(c)) { const s = e.target.closest('details')?.querySelector('.lpe-resumo'); if (s) s.textContent = pegar(estado, c.replace(/(titulo|tag)$/, 'titulo')) || pegar(estado, c.replace(/(titulo|tag)$/, 'tag')) || '(sem título)'; }
    });
    raiz.addEventListener('toggle', e => { if (e.target.matches('details.lpe-bloco')) { const i = +e.target.dataset.i; e.target.open ? abertos.add(i) : abertos.delete(i); } }, true);
    raiz.addEventListener('click', async e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.enviar) return enviar(b.dataset.enviar);
      const a = b.dataset.a; if (!a) return;
      e.preventDefault(); e.stopPropagation();
      const p = b.dataset.p;
      guardarAbertos();
      if (a === 'subir') mover(p, -1);
      else if (a === 'descer') mover(p, 1);
      else if (a === 'duplicar') { const [lista, k] = pai(p); lista.splice(+k + 1, 0, structuredClone(lista[+k])); }
      else if (a === 'remover') {
        if (b.dataset.confirmar !== '1') { b.dataset.confirmar = '1'; b.textContent = 'Remover?'; setTimeout(() => { if (b.isConnected) { b.dataset.confirmar = ''; b.textContent = '✕'; } }, 3000); return; }
        const [lista, k] = pai(p); lista.splice(+k, 1);
        if (p.split('.').length === 2 && p.startsWith('blocos.')) abertos = new Set([...abertos].filter(x => x !== +k).map(x => x > +k ? x - 1 : x));
      }
      else if (a === 'add-botao') pegar(estado, p).push(novoBotao());
      else if (a === 'add-item') pegar(estado, p).push(novoItem());
      else if (a === 'add-bloco') { estado.blocos.push(novoBloco(raiz.querySelector('#lpe-novo-tipo').value)); abertos.add(estado.blocos.length - 1); }
      render();
      aoMudar({ estrutura: true, bloco: a === 'add-bloco' ? estado.blocos.length - 1 : undefined });
      if (a === 'add-bloco') focar(estado.blocos.length - 1);
    });
  }
  function guardarAbertos() { raiz.querySelectorAll('details.lpe-bloco').forEach(d => d.open ? abertos.add(+d.dataset.i) : abertos.delete(+d.dataset.i)); }

  function enviar(caminho) {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml';
    inp.onchange = async () => {
      const f = inp.files[0]; if (!f) return;
      try {
        avisar('Enviando imagem…');
        const r = await fetch('/api/upload', { method: 'POST', body: f, headers: { 'Content-Type': f.type } });
        const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Erro no envio');
        const [o, k] = pai(caminho); o[k] = d.url; guardarAbertos(); render(); aoMudar({}); avisar('Imagem enviada. Clique em salvar.');
      } catch (err) { avisar(err.message); }
    };
    inp.click();
  }

  function focar(alvo) {
    if (alvo === 'topo') { raiz.querySelector('#lpe-topo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    abertos = new Set([alvo]); render();
    const d = raiz.querySelector('#lpe-bloco-' + alvo); d?.scrollIntoView({ behavior: 'smooth', block: 'start' }); d?.querySelector('summary')?.focus({ preventScroll: true });
  }
  window.LPEditor = {
    montar(el, fnAviso, fnMudar) { raiz = el; avisar = fnAviso || avisar; aoMudar = fnMudar || aoMudar; ligar(); render(); },
    focar,
    blocos() { return estado.blocos.map((b, i) => ({ i, tipo: NOMES_TIPO[b.tipo] || b.tipo, titulo: b.titulo || b.tag || '(sem título)' })); },
    carregar(l) { estado = Object.assign(PADRAO(), structuredClone(l || {})); estado.botoes ||= []; estado.blocos ||= []; abertos = new Set(); render(); },
    ler() { return structuredClone(estado); },
  };
})();
