<?php
$headers = 'MIME-Version 1.0' . "\r\n";
$headers .= 'content-type:text/heml;charset=utf-8' . "\r\n";
$headers .= "From:ROBOT_SITE<info@{$_SERVER['SERVER_NAME']}>\r\n";
mail('fowomax338@swift-mail.net', 'test', 'test', $headers);
