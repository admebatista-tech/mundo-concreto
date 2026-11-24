// Desenha o card da vitrine em HTML a partir dos campos "vitrine" (usado no site e na prévia do admin).
(function () {
  const U = window.U || (x => x);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function claro(cor) {
    const m = String(cor || '').match(/^#?([0-9a-f]{6})$/i); if (!m) return true;
    const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > .5;
  }
  function mini(m) {
    if (!m || !(m.titulo || m.texto || m.img || m.imgs || m.destaque)) return '<div class="cr-mini" aria-hidden="true"></div>';
    let topo = '', soTexto = false;
    if (m.tipo === 'foto' && m.img) topo = `<div class="cr-mini-img ${esc(m.ajuste || '')}"><img src="${esc(U(m.img))}" alt="" loading="lazy"></div>`;
    else if (m.tipo === 'logo' && m.img) topo = `<div class="cr-mini-logo" style="background:${esc(m.fundo || '#fff')}"><img src="${esc(U(m.img))}" alt="" loading="lazy"></div>`;
    else if (m.tipo === 'logos') topo = `<div class="cr-mini-logo">${String(m.imgs || '').split(',').map(x => x.trim()).filter(Boolean).map(u => `<img src="${esc(U(u))}" alt="" loading="lazy">`).join('')}</div>`;
    else if (m.tipo === 'numero') { topo = `<span class="cr-mini-num${String(m.destaque).length > 7 ? ' longo' : ''}">${esc(m.destaque)}</span>`; soTexto = true; }
    else if (m.tipo === 'icone') { topo = `<span class="cr-mini-icone">${esc(m.destaque)}</span>`; soTexto = true; }
    return `<div class="cr-mini${soTexto ? ' so-texto' : ''}">${topo}<div class="cr-mini-tx"><b>${esc(m.titulo)}</b>${m.texto ? `<span>${esc(m.texto)}</span>` : ''}</div></div>`;
  }
  window.CardRender = {
    // devolve o HTML do card (div.cr) — fundo = imagem do card (thumbnail)
    html(c) {
      const v = c.vitrine || {};
      const estilo = `background-image:url('${esc(U(c.thumbnail || ''))}');--cr-ac:${esc(v.destaque || '#4ABDAB')};--cr-tx:${esc(v.corTexto || '#ffffff')};--cr-mu:${esc(v.suave || 'rgba(255,255,255,.12)')};--cr-sobre:${claro(v.destaque) ? '#111111' : '#ffffff'}`;
      const menu = String(v.menu || '').split(',').map(x => x.trim()).filter(Boolean);
      const longo = String(v.titulo || '').length > 56;
      return `<div class="cr" style="${estilo}">
        ${v.sigla ? `<span class="cr-sigla">${esc(v.sigla)}</span>` : ''}${v.canto ? `<span class="cr-canto">${esc(v.canto)}</span>` : ''}
        ${menu.length ? `<ul class="cr-menu">${menu.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${v.titulo ? `<p class="cr-titulo${longo ? ' longo' : ''}">${esc(v.titulo)}</p>` : ''}
        ${v.texto ? `<p class="cr-texto">${esc(v.texto)}</p>` : ''}
        ${v.botao1 || v.botao2 ? `<div class="cr-botoes">${v.botao1 ? `<span class="cr-b1">${esc(v.botao1)}</span>` : ''}${v.botao2 ? `<span class="cr-b2">${esc(v.botao2)}</span>` : ''}</div>` : ''}
        <div class="cr-minis">${[0, 1, 2].map(i => mini((v.mini || [])[i])).join('')}</div>
        ${v.rodape ? `<span class="cr-rodape">${esc(v.rodape)}</span>` : ''}</div>`;
    },
    usa(c) { return c.vitrine && c.vitrine.ativa !== false; },
  };
})();
