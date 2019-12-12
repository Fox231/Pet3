<?php
class dataBase
{
    private $pdo;
    const TABLE = 'users';
    const DATABASE = 'users.db';

    public function connect()
    {
        $this->pdo = new PDO('mysql:host=localhost;dbname=' . $this::DATABASE, 'root', '');
        return $this->pdo;
    }

    public function createTable()
    {
        $this->pdo->query("CREATE TABLE IF NOT EXISTS" . $this::TABLE . "(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        phone TEXT,
        data TEXT
        )");
    }

    public function createRecord()
    {
        $date = date(time());
        $sql = "INSERT INTO" . $this::TABLE . "
        (name, phone,date)
        VALUES (:name,:phone," . $date . ")";
        $request = $this->pdo->prepare($sql);
        if ($request) {
            $request->execute($date);
        }
        return $this->pdo->lastInsertId();
    }

    public function showRecords()
    {
        $sql = "SELECT * FROM" . $this::TABLE . " ORDER by id DESC";
        $request = $this->pdo->prepare($sql);
        if ($request) {
            $request->execute();
        }
        return $request;
    }
}
