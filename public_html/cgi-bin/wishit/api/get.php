<?php

require_once("core.php");

if(!($publicKey = coalesce($_GET["publicKey"]))){
  throw new ErrorException("Missing parameter 'publicKey'");
}

$pdo = getPDO();

$sth = $pdo->prepare(
  "select *
     from wishlist
    where public_key = ?
    order by id desc
    limit 1"
);
$sth->execute([$publicKey]);
$result = $sth->fetch(PDO::FETCH_ASSOC);

$wishlist = Wishlist::fromResult($result);

$sth = $pdo->prepare(
  "select *
     from item
    where wishlist_id = ?"
);
$sth->execute(array($result["id"]));
$results = $sth->fetchAll(PDO::FETCH_ASSOC);
$wishlist->items = array_map(
  "Item::fromResult",
  $results
);

validate($wishlist);

send_json($wishlist);

?>
