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
<h2> A qui você vai poder alterar seus dados</h2>
        <input type="hidden" id="idempresa" value="<?php echo $_GET["id"];?>" />
        <a href="sair.php">Sair</a>
        <div class="mb-3 mt-3">
            <label for="nome" class="form-label">Nome:</label>
            <input type="text" class="form-control" id="nome" 
                                        placeholder="Digite seu nome">
        </div>
        <div class="mb-3 mt-3">
            <label for="telefone" class="form-label">Telefone:</label>
            <input type="text" class="form-control" id="telefone" placeholder="Digite seu telefone">
        </div>
        <div class="mb-3 mt-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" 
                                        placeholder="Digite seu email">
        </div>
                    <label for="tipoEmpresa" class="form-label">Tipo de Empresa:</label>
        <select id="tipoEmpresa"> 
        </select>
        <button  type="button" class="btn btn-info" id="btnAlterar">Alterar</button>
        <button  type="button" class="btn btn-warning" id="btnVoltar">Voltar</button>

    </div>
</body>
<script src="js/jquery.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/telaalterar.js"></script>
</html>