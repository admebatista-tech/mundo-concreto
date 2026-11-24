// Admin MUNDO CONCRETO: menu lateral → Textos do topo | Organizar cards | cada card (Card em cima, Landing embaixo).
(function () {
  const U = window.U || (x => x);
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let cards = [], vista = 'ordem', atual = null /* id do card ou 'novo' */, sujo = false, ultimoBloco = null;

  // ---------- utilidades ----------
  let tAviso;
  const avisar = msg => { const a = $('#aviso'); a.textContent = msg; a.classList.add('on'); clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove('on'), 2800); };
  async function api(url, opt = {}) {
    const json = opt.body && !(opt.body instanceof Blob);
    const r = await fetch(url, { ...opt, headers: { ...(json ? { 'Content-Type': 'application/json' } : {}), ...(opt.headers || {}) } });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { location.href = U('/entrar'); throw new Error(d.error || 'Entre de novo.'); }
    if (!r.ok) throw new Error(d.error || 'Erro ' + r.status);
    return d;
  }
  const enviarArquivo = async file => {
    if (!file || !file.type.startsWith('image/')) throw new Error('Escolha um arquivo de imagem.');
    return (await api('/api/upload', { method: 'POST', body: file, headers: { 'Content-Type': file.type } })).url;
  };
  const debounce = (f, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => f(...a), ms); }; };

  // ---------- menu lateral ----------
  function menu() {
    document.querySelectorAll('.lat-nav > .lat-item').forEach(b => b.setAttribute('aria-current', String(b.dataset.vista === vista)));
    const ul = $('#menu-cards');
    const lista = atual === 'novo' ? [...cards, { id: 'novo', title: $('#form-card').title.value || 'Novo card', thumbnail: '', active: true, landing: {} }] : cards;
    ul.innerHTML = lista.map((c, i) => {
      const sel = vista === 'card' && c.id === atual;
      const st = c.active === false ? 'off' : c.landing?.ativa === false ? 'lp-off' : '';
      const stTxt = c.active === false ? 'oculto no site' : c.landing?.ativa === false ? 'landing desligada' : 'no site';
      let sub = '';
      if (sel) {
        const bl = LPEditor.blocos();
        sub = `<ul class="lat-sub" aria-label="Partes de ${esc(c.title)}">
          <li><button type="button" class="lat-item" data-ir="card"><b>Card</b></button></li>
          <li><button type="button" class="lat-item" data-ir="topo"><b>Landing</b> · topo</button></li>
          ${bl.map(b => `<li><button type="button" class="lat-item" data-ir="${b.i}">${b.i + 1}. ${esc(b.tipo)} · ${esc(b.titulo)}</button></li>`).join('')}
          <li><button type="button" class="lat-item" data-ir="novo-bloco">+ Adicionar bloco</button></li></ul>`;
      }
      return `<li><button type="button" class="lat-item lat-card" data-card="${esc(c.id)}" aria-current="${sel}">
          <span class="n">${c.id === 'novo' ? '+' : i + 1}</span>${c.thumbnail ? `<img src="${esc(U(c.thumbnail))}" alt="">` : '<img alt="">'}
          <span class="nome">${esc(c.title)}</span><span class="st ${st}" title="${stTxt}" aria-label="${stTxt}"></span></button>${sub}</li>`;
    }).join('');
  }
  const menuAtrasado = debounce(menu, 300);

  $('.lateral').addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.vista) return trocar(() => abrirVista(b.dataset.vista));
    if (b.dataset.card) return b.dataset.card === atual && vista === 'card' ? irPara('card') : trocar(() => abrirCard(b.dataset.card));
    if (b.dataset.ir) return irPara(b.dataset.ir);
    if (b.id === 'btn-novo') return trocar(() => abrirCard('novo'));
    if (b.id === 'btn-sair') { await trocar(async () => { await api('/api/sair', { method: 'POST' }); location.href = U('/entrar'); }); }
  });
  function irPara(alvo) {
    if (alvo === 'card') return $('#ed-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (alvo === 'novo-bloco') { $('#ed-lp').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#lpe-novo-tipo')?.focus(), 400); return; }
    const bloco = alvo === 'topo' ? 'topo' : +alvo;
    LPEditor.focar(bloco); ultimoBloco = bloco; previa(bloco);
  }

  // ---------- alterações não salvas ----------
  const dlg = $('#dlg-sujo');
  function marcar(v) {
    sujo = v;
    const e = $('#estado'); e.textContent = v ? 'Alterações não salvas' : (atual && atual !== 'novo' ? 'Tudo salvo' : '');
    e.classList.toggle('sujo', v);
  }
  function trocar(fazer) {
    if (!sujo) return fazer();
    dlg.showModal();
    return new Promise(res => {
      dlg.onclick = async ev => {
        const v = ev.target.closest('button')?.value; if (!v) return;
        dlg.close();
        if (v === 'salvar') { if (await salvar()) await fazer(); }
        else if (v === 'descartar') { marcar(false); await fazer(); }
        res();
      };
    });
  }
  addEventListener('beforeunload', e => { if (sujo) { e.preventDefault(); e.returnValue = ''; } });

  // ---------- vistas ----------
  function mostrar(v) { vista = v; document.querySelectorAll('.vista').forEach(s => s.hidden = s.id !== 'vista-' + v); }
  async function abrirVista(v) {
    atual = null; mostrar(v); history.replaceState(null, '', '#' + v);
    if (v === 'ordem') { cards = await api('/api/cards'); renderLista(); }
    if (v === 'diagnosticos') await listarDiag();
    if (v === 'conta') $('#form-senha').reset();
    menu(); $('#conteudo').focus({ preventScroll: true }); scrollTo(0, 0);
  }

  // ===== Textos do topo =====
  const fSite = $('#form-site'), previaLogo = $('#previa-logo');
  const verLogo = () => { const u = fSite.logo.value.trim(); previaLogo.hidden = !u; if (u) previaLogo.src = U(u); };
  api('/api/site').then(s => { fSite.title.value = s.title; fSite.subtitle.value = s.subtitle; fSite.logo.value = s.logo || ''; fSite.logoAlt.value = s.logoAlt || ''; verLogo(); });
  fSite.logo.addEventListener('input', verLogo);
  $('#btn-logo').addEventListener('click', () => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
    i.onchange = async () => { try { fSite.logo.value = await enviarArquivo(i.files[0]); verLogo(); avisar('Imagem enviada. Clique em "Salvar textos do topo".'); } catch (err) { avisar(err.message); } }; i.click(); });
  fSite.addEventListener('submit', async e => {
    e.preventDefault();
    try { await api('/api/site', { method: 'PUT', body: JSON.stringify({ title: fSite.title.value, subtitle: fSite.subtitle.value, logo: fSite.logo.value.trim(), logoAlt: fSite.logoAlt.value.trim() }) }); avisar('Textos do topo salvos.'); }
    catch (err) { avisar(err.message); }
  });

  // ===== Organizar cards =====
  const lista = $('#lista');
  function filaDe(c) { const at = cards.filter(x => x.active !== false), p = at.indexOf(c); return p < 0 ? 'Oculto' : `Fila ${Math.floor(p / 3) + 1} · posição ${p % 3 + 1}`; }
  function renderLista() {
    $('#contagem').textContent = `${cards.filter(c => c.active !== false).length} no site · ${cards.length} no total`;
    lista.innerHTML = cards.map((c, i) => `<li class="item${c.active === false ? ' inativo' : ''}" draggable="true" data-id="${esc(c.id)}">
      <span class="alca" aria-hidden="true">⠿</span><img src="${esc(U(c.thumbnail))}" alt="">
      <div class="info"><strong>${i + 1}. ${esc(c.title)}</strong><span>#lp-${esc(c.slug || '')} · ${(c.landing?.blocos || []).length} blocos · landing ${c.landing?.ativa === false ? '<b class="desl">desligada</b>' : 'ligada'}</span><br><em>${filaDe(c)}</em></div>
      <div class="botoes">
        <button type="button" data-a="subir" aria-label="Subir ${esc(c.title)}"${i === 0 ? ' disabled' : ''}>↑</button>
        <button type="button" data-a="descer" aria-label="Descer ${esc(c.title)}"${i === cards.length - 1 ? ' disabled' : ''}>↓</button>
        <button type="button" data-a="ativo" aria-pressed="${c.active !== false}">${c.active !== false ? 'Ocultar' : 'Mostrar'}</button>
        <button type="button" data-a="editar">Editar</button>
        <button type="button" data-a="excluir" class="excluir">Excluir</button></div></li>`).join('') || '<li class="dica">Nenhum card ainda. Use "+ Novo" no menu.</li>';
  }
  async function salvarOrdem(focoId, acao) {
    cards = await api('/api/cards/order', { method: 'PUT', body: JSON.stringify({ ids: cards.map(c => c.id) }) });
    renderLista(); menu();
    if (focoId) (lista.querySelector(`[data-id="${focoId}"] [data-a="${acao}"]:not([disabled])`) || lista.querySelector(`[data-id="${focoId}"] [data-a="editar"]`))?.focus();
  }
  async function excluir(c, botao) {
    if (botao.dataset.confirmar !== '1') { const t = botao.textContent; botao.dataset.confirmar = '1'; botao.textContent = 'Confirmar exclusão'; setTimeout(() => { if (botao.isConnected) { botao.dataset.confirmar = ''; botao.textContent = t; } }, 4000); return false; }
    await api('/api/cards/' + c.id, { method: 'DELETE' }); avisar(`"${c.title}" excluído.`); return true;
  }
  lista.addEventListener('click', async e => {
    const b = e.target.closest('button[data-a]'); if (!b) return;
    const id = b.closest('.item').dataset.id, i = cards.findIndex(c => c.id === id), c = cards[i];
    try {
      if (b.dataset.a === 'subir' || b.dataset.a === 'descer') { const j = b.dataset.a === 'subir' ? i - 1 : i + 1; [cards[i], cards[j]] = [cards[j], cards[i]]; await salvarOrdem(id, b.dataset.a); }
      else if (b.dataset.a === 'ativo') { await api('/api/cards/' + id, { method: 'PUT', body: JSON.stringify({ active: c.active === false }) }); cards = await api('/api/cards'); renderLista(); menu(); lista.querySelector(`[data-id="${id}"] [data-a="ativo"]`)?.focus(); }
      else if (b.dataset.a === 'editar') abrirCard(id);
      else if (b.dataset.a === 'excluir') { if (await excluir(c, b)) { cards = await api('/api/cards'); renderLista(); menu(); } }
    } catch (err) { avisar(err.message); }
  });
  let arrastado = null;
  lista.addEventListener('dragstart', e => { arrastado = e.target.closest('.item'); arrastado?.classList.add('arrastando'); });
  lista.addEventListener('dragend', () => { arrastado?.classList.remove('arrastando'); lista.querySelectorAll('.solto').forEach(x => x.classList.remove('solto')); arrastado = null; });
  lista.addEventListener('dragover', e => { const a = e.target.closest('.item'); if (!arrastado || !a || a === arrastado) return; e.preventDefault(); lista.querySelectorAll('.solto').forEach(x => x.classList.remove('solto')); a.classList.add('solto'); });
  lista.addEventListener('drop', async e => {
    const a = e.target.closest('.item'); if (!arrastado || !a || a === arrastado) return; e.preventDefault();
    const de = cards.findIndex(c => c.id === arrastado.dataset.id), para = cards.findIndex(c => c.id === a.dataset.id);
    const [m] = cards.splice(de, 1); cards.splice(para, 0, m);
    try { await salvarOrdem(); avisar('Ordem salva.'); } catch (err) { avisar(err.message); }
  });

  // ===== Card + landing =====
  const form = $('#form-card'), vivo = $('#card-vivo'), arquivo = $('#arquivo');
  const CV = ['canto', 'sigla', 'menu', 'titulo', 'texto', 'botao1', 'botao2', 'rodape', 'destaque', 'corTexto', 'suave'];
  const CM = ['tipo', 'titulo', 'texto', 'destaque', 'img', 'imgs', 'fundo', 'ajuste'];
  const VAZIO = { ativa: true, canto: '', sigla: 'MC', menu: 'Quem somos, Soluções, Missões, Contato', titulo: '', texto: '', botao1: '', botao2: '', rodape: 'mundoconcreto.net',
    destaque: '#4ABDAB', corTexto: '#ffffff', suave: 'rgba(255,255,255,.12)', mini: [0, 1, 2].map(() => ({ tipo: 'texto', titulo: '', texto: '', destaque: '', img: '', imgs: '', fundo: '', ajuste: 'cobrir' })) };
  const lerVitrine = () => ({ ativa: true, ...Object.fromEntries(CV.map(k => [k, form['v_' + k].value])),
    mini: [0, 1, 2].map(i => Object.fromEntries(CM.map(k => [k, form[`m${i}_${k}`].value]))) });
  const hex = v => /^#[0-9a-f]{6}$/i.test(v) ? v : /^#[0-9a-f]{3}$/i.test(v) ? '#' + v.slice(1).split('').map(x => x + x).join('') : '#000000';
  function verTipos() { [0, 1, 2].forEach(i => { const t = form[`m${i}_tipo`].value; form[`m${i}_tipo`].closest('fieldset').querySelectorAll('[data-so]').forEach(l => l.hidden = !l.dataset.so.split(' ').includes(t)); }); }
  function verImagem() {
    document.querySelectorAll('[data-cor]').forEach(c => c.value = hex(form[c.dataset.cor].value.trim()));
    verTipos();
    $('#card-render').innerHTML = CardRender.html({ thumbnail: form.thumbnail.value.trim(), vitrine: lerVitrine() });
    vivo.classList.toggle('vazio', !form.thumbnail.value.trim());
  }
  // clicar num texto da prévia leva ao campo
  const ALVO = { 'cr-sigla': 'v_sigla', 'cr-canto': 'v_canto', 'cr-menu': 'v_menu', 'cr-titulo': 'v_titulo', 'cr-texto': 'v_texto', 'cr-b1': 'v_botao1', 'cr-b2': 'v_botao2', 'cr-rodape': 'v_rodape' };
  $('#card-render').addEventListener('click', e => {
    const mini = e.target.closest('.cr-mini');
    let campo = null;
    if (mini) campo = form[`m${[...mini.parentElement.children].indexOf(mini)}_titulo`];
    else { const el = e.target.closest('[class^="cr-"]'); const cls = el && [...el.classList].find(c => ALVO[c]); if (cls) campo = form[ALVO[cls]]; }
    if (!campo) return;
    document.querySelectorAll('.cq.foco').forEach(f => f.classList.remove('foco'));
    campo.closest('fieldset')?.classList.add('foco');
    campo.scrollIntoView({ behavior: 'smooth', block: 'center' }); campo.focus({ preventScroll: true });
  });
  document.querySelectorAll('[data-cor]').forEach(c => c.addEventListener('input', () => { form[c.dataset.cor].value = c.value; verImagem(); marcar(true); }));
  form.addEventListener('click', async e => {
    const b = e.target.closest('[data-enviar]'); if (!b) return;
    const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
    i.onchange = async () => { try { avisar('Enviando imagem…'); form[b.dataset.enviar].value = await enviarArquivo(i.files[0]); verImagem(); marcar(true); menuAtrasado(); avisar('Imagem enviada. Clique em salvar.'); } catch (err) { avisar(err.message); } };
    i.click();
  });
  function dadosCard() {
    return { title: form.title.value.trim(), slug: form.slug.value.trim(), link: form.link.value.trim() || '#', thumbnail: form.thumbnail.value.trim(), active: form.active.checked, landing: LPEditor.ler(), vitrine: lerVitrine() };
  }
  async function abrirCard(id) {
    cards = await api('/api/cards');
    const c = id === 'novo' ? null : cards.find(x => x.id === id);
    if (id !== 'novo' && !c) return abrirVista('ordem');
    atual = c ? c.id : 'novo'; mostrar('card');
    form.title.value = c?.title || ''; form.slug.value = c?.slug || ''; form.link.value = c?.link || '#';
    form.thumbnail.value = c?.thumbnail || ''; form.active.checked = c ? c.active !== false : true;
    const v = { ...VAZIO, ...(c?.vitrine || {}) };
    CV.forEach(k => form['v_' + k].value = v[k] ?? '');
    [0, 1, 2].forEach(i => CM.forEach(k => form[`m${i}_${k}`].value = (v.mini?.[i] || VAZIO.mini[i])[k] ?? ''));
    verImagem();
    LPEditor.carregar(c?.landing || null);
    const pos = c ? cards.indexOf(c) : cards.length;
    $('#t-card').textContent = c ? c.title : 'Novo card';
    $('#card-pos').textContent = c ? `Card ${pos + 1} de ${cards.length} · ${filaDe(c)}` : 'Novo card';
    $('#btn-ver').href = c ? '/#lp-' + (c.slug || c.id) : '/';
    $('#btn-ver').hidden = !c; $('#btn-excluir').hidden = !c; $('#btn-descartar').hidden = !c;
    $('#btn-salvar').textContent = c ? 'Salvar card e landing' : 'Criar card';
    history.replaceState(null, '', c ? '#card-' + c.id : '#novo');
    marcar(false); ultimoBloco = 'topo'; menu(); previa('topo');
    scrollTo(0, 0); (c ? $('#conteudo') : form.title).focus({ preventScroll: true });
  }
  form.addEventListener('change', e => { if (e.target.tagName === 'SELECT') { verImagem(); marcar(true); } });
  form.addEventListener('input', e => {
    verImagem();
    if (e.target === form.title) { $('#t-card').textContent = form.title.value || 'Novo card'; menuAtrasado(); if (!form.v_canto.dataset.mexido && atual === 'novo') form.v_canto.value = form.title.value; }
    if (e.target === form.v_canto) form.v_canto.dataset.mexido = '1';
    marcar(true); previaAtrasada();
  });
  form.addEventListener('submit', e => { e.preventDefault(); salvar(); });
  // imagem: clique ou arraste direto no card
  arquivo.addEventListener('change', () => trocarImagem(arquivo.files[0]));
  $('#zona').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); arquivo.click(); } });
  ['dragenter', 'dragover'].forEach(t => vivo.addEventListener(t, e => { e.preventDefault(); vivo.classList.add('arrastando'); }));
  ['dragleave', 'drop'].forEach(t => vivo.addEventListener(t, e => { e.preventDefault(); vivo.classList.remove('arrastando'); }));
  vivo.addEventListener('drop', e => trocarImagem(e.dataTransfer.files[0]));
  async function trocarImagem(f) {
    try { avisar('Enviando imagem…'); form.thumbnail.value = await enviarArquivo(f); verImagem(); marcar(true); menuAtrasado(); avisar('Imagem trocada. Clique em salvar.'); }
    catch (err) { avisar(err.message); }
  }

  async function salvar() {
    const d = dadosCard();
    if (!d.title) { avisar('Escreva o nome do card.'); form.title.focus(); return false; }
    if (!d.thumbnail) { avisar('Coloque a imagem do card (clique na área do card).'); $('#zona').focus(); return false; }
    try {
      const salvo = atual === 'novo' ? await api('/api/cards', { method: 'POST', body: JSON.stringify(d) }) : await api('/api/cards/' + atual, { method: 'PUT', body: JSON.stringify(d) });
      cards = await api('/api/cards'); atual = salvo.id; form.slug.value = salvo.slug;
      marcar(false); history.replaceState(null, '', '#card-' + salvo.id);
      $('#btn-ver').href = '/#lp-' + (salvo.slug || salvo.id); ['#btn-ver', '#btn-excluir', '#btn-descartar'].forEach(s => $(s).hidden = false);
      $('#btn-salvar').textContent = 'Salvar card e landing';
      menu(); avisar('Card e landing salvos.'); return true;
    } catch (err) { avisar(err.message); return false; }
  }
  $('#btn-salvar').addEventListener('click', salvar);
  $('#btn-descartar').addEventListener('click', () => { if (sujo) { marcar(false); abrirCard(atual); avisar('Alterações descartadas.'); } });
  $('#btn-excluir').addEventListener('click', async e => {
    const c = cards.find(x => x.id === atual); if (!c) return;
    try { if (await excluir(c, e.currentTarget)) { marcar(false); abrirVista('ordem'); } } catch (err) { avisar(err.message); }
  });

  // ---------- prévia ao vivo da landing ----------
  const iframe = $('#previa-lp'), janela = $('#previa-janela');
  let previaPronta = false;
  function escala() { const larg = janela.classList.contains('cel') ? 390 : 1280; janela.style.setProperty('--esc', (janela.clientWidth / larg).toFixed(4)); }
  new ResizeObserver(escala).observe(janela);
  function previa(bloco) {
    if (!previaPronta || vista !== 'card') return;
    const d = dadosCard();
    iframe.contentWindow.postMessage({ card: { id: atual, title: d.title || 'Novo card', slug: d.slug, landing: d.landing }, bloco }, location.origin);
  }
  const previaAtrasada = debounce(b => previa(b), 250);
  addEventListener('message', e => { if (e.origin === location.origin && e.data?.previaPronta) { previaPronta = true; escala(); previa(ultimoBloco); } });
  document.querySelector('.lp-previa-tam').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('.lp-previa-tam button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    janela.classList.toggle('cel', b.dataset.tam === 'cel'); escala();
  });

  LPEditor.montar($('#lp-editor'), avisar, info => {
    marcar(true);
    if (info.bloco !== undefined) ultimoBloco = info.bloco;
    previaAtrasada(info.estrutura ? ultimoBloco : undefined);
    if (info.estrutura || info.bloco !== 'topo') menuAtrasado();
  });

  // ===== Diagnósticos =====
  const pct = v => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : Math.max(0, Math.min(100, n)); };
  const quando = iso => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  let diags = [], diagAtual = null;
  async function contarDiag() { try { diags = await api('/api/diagnosticos'); $('#n-diag').textContent = diags.length || ''; } catch {} }
  async function listarDiag() {
    await contarDiag();
    $('#diag-lista').innerHTML = diags.map(d => `<li><button type="button" data-diag="${esc(d.id)}" aria-current="${d.id === diagAtual}">
        <b>${esc(d.empresa || '(sem empresa)')}</b><span>${esc(d.nome || '')}${d.cidade ? ' · ' + esc(d.cidade) + (d.estado ? '/' + esc(d.estado) : '') : ''}</span>
        <span>${quando(d.recebido)} · nota geral ${esc(d.geral || '—')}</span></button></li>`).join('') || '<li class="dica">Nenhum diagnóstico recebido ainda.</li>';
    if (diagAtual && diags.some(d => d.id === diagAtual)) verDiag(diagAtual); else { diagAtual = null; $('#diag-det').innerHTML = '<p class="dica">Escolha um diagnóstico na lista.</p>'; }
  }
  async function verDiag(id) {
    diagAtual = id;
    document.querySelectorAll('#diag-lista button').forEach(b => b.setAttribute('aria-current', String(b.dataset.diag === id)));
    try {
      const d = await api('/api/diagnosticos/' + id), c = d.cadastro, r = d.resumo;
      const rot = { nome: 'Nome', empresa: 'Empresa', cnpj: 'CNPJ', email: 'E-mail', telefone: 'Telefone', ddi: 'DDI', pais: 'País', estado: 'Estado', cidade: 'Cidade', segmento: 'Segmento', cargo: 'Cargo', produtos: 'Produtos', outros_produtos: 'Outros produtos', lgpd: 'Consentimento LGPD' };
      const valor = (k, v) => { if (/^\[.*\]$/.test(v)) { try { return JSON.parse(v).join(', '); } catch {} } if (k === 'lgpd' && !isNaN(Date.parse(v))) return 'Autorizado em ' + quando(v); return v; };
      $('#diag-det').innerHTML = `<p class="vista-tag">Recebido em ${quando(d.recebido)}</p><h2>${esc(c.empresa || '(sem empresa)')}</h2>
        <p><span class="diag-nota">${esc(r.geral || '—')}</span> <b>${esc(r.classificacao || '')}</b>${r.selo ? ` · Prontidão Selo ABCP: <b>${esc(r.selo)}</b>` : ''}</p>
        ${r.areaCritica ? `<p>Área mais crítica: <b>${esc(r.areaCritica)}</b></p>` : ''}
        <div class="acoes">${d.temPdf ? `<a class="btn" href="/api/diagnosticos/${esc(id)}/pdf" target="_blank" rel="noopener">Abrir o PDF</a>` : ''}
          <button type="button" class="btn btn-perigo" id="btn-excluir-diag">Excluir diagnóstico</button></div>
        <h3>Cadastro</h3><dl>${Object.entries(c).filter(([, v]) => v && v !== 'null').map(([k, v]) => `<dt>${esc(rot[k] || k)}</dt><dd>${esc(valor(k, v))}</dd>`).join('')}</dl>
        ${r.areas?.length ? `<h3>Resultado por área</h3><div class="diag-areas">${r.areas.map(([a, v]) => `<div class="diag-area"><span>${esc(a)}</span><b>${esc(v)}</b><span class="diag-barra"><i style="width:${pct(v)}%"></i></span></div>`).join('')}</div>` : ''}
        ${r.plano?.length ? `<h3>Plano de ação</h3><ol>${r.plano.map(t => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
        ${r.oportunidades?.length ? `<h3>Soluções indicadas</h3><ul>${r.oportunidades.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`;
      $('#btn-excluir-diag').addEventListener('click', async e => {
        const b = e.currentTarget;
        if (b.dataset.confirmar !== '1') { b.dataset.confirmar = '1'; b.textContent = 'Confirmar exclusão'; return; }
        await api('/api/diagnosticos/' + id, { method: 'DELETE' }); avisar('Diagnóstico excluído.'); diagAtual = null; listarDiag();
      });
    } catch (err) { avisar(err.message); }
  }
  $('#diag-lista').addEventListener('click', e => { const b = e.target.closest('button[data-diag]'); if (b) verDiag(b.dataset.diag); });

  // ===== Alterar senha =====
  $('#form-senha').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target, erro = $('#erro-senha'); erro.textContent = '';
    if (!f.atual.value || !f.nova.value) { erro.textContent = 'Preencha a senha atual e a nova.'; return; }
    if (f.nova.value.length < 8) { erro.textContent = 'A nova senha precisa ter pelo menos 8 caracteres.'; f.nova.focus(); return; }
    if (f.nova.value !== f.repete.value) { erro.textContent = 'As duas senhas novas não são iguais.'; f.repete.focus(); return; }
    try { await api('/api/senha', { method: 'POST', body: JSON.stringify({ atual: f.atual.value, nova: f.nova.value }) }); f.reset(); avisar('Senha alterada.'); }
    catch (err) { erro.textContent = err.message; }
  });

  // ---------- início ----------
  contarDiag();
  api('/api/eu').then(u => { $('#quem').textContent = u.usuario; }).catch(() => {});
  (async () => {
    cards = await api('/api/cards');
    const h = location.hash, m = h.match(/^#card-(.+)$/);
    if (m && cards.some(c => c.id === m[1])) abrirCard(m[1]);
    else if (h === '#novo') abrirCard('novo');
    else if (h === '#topo') abrirVista('topo');
    else if (h === '#diagnosticos' || h === '#conta') abrirVista(h.slice(1));
    else if (cards[0] && h !== '#ordem') abrirCard(cards[0].id);
    else abrirVista('ordem');
  })();
})();
