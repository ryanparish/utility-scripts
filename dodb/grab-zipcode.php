<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();
$info = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $store = $_POST["store"];
    try {
      $zipquery = $pdo->prepare("SELECT zip FROM store WHERE storeNum = $store;");
      $zipquery->execute();
      $zipcode = $zipquery->fetch();
      $message["type"] = "success";
      $message["message"] = $zipcode;
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
