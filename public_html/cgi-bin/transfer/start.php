<?php

require_once("core.php");

$receiverEmail = $_REQUEST["receiverEmail"];

$publicKey = md5(uniqid(rand(), true));
$receiveUrl = $_SERVER['HTTP_ORIGIN'] . '/cgi-bin/transfer/receive.php?key=' . $publicKey;
$headers = 'From: unmonitored@warberg.net';
mail($receiverEmail, 'File transfer', $receiveUrl, $headers);

echo $publicKey;

?>
