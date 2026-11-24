// MUNDO CONCRETO — vitrine + landing pages + admin com login. Servidor local sem dependências (Node 18+)
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8181;
const ROOT = __dirname;
const PUB = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'data');
const CARDS = path.join(DATA, 'cards.json');
const SITE = path.join(DATA, 'site.json');

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon' };

// ---------- dados iniciais (15 cards, como no componente original) ----------
const SEED = [
  ['Moonbeam', '#0f172a', '#818cf8'], ['Cursor', '#111111', '#f5f5f5'], ['Rogue', '#1c1917', '#f97316'],
  ['Editorially', '#fafaf9', '#0f766e'], ['Editrix AI', '#020617', '#22d3ee'], ['Pixel Perfect', '#fdf2f8', '#db2777'],
  ['Algochurn', '#0c0a09', '#facc15'], ['Aceternity UI', '#000000', '#a855f7'], ['Tailwind Master Kit', '#082f49', '#38bdf8'],
  ['SmartBridge', '#f8fafc', '#2563eb'], ['Renderwork Studio', '#18181b', '#e4e4e7'], ['Creme Digital', '#fef3c7', '#92400e'],
  ['Golden Bells Academy', '#1e1b4b', '#fbbf24'], ['Invoker Labs', '#052e16', '#4ade80'], ['E Free Invoice', '#ffffff', '#16a34a'],
];
function seedSvg(title, bg, accent, i) {
  const light = parseInt(bg.slice(1, 3), 16) > 128;
  const fg = light ? '#111827' : '#f9fafb';
  const muted = light ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="960" viewBox="0 0 1200 960">
<rect width="1200" height="960" fill="${bg}"/>
<circle cx="${900 - i * 20}" cy="${260 + i * 12}" r="320" fill="${accent}" opacity=".18"/>
<rect x="60" y="44" width="40" height="40" rx="10" fill="${accent}"/>
<text x="116" y="74" font-family="Helvetica,Arial,sans-serif" font-size="26" font-weight="700" fill="${fg}">${esc(title)}</text>
${[0, 1, 2, 3].map(k => `<rect x="${700 + k * 110}" y="56" width="80" height="14" rx="7" fill="${muted}"/>`).join('')}
<text x="60" y="300" font-family="Helvetica,Arial,sans-serif" font-size="78" font-weight="800" fill="${fg}">${esc(title)}</text>
<rect x="60" y="350" width="620" height="18" rx="9" fill="${muted}"/>
<rect x="60" y="384" width="480" height="18" rx="9" fill="${muted}"/>
<rect x="60" y="440" width="200" height="60" rx="30" fill="${accent}"/>
<rect x="280" y="440" width="170" height="60" rx="30" fill="none" stroke="${muted}" stroke-width="3"/>
${[0, 1, 2].map(k => `<rect x="${60 + k * 370}" y="570" width="340" height="320" rx="22" fill="${muted}"/><rect x="${90 + k * 370}" y="600" width="60" height="60" rx="14" fill="${accent}" opacity=".8"/><rect x="${90 + k * 370}" y="690" width="240" height="16" rx="8" fill="${muted}"/><rect x="${90 + k * 370}" y="720" width="180" height="16" rx="8" fill="${muted}"/>`).join('')}
</svg>`;
}
function ensureData() {
  fs.mkdirSync(DATA, { recursive: true });
  // clone novo: começa com os dados iniciais do repositório
  for (const f of ['cards.json', 'site.json']) { const ini = path.join(ROOT, 'dados-inicial', f); if (!fs.existsSync(path.join(DATA, f)) && fs.existsSync(ini)) fs.copyFileSync(ini, path.join(DATA, f)); }
  if (!fs.existsSync(CARDS)) {
    const cards = SEED.map(([title, bg, accent], i) => {
      const file = `seed/${String(i + 1).padStart(2, '0')}.svg`;
      fs.writeFileSync(path.join(PUB, file), seedSvg(title, bg, accent, i));
      return { id: crypto.randomUUID(), title, link: '#', thumbnail: '/' + file, active: true };
    });
    fs.writeFileSync(CARDS, JSON.stringify(cards, null, 2));
  }
  if (!fs.existsSync(SITE)) {
    fs.writeFileSync(SITE, JSON.stringify({
      title: 'The Ultimate <br> development studio',
      subtitle: 'We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.'
    }, null, 2));
  }
}

// ---------- login do admin ----------
// Usuários em data/usuarios.json (senha com scrypt + sal). Criar/trocar: node ferramentas/criar-usuario.js <usuario>
const USUARIOS = path.join(DATA, 'usuarios.json');
const SESSOES = new Map();                 // token -> { usuario, expira }
const DURACAO = 12 * 60 * 60 * 1000;       // 12 horas
const tentativas = new Map();              // ip -> { n, ate }
const lerUsuarios = () => { try { return JSON.parse(fs.readFileSync(USUARIOS, 'utf8')); } catch { return []; } };
function conferirSenha(usuario, senha) {
  const u = lerUsuarios().find(x => x.usuario === usuario);
  const sal = u ? Buffer.from(u.sal, 'hex') : crypto.randomBytes(16);
  const calc = crypto.scryptSync(String(senha), sal, 64);
  const certo = u ? Buffer.from(u.hash, 'hex') : crypto.randomBytes(64);
  return crypto.timingSafeEqual(calc, certo) && !!u;
}
function sessao(req) {
  const m = (req.headers.cookie || '').match(/(?:^|;\s*)mc_sessao=([a-f0-9]{64})/);
  if (!m) return null;
  const s = SESSOES.get(m[1]);
  if (!s || s.expira < Date.now()) { SESSOES.delete(m[1]); return null; }
  s.expira = Date.now() + DURACAO;
  return { token: m[1], ...s };
}
const DIAG = path.join(DATA, 'diagnosticos');
fs.mkdirSync(DIAG, { recursive: true });
const envioDiag = new Map();               // ip -> [horários] (limite de envios por minuto)
function gravarSenha(usuario, senha) {
  const sal = crypto.randomBytes(16), hash = crypto.scryptSync(String(senha), sal, 64).toString('hex');
  const lista = lerUsuarios().filter(u => u.usuario !== usuario).concat({ usuario, sal: sal.toString('hex'), hash });
  fs.writeFileSync(USUARIOS, JSON.stringify(lista, null, 2), { mode: 0o600 });
}
const limpaObj = (o, n = 300) => Object.fromEntries(Object.entries(o && typeof o === 'object' ? o : {}).slice(0, 40).map(([k, v]) => [String(k).slice(0, 40), typeof v === 'object' ? JSON.stringify(v).slice(0, 4000) : String(v ?? '').slice(0, n)]));
const mesmaOrigem = req => { const o = req.headers.origin; return !o || o === `http://${req.headers.host}`; };

const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const write = (f, v) => { fs.writeFileSync(f + '.tmp', JSON.stringify(v, null, 2)); fs.renameSync(f + '.tmp', f); };

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}
function body(req, limit = 15 * 1024 * 1024) {
  return new Promise((ok, fail) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { fail(new Error('Arquivo grande demais (máx. 15 MB)')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => ok(Buffer.concat(chunks)));
    req.on('error', fail);
  });
}
const json = async req => { const b = await body(req); return b.length ? JSON.parse(b.toString('utf8')) : {}; };
// ---------- limpeza dos dados (card + landing page em blocos) ----------
const txt = (v, n) => String(v ?? '').slice(0, n);
const umDe = (v, lista, padrao) => lista.includes(v) ? v : padrao;
const FUNDOS = ['claro', 'papel', 'marinho', 'ardosia', 'grafite'];
const TIPOS = ['cards', 'numeros', 'galeria', 'logos', 'etiquetas', 'lista', 'citacao', 'texto'];
const ESTILOS = ['amarelo', 'ardosia', 'contorno', 'teal', 'spotify'];
const CORES = ['', 'verde', 'amarelo', 'azul', 'laranja'];
const slugify = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const lista = (v, max, f) => (Array.isArray(v) ? v : []).slice(0, max).map(f);
const botao = x => ({ texto: txt(x?.texto, 80).trim(), link: txt(x?.link, 500).trim() || '#', estilo: umDe(x?.estilo, ESTILOS, 'amarelo') });
const item = x => ({ titulo: txt(x?.titulo, 200), texto: txt(x?.texto, 1500), destaque: txt(x?.destaque, 80), img: txt(x?.img, 1000).trim(), cor: umDe(x?.cor, CORES, ''), link: txt(x?.link, 500).trim() });
const bloco = x => ({
  tipo: umDe(x?.tipo, TIPOS, 'cards'), fundo: umDe(x?.fundo, ['', ...FUNDOS], ''), tag: txt(x?.tag, 200), titulo: txt(x?.titulo, 300),
  texto: txt(x?.texto, 4000), imagem: txt(x?.imagem, 1000).trim(), botoes: lista(x?.botoes, 4, botao), itens: lista(x?.itens, 40, item),
});
const landing = l => ({
  ativa: l?.ativa !== false, fundo: umDe(l?.fundo, FUNDOS, 'claro'), tag: txt(l?.tag, 200), titulo: txt(l?.titulo, 300),
  texto: txt(l?.texto, 4000), imagem: txt(l?.imagem, 1000).trim(), botoes: lista(l?.botoes, 4, botao), blocos: lista(l?.blocos, 30, bloco),
});
const COR = v => /^(#[0-9a-f]{3,8}|rgba?\([0-9., ]+\))$/i.test(String(v || '').trim()) ? String(v).trim() : '';
const mini = x => ({ tipo: umDe(x?.tipo, ['foto', 'numero', 'icone', 'logo', 'logos', 'texto'], 'texto'), titulo: txt(x?.titulo, 120), texto: txt(x?.texto, 300),
  img: txt(x?.img, 1000).trim(), imgs: txt(x?.imgs, 3000), fundo: COR(x?.fundo), destaque: txt(x?.destaque, 30), ajuste: umDe(x?.ajuste, ['cobrir', 'topo', 'inteira'], 'cobrir') });
const vitrine = v => v && typeof v === 'object' ? ({
  ativa: v.ativa !== false, canto: txt(v.canto, 80), sigla: txt(v.sigla, 4), menu: txt(v.menu, 200), titulo: txt(v.titulo, 200), texto: txt(v.texto, 400),
  botao1: txt(v.botao1, 50), botao2: txt(v.botao2, 50), rodape: txt(v.rodape, 60),
  destaque: COR(v.destaque) || '#4ABDAB', corTexto: COR(v.corTexto) || '#ffffff', suave: COR(v.suave) || 'rgba(255,255,255,.12)',
  mini: lista(v.mini, 3, mini) }) : undefined;
function slugUnico(slug, cards, id) {
  let s = slug || 'card', n = 2;
  while (cards.some(c => c.id !== id && c.slug === s)) s = `${slug}-${n++}`;
  return s;
}
const clean = c => ({
  title: String(c.title || '').trim().slice(0, 120),
  slug: slugify(c.slug || c.title),
  link: String(c.link || '#').trim().slice(0, 500) || '#',
  thumbnail: String(c.thumbnail || '').trim().slice(0, 1000),
  active: c.active !== false,
  landing: landing(c.landing),
  vitrine: vitrine(c.vitrine),
});

async function api(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean); // ['api','cards',id?]
  const m = req.method;
  if (parts[1] === 'entrar' && m === 'POST') {
    const ip = req.socket.remoteAddress, t = tentativas.get(ip) || { n: 0, ate: 0 };
    if (t.ate > Date.now()) return send(res, 429, { error: 'Muitas tentativas. Espere um minuto e tente de novo.' });
    const b = await json(req);
    if (!conferirSenha(String(b.usuario || '').trim(), b.senha || '')) {
      t.n++; if (t.n >= 5) { t.n = 0; t.ate = Date.now() + 60000; } tentativas.set(ip, t);
      return send(res, 401, { error: 'Usuário ou senha incorretos.' });
    }
    tentativas.delete(ip);
    const token = crypto.randomBytes(32).toString('hex');
    SESSOES.set(token, { usuario: String(b.usuario).trim(), expira: Date.now() + DURACAO });
    res.setHeader('Set-Cookie', `mc_sessao=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${DURACAO / 1000}`);
    return send(res, 200, { ok: true });
  }
  if (parts[1] === 'sair' && m === 'POST') {
    const s = sessao(req); if (s) SESSOES.delete(s.token);
    res.setHeader('Set-Cookie', 'mc_sessao=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
    return send(res, 200, { ok: true });
  }
  if (parts[1] === 'eu' && m === 'GET') { const s = sessao(req); return s ? send(res, 200, { usuario: s.usuario }) : send(res, 401, { error: 'Entre para continuar.' }); }
  // ---------- diagnósticos: envio público, leitura só com login ----------
  if (parts[1] === 'diagnosticos') {
    if (m === 'POST' && !parts[2]) {
      if (!mesmaOrigem(req)) return send(res, 403, { error: 'Pedido recusado.' });
      const ip = req.socket.remoteAddress, agora = Date.now(), lista = (envioDiag.get(ip) || []).filter(t => agora - t < 60000);
      if (lista.length >= 10) return send(res, 429, { error: 'Muitos envios. Tente de novo em um minuto.' });
      envioDiag.set(ip, [...lista, agora]);
      const b = await json(req);
      const id = new Date().toISOString().slice(0, 10) + '-' + crypto.randomBytes(5).toString('hex');
      const r = b.resumo || {};
      const reg = { id, recebido: new Date().toISOString(), idNavegador: String(b.id || '').slice(0, 80), arquivo: String(b.arquivo || '').slice(0, 120),
        cadastro: limpaObj(b.cadastro), resumo: {
          geral: String(r.geral ?? '').slice(0, 20), classificacao: String(r.classificacao ?? '').slice(0, 80), selo: String(r.selo ?? '').slice(0, 40),
          areaCritica: String(r.areaCritica ?? '').slice(0, 120),
          areas: (Array.isArray(r.areas) ? r.areas : []).slice(0, 30).map(a => [String(a?.[0] ?? '').slice(0, 120), String(a?.[1] ?? '').slice(0, 20)]),
          plano: (Array.isArray(r.plano) ? r.plano : []).slice(0, 40).map(t => String(t).slice(0, 400)),
          oportunidades: (Array.isArray(r.oportunidades) ? r.oportunidades : []).slice(0, 30).map(t => String(t).slice(0, 200)) },
        temPdf: false };
      if (typeof b.pdf === 'string' && b.pdf.length < 14e6) {
        const pdf = Buffer.from(b.pdf, 'base64');
        if (pdf.subarray(0, 5).toString() === '%PDF-') { fs.writeFileSync(path.join(DIAG, id + '.pdf'), pdf); reg.temPdf = true; }
      }
      write(path.join(DIAG, id + '.json'), reg);
      return send(res, 201, { ok: true, id });
    }
    if (!sessao(req)) return send(res, 401, { error: 'Entre para continuar.' });
    const id = parts[2] && /^[0-9a-z-]{10,40}$/.test(parts[2]) ? parts[2] : null;
    if (m === 'GET' && !parts[2]) {
      const lista = fs.readdirSync(DIAG).filter(f => f.endsWith('.json')).map(f => { try { return read(path.join(DIAG, f)); } catch { return null; } }).filter(Boolean)
        .sort((a, b) => b.recebido.localeCompare(a.recebido))
        .map(d => ({ id: d.id, recebido: d.recebido, empresa: d.cadastro.empresa, nome: d.cadastro.nome, cidade: d.cadastro.cidade, estado: d.cadastro.estado, geral: d.resumo.geral, classificacao: d.resumo.classificacao, temPdf: d.temPdf }));
      return send(res, 200, lista);
    }
    if (!id || !fs.existsSync(path.join(DIAG, id + '.json'))) return send(res, 404, { error: 'Diagnóstico não encontrado.' });
    if (m === 'GET' && parts[3] === 'pdf') {
      const f = path.join(DIAG, id + '.pdf');
      if (!fs.existsSync(f)) return send(res, 404, { error: 'Este diagnóstico não tem PDF.' });
      res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${id}.pdf"`, 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(f));
    }
    if (m === 'GET') return send(res, 200, read(path.join(DIAG, id + '.json')));
    if (m === 'DELETE') {
      if (!mesmaOrigem(req)) return send(res, 403, { error: 'Pedido recusado.' });
      fs.rmSync(path.join(DIAG, id + '.json'), { force: true }); fs.rmSync(path.join(DIAG, id + '.pdf'), { force: true });
      return send(res, 200, { ok: true });
    }
    return send(res, 405, { error: 'Método não aceito.' });
  }
  // tudo que altera dados exige login e pedido vindo do próprio site
  if (m !== 'GET') {
    if (!sessao(req)) return send(res, 401, { error: 'Sua sessão terminou. Entre de novo.' });
    if (!mesmaOrigem(req)) return send(res, 403, { error: 'Pedido recusado.' });
  }
  if (parts[1] === 'senha' && m === 'POST') {
    const s = sessao(req), b = await json(req);
    if (!conferirSenha(s.usuario, b.atual || '')) return send(res, 400, { error: 'A senha atual não confere.' });
    const nova = String(b.nova || '');
    if (nova.length < 8) return send(res, 400, { error: 'A nova senha precisa ter pelo menos 8 caracteres.' });
    if (nova === b.atual) return send(res, 400, { error: 'A nova senha precisa ser diferente da atual.' });
    gravarSenha(s.usuario, nova);
    for (const [t, x] of SESSOES) if (x.usuario === s.usuario && t !== s.token) SESSOES.delete(t);   // derruba outras sessões
    return send(res, 200, { ok: true });
  }
  if (parts[1] === 'site') {
    if (m === 'GET') return send(res, 200, read(SITE));
    if (m === 'PUT') { const b = await json(req); const s = { title: String(b.title || ''), subtitle: String(b.subtitle || ''), logo: String(b.logo || '').slice(0, 1000), logoAlt: String(b.logoAlt || '').slice(0, 200) }; write(SITE, s); return send(res, 200, s); }
  }
  if (parts[1] === 'upload' && m === 'POST') {
    const ext = ({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg', 'image/avif': '.avif' })[req.headers['content-type']];
    if (!ext) return send(res, 415, { error: 'Formato não aceito. Use PNG, JPG, WEBP, GIF, AVIF ou SVG.' });
    const buf = await body(req);
    const name = Date.now() + '-' + crypto.randomBytes(4).toString('hex') + ext;
    fs.writeFileSync(path.join(PUB, 'uploads', name), buf);
    return send(res, 201, { url: '/uploads/' + name });
  }
  if (parts[1] === 'cards') {
    const cards = read(CARDS);
    const id = parts[2];
    if (!id && m === 'GET') return send(res, 200, cards);
    if (!id && m === 'POST') { const c = { id: crypto.randomUUID(), ...clean(await json(req)) }; c.slug = slugUnico(c.slug, cards, c.id); if (!c.title) return send(res, 400, { error: 'Informe o título.' }); cards.push(c); write(CARDS, cards); return send(res, 201, c); }
    if (id === 'order' && m === 'PUT') { const ids = (await json(req)).ids || []; const map = new Map(cards.map(c => [c.id, c])); const out = ids.map(i => map.get(i)).filter(Boolean); cards.forEach(c => { if (!ids.includes(c.id)) out.push(c); }); write(CARDS, out); return send(res, 200, out); }
    const i = cards.findIndex(c => c.id === id);
    if (i < 0) return send(res, 404, { error: 'Card não encontrado.' });
    if (m === 'PUT') { cards[i] = { id, ...clean({ ...cards[i], ...(await json(req)) }) }; cards[i].slug = slugUnico(cards[i].slug, cards, id); write(CARDS, cards); return send(res, 200, cards[i]); }
    if (m === 'DELETE') { const [rm] = cards.splice(i, 1); write(CARDS, cards);
      if (rm.thumbnail.startsWith('/uploads/') && !cards.some(c => c.thumbnail === rm.thumbnail)) fs.rm(path.join(PUB, rm.thumbnail), () => {});
      return send(res, 200, { ok: true }); }
  }
  send(res, 404, { error: 'Rota não encontrada.' });
}

ensureData();
if (!lerUsuarios().length) console.log('ATENÇÃO: nenhum usuário do admin. Crie com: node ferramentas/criar-usuario.js admin');
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    let p = decodeURIComponent(url.pathname);
    if (p === '/') p = '/index.html';
    if (p === '/admin' || p === '/admin/' || p === '/admin.html') {
      if (!sessao(req)) { res.writeHead(302, { Location: '/entrar' }); return res.end(); }
      p = '/admin.html';
    }
    if (p === '/entrar' || p === '/entrar/') {
      if (sessao(req)) { res.writeHead(302, { Location: '/admin' }); return res.end(); }
      p = '/entrar.html';
    }
    if (p.endsWith('/')) p += 'index.html';          // pastas servem o index.html (ex.: /diagnostico/)
    if (p === '/diagnostico') { res.writeHead(301, { Location: '/diagnostico/' }); return res.end(); }

    const file = path.normalize(path.join(PUB, p));
    if (!file.startsWith(PUB)) return send(res, 403, 'Proibido', 'text/plain');
    fs.readFile(file, (err, buf) => err ? send(res, 404, 'Não encontrado', 'text/plain; charset=utf-8') : send(res, 200, buf, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'));
  } catch (e) { send(res, 500, { error: e.message }); }
}).listen(PORT, '127.0.0.1', () => console.log(`MUNDO CONCRETO: http://localhost:${PORT}  |  Admin: http://localhost:${PORT}/admin`));
