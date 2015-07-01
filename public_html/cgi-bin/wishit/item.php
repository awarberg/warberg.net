<?php 

require_once("item.php");

class Item {  

  public $name;

  public function __construct($json) {
    $this->name = $json["name"];
  }

  public function isValid(){
    if(strlen($this->name) == 0){
      return false;
    }
    return true;
  }
}

?>