<?php

require_once("item.php");

class Wishlist {

  protected $id;
  public $publicKey;
  public $name;
  public $items;

  public function isValid(){
    if(strlen($this->publicKey) == 0){
      return false;
    }
    if(strlen($this->name) == 0){
      return false;
    }
    foreach($this->items as $item){
      if(!$item->isValid()){
        return false;
      }
    }
    return true;
  }

  public static function fromJSON($json) {
    $wishlist = new Wishlist();
    $wishlist->publicKey = coalesce($json["publicKey"]);
    $wishlist->name = $json["name"];
    $wishlist->items = array_map(
      "Item::fromJSON",
      $json["items"]
    );
    return $wishlist;
  }

  public static function fromResult($result){
    $wishlist = new Wishlist();
    $wishlist->id = $result["id"];
    $wishlist->publicKey = $result["public_key"];
    $wishlist->name = $result["name"];
    return $wishlist;
  }
}

?>
