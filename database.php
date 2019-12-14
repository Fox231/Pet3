<?php
class Datacontroller
{
    private $link;
    const TABLE = 'users';

    public function connect()
    {
        $this->link = new PDO('mysql:host=localhost;dbname=db', 'root', '');
    }

    public function createTable()
    {
        $users = "CREATE TABLE IF NOT EXISTS users (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            cookie_id VARCHAR(255) NOT NULL
            )";

        $form_data = "CREATE TABLE IF NOT EXISTS form_data (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            file_link VARCHAR(255) NOT NULL
            )";

        if (!$this->link->query($users) || !$this->link->query($form_data))
            echo "Ошибка создания таблицы: ";
    }

    public function insertRecord($data, $fileDir)
    {
        $sql = "SELECT cookie_id FROM users";
        $res = $this->link->query($sql);
        $result = array();
        while ($row = $res->fetch())
            $result[] = $row[0];

        $bool = true;
        foreach ($result as $userId) {
            if ($userId == $data["PHPSESSID"]) {
                $bool = false;
                break;
            }
        }

        if ($bool) {
            $sql = "INSERT INTO `users` (`cookie_id`) VALUES('" . $data['PHPSESSID'] . "')";
            $this->link->query($sql);
        }

        $sql = "INSERT INTO `form_data` (`user_id`,`file_link`) VALUES('" . $data['PHPSESSID'] . "','" . $fileDir . "')";
        $this->link->query($sql);
    }

    public function showRecords($table)
    {
        $sql = "SELECT * FROM " . $table . "ORDER by id DESC";
        $request = $this->link->prepare($sql);
        if ($request) {
            $request->execute();
        }
        return $request;
    }

    public function lastIDrequest()
    {
        foreach ($this->link->query("SELECT `id` FROM `form_data`") as $row) {
            $id = $row['id'];
        }
        return $id;
    }
}
