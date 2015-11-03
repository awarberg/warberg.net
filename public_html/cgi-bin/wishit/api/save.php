<?php

require_once("core.php");

$text = file_get_contents('php://input');
$json = json_decode($text, true);
$wishlist = Wishlist::fromJSON($json);
validate($wishlist);

$redbean = setupRedBean();

$persistedWishlist = R::findOne("wishlist", "public_key = ?", [$wishlist->publicKey]);

if($persistedWishlist == NULL) {
  $persistedWishlist = R::dispense("wishlist");
}

$persistedWishlist->name = $wishlist->name;
$persistedWishlist->public_key = $wishlist->publicKey;

$persistedWishlist->xownItemList = [];
foreach($wishlist->items as $item) {
  $persistedItem = R::dispense("item");
  $persistedItem->name = $item->name;
  $persistedItem->priority = $item->priority;
  $persistedWishlist->xownItemList[] = $persistedItem;
}

$id = R::store($persistedWishlist);

?>
