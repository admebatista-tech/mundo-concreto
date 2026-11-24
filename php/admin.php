<?php
require __DIR__ . '/comum.php';
if (!logado()) { header('Location: ' . base_url() . '/entrar'); exit; }
header('Cache-Control: no-store');
readfile(PUB . '/admin.html');
