<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();
$info = array();

function whichSpotTable($gameId)
{
  switch ($gameId) {
    case "spot1":
      return "spotTheDifferenceG01";
      break;
    case "spot2":
      return "spotTheDifferenceG02";
      break;
    case "spot3":
      return "spotTheDifferenceG03";
      break;
    case "spot4":
      return "spotTheDifferenceG04";
      break;
    case "spot5":
      return "spotTheDifferenceG05";
      break;
    case "spot6":
      return "spotTheDifferenceG06";
      break;
    case "spot7":
      return "spotTheDifferenceG07";
      break;
    case "spot8":
      return "spotTheDifferenceG08";
      break;
    case "spot9":
      return "spotTheDifferenceG09";
      break;
    case "spot10":
      return "spotTheDifferenceG10";
      break;
    case "spot11":
      return "spotTheDifferenceG11";
      break;
    case "spot12":
      return "spotTheDifferenceG12";
      break;
    case "spot13":
      return "spotTheDifferenceG13";
      break;
    case "spot14":
      return "spotTheDifferenceG14";
      break;
    case "spot15":
      return "spotTheDifferenceG15";
      break;
    case "spot16":
      return "spotTheDifferenceG16";
      break;
    case "spot17":
      return "spotTheDifferenceG17";
      break;
    case "spot18":
      return "spotTheDifferenceG18";
      break;
    case "spot19":
      return "spotTheDifferenceG19";
      break;
    case "spot20":
      return "spotTheDifferenceG20";
      break;
    case "spot21":
      return "spotTheDifferenceG21";
      break;
    case "spot22":
      return "spotTheDifferenceG22";
      break;
    case "spot23":
      return "spotTheDifferenceG23";
      break;
    case "spot24":
      return "spotTheDifferenceG24";
      break;
    case "spot25":
      return "spotTheDifferenceG25";
      break;
    case "spot26":
      return "spotTheDifferenceG26";
      break;
    case "spot27":
      return "spotTheDifferenceG27";
      break;
    case "spot28":
      return "spotTheDifferenceG28";
      break;
    default:
      return "unknown";
      break;
  }
}

if ($pdo) {
  if (isset($_POST) && !empty($_POST)) {
    $user = $_POST["user"];
    $game = $_POST["game"];
    $table = whichSpotTable($game);
    try {
      if ($table == "unknown") {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing game id";
        echo json_encode($message);
      } else {
        $spotstmt = $pdo->prepare("SELECT points, lastgame FROM $table WHERE employeeID = $user;");
        $spotstmt->execute();
        $spotdata = $spotstmt->fetch();
        if (!$spotdata) {
          $message["type"] = "success";
          $totals = array("lastPlayed" => "never", "points" => 0);
          $info["info"] = $totals;
          $message["message"] = $info;
          echo json_encode($message);
        } else {
          $message["type"] = "success";
          if($spotdata["lastgame"] == null || $spotdata["lastgame"] == "") {
            $totals = array("lastPlayed" => "never", "points" => $spotdata["points"]);
          } else {
            $totals = array("lastPlayed" => $spotdata["lastgame"], "points" => $spotdata["points"]);
          }
          $info["info"] = $totals;
          $message["message"] = $info;
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
