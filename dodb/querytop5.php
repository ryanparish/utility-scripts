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
    $top5 = $pdo->query("SELECT
    p.storeNum,
    COUNT(p.employeeID) AS totalPlayers,
    SUM(
      IFNULL(sp.gamesPlayed, 0) + IFNULL(t.gamesPlayed, 0) + IFNULL(c.gamesPlayed, 0)
    ) AS gamesPlayed,
    SUM(
      IFNULL(sp.totalpoints, 0) + IFNULL(t.totalpoints, 0) + IFNULL(c.totalpoints, 0)
    ) AS totalScore
  FROM
    player p
    LEFT JOIN spotTheDifference sp ON p.employeeId = sp.employeeid
    LEFT JOIN toGoTris t ON p.employeeId = t.employeeid
    LEFT JOIN crossword c ON p.employeeId = c.employeeid
  WHERE
    p.storeNum != 'Home Office Employee'
  GROUP BY
    p.storeNum
  ORDER BY
    totalScore DESC
    LIMIT 5;")->fetchAll();
    echo json_encode($top5);
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
