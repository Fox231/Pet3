<?php
// include('database.php');
// define('CLIENTS', __DIR__ . '/clients.txt');

// $pdo = new dataBase;
// $pdo->connect();
// $pdo->createTable();

// session_start();

// var_dump($_POST);

// if (isset($_FILES)) {
//     foreach ($_FILES as $file) {
//         saveFile($file);
//     }
// }

// if (validate($_POST)) {
//     $client = new Client;
//     $client->checkData($_POST);
//     $client->create($_POST);
//     // $client->saveToFile();


//     $_SESSION['name'] = $_POST['name'];

//     setcookie('name', $_POST['name'], time() + 60 * 60 * 24 * 30);

//     $id = $client->saveToDatabase($pdo);
//     $mail = new mail();
//     $mail->send($client);
//     header('location: /cinema/thanks.php?name=' . $_POST['name'] . 'id=' . $id);
// } else {
//     // header('location: /cinema/?error_name=Не заполнено имя');
// }


// function saveFile($file)
// {
//     $temp_data = explode('.', $file['name']);
//     $extenssion = $temp_data[count($temp_data) - 1];
//     $name = time() . '.' . $extenssion;
//     $dir = __DIR__ . '/uploads/';
//     $upload_file = $dir . basename($name);
//     move_uploaded_file($file['tmp_name'], $upload_file);
// }

// function validate($data)
// {
//     if (isset($data['name']) && $data['name']) {
//         return true;
//     } else return false;
// }

// class Client
// {
//     public $name,
//         $cinema,
//         $popcorn,
//         $comment;

//     public function create($data)
//     {
//         $this->name = $data['name'];
//         $this->phone = $data['phone'];
//     }

//     public function checkData($data)
//     {
//         $this->name = $data['name'];
//         if (isset($data['cinema']) && $data['cinema']) {
//             $this->cinema = $data['cinema'];
//         }
//         if (isset($data['popcorn']) && $data['popcorn']) {
//             $this->popcorn = $data['popcorn'];
//         }
//         if (isset($data['comment']) && $data['comment']) {
//             $this->comment = $data['comment'];
//         }
//     }

//     public function saveToFile()
//     {
//         $data = file_get_contents(CLIENTS);
//         $new_data = '';
//         $new_data .=  'Имя пользователя: ' . $this->name . ";";
//         if ($this->cinema) {
//             $new_data .= 'Выбранный кинотеатр' . $this->cinema . ";";
//         }
//         if ($this->popcorn) {
//             $new_data .= $this->popcorn . ";";
//         }
//         if ($this->comment) {
//             $new_data .= 'Комментарий: ' . $this->comment . ";";
//         }
//         $new_data .= "\r\n";
//         file_put_contents(CLIENTS, $data . $new_data);
//     }

//     public function saveToDatabase(dataBase $pdo)
//     {
//         $data['name'] = $_POST['name'];
//         $data['phone'] = $_POST['phone'];
//         $id = $pdo->createRecord($data);
//         return $id;
//     }
// }

// class mail
// {
//     const MAILTO = 'fowomax338@swift-mail.net';
//     public function send($client)
//     {
//         $headers = 'MIME-Version 1.0' . "\r\n";
//         $headers .= "Content-type: text/html; charset = uft-8" . "\r\n";
//         $headers .= "From: ROBOT_SITE <info@{$_SERVER['SERVER_NAME']}>\r\n";

//         $subject = 'Заявка с сайта';
//         $message = '<body><p>Пользователь <b>' . $client->name . '</b> оставил заявку</p>' . "\r\n";
//         $message .= '<p>Телефон ' . $client->phone . '</p>';
//         $message .= '</body>';

//         mail($this::MAILTO, $subject, $message, $headers);
//     }
// }

if (isset($_FILES)) {
    foreach ($_FILES as $file) {
        saveFile($file);
    }
}

if (validate($_POST)) {
    $database = new Datacontroller;
    $link = $database->connect();
    $database->createTable($link);
    $database->insertRecord($_COOKIE, $link);

    // header('location: /cinema/thanks.php?name=' . $_POST['name'] . 'id=' . $id);
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

class Datacontroller
{
    public function connect()
    {
        $host = "localhost";
        $database = "db";
        $user = "root";
        $password = "";

        $link = mysqli_connect($host, $user, $password, $database)
            or die("Ошибка " . mysqli_error($link));
        return $link;
    }

    public function createTable($link)
    {
        $users = "CREATE TABLE IF NOT EXISTS users (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            cookie_id INT(6) NOT NULL
            )";

        $form_data = "CREATE TABLE IF NOT EXISTS form_data (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(6) NOT NULL,
            file_link VARCHAR(30) NOT NULL
            )";

        if (!mysqli_query($link, $users) || !mysqli_query($link, $form_data))
            echo "Ошибка создания таблицы: " . mysqli_error($link);
    }

    public function insertRecord($data, $link)
    {
        $sql = "SELECT cookie_id FROM users";
        $res = mysqli_query($link, $sql);
        $result = array();
        while ($row = $res->fetch_array())
            $result[] = $row[0];
        var_dump($result);

        $bool = true;
        foreach ($result as $userId) {
            if ($userId == $data["PHPSESSID"]) {
                $bool = false;
                break;
            }
        }

        if ($bool) {
            $sql = "INSERT INTO users (cookie_id) VALUES(" . $data['PHPSESSID'] . ")";
            mysqli_query($link, $sql);
            echo "Есть контакт";
            var_dump($data["PHPSESSID"]);
        }
    }

    function showRecords()
    {
        # code...
    }
}

function validate($data)
{
    if (isset($data['name']) && $data['name'] && isset($data['phone']) && $data['phone']) {
        return true;
    } else return false;
}
