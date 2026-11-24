<?php
require __DIR__ . '/comum.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function sai(int $cod, $dados): void { http_response_code($cod); echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
function corpo_bruto(int $limite = 15 * 1024 * 1024): string { $b = file_get_contents('php://input', false, null, 0, $limite + 1); if (strlen($b) > $limite) sai(413, ['error' => 'Arquivo grande demais (máx. 15 MB).']); return $b; }
function corpo(): array { $j = json_decode(corpo_bruto(), true); return is_array($j) ? $j : []; }
function mesma_origem(): bool { $o = $_SERVER['HTTP_ORIGIN'] ?? ''; if ($o === '') return true; $h = $_SERVER['HTTP_HOST'] ?? ''; return $o === "https://$h" || $o === "http://$h"; }
function txt($v, int $n): string { return mb_substr(is_scalar($v) ? (string)$v : '', 0, $n); }
function slugify(string $t): string {
    $t = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $t) ?: $t;
    return substr(trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($t)), '-'), 0, 60);
}
function usuarios(): array { return ler(DADOS . '/usuarios.json', []); }
function confere(string $u, string $s): bool { foreach (usuarios() as $x) { if (($x['usuario'] ?? '') === $u && !empty($x['bc'])) return password_verify($s, $x['bc']); } password_hash($s, PASSWORD_BCRYPT); return false; }  // hash à toa: mesmo tempo de resposta quando o usuário não existe
function slug_unico(string $slug, array $cards, string $id): string {
    $s = $slug ?: 'card'; $n = 2;
    while (array_filter($cards, fn($c) => ($c['id'] ?? '') !== $id && ($c['slug'] ?? '') === $s)) { $s = $slug . '-' . $n++; }
    return $s;
}
function limpa_card(array $c): array {
    $l = is_array($c['landing'] ?? null) ? $c['landing'] : [];
    $l['ativa'] = ($l['ativa'] ?? true) !== false;
    foreach (['botoes', 'blocos'] as $k) { if (!is_array($l[$k] ?? null)) $l[$k] = []; }
    $v = is_array($c['vitrine'] ?? null) ? $c['vitrine'] : null;
    $out = ['title' => trim(txt($c['title'] ?? '', 120)), 'slug' => slugify(txt(($c['slug'] ?? '') ?: ($c['title'] ?? ''), 120)),
        'link' => trim(txt($c['link'] ?? '#', 500)) ?: '#', 'thumbnail' => trim(txt($c['thumbnail'] ?? '', 1000)),
        'active' => ($c['active'] ?? true) !== false, 'landing' => $l];
    if ($v !== null) $out['vitrine'] = $v;
    return $out;
}
// limite simples de tentativas, por IP
function limite(string $tipo, int $max, int $janela): bool {
    $f = DADOS . "/limite-$tipo.json"; $t = ler($f, []); $ip = $_SERVER['REMOTE_ADDR'] ?? '?'; $agora = time();
    $t[$ip] = array_values(array_filter($t[$ip] ?? [], fn($x) => $agora - $x < $janela));
    if (count($t[$ip]) >= $max) { gravar($f, $t); return false; }
    $t[$ip][] = $agora; gravar($f, $t); return true;
}

$partes = array_values(array_filter(explode('/', (string)($_GET['r'] ?? ''))));
$m = $_SERVER['REQUEST_METHOD'];
$r0 = $partes[0] ?? ''; $r1 = $partes[1] ?? null; $r2 = $partes[2] ?? null;

// ---------- primeira senha: só funciona enquanto não existe nenhum usuário ----------
if ($r0 === 'instalar' && $m === 'POST') {
    if (usuarios()) sai(403, ['error' => 'O admin já foi configurado.']);
    $b = corpo(); $u = trim(txt($b['usuario'] ?? '', 80)); $s = (string)($b['senha'] ?? '');
    if ($u === '' || mb_strlen($s) < 12) sai(400, ['error' => 'Informe usuário e senha com pelo menos 12 caracteres.']);
    gravar(DADOS . '/usuarios.json', [['usuario' => $u, 'bc' => password_hash($s, PASSWORD_BCRYPT)]]);
    sai(201, ['ok' => true]);
}
// ---------- login ----------
if ($r0 === 'entrar' && $m === 'POST') {
    if (!mesma_origem()) sai(403, ['error' => 'Pedido recusado.']);
    $b = corpo(); $u = trim(txt($b['usuario'] ?? '', 80));
    if (!limite('login', 5, 60)) sai(429, ['error' => 'Muitas tentativas. Espere um minuto e tente de novo.']);
    if (!confere($u, (string)($b['senha'] ?? ''))) sai(401, ['error' => 'Usuário ou senha incorretos.']);
    iniciar_sessao(); session_regenerate_id(true); $_SESSION['usuario'] = $u; $_SESSION['expira'] = time() + 12 * 3600;
    sai(200, ['ok' => true]);
}
if ($r0 === 'sair' && $m === 'POST') { iniciar_sessao(); $_SESSION = []; session_destroy(); sai(200, ['ok' => true]); }
if ($r0 === 'eu' && $m === 'GET') { $u = logado(); $u ? sai(200, ['usuario' => $u]) : sai(401, ['error' => 'Entre para continuar.']); }

// ---------- diagnósticos: envio público, leitura só com login ----------
if ($r0 === 'diagnosticos') {
    $dir = DADOS . '/diagnosticos';
    if ($m === 'POST' && !$r1) {
        if (!mesma_origem()) sai(403, ['error' => 'Pedido recusado.']);
        if (!limite('diag', 10, 60)) sai(429, ['error' => 'Muitos envios. Tente de novo em um minuto.']);
        $b = corpo(); $r = is_array($b['resumo'] ?? null) ? $b['resumo'] : [];
        $id = date('Y-m-d') . '-' . bin2hex(random_bytes(5));
        $cad = [];
        foreach ((is_array($b['cadastro'] ?? null) ? array_slice($b['cadastro'], 0, 40, true) : []) as $k => $v) { $cad[txt($k, 40)] = is_array($v) ? txt(json_encode($v, JSON_UNESCAPED_UNICODE), 4000) : txt($v, 300); }
        $reg = ['id' => $id, 'recebido' => gmdate('Y-m-d\TH:i:s\Z'), 'idNavegador' => txt($b['id'] ?? '', 80), 'arquivo' => txt($b['arquivo'] ?? '', 120), 'cadastro' => $cad,
            'resumo' => ['geral' => txt($r['geral'] ?? '', 20), 'classificacao' => txt($r['classificacao'] ?? '', 80), 'selo' => txt($r['selo'] ?? '', 40), 'areaCritica' => txt($r['areaCritica'] ?? '', 120),
                'areas' => array_map(fn($a) => [txt($a[0] ?? '', 120), txt($a[1] ?? '', 20)], array_slice(is_array($r['areas'] ?? null) ? $r['areas'] : [], 0, 30)),
                'plano' => array_map(fn($t) => txt($t, 400), array_slice(is_array($r['plano'] ?? null) ? $r['plano'] : [], 0, 40)),
                'oportunidades' => array_map(fn($t) => txt($t, 200), array_slice(is_array($r['oportunidades'] ?? null) ? $r['oportunidades'] : [], 0, 30))],
            'temPdf' => false];
        if (is_string($b['pdf'] ?? null) && strlen($b['pdf']) < 14e6) { $pdf = base64_decode($b['pdf'], true); if ($pdf !== false && substr($pdf, 0, 5) === '%PDF-') { file_put_contents("$dir/$id.pdf", $pdf); $reg['temPdf'] = true; } }
        gravar("$dir/$id.json", $reg);
        sai(201, ['ok' => true, 'id' => $id]);
    }
    if (!logado()) sai(401, ['error' => 'Entre para continuar.']);
    if ($m === 'GET' && !$r1) {
        $lista = [];
        foreach (glob("$dir/*.json") as $f) { $d = ler($f, null); if (!$d) continue; $c = $d['cadastro'];
            $lista[] = ['id' => $d['id'], 'recebido' => $d['recebido'], 'empresa' => $c['empresa'] ?? '', 'nome' => $c['nome'] ?? '', 'cidade' => $c['cidade'] ?? '', 'estado' => $c['estado'] ?? '', 'geral' => $d['resumo']['geral'] ?? '', 'classificacao' => $d['resumo']['classificacao'] ?? '', 'temPdf' => $d['temPdf'] ?? false]; }
        usort($lista, fn($a, $b) => strcmp($b['recebido'], $a['recebido']));
        sai(200, $lista);
    }
    if (!$r1 || !preg_match('/^[0-9a-z-]{10,40}$/', $r1) || !is_file("$dir/$r1.json")) sai(404, ['error' => 'Diagnóstico não encontrado.']);
    if ($m === 'GET' && $r2 === 'pdf') {
        if (!is_file("$dir/$r1.pdf")) sai(404, ['error' => 'Este diagnóstico não tem PDF.']);
        header('Content-Type: application/pdf'); header("Content-Disposition: inline; filename=\"$r1.pdf\""); readfile("$dir/$r1.pdf"); exit;
    }
    if ($m === 'GET') sai(200, ler("$dir/$r1.json"));
    if ($m === 'DELETE') { if (!mesma_origem()) sai(403, ['error' => 'Pedido recusado.']); @unlink("$dir/$r1.json"); @unlink("$dir/$r1.pdf"); sai(200, ['ok' => true]); }
    sai(405, ['error' => 'Método não aceito.']);
}

// ---------- tudo que altera dados exige login ----------
if ($m !== 'GET') {
    if (!logado()) sai(401, ['error' => 'Sua sessão terminou. Entre de novo.']);
    if (!mesma_origem()) sai(403, ['error' => 'Pedido recusado.']);
}

if ($r0 === 'senha' && $m === 'POST') {
    $b = corpo(); $u = logado();
    if (!confere($u, (string)($b['atual'] ?? ''))) sai(400, ['error' => 'A senha atual não confere.']);
    $nova = (string)($b['nova'] ?? '');
    if (mb_strlen($nova) < 8) sai(400, ['error' => 'A nova senha precisa ter pelo menos 8 caracteres.']);
    if ($nova === ($b['atual'] ?? '')) sai(400, ['error' => 'A nova senha precisa ser diferente da atual.']);
    $lista = array_values(array_filter(usuarios(), fn($x) => ($x['usuario'] ?? '') !== $u));
    $lista[] = ['usuario' => $u, 'bc' => password_hash($nova, PASSWORD_BCRYPT)];
    gravar(DADOS . '/usuarios.json', $lista);
    sai(200, ['ok' => true]);
}

if ($r0 === 'site') {
    $f = DADOS . '/site.json';
    if ($m === 'GET') sai(200, ler($f, ['title' => '', 'subtitle' => '']));
    if ($m === 'PUT') { $b = corpo(); $s = ['title' => txt($b['title'] ?? '', 400), 'subtitle' => txt($b['subtitle'] ?? '', 1200), 'logo' => txt($b['logo'] ?? '', 1000), 'logoAlt' => txt($b['logoAlt'] ?? '', 200)]; gravar($f, $s); sai(200, $s); }
}

if ($r0 === 'upload' && $m === 'POST') {
    $tipos = ['image/png' => '.png', 'image/jpeg' => '.jpg', 'image/webp' => '.webp', 'image/gif' => '.gif', 'image/svg+xml' => '.svg', 'image/avif' => '.avif'];
    $ct = trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]);
    if (!isset($tipos[$ct])) sai(415, ['error' => 'Formato não aceito. Use PNG, JPG, WEBP, GIF, AVIF ou SVG.']);
    $buf = corpo_bruto();
    if ($ct === 'image/svg+xml' && preg_match('/<script|on\w+\s*=|javascript:/i', $buf)) sai(415, ['error' => 'SVG com código não é aceito.']);
    $nome = time() . '-' . bin2hex(random_bytes(4)) . $tipos[$ct];
    file_put_contents(PUB . "/uploads/$nome", $buf);
    sai(201, ['url' => "/uploads/$nome"]);
}

if ($r0 === 'cards') {
    $f = DADOS . '/cards.json'; $cards = ler($f, []);
    if (!$r1 && $m === 'GET') sai(200, $cards);
    if (!$r1 && $m === 'POST') { $h = bin2hex(random_bytes(16)); $id = substr($h, 0, 8) . '-' . substr($h, 8, 4) . '-' . substr($h, 12, 4) . '-' . substr($h, 16, 4) . '-' . substr($h, 20);
        $c = ['id' => $id] + limpa_card(corpo()); $c['slug'] = slug_unico($c['slug'], $cards, $id); if ($c['title'] === '') sai(400, ['error' => 'Informe o título.']); $cards[] = $c; gravar($f, $cards); sai(201, $c); }
    if ($r1 === 'order' && $m === 'PUT') { $ids = corpo()['ids'] ?? []; $mapa = []; foreach ($cards as $c) $mapa[$c['id']] = $c; $out = [];
        foreach ($ids as $i) if (isset($mapa[$i])) { $out[] = $mapa[$i]; unset($mapa[$i]); } foreach ($mapa as $c) $out[] = $c; gravar($f, $out); sai(200, $out); }
    $i = null; foreach ($cards as $k => $c) if ($c['id'] === $r1) $i = $k;
    if ($i === null) sai(404, ['error' => 'Card não encontrado.']);
    if ($m === 'PUT') { $cards[$i] = ['id' => $r1] + limpa_card(array_merge($cards[$i], corpo())); $cards[$i]['slug'] = slug_unico($cards[$i]['slug'], $cards, $r1); gravar($f, $cards); sai(200, $cards[$i]); }
    if ($m === 'DELETE') { $rm = $cards[$i]; array_splice($cards, $i, 1); gravar($f, $cards);
        $th = $rm['thumbnail'] ?? ''; if (str_starts_with($th, '/uploads/') && !in_array($th, array_column($cards, 'thumbnail'), true)) @unlink(PUB . '/uploads/' . basename($th));
        sai(200, ['ok' => true]); }
}
sai(404, ['error' => 'Rota não encontrada.']);
