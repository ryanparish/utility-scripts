<?php

error_reporting( error_reporting() & ~E_NOTICE );

header('Access-Control-Allow-Origin: *');

$url = $_GET['url'];
$acadId = $_GET["acadId"];
$url = $url . "&acadId=" . $acadId;
$data = array();

$curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true
  ));
  $response = curl_exec($curl);
  $info = curl_getinfo($curl);
  $err = curl_error($curl);
  curl_close($curl);

  $results = json_decode($response, true);
  $data["status"] = $info["http_code"];
  $data["results"] = $results;
  $data = json_encode($data);
  echo $data;

