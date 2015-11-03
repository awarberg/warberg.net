<?php

require_once("core.php");

$json = array(
  "name" => "New wishlist",
  "publicKey" => md5(uniqid(rand(), true)),
  "items" => [
    array("name" => "Partridge in a Pear Tree"),
    array("name" => "Turtle Doves"),
    array("name" => "French Hens")
  ]
);

$wishlist = Wishlist::fromJSON($json);

send_json($wishlist);

?>
