<?php
$queryParameter = '';
if (isset($_GET['access-token'])) {
  $queryParameter = '?access-token=' . $_GET['access-token'];
}
header('Location: index.html' . $queryParameter);
?>