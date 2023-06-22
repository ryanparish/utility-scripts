<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

function feedbackType($feedbackId)
{
  switch ($feedbackId) {
    case "bugs":
      return "feedbackBugs";
      break;
    case "rating":
      return "feedbackRating";
      break;
    case "ideas":
      return "feedbackIdeas";
      break;
    case "comments":
      return "feedbackComments";
      break;
    default:
      return "unknown";
      break;
  }
}


if ($pdo) {
  //try {
    if (isset($_POST) && !empty($_POST)) {
      $user = intval($_POST["user"]);
      $comments = $_POST["comments"];
      $feedbackId = $_POST["feedbackId"];
      // find what insert to do based on game unique value
      $table = feedbackType($feedbackId);
      // check if either function returned unknown table
      if ($table == "unknown") {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing feedback type";
        echo json_encode($message);
      } else {
        $sql = "INSERT INTO $table (employeeID, comments) VALUES (?, ?);";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user, $comments]);
        $message["type"] = "success";
        $message["message"] = "Comments added successfully";
        echo json_encode($message);
      }
    } else {
      $message["type"] = "error";
      $message["message"] = "Internal Error. Please try again";
      echo json_encode($message);
    }
  //} catch (PDOException $e) {
   // $message["type"] = "error";
    //$message["message"] = $e->getMessage();
    //echo json_encode($message);
  //}
} else {
  $message["type"] = "error";
  $message["message"] = "Could not connect to the database";
  echo json_encode($message);
}
