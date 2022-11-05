<?php
    session_start();
    unset($_SESSION["logado"]);
    unset($_SESSION["nome"]);
    header("location: login.html");

?>