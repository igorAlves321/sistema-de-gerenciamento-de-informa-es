<?php
    include_once("testelogin.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div class="container-fluid">
        <h1>Olá <?php echo $_SESSION["nome"]; ?></h1>
        <h2> Aqui você vai poder alterar os tipos de empresa</h2>
        <input type="hidden" id="idtipoempresa" value="<?php echo $_GET["id"];?>" /> <!-- Atualizado o id para 'idtipoempresa' -->
        <a href="sair.php">Sair</a>
        <div class="mb-3 mt-3">
            <label for="nome" class="form-label">Nome do Tipo:</label>
            <input type="text" class="form-control" id="nome" placeholder="Digite o nome do tipo">
        </div>
        <button type="button" class="btn btn-info" id="btnAlterar">Alterar</button>
        <button type="button" class="btn btn-warning" id="btnVoltar">Voltar</button>

    </div>
</body>
<script src="js/jquery.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/telaalterartipoempresa.js"></script>
</html>
