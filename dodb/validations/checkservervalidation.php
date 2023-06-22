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
    $joinDate = $_POST["joindate"];
    $cutoffDate = date("2023-02-18");
    $eligible = strtotime($joinDate) >= strtotime($cutoffDate) ? "eligible" : "not eligible";
    if ($eligible == "not eligible") {
      $message["type"] = "success";
      $message["message"] = "cutoff";
      echo json_encode($message);
    } else {
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
            $message["type"] = "success";
            $message["message"] = "locked";
            $message["data"] = array_merge([$row]);
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
          // if no record is present in the etc_validation table insert the record calculating unlock_date and status
          $sql = "INSERT INTO etcvalidation (employee_id, position, unlock_date, status) VALUES (:id, :position, :unlockDate, :status)";
          $unlockDate = date("Y-m-d", strtotime($joinDate . " +13 days"));
          $today = date("Y-m-d");
          $status = strtotime($unlockDate) <= strtotime($today) ? "unlocked" : "locked";
          $stmt = $pdo->prepare($sql);
          $stmt->bindParam(':id', $user, PDO::PARAM_INT);
          $stmt->bindParam(':position', $position, PDO::PARAM_STR);
          $stmt->bindParam(':unlockDate', $unlockDate, PDO::PARAM_STR);
          $stmt->bindParam(':status', $status, PDO::PARAM_STR);
          $stmt->execute();
          if ($stmt->rowCount() == 1) {
            // add record to final validation
            $message["type"] = "success";
            $message["message"] = "added";
            $message["status"] = $status;
            $message["data"] = $unlockDate;
            echo json_encode($message);
          } else {
            // send error
            $message["type"] = "error";
            $message["message"] = "validation not added";
            echo json_encode($message);
          }
        }
      } catch (PDOException $e) {
        $message["type"] = "error";
        $message["message"] = $e->getMessage();
        echo json_encode($message);
      }
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
