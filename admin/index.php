<?php
include('../database.php');

$pdo = new dataBase;
$pdo->connect();
foreach ($pdo->showRecords() as $row) {
    echo $row['id'] . ': ' . $row['name'] . ' - ' . $row['phone'] .  'Дата' . date('d.m.Y H:i:s', $row['date']) . '<br>';
}
