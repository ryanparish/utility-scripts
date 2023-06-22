<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();
$info = array();

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $user = $_POST["user"];
    try {
      $spotstmt = $pdo->prepare("SELECT totalPoints, gamesPlayed FROM spotTheDifference WHERE employeeID = $user;");
      $spotstmt->execute();
      $spotdata = $spotstmt->fetch();
      if (!$spotdata) {
        $spotPoints = "0";
        $spotPlayed = "0";
        $spotTotals = array("spotpoints" => $spotPoints, "spotplayed" => $spotPlayed);
        $info["spot"] = $spotTotals;
      } else {
        $spotPoints = $spotdata["totalPoints"];
        $spotPlayed = $spotdata["gamesPlayed"];
        $spotTotals = array("spotpoints" => $spotPoints, "spotplayed" => $spotPlayed);
        $info["spot"] = $spotTotals;
      }
      $togotrisstmt = $pdo->prepare("SELECT totalPoints, gamesPlayed FROM toGoTris WHERE employeeID = $user;");
      $togotrisstmt->execute();
      $togotrisdata = $togotrisstmt->fetch();
      if (!$togotrisdata) {
        $togotrisPoints = "0";
        $togotrisPlayed = "0";
        $togotrisTotals = array("togotrispoints" => $togotrisPoints, "togotrisplayed" => $togotrisPlayed);
        $info["togotris"] = $togotrisTotals;
      } else {
        $togotrisPoints = $togotrisdata["totalPoints"];
        $togotrisPlayed = $togotrisdata["gamesPlayed"];
        $togotrisTotals = array("togotrispoints" => $togotrisPoints, "togotrisplayed" => $togotrisPlayed);
        $info["togotris"] = $togotrisTotals;
      }
      $crosswordstmt = $pdo->prepare("SELECT totalPoints, gamesPlayed FROM crossword WHERE employeeID = $user;");
      $crosswordstmt->execute();
      $crossworddata = $crosswordstmt->fetch();
      if (!$crossworddata) {
        $crosswordPoints = "0";
        $crosswordPlayed = "0";
        $crosswordTotals = array("crosswordpoints" => $crosswordPoints, "crosswordplayed" => $crosswordPlayed);
        $info["crossword"] = $crosswordTotals;
      } else {
        $crosswordPoints = $crossworddata["totalPoints"];
        $crosswordPlayed = $crossworddata["gamesPlayed"];
        $crosswordTotals = array("crosswordpoints" => $crosswordPoints, "crosswordplayed" => $crosswordPlayed);
        $info["crossword"] = $crosswordTotals;
      }
      $message["type"] = "success";
      $message["message"] = $info;
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
} else {
  $message["type"] = "error";
  $message["message"] = "Could not connect to the database";
  echo json_encode($message);
}
