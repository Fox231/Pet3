<?php
include('database.php');

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if (validate($_POST)) {
    if (isset($_FILES)) {
        $database = new Datacontroller;
        $database->connect();
        $database->createTable();
        foreach ($_FILES as $file) {
            $fileDir = saveFile($file);
            $database->insertRecord($_COOKIE, $fileDir);
        }
        $Mail = new Mail;
        $Mail->send($_POST, $_COOKIE, $fileDir);

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

class Mail
{
    const MAILTO = 'fowomax338@swift-mail.net';
    public function send($data, $cookie, $fileDir)
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host       = 'smtp.yandex.ru';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'egorlokoman@yandex.ru';
        $mail->Password   = '2486217935Aa';
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('egorlokoman@yandex.ru', 'Mailer');
        $mail->addAddress('egorlokoman@yandex.ru');
        $mail->addAttachment($fileDir);

        $mail->isHTML(true);
        $mail->Subject = 'Заявка с сайта';
        $message = 'Пользователь ' . $data['name'] . ' оставил заявку.' . '<br>';
        $message .= 'Пользовательский ID: ' . $cookie['PHPSESSID'] . '<br>';
        $message .= date('l jS \of F Y h:i:s A') . '<br>';
        $message .= '<a href="localhost/cinema/admin/index.php">Админка</a>';

        $mail->Body = $message;
        $mail->send();
    }
}
