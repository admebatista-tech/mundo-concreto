<?php
// MUNDO CONCRETO — versão PHP do servidor (Hostinger, farol.pro/mundoconcreto). Espelha o server.js local.
declare(strict_types=1);
const RAIZ = __DIR__ . '/..';
const PUB = RAIZ . '/public';
const DADOS = RAIZ . '/dados';
const INICIAL = RAIZ . '/dados-inicial';

// Primeira execução: copia os dados iniciais (dados/ não vai para o Git, para atualizar sem apagar o que foi editado)
if (!is_dir(DADOS)) { mkdir(DADOS, 0750, true); }
if (!is_dir(DADOS . '/diagnosticos')) { mkdir(DADOS . '/diagnosticos', 0750, true); }
if (!is_file(DADOS . '/.htaccess')) { file_put_contents(DADOS . '/.htaccess', "Require all denied\n"); }
foreach (['cards.json', 'site.json'] as $f) {
    if (!is_file(DADOS . "/$f") && is_file(INICIAL . "/$f")) { copy(INICIAL . "/$f", DADOS . "/$f"); }
}
if (!is_dir(PUB . '/uploads')) { mkdir(PUB . '/uploads', 0755, true); }

function base_url(): string { return rtrim(str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME']))), '/'); }
function iniciar_sessao(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_name('mc_sessao');
    session_set_cookie_params(['lifetime' => 0, 'path' => (base_url() ?: '') . '/', 'secure' => !empty($_SERVER['HTTPS']), 'httponly' => true, 'samesite' => 'Strict']);
    session_start();
    if (!empty($_SESSION['expira']) && $_SESSION['expira'] < time()) { $_SESSION = []; }
    if (!empty($_SESSION['usuario'])) { $_SESSION['expira'] = time() + 12 * 3600; }
}
function logado(): ?string { iniciar_sessao(); return $_SESSION['usuario'] ?? null; }
function ler(string $f, $padrao = []) { $s = @file_get_contents($f); if ($s === false) return $padrao; $j = json_decode($s, true); return $j === null ? $padrao : $j; }
function gravar(string $f, $v): void { $t = $f . '.tmp'; file_put_contents($t, json_encode($v, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX); rename($t, $f); }
