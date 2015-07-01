<?php 

require_once("core.php");

function send_json($data){
  header('Content-Type: application/json');
  echo json_encode($data);
}

?>