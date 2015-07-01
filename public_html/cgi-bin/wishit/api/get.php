<?php 

require_once("core.php");

$wid = $_GET["wid"];
$filepath = "../../../database/wishit/wishlist/{$wid}.json";

$text = file_get_contents($filepath);
$json = json_decode($text, true);
$wishlist = new Wishlist($json);

validate($wishlist);

send_json($wishlist); 

?>