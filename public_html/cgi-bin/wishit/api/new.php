<?php 

require_once("core.php");

$wishlist = array(
  "name" => "New wishlist",
  "id" => md5(uniqid(rand(), true)),
  "items" => array(    
    array("order" => 1, "name" => "Partridge in a Pear Tree"),
    array("order" => 2, "name" => "Turtle Doves"),
    array("order" => 3, "name" => "French Hens"),
    array("order" => 4, "name" => "Calling Birds"),
    array("order" => 5, "name" => "Golden Rings"),
    array("order" => 6, "name" => "Geese a Laying"),
    array("order" => 7, "name" => "Swans a Swimming"),
    array("order" => 8, "name" => "Maids a Milking"),
    array("order" => 9, "name" => "Ladies Dancing"),
    array("order" => 10, "name" => "Lords a Leaping"),
    array("order" => 11, "name" => "Pipers Piping"),
    array("order" => 12, "name" => "Drummers Drumming")
  )
);

send_json($wishlist); 

?>