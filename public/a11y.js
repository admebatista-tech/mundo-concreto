// Preferências de acessibilidade: fonte, tema, contraste e animações. Salvas neste navegador e válidas em todas as telas.
(function () {
  const KEY = 'hero-parallax-a11y';
  const PADRAO = { fonte: 100, tema: 'sistema', contraste: 'normal', movimento: 'sistema' };
  const ler = () => { try { return { ...PADRAO, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...PADRAO }; } };
  let p = ler();
  const html = document.documentElement;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

  function aplicar() {
    html.style.fontSize = p.fonte + '%';
    if (p.tema === 'sistema') html.removeAttribute('data-theme'); else html.dataset.theme = p.tema === 'claro' ? 'light' : 'dark';
    html.dataset.contrast = p.contraste === 'alto' ? 'high' : 'normal';
    const reduz = p.movimento === 'reduzir' || (p.movimento === 'sistema' && mq.matches);
    html.dataset.motion = reduz ? 'reduce' : 'full';
    document.dispatchEvent(new CustomEvent('a11y:change', { detail: { reduz } }));
  }
  window.A11Y = { reduzMovimento: () => html.dataset.motion === 'reduce' };
  aplicar();
  mq.addEventListener('change', aplicar);

  function salvar() { localStorage.setItem(KEY, JSON.stringify(p)); aplicar(); sincronizar(); }

  const icone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="4.5" r="1.8" fill="currentColor"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5m0 0l-3.5 6m3.5-6l3.5 6"/></svg>';
  const grupo = (nome, chave, ops) => `<fieldset><legend>${nome}</legend><div class="a11y-grupo" role="group" aria-label="${nome}">${ops.map(([v, t]) => `<button type="button" data-k="${chave}" data-v="${v}" aria-pressed="false">${t}</button>`).join('')}</div></fieldset>`;

  function montar() {
    const btn = document.createElement('button');
    btn.className = 'a11y-btn'; btn.type = 'button'; btn.innerHTML = icone;
    btn.setAttribute('aria-label', 'Abrir opções de acessibilidade'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'a11y-painel');
    const painel = document.createElement('div');
    painel.id = 'a11y-painel'; painel.className = 'a11y-painel'; painel.hidden = true;
    painel.setAttribute('role', 'dialog'); painel.setAttribute('aria-labelledby', 'a11y-titulo');
    painel.innerHTML = `<h2 id="a11y-titulo">Acessibilidade</h2>
      <fieldset><legend>Tamanho da fonte</legend><div class="a11y-fonte">
        <button type="button" data-fonte="-10" aria-label="Diminuir fonte">A−</button><output id="a11y-fonte-val" aria-live="polite"></output>
        <button type="button" data-fonte="10" aria-label="Aumentar fonte">A+</button></div></fieldset>
      ${grupo('Tema', 'tema', [['sistema', 'Sistema'], ['claro', 'Claro'], ['escuro', 'Escuro']])}
      ${grupo('Contraste', 'contraste', [['normal', 'Normal'], ['alto', 'Alto']])}
      ${grupo('Animações', 'movimento', [['sistema', 'Sistema'], ['completo', 'Ligadas'], ['reduzir', 'Reduzidas']])}
      <button type="button" class="a11y-restaurar" data-restaurar>Restaurar padrão</button>`;
    document.body.append(btn, painel);
    const abrir = on => { painel.hidden = !on; btn.setAttribute('aria-expanded', String(on)); if (on) painel.querySelector('button').focus(); };
    btn.addEventListener('click', () => abrir(painel.hidden));
    painel.addEventListener('keydown', e => { if (e.key === 'Escape') { abrir(false); btn.focus(); } });
    document.addEventListener('click', e => { if (!painel.hidden && !painel.contains(e.target) && !btn.contains(e.target)) abrir(false); });
    painel.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.fonte) p.fonte = Math.min(160, Math.max(80, p.fonte + Number(b.dataset.fonte)));
      else if (b.dataset.k) p[b.dataset.k] = b.dataset.v;
      else if ('restaurar' in b.dataset) p = { ...PADRAO };
      salvar();
    });
    sincronizar();
  }
  function sincronizar() {
    const out = document.getElementById('a11y-fonte-val'); if (!out) return;
    out.textContent = p.fonte + '%';
    document.querySelectorAll('.a11y-grupo button').forEach(b => b.setAttribute('aria-pressed', String(p[b.dataset.k] === b.dataset.v)));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
