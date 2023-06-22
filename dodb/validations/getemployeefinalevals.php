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
      $sql = "SELECT employee_id, position, unlock_date, status FROM etcvalidation WHERE employee_id = :id";
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(":id", $user, PDO::PARAM_INT);
      $stmt->execute();
      // count the number of rows returned
      $rows = $stmt->rowCount();
      // fetch the data
      $data = $stmt->fetchAll();
      if ($rows > 0) {
        $message["type"] = "success";
        $message["message"] = "validations exist";
        // add the number of rows to the response
        $message["rows"] = $rows;
        // add the data to the respoonse
        $message["data"] = $data;
        echo json_encode($message);
      } else {
        $message["type"] = "success";
        $message["message"] = "no validations";
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
