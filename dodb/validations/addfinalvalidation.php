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
      $statementId = $_POST["statement"];
      $status = 'processing';
      $today = date('Y-m-d');
      // update the etc validation table with the statement 4 id and set status to processing
      $sql = "UPDATE etcvalidation SET statement4 = :statementid, status = :status, final_val_date = :today WHERE employee_id = :id AND position = :position";
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(":statementid", $statementId, PDO::PARAM_STR);
      $stmt->bindParam(":status", $status, PDO::PARAM_STR);
      $stmt->bindParam(":id", $user, PDO::PARAM_INT);
      $stmt->bindParam(":position", $position, PDO::PARAM_STR);
      $stmt->bindParam(":today", $today, PDO::PARAM_STR);
      $stmt->execute();
      if ($stmt->rowCount() == 1) {
        $message["type"] = "success";
        $message["message"] = "etc validation record updated";
        echo json_encode($message);
      } else {
        $message["type"] = "error";
        $message["message"] = "etc validation not updated";
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
