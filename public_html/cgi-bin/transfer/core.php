<?php

require_once("../shared/core.php");

function getPDO(){
  $filepath =
    ".." . DIRECTORY_SEPARATOR .
    ".." . DIRECTORY_SEPARATOR .
    ".." . DIRECTORY_SEPARATOR .
    "database" . DIRECTORY_SEPARATOR .
    "transfer.db";
  $pdo = new PDO("sqlite:$filepath");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  ensureSchema($pdo);
  return $pdo;
}

function ensureSchema($pdo){
  $pdo->exec(
    "CREATE TABLE IF NOT EXISTS receiver (
      id INTEGER PRIMARY KEY,
      public_key TEXT,
      socket_name TEXT)"
  );
}

?>
