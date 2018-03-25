<?php
$accessToken = $_POST['access-token'];
$message = $_POST['message'];

$httpHeader = [
  'Authorization: Bearer ' . $accessToken,
  'Content-Type: application/x-www-form-urlencoded'
];
$requestParameter = 'message=' . $message;
$url = 'https://notify-api.line.me/api/notify';

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, TURE);
curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeader);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestParameter);

curl_exec($ch);

curl_close($ch);

?>