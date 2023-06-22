
<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();
$info = array();

if ($pdo) {
    try {
      $rating =$pdo->prepare("SELECT AVG(rating) AS averageRating FROM feedbackRating WHERE rating <> 0;");
      $rating->execute();
      $arcadeRating = $rating->fetch();
      $message["type"] = "success";
      $message["message"] = $arcadeRating;
      echo json_encode($message);
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
