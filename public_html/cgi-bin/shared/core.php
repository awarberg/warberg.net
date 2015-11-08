<?php

//error_reporting(E_STRICT);

function coalesce(&$value, $defaultValue = NULL){
  return isset($value) ? $value : $defaultValue;
}

function html_var_dump($obj){
  echo '<pre>' . var_export($obj, true) . '</pre>';
}

function http_internal_error($msg){
  header("HTTP/1.1 500 Internal Server Error");
  echo $msg;
}

function http_error_handler($errNo, $errStr, $errFile, $errLine) {
  $msg = "$errStr in $errFile on line $errLine";
  http_internal_error($msg);
  throw new ErrorException($msg, $errNo);
}

set_error_handler('http_error_handler');

date_default_timezone_set('UTC');

?>
