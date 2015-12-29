<?php

require_once("core.php");

$key = $_REQUEST["key"];

if(!$key) {
  throw new InvalidArgumentException("key not found");
}

$pdo = getPDO();
$sth = $pdo->prepare("select socket_name from receiver where public_key = ? order by id desc limit 1");
$sth->execute([$key]);
$receiver = $sth->fetch();

if($receiver){
  http_response_code(200);
} else {
  http_response_code(204);
}

?>
