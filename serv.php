<?php
include('database.php');

if (validate($_POST)) {
    if (isset($_FILES)) {
        $database = new Datacontroller;
        $database->connect();
        $database->createTable();
        foreach ($_FILES as $file) {
            $fileDir = saveFile($file);
            $database->insertRecord($_COOKIE, $fileDir);
        }
        header('location: /cinema/thanks.php?name=' . $_POST['name'] . 'id=' . $id);
    } else {
        header('location: /cinema/?error_name=Нет файла');
    }
} else {
    header('location: /cinema/?error_name=Не заполнено имя');
}

function saveFile($file)
{
    $temp_data = explode('.', $file['name']);
    $extenssion = $temp_data[count($temp_data) - 1];
    $name = time() . '.' . $extenssion;
    $dir = __DIR__ . '/uploads/';
    $upload_file = $dir . basename($name);
    move_uploaded_file($file['tmp_name'], $upload_file);
    return $upload_file;
}

function validate($data)
{
    if (isset($data['name']) && $data['name'] && isset($data['phone']) && $data['phone']) {
        return true;
    } else return false;
}
