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
      $spotstmt = $pdo->prepare("SELECT s.employeeId, IFNULL(s1.points, 0) + IFNULL(s2.points, 0) + IFNULL(s3.points, 0) + IFNULL(s4.points, 0) + IFNULL(s5.points, 0) + IFNULL(s6.points, 0) + IFNULL(s7.points, 0) + IFNULL(s8.points, 0) + IFNULL(s9.points, 0) + IFNULL(s10.points, 0) + IFNULL(s11.points, 0) + IFNULL(s12.points, 0) + IFNULL(s13.points, 0) + IFNULL(s14.points, 0) + IFNULL(s15.points, 0) + IFNULL(s16.points, 0) + IFNULL(s17.points, 0) + IFNULL(s18.points, 0) + IFNULL(s19.points, 0) + IFNULL(s20.points, 0) + IFNULL(s21.points, 0) + IFNULL(s22.points, 0) + IFNULL(s23.points, 0) + IFNULL(s24.points, 0) + IFNULL(s25.points, 0) + IFNULL(s26.points, 0) + IFNULL(s27.points, 0) + IFNULL(s28.points, 0) AS spotTotalPoints
      FROM
        spotTheDifference s
        LEFT JOIN spotTheDifferenceG01 s1 ON s.employeeId = s1.employeeId
        LEFT JOIN spotTheDifferenceG02 s2 ON s.employeeId = s2.employeeId
        LEFT JOIN spotTheDifferenceG03 s3 ON s.employeeId = s3.employeeId
        LEFT JOIN spotTheDifferenceG04 s4 ON s.employeeId = s4.employeeId
        LEFT JOIN spotTheDifferenceG05 s5 ON s.employeeId = s5.employeeId
        LEFT JOIN spotTheDifferenceG06 s6 ON s.employeeId = s6.employeeId
        LEFT JOIN spotTheDifferenceG07 s7 ON s.employeeId = s7.employeeId
        LEFT JOIN spotTheDifferenceG08 s8 ON s.employeeId = s8.employeeId
        LEFT JOIN spotTheDifferenceG09 s9 ON s.employeeId = s9.employeeId
        LEFT JOIN spotTheDifferenceG10 s10 ON s.employeeId = s10.employeeId
        LEFT JOIN spotTheDifferenceG11 s11 ON s.employeeId = s11.employeeId
        LEFT JOIN spotTheDifferenceG12 s12 ON s.employeeId = s12.employeeId
        LEFT JOIN spotTheDifferenceG13 s13 ON s.employeeId = s13.employeeId
        LEFT JOIN spotTheDifferenceG14 s14 ON s.employeeId = s14.employeeId
        LEFT JOIN spotTheDifferenceG15 s15 ON s.employeeId = s15.employeeId
        LEFT JOIN spotTheDifferenceG16 s16 ON s.employeeId = s16.employeeId
        LEFT JOIN spotTheDifferenceG05 s17 ON s.employeeId = s17.employeeId
        LEFT JOIN spotTheDifferenceG18 s18 ON s.employeeId = s18.employeeId
        LEFT JOIN spotTheDifferenceG19 s19 ON s.employeeId = s19.employeeId
        LEFT JOIN spotTheDifferenceG20 s20 ON s.employeeId = s20.employeeId
        LEFT JOIN spotTheDifferenceG21 s21 ON s.employeeId = s21.employeeId
        LEFT JOIN spotTheDifferenceG22 s22 ON s.employeeId = s22.employeeId
        LEFT JOIN spotTheDifferenceG23 s23 ON s.employeeId = s23.employeeId
        LEFT JOIN spotTheDifferenceG24 s24 ON s.employeeId = s24.employeeId
        LEFT JOIN spotTheDifferenceG25 s25 ON s.employeeId = s25.employeeId
        LEFT JOIN spotTheDifferenceG26 s26 ON s.employeeId = s26.employeeId
        LEFT JOIN spotTheDifferenceG27 s27 ON s.employeeId = s27.employeeId
        LEFT JOIN spotTheDifferenceG05 s28 ON s.employeeId = s28.employeeId
        WHERE s.employeeId = $user;");
        $spotstmt = $pdo->prepare("SELECT totalPoints, gamesPlayed FROM spotTheDifference WHERE employeeID = $user;");
        $spotstmt->execute();
        $spotdata = $spotstmt->fetch();
      if (!$spotdata) {
        $spotPoints = "0";
        $spotTotals = array("spotpoints" => $spotPoints);
        $info["spot"] = $spotTotals;
      } else {
        $spotPoints = $spotdata["totalPoints"];
        $spotTotals = array("spotpoints" => $spotPoints);
        $info["spot"] = $spotTotals;
      }
      $togotrisdata = $pdo->query("SELECT t.employeeId, IFNULL(t1.points, 0) + IFNULL(t2.points, 0) + IFNULL(t3.points, 0) AS togotrisTotalPoints
      FROM
        toGoTris t
        LEFT JOIN toGoTrisG1 t1 ON t.employeeId = t1.employeeId
        LEFT JOIN toGoTrisG2 t2 ON t.employeeId = t2.employeeId
        LEFT JOIN toGoTrisG3 t3 ON t.employeeId = t3.employeeId
        WHERE t.employeeId = $user;")->fetch();
      if (!$togotrisdata) {
        $togotrisPoints = "0";
        $togotrisTotals = array("togotrispoints" => $togotrisPoints);
        $info["togotris"] = $togotrisTotals;
      } else {
        $togotrisPoints = $togotrisdata["togotrisTotalPoints"];
        $togotrisTotals = array("togotrispoints" => $togotrisPoints);
        $info["togotris"] = $togotrisTotals;
      }
      $crossworddata = $pdo->query("SELECT c.employeeId, IFNULL(c1.points, 0) + IFNULL(c2.points, 0) + IFNULL(c3.points, 0) + IFNULL(c4.points, 0) + IFNULL(c5.points, 0) AS crosswordTotalPoints
      FROM
        crossword c
        LEFT JOIN crosswordG1 c1 ON c.employeeId = c1.employeeId
        LEFT JOIN crosswordG2 c2 ON c.employeeId = c2.employeeId
        LEFT JOIN crosswordG3 c3 ON c.employeeId = c3.employeeId
        LEFT JOIN crosswordG4 c4 ON c.employeeId = c4.employeeId
        LEFT JOIN crosswordG5 c5 ON c.employeeId = c5.employeeId
        WHERE c.employeeId = $user;")->fetch();
      if (!$crossworddata) {
        $crosswordPoints = "0";
        $crosswordTotals = array("crosswordpoints" => $crosswordPoints);
        $info["crossword"] = $crosswordTotals;
      } else {
        $crosswordPoints = $crossworddata["crosswordTotalPoints"];
        $crosswordTotals = array("crosswordpoints" => $crosswordPoints);
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
