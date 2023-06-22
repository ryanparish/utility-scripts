<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

function db() {
  $host = "db-mysql-nyc3-72758-do-user-11625380-0.b.db.ondigitalocean.com";
  $db = "validations";
  $user = "doadmin";
  $pass = "AVNS_Pi_wUb1GgYZfRjQ2W7B";
  $port = "25060";
  $dsn = "mysql:dbname=$db;host=$host;port=$port";
  $options = array(
    // turn off emulation mode for "real" prepared statements
    PDO::ATTR_EMULATE_PREPARES => false,
    // turn on errors in the form of exceptions
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    // make the default fetch be an associative array
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  );
  try {
    $pdo = new PDO($dsn, $user, $pass, $options);
  } catch (PDOException $e) {
    die(json_encode(array('error' => $e)));
  }
  return $pdo;
}