<?php 

require_once("core.php");

$wid = $_GET["wid"];
$text = file_get_contents('php://input');
$json = json_decode($text, true);
$wishlist = new Wishlist($json);

validate($wishlist);

$filepath = getPath($wid);
file_put_contents($filepath, json_encode($wishlist, JSON_PRETTY_PRINT));

?>