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
      return "backupProfs";
      break;
    case "dish":
      return "dishProfs";
      break;
    case "grill":
      return "grillProfs";
      break;
    case "host":
      return "hostProfs";
      break;
    case "maintenance":
      return "maintenanceProfs";
      break;
    case "prep":
      return "prepProfs";
      break;
    case "retail":
      return "retailProfs";
      break;
    case "server":
      return "serverProfs";
      break;
    case "toGo":
      return "toGoProfs";
      break;
    default:
      return "unknown";
      break;
  }
}

// parse out what table we need to get the activities from based on the job sent in the request
function whichPositionActivity($job)
{
  switch ($job) {
    case "backup":
      return "backupActivities";
      break;
    case "dish":
      return "dishActivities";
      break;
    case "grill":
      return "grillActivities";
      break;
    case "host":
      return "hostActivities";
      break;
    case "maintenance":
      return "maintenanceActivities";
      break;
    case "prep":
      return "prepActivities";
      break;
    case "retail":
      return "retailActivities";
      break;
    case "server":
      return "serverActivities";
      break;
    case "toGo":
      return "togoActivities";
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
      $activityTable = whichPositionActivity($position);
      // check if activity returned an unknown
      if ($proficiencyTable == "unknown" || $activityTable == 'unknown') {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing position";
        echo json_encode($message);
      } else {
        // grab all proficiencies and activities from the given position tables
        $stmt = $pdo->prepare("SELECT profId, proficiency, description FROM $proficiencyTable");
        $stmt->execute();
        $proficiencies = $stmt->fetchAll();
        $stmt2 = $pdo->prepare("SELECT skillId, activityName, activityType FROM $activityTable");
        $stmt2->execute();
        $activities = $stmt2->fetchAll();
        // put the data in the message response
        $message["type"] = "success";
        $message["activities"] = $activities;
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
