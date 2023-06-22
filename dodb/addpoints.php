<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

function whichGameTable($gameId)
{
  switch ($gameId) {
    case "tgt1":
      return "toGoTrisG1";
      break;
    case "tgt2":
      return "toGoTrisG2";
      break;
    case "tgt3":
      return "toGoTrisG3";
      break;
    case "crosswordG1":
      return "crosswordG1";
      break;
    case "crosswordG2":
      return "crosswordG2";
      break;
    case "crosswordG3":
      return "crosswordG3";
      break;
    case "crosswordG4":
      return "crosswordG4";
      break;
    case "crosswordG5":
      return "crosswordG5";
      break;
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

function whichParentTable($gameId)
{
  switch ($gameId) {
    case "tgt1":
    case "tgt2":
    case "tgt3":
      return "toGoTris";
      break;
    case "crosswordG1":
    case "crosswordG2":
    case "crosswordG3":
    case "crosswordG4":
    case "crosswordG5":
      return "crossword";
      break;
    case "spot1":
    case "spot2":
    case "spot3":
    case "spot4":
    case "spot5":
    case "spot6":
    case "spot7":
    case "spot8":
    case "spot9":
    case "spot10":
    case "spot11":
    case "spot12":
    case "spot13":
    case "spot14":
    case "spot15":
    case "spot16":
    case "spot17":
    case "spot18":
    case "spot19":
    case "spot20":
    case "spot21":
    case "spot22":
    case "spot23":
    case "spot24":
    case "spot25":
    case "spot26":
    case "spot27":
    case "spot28":
      return "spotTheDifference";
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
      $points = intval($_POST["points"]);
      $game = $_POST["game"];
      // find what insert to do based on game unique value
      $table = whichGametable($game);
      // find what parent table insert to do based on game unique value
      $parentTable = whichParentTable($game);
      // check if either function returned unknown table
      if ($table == "unknown" || $parentTable == "unknown") {
        $message["type"] = "error";
        $message["message"] = "Trouble parsing game id";
        echo json_encode($message);
      } else {
        $stmt = $pdo->prepare("INSERT INTO $table VALUES ($user, $points, NOW()) ON DUPLICATE KEY UPDATE points = $points, lastgame = NOW()");
        $stmt->execute();
        $stmt2 = $pdo->prepare("INSERT INTO $parentTable VALUES ($user, $points, 1, NOW()) ON DUPLICATE KEY UPDATE totalPoints = totalPoints + $points, gamesPlayed = gamesPlayed + 1, lastPlayed = NOW()");
        $stmt2->execute();
        $message["type"] = "success";
        $message["message"] = "Points added successfully";
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
