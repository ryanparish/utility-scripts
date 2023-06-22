<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("db.php");

// setup the db connection and the message array
$pdo = db();
$message = array();

// parse out what table we need to get the proficiencies from based on the job sent in the request
function whichPositionProficiency($job)
{
  switch ($job) {
    case "backup":
      return "rsBackup";
      break;
    case "dish":
      return "rsDish";
      break;
    case "grill":
      return "rsGrill";
      break;
    case "host":
      return "rsHost";
      break;
    case "maintenance":
      return "rsMaintenance";
      break;
    case "prep":
      return "rsPrep";
      break;
    case "retail":
      return "rsRetail";
      break;
    case "server":
      return "rsServer";
      break;
    case "toGo":
      return "rsToGo";
      break;
    default:
      return "unknown";
      break;
  }
}


if ($pdo) {
  try {
    if (isset($_POST) && !empty($_POST)) {
      $position = ($_POST["position"]);
      // find what insert to do based on game unique value
      $proficiencyTable = whichPositionProficiency($position);
      if ($proficiencyTable == "unknown") {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing position";
        echo json_encode($message);
      } else {
        // grab all proficiencies from the given position tables
        $stmt = $pdo->prepare("SELECT id, description FROM $proficiencyTable");
        $stmt->execute();
        $proficiencies = $stmt->fetchAll();
       
        // put the data in the message response
        $message["type"] = "success";
        $message["proficiencies"] = $proficiencies;
        echo json_encode($message);
      }
    } else {
      // data was not posted
      $message["type"] = "error";
      $message["message"] = "Internal Error. Please try again";
      echo json_encode($message);
    }
  } catch (PDOException $e) {
    // there was a query error
    $message["type"] = "error";
    $message["message"] = $e->getMessage();
    echo json_encode($message);
  }
} else {
  // there was an error connecting to the db
  $message["type"] = "error";
  $message["message"] = "Could not connect to the database";
  echo json_encode($message);
}
