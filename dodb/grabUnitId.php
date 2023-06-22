<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./storeServer/db.php");

$pdo = db();
$message = array();
$info = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $store = $_POST["store"];
    try {
      $unitquery = $pdo->prepare("SELECT unit FROM store WHERE store = $store;");
      $unitquery->execute();
      $unit = $unitquery->fetch();
      $message["type"] = "success";
      $message["message"] = $unit;
      echo json_encode($message);
    } catch (PDOException $e) {
      $message["type"] = "error";
      $message["message"] = $e->getMessage();
      echo json_encode($message);
    }
  } else {
    $message["type"] = "error";
    $message["message"] = "Internal Error. Please try again";
    echo json_encode($message);
  }
} else {
  $message["type"] = "error";
  $message["message"] = "Could not connect to the database";
  echo json_encode($message);
}
