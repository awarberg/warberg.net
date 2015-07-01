<?php 

require_once("item.php");

class Wishlist {  

  public $id;
  public $name;
  public $items;

  public function __construct($json) {
    $this->id = $json["id"];
    $this->name = $json["name"];
    $this->items = array_map(
      function($itemJson){ return new Item($itemJson); }, 
      $json["items"]
    );
  }

  public function isValid(){
    if(strlen($this->id) == 0){
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
}

?>