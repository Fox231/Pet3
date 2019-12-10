<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width" , initial-scale=1>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Спасибо</title>
</head>

<body>
    <?php if (isset($_GET['name'])) { ?>
        Спасибо, <?php echo $_GET['name'] ?>. Ваша заявка получена.
    <?php } else { ?>
        <script>
            window.location = '/cinema'
        </script>
    <?php } ?>
    <br>
    <form action="index.php">
        <button>Вернутся на главную</button>
    </form>
</body>

</html>