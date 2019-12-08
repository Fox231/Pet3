<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>

<body>
    <?php

    $a = 10;
    var_dump($a);
    echo "<br>";

    $a = 10 / 3;
    var_dump($a);
    echo "<br>";

    (string) $a = "Hello World";
    var_dump($a);
    echo "<br>";

    $arr = [43, 5, 4, 23, 11, 1];
    var_dump($arr);
    echo "<br>";

    sort($arr);
    foreach ($arr as $value)
        echo $value . " ";
    echo "<br>";

    class Foo
    {
        function Boo()
        {
            $hello = "Hello world";
            echo $hello;
            echo "<br>";
        }
    }

    $Foo = new Foo();
    $Foo->Boo();
    ?>
</body>

</html>