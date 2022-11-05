<?php session_start();?>
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
    <title>Document</title>
</head>
<body>
    <div class="container-fluid">
        <?php include_once("modal_update_produto.php"); ?>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-12 col-sm-8">
            <h1>Olá <?php echo $_SESSION["nome"]; ?></h1>
        <a href="sair.php">Sair</a>
        <div class="mb-3 mt-3">
            <label for="nome" class="form-label">Nome:</label>
            <input type="text" class="form-control" id="nome" 
                                        placeholder="Digite o nome do produto">
        </div>
        <div class="mb-3 mt-3">
            <label for="descricao" class="form-label">Descricao:</label>
            <input type="text" class="form-control" id="descricao" placeholder="Digite uma descrição para o produto">
        </div>
        <div class="mb-3 mt-3">

        <select id="tipoProduto"  class="form-select mb-3" > 
        </select>
        <button  type="button" class="btn btn-info" id="btnCadastrar">Cadastrar</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descricao</th>
                    <th>Tipo</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody id="corpoTabela">

            </tbody>
        </table>
        <button class='btn btn-primary btnExcluir'><span class='oi oi-thumb-up' title='icon name' aria-hidden='true'></span></button>
            </div>
            <div class="col-2"></div>
        </div>
       
    </div>
</body>
<script src="js/jquery.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<script src="js/produto.js"></script>
</html>
