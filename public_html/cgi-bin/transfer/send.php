<?php

require_once("core.php");

$key = $_REQUEST["key"];

if(!$key) {
  throw new InvalidArgumentException("key not found");
}

$pdo = getPDO();
$sth = $pdo->prepare("select socket_name from receiver where public_key = ? order by id desc limit 1");
$sth->execute([$key]);
$receiver = $sth->fetch();

if($receiver){
  $socketName = $receiver['socket_name'];
  if (!($client = stream_socket_client($socketName, $errno, $errorMessage, 10))) {
      throw new UnexpectedValueException("Failed to connect: $errorMessage ($errno)");
  }
  $headers = getallheaders();
  $filename = $headers['X-Filename'];
  $input = fopen('php://input', 'r');
  fwrite($client, $filename . PHP_EOL);
  stream_copy_to_stream($input, $client);
  fclose($client);
  fclose($input);
} else {
  // Waiting for receiver
  http_response_code(204);
}

?>
