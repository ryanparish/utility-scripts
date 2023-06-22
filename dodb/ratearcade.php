<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

function whichFeedbackTable($feedbackId)
{
  switch ($feedbackId) {
    case "rating":
      return "feedbackRating";
      break;
    default:
      return "unknown";
      break;
  }
}


if ($pdo) {
  try {
    if (isset($_POST) && !empty($_POST)) {
      $user = intval($_POST["user"]);
      $rating = intval($_POST["rating"]);
      $feedbackId = $_POST["feedbackId"];
      // find what insert to do based on game unique value
      $table = whichFeedbackTable($feedbackId);
      // check if either function returned unknown table
      if ($table == "unknown") {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing feedback type";
        echo json_encode($message);
      } else {
        $stmt = $pdo->prepare("INSERT INTO $table VALUES ($user, $rating) ON DUPLICATE KEY UPDATE rating = $rating");
        $stmt->execute();
        $message["type"] = "success";
        $message["message"] = "Rating added successfully";
        echo json_encode($message);
      }
    } else {
      $message["type"] = "error";
      $message["message"] = "Internal Error. Please try again";
      echo json_encode($message);
    }
  } catch (PDOException $e) {
    $message["type"] = "error";
    $message["message"] = $e->getMessage();
    echo json_encode($message);
  }
} else {
  $message["type"] = "error";
  $message["message"] = "Could not connect to the database";
  echo json_encode($message);
}
