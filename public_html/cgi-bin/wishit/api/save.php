<?php

require_once("core.php");

$text = file_get_contents('php://input');
$json = json_decode($text, true);
$wishlist = Wishlist::fromJSON($json);
validate($wishlist);

$pdo = getPDO();

$pdo->beginTransaction();

$sth = $pdo->prepare(
  "insert into wishlist (public_key,name) values (?,?)"
);
$sth->execute([
   $wishlist->publicKey,
   $wishlist->name]
);
$wishlistId = $pdo->query("select last_insert_rowid()")->fetchColumn();

$sth = $pdo->prepare(
  "insert into item (wishlist_id,name,priority) values (?,?,?)"
);

foreach ($wishlist->items as $item) {
  $sth->execute([$wishlistId, $item->name, $item->priority]);
}

$pdo->commit();

?>
