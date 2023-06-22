<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

header('Access-Control-Allow-Origin: *');

require_once("./server/db.php");

$pdo = db();
$message = array();

$json = file_get_contents("php://input");
//$json = '[{"employee_id":"2088625","fname":"DOUGLAS","lname":"GRAVES-LITTLETON","job":"retail","par_level":"Rising Star","hire_date":" 2\/23\/2023"},{"employee_id":"2089390","fname":"KLAIRA","lname":"SPAULDING","job":"retail","par_level":"Rising Star","hire_date":" 2\/28\/2023"},{"employee_id":"2089423","fname":"JOHN","lname":"HENDREN","job":"dish","par_level":"Rising Star","hire_date":" 2\/28\/2023"}]';
$data = json_decode($json, true);

// loop through data sent checking for number of validations
foreach ($data as &$record) {
  $employee_id = $record['employee_id'];
  $job = $record['job'];
  if ($record['job'] == 'server') {
    // if they are a server query the etcvalidation table to get validations
    $stmt = $pdo->prepare("SELECT COUNT(*) as num_validations FROM etcvalidation WHERE employee_id = ? AND position = ?");
    $stmt->execute([$employee_id, $job]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
      $record = array_merge($record, $result);
    }
  } else {
    $table = $record['job'];
    // query the matching position database for matching records
    $stmt = $pdo->prepare("SELECT COUNT(*) as num_validations FROM $table WHERE employee_id = ?");
    $stmt->execute([$employee_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
      $record = array_merge($record, $result);
    }
  }
}
// loop through data sent checking for etcvalidations
foreach ($data as &$record) {
  $employee_id = $record['employee_id'];
  $job = $record['job'];
  // query the database for matching records
  $stmt = $pdo->prepare("SELECT unlock_date, status, final_val_date FROM etcvalidation WHERE employee_id = ? AND position = ?");
  $stmt->execute([$employee_id, $job]);
  $result = $stmt->fetch();
  // merge the matching record into the JSON
  if ($result) {
    $record = array_merge($record, $result);
  }
}

echo json_encode($data);
