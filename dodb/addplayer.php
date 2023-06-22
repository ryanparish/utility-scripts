<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $user = $_POST["user"];
    $store = $_POST["store"];
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    try {
      $stmt = $pdo->prepare("INSERT INTO player (employeeID, storeNum, firstName, lastName) VALUES ('$user', '$store', '$fname', '$lname') ON DUPLICATE KEY UPDATE storeNum = '$store', firstName = '$fname', lastName = '$lname'");
      $stmt->execute();
      if ($stmt->rowCount() == 0) {
        $message["type"] = "success";
        $message["message"] = "User already exists";
        echo json_encode($message);
      }
      if ($stmt->rowCount() == 1) {
        $message["type"] = "success";
        $message["message"] = "User added successfully";
        echo json_encode($message);
      }
      if ($stmt->rowCount() == 2) {
        $message["type"] = "success";
        $message["message"] = "User updated successfully";
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
