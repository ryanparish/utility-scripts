
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
      $stats = $pdo->prepare("SELECT IFNULL(COUNT(*), 0) AS spot1players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG02) AS spot2players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG03) AS spot3players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG04) AS spot4players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG05) AS spot5players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG06) AS spot6players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG07) AS spot7players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG08) AS spot8players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG09) AS spot9players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG10) AS spot10players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG11) AS spot11players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG12) AS spot12players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG13) AS spot13players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG14) AS spot14players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG15) AS spot15players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG16) AS spot16players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG17) AS spot17players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG18) AS spot18players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG19) AS spot19players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG20) AS spot20players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG21) AS spot21players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG22) AS spot22players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG23) AS spot23players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG24) AS spot24players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG25) AS spot25players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG26) AS spot26players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG27) AS spot27players, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifferenceG28) AS spot28players, (SELECT IFNULL(COUNT(*), 0) FROM toGoTrisG1) AS tgt1players, (SELECT IFNULL(COUNT(*), 0) FROM toGoTrisG2) AS tgt2players, (SELECT IFNULL(COUNT(*), 0) FROM toGoTrisG3) AS tgt3players, (SELECT IFNULL(COUNT(*), 0) FROM crosswordG1) AS crossword1players, (SELECT IFNULL(COUNT(*), 0) FROM crosswordG2) AS crossword2players, (SELECT IFNULL(COUNT(*), 0) FROM player) AS totalPlayers, (SELECT IFNULL(COUNT(*), 0) FROM feedbackRating) AS rating, (SELECT IFNULL(COUNT(*), 0) FROM feedbackComments) AS comments, (SELECT IFNULL(COUNT(*), 0) FROM spotTheDifference) AS spotTheDifferencePlayers,(SELECT IFNULL(COUNT(*), 0) FROM crossword) AS crosswordPlayers,(SELECT IFNULL(COUNT(*), 0) FROM toGoTris) AS toGoTrisPlayers, (SELECT IFNULL(COUNT(*), 0) FROM crosswordG3) AS crossword3players, (SELECT IFNULL(COUNT(*), 0) FROM crosswordG4) AS crossword4players, (SELECT IFNULL(COUNT(*), 0) FROM crosswordG5) AS crossword5players FROM spotTheDifferenceG01;");
      $stats->execute();
      $playStats = $stats->fetch();
      $message["type"] = "success";
      $message["message"] = $playStats;
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
