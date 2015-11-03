<?php

require_once("../../lib/RedBeanPHP/rb.php");

require_once("../../shared/core.php");
require_once("../../shared/json.php");
require_once("../wishlist.php");
require_once("../item.php");

function coalesce(&$value, $defaultValue = NULL){
  return isset($value) ? $value : $defaultValue;
}

function html_var_dump($obj){
  echo '<pre>' . var_export($obj, true) . '</pre>';
}

function validate($wishlist){
  if(!$wishlist->isValid()){
    http_internal_error("Invalid wishlist $wishlist->publicKey");
  }
}

function getPDO(){
    $filepath =
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      "database" . DIRECTORY_SEPARATOR .
      "wishit.db";
    $pdo = new PDO("sqlite:$filepath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    ensureSchema($pdo);
    return $pdo;
}

function ensureSchema($pdo){
  $pdo->exec(
    "CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY,
      public_key TEXT,
      name TEXT)"
  );

  $pdo->exec(
    "CREATE TABLE IF NOT EXISTS item (
      id INTEGER PRIMARY KEY,
      wishlist_id INTEGER,
      name TEXT,
      priority INTEGER,
      FOREIGN KEY(wishlist_id) REFERENCES wishlist(id) ON DELETE CASCADE)"
  );
}

function setupRedBean() {
    $filepath =
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      ".." . DIRECTORY_SEPARATOR .
      "database" . DIRECTORY_SEPARATOR .
      "wishit.db";
  return R::setup("sqlite:$filepath");
}

?>
