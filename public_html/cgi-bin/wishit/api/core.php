<?php 

require_once("../../shared/core.php");
require_once("../../shared/json.php");
require_once("../wishlist.php");
require_once("../item.php");

function validate($wishlist){
  if(!$wishlist->isValid()){
    http_internal_error("Invalid wishlist $wid");
  }
}

function getPath($wid){ 
  return "../../../database/wishit/wishlist/{$wid}.json"; 
}

?>