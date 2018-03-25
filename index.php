<?php
$queryParameter = '';
if (isset($_GET['access-token'])) {
  $queryParameter = '?' . $_GET['access-token'];
}
header('Location: index.html' . $queryParameter);
?>