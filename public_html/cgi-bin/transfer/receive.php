<?php

require_once("core.php");

$key = $_GET["key"];

if(!$key) {
  throw new InvalidArgumentException("key not found");
}

if ($_SERVER['DOCUMENT_ROOT'] == 'C:\\PROJECTS\\warberg.net\\public_html'){
  // development environment
  $hostname = '127.0.0.1';
} else {
  $hostname = gethostname();
}

$server = stream_socket_server("tcp://$hostname:0");
$socketName = stream_socket_get_name($server, false);

$pdo = getPDO();
$sth = $pdo->prepare("insert into receiver (public_key,socket_name) values (?,?)");
$sth->execute([$key, $socketName]);

try {
  $client = stream_socket_accept($server, 10);
  $output = fopen('php://output', 'w');
  $filename = trim(fgets($client));
  header('Content-Type: application/octet-stream');
  header("Content-Disposition: attachment; filename=\"$filename\"");
  stream_copy_to_stream($client, $output);
  fclose($client);
  fclose($output);
} finally  {
  fclose($server);
  $sth = $pdo->prepare("delete from receiver where public_key = ?");
  $sth->execute([$key]);
}

?>
