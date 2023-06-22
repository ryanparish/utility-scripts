<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();
//$info = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $user = $_POST["user"];
    try {
      $spotstmt = $pdo->prepare("SELECT lastPlayed FROM spotTheDifference WHERE employeeID = $user;");
      $spotstmt->execute();
      $spotdata = $spotstmt->fetch();
      if (!$spotdata) {
        $message["type"] = "success";
        $message["message"] = "never";
        echo json_encode($message);
      } else {
        $message["type"] = "success";
        $message["message"] = $spotdata["lastPlayed"];
        echo json_encode($message);
      }
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
