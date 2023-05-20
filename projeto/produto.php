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
    <link href="open-iconic/font/css/open-iconic-bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
    <title>Página Do produto</title>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-12 col-sm-8">
                <h1 class="text-center text-primary">Olá <?php echo $_SESSION["nome"]; ?></h1>
                <a href="sair.php" class="btn btn-danger d-block mx-auto">Sair</a>

                <div class="mt-3">
                    <h2 class="text-center">Opções</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><a href="cadastro_produto.php" class="btn btn-primary d-block mx-auto">Cadastrar Produto</a></li>
                        <li class="list-group-item"><a href="ver_produtos_cadastrados.php" class="btn btn-primary d-block mx-auto">Ver Produtos Cadastrados</a></li>
                    </ul>
                </div>

                <div class="text-center mt-4">
                    <a href="index.php" class="btn btn-primary">Voltar</a>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    <script src="js/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="js/produto.js"></script>
</body>
</html>
