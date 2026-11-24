<?php
require __DIR__ . '/comum.php';
if (logado()) { header('Location: ' . base_url() . '/admin'); exit; }
readfile(PUB . '/entrar.html');
