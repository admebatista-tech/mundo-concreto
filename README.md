# Hero Parallax (recriação local + admin)

Recriação do componente **Hero Parallax** (Aceternity UI, visto em 21st.dev/@manuarora700/components/hero-parallax) em HTML/CSS/JS puro,
com as mesmas curvas de rolagem e a mesma mola (stiffness 300, damping 30) do framer-motion.

- Site: http://localhost:8181
- Admin: http://localhost:8181/admin (textos do topo + cards: criar, editar, ocultar, ordenar, excluir, enviar imagem)

## Rodar
    node server.js            # porta 8181 (ou PORT=xxxx node server.js)

Sem dependências. Dados em `data/cards.json` e `data/site.json`; imagens enviadas em `public/uploads/`.
Para voltar aos 15 cards de exemplo: apague `data/cards.json` e reinicie.

Os cards ativos são divididos em 3 linhas iguais na ordem da lista (15 → 5 por linha, como no original).
Linhas 1 e 3 andam para a direita e a linha 2 para a esquerda.

Acessibilidade (botão no canto inferior direito, em todas as telas): tamanho da fonte, tema claro/escuro/sistema,
alto contraste, animações reduzidas (respeita `prefers-reduced-motion`). Salvo no navegador.
O admin não tem senha: o servidor só aceita conexões da própria máquina (127.0.0.1).

## Cards do Mundo Concreto + landing pages (24/11/2026)
- 15 cards (imagens em `public/cards/NN.png`, vindas de ~/Desktop/cards-site-original/png) e fotos do site em `public/mc/`.
- Cada card abre uma landing page interna (estilo da landing Agrela, cores das seções do Mundo Concreto).
  Estrutura: topo (fundo, etiqueta, título com *destaque*, texto, imagem, botões) + blocos
  (cartões, números, galeria, logos, etiquetas, lista, citação, texto), cada um com fundo próprio.
- Links: `#lp-<slug>` abre a landing de outro card; `#bloco-N` rola até o bloco N da mesma página.
- Admin: Editar card → "Landing page do card" (ligar/desligar, editar, adicionar/duplicar/remover/reordenar blocos e itens).
- Conteúdo inicial gerado por `python3 ferramentas/montar-landings.py` (SOBRESCREVE data/cards.json).

## Admin com login (24/11/2026)
- Entrada: http://localhost:8181/entrar (ou o ícone da engenharia na constelação, que abre o admin em nova aba).
- Usuários em `data/usuarios.json` (senha com scrypt). Criar ou trocar senha: `node ferramentas/criar-usuario.js admin [nova-senha]`
  (sem senha, gera uma aleatória e mostra uma vez). Sessão dura 12 h; reiniciar o servidor desconecta todos.
- Menu lateral: Textos do topo · Organizar cards · cada card (1. Card editado direto na prévia, 2. Landing com prévia ao vivo).

## Cards com textos editáveis, diagnóstico e senha (24/11/2026)
- Cards da vitrine = FUNDO (`public/cards/fundo-NN.svg`, só cor e círculo) + TEXTOS em HTML (`card-render.js/.css`), editados no admin
  (Card → Fundo e cores, Textos do card, Quadros 1–3). Gerado por `python3 ferramentas/montar-vitrine.py` (sobrescreve o campo vitrine).
- Diagnóstico empresarial: questionário em `public/diagnostico/` (cópia de ~/Downloads/diagnostico.html + assets de mundo-concreto-novo-221721).
  Ao concluir, grava em `data/diagnosticos/<id>.json` + `.pdf`; o admin lista em "Diagnósticos recebidos" (só com login).
  Botões "Agendar um diagnóstico" das landings apontam para `/diagnostico/`.
- Admin → "Alterar senha" troca a senha do usuário conectado (mínimo 8 caracteres).

## Publicação em farol.pro/mundoconcreto (Hostinger, PHP)
- O plano da Hostinger só roda PHP: `php/api.php` espelha o `server.js` (mudança de API = mexer nos dois).
- `.htaccess` da raiz manda tudo para `public/`, a API para `php/api.php` e bloqueia dados, código e `.git`.
- `public/base.js` descobre a pasta do site ("" local, "/mundoconcreto" publicado) e ajusta os endereços.
- `dados/` (no servidor) nasce de `dados-inicial/` na primeira visita e NÃO está no Git: atualizar o código não apaga edições.
- Primeira senha do admin publicado: `POST /mundoconcreto/api/instalar {usuario, senha}` — só funciona enquanto não há usuário.
- Atualizar: `git push` e chamar o deploy Git da Hostinger (farol.pro, pasta `mundoconcreto`).
