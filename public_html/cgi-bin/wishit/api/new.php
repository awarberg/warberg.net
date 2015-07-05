<?php

require_once("core.php");

$json = array(
  "name" => "New wishlist",
  "publicKey" => md5(uniqid(rand(), true)),
  "items" => [
    array("name" => "Partridge in a Pear Tree"),
    array("name" => "Turtle Doves"),
    array("name" => "French Hens"),
    array("name" => "Calling Birds"),
    array("name" => "Golden Rings"),
    array("name" => "Geese a Laying"),
    array("name" => "Swans a Swimming"),
    array("name" => "Maids a Milking"),
    array("name" => "Ladies Dancing"),
    array("name" => "Lords a Leaping"),
    array("name" => "Pipers Piping"),
    array("name" => "Drummers Drumming")
  ]
);

$wishlist = Wishlist::fromJSON($json);

send_json($wishlist);

?>
