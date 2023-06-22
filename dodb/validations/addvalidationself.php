<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    // grab the data sent from storyline user and position
    try {
      $user = intval($_POST["user"]);
      $position = $_POST["position"];
      $today = $_POST["today"];
      $status = "unlocked";
      $statementId = $_POST["statement"];
      $sql = "INSERT INTO etcvalidation (employee_id, position, unlock_date, status, statement1) VALUES (:id, :position, :date, :status, :statement)";
      $stmt = $pdo->prepare($sql);
      // bind parameters
      $stmt->bindParam(":id", $user, PDO::PARAM_INT);
      $stmt->bindParam(":position", $position, PDO::PARAM_STR);
      $stmt->bindParam(":date", $today, PDO::PARAM_STR);
      $stmt->bindParam(":status", $status, PDO::PARAM_STR);
      $stmt->bindParam(":statement", $statementId, PDO::PARAM_STR);
      $stmt->execute();
      if ($stmt->rowCount() == 1) {
        $message["type"] = "success";
        $message["message"] = "Validation added successfully";
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
