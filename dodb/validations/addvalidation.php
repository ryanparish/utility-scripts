<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

function whichTable($position)
{
  switch ($position) {
    case "backup":
      return "backup";
      break;
    case "dish":
      return "dish";
      break;
    case "grill":
      return "grill";
      break;
    case "host":
      return "host";
      break;
    case "maintenance":
      return "maintenance";
      break;
    case "prep":
      return "prep";
      break;
    case "retail":
      return "retail";
      break;
    case "server":
      return "server";
      break;
    case "toGo":
      return "toGo";
      break;
    default:
      return "unknown";
      break;
  }
}

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    // grab the data sent from storyline user and position
    try {
      $user = intval($_POST["user"]);
      $validator = $_POST["validator"];
      $position = $_POST["position"];
      $today = $_POST["today"];
      $statementId = $_POST["statement"];
      // find what to do based on position
      $table = whichTable($position);
      // check how many validations are in the current posiiton table for this employee (if this is the thtis insert trigger an insert into the ETC validation table)
      $countSql = "SELECT COUNT(*) FROM $position WHERE employee_id = :id";
      $countStmt = $pdo->prepare($countSql);
      // bind param
      $countStmt->bindParam(":id", $user, PDO::PARAM_INT);
      $countStmt->execute();
      $count = $countStmt->fetchColumn();
      if ($count == 2) {
        $stmtSql = "SELECT statement_id FROM $position WHERE employee_id = :id ORDER BY validation_date";
        $stmtStmt = $pdo->prepare($stmtSql);
        $stmtStmt->bindParam(":id", $user, PDO::PARAM_STR);
        $stmtStmt->execute();
        $statementIds = $stmtStmt->fetchAll();
        $statementId1 = $statementIds[0]["statement_id"];
        $statementId2 = $statementIds[1]["statement_id"];
        $unlockDate = date("y-m-d", strtotime($today . " + 10 days"));
        $status = "locked";
        $etcSql = "INSERT INTO etcvalidation (employee_id, position, unlock_date, status, statement1, statement2, statement3) VALUES (:id, :position, :unlockDate, :status, :statement1, :statement2, :statement3)";
        $etcStmt = $pdo->prepare($etcSql);
        // bind parameters
        $etcStmt->bindParam(":id", $user, PDO::PARAM_INT);
        $etcStmt->bindParam(":position", $position, PDO::PARAM_STR);
        $etcStmt->bindParam(":unlockDate", $unlockDate, PDO::PARAM_STR);
        $etcStmt->bindParam(":status", $status, PDO::PARAM_STR);
        $etcStmt->bindParam(":statement1", $statementId1, PDO::PARAM_STR);
        $etcStmt->bindParam(":statement2", $statementId2, PDO::PARAM_STR);
        $etcStmt->bindParam(":statement3", $statementId, PDO::PARAM_STR);
        $etcStmt->execute();
        $sql = "INSERT INTO $table (employee_id, validator_name, validation_date, statement_id) VALUES (:id, :validator, :date, :statementId)";
        $stmt = $pdo->prepare($sql);
        // bind parameters
        $stmt->bindParam(":id", $user, PDO::PARAM_INT);
        $stmt->bindParam("validator", $validator, PDO::PARAM_STR);
        $stmt->bindParam(":date", $today, PDO::PARAM_STR);
        $stmt->bindParam("statementId", $statementId, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() == 1) {
          $message["type"] = "success";
          $message["message"] = "Validation added successfully and ETC record created";
          echo json_encode($message);
        } 
      } else {
        $sql = "INSERT INTO $table (employee_id, validator_name, validation_date, statement_id) VALUES (:id, :validator, :date, :statementId)";
        $stmt = $pdo->prepare($sql);
        // bind parameters
        $stmt->bindParam(":id", $user, PDO::PARAM_INT);
        $stmt->bindParam("validator", $validator, PDO::PARAM_STR);
        $stmt->bindParam(":date", $today, PDO::PARAM_STR);
        $stmt->bindParam("statementId", $statementId, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() == 1) {
          $message["type"] = "success";
          $message["message"] = "Validation added successfully";
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
