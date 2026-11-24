// Cria ou troca a senha de um usuário do admin.  Uso: node ferramentas/criar-usuario.js <usuario> [senha]
// Sem senha, gera uma aleatória e mostra uma vez na tela.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ARQ = path.join(__dirname, '..', 'data', 'usuarios.json');
const usuario = (process.argv[2] || '').trim();
if (!usuario) { console.error('Uso: node ferramentas/criar-usuario.js <usuario> [senha]'); process.exit(1); }
const senha = process.argv[3] || crypto.randomBytes(9).toString('base64url');
if (senha.length < 8) { console.error('A senha precisa ter pelo menos 8 caracteres.'); process.exit(1); }
const sal = crypto.randomBytes(16);
const hash = crypto.scryptSync(senha, sal, 64).toString('hex');
let lista = []; try { lista = JSON.parse(fs.readFileSync(ARQ, 'utf8')); } catch {}
lista = lista.filter(u => u.usuario !== usuario).concat({ usuario, sal: sal.toString('hex'), hash });
fs.writeFileSync(ARQ, JSON.stringify(lista, null, 2), { mode: 0o600 });
console.log(`Usuário "${usuario}" gravado.` + (process.argv[3] ? '' : ` Senha: ${senha}`));
