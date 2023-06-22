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
    $user = intval($_POST["user"]);
    $position = $_POST["position"];
    // query the etc_validation table for any records that match the employee_id and position
    try {
      $sql = "SELECT * FROM etcvalidation WHERE employee_id = :id AND position = :position";
      $stmt = $pdo->prepare($sql);
      // bind parameters
      $stmt->bindParam(":id", $user, PDO::PARAM_INT);
      $stmt->bindParam(":position", $position, PDO::PARAM_STR);
      $stmt->execute();
      if ($stmt->rowCount() > 0) {
        // if a record is present in the final_validation table, check if unlock_date is > today
        $row = $stmt->fetch();
        $unlock_date = $row['unlock_date'];
        $status = $row["status"];
        $today = date('Y-m-d');
        if ($unlock_date > $today) {
          // If unlock_date is > today, query the matching position table for all records for that employee_id
          $sql = "SELECT * FROM $position WHERE employee_id = :id ORDER BY validation_date";
          $stmt = $pdo->prepare($sql);
          $stmt->bindParam(':id', $user, PDO::PARAM_INT);
          $stmt->execute();
          // if records are present in the matching position table, return both the final_validation record and those records
          $rows = $stmt->fetchAll();
          $message["type"] = "success";
          $message["message"] = "locked";
          $message["data"] = array_merge([$row], $rows);
          echo json_encode($message);
        } else {
          if ($status == "processing" || $status == "complete") {
            $message["type"] = "success";
            $message["message"] = $status;
            $message["data"] = [$row];
            echo json_encode($message);
          } else {
            // If unlock_date is <= today, return the record from the final_validation table
            $message["type"] = "success";
            $message["message"] = "unlocked";
            $message["data"] = [$row];
            echo json_encode($message);
          }
        }
      } else {
        // if no record is present in the etc_validation table, query the matching position table
        $sql = ("SELECT * FROM $position WHERE employee_id = :id ORDER BY validation_date");
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $user);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
          // if records are present in the matching position table, return those records
          $records = $stmt->fetchAll();
          $message["type"] = "success";
          $message["message"] = "no";
          $message["data"] = $records;
          echo json_encode($message);
        } else {
          // if no records are present in either table, return an empty result
          $message["type"] = "success";
          $message["message"] = "no validations";
          echo json_encode($message);
        }
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
