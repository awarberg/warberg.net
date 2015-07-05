<?php

class Item {

  protected $id;
  public $name;
  public $priority;

  public function isValid(){
    if(strlen($this->name) == 0){
      return false;
    }
    return true;
  }

  public static function fromJSON($json) {
    $item = new Item();
    $item->name = coalesce($json["name"]);
    $item->priority = coalesce($json["priority"]);
    return $item;
  }

  public static function fromResult($result){
    $item = new Item();
    $item->id = $result["id"];
    $item->name = $result["name"];
    $item->priority = $result["priority"];
    return $item;
  }
}

?>
