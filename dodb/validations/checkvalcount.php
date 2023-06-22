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
    // grab the data sent from storyline user and position
    $user = intval($_POST["user"]);
    $position = $_POST["position"];
    try {
      $sql = "SELECT COUNT(*) AS valcount, MAX(validation_date) as last_insertion from $position WHERE employee_id = :id";
      $stmt = $pdo->prepare($sql);
      // bind parameters
      $stmt->bindParam(":id", $user, PDO::PARAM_INT);
      $stmt->execute();
      $data = $stmt->fetch();
      $message["type"] = "success";
      $message["valcount"] = $data["valcount"];
      $message["lastinsertion"] = $data["last_insertion"];
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
