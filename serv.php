<?php

define('CLIENTS', __DIR__ . '/clients.csv');

session_start();

var_dump($_POST);

if (isset($_FILES)) {
    foreach ($_FILES as $file) {
        saveFile($file);
    }
}

if (validate($_POST)) {
    $client = new Client;
    $client->checkData($_POST);
    $client->saveToFile();

    $_SESSION['name'] = $_POST['name'];

    setcookie('name', $_POST['name'], time() + 60 * 60 * 24 * 30);

    // header('location: /cinema/thanks.php?name=' . $_POST['name']);
} else {
    // header('location: /cinema/?error_name=Не заполнено имя');
}


function saveFile($file)
{
    $temp_data = explode('.', $file['name']);
    $extenssion = $temp_data[count($temp_data) - 1];
    $name = time() . '.' . $extenssion;
    $dir = __DIR__ . '/uploads/';
    $upload_file = $dir . basename($name);
    move_uploaded_file($file['tmp_name'], $upload_file);
}

function validate($data)
{
    if (isset($data['name']) && $data['name']) {
        return true;
    } else return false;
}

class Client
{
    public $name,
        $cinema,
        $popcorn,
        $comment;

    public function checkData($data)
    {
        $this->name = $data['name'];
        if (isset($data['cinema']) && $data['cinema']) {
            $this->cinema = $data['cinema'];
        }
        if (isset($data['popcorn']) && $data['popcorn']) {
            $this->popcorn = $data['popcorn'];
        }
        if (isset($data['comment']) && $data['comment']) {
            $this->comment = $data['comment'];
        }
    }

    public function saveToFile()
    {
        $data = file_get_contents(CLIENTS);
        $new_data = '';
        $new_data .=  'Имя пользователя: ' . $this->name . ";";
        if ($this->cinema) {
            $new_data .= 'Выбранный кинотеатр' . $this->cinema . ";";
        }
        if ($this->popcorn) {
            $new_data .= $this->popcorn . ";";
        }
        if ($this->comment) {
            $new_data .= 'Комментарий: ' . $this->comment . ";";
        }
        $new_data .= "\r\n";
        file_put_contents(CLIENTS, $data . $new_data);
    }
}
