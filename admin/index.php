<?php
include('../database.php');

$database = new Datacontroller;
$link = $database->connect();

$table = "users";
foreach ($database->showRecords($table) as $row) {
    print_r('id: ' . $row['id'] . ' ' . 'userID: ' . $row['cookie_id'] . '<br>');
}
$table = "form_data";
foreach ($database->showRecords($table) as $row) {
    print_r('id: ' . $row['id'] . ' ' . 'userID: ' . $row['user_id'] . 'file directory: ' . $row['file_link'] . '<br>');
}
