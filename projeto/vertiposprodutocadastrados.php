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
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
    <title>Tipos de Produto Cadastrados</title>
</head>

<body>
    <div class="container">
        <?php include_once("modal_update_tipo_produto.php"); ?>

        <div class="row justify-content-center">
            <div class="col-12 col-md-8 mt-5 p-3 border rounded">
                <h1 class="text-center text-primary mb-4">Olá <?php echo $_SESSION["nome"]; ?></h1>
                <div class="text-center">
                    <a href="sair.php" class="btn btn-danger mb-3">Sair</a>
                </div>

                <h2 class="text-center text-secondary mb-3">Tipos de Produto Cadastrados</h2>

                <div class="row mb-3">
                    <div class="col-12 col-sm-6">
                        <input type="text" id="pesquisaTipoProduto" class="form-control" placeholder="Digite o nome do tipo que deseja pesquisar">
                    </div>
                    <div class="col-12 col-sm-6">
                        <button id="btnPesquisar" class="btn btn-primary">Pesquisar</button>
                        <button id="btnLimpar" class="btn btn-secondary">Limpar</button>
                    </div>
                </div>

                <table id="tabelaTiposProduto" class="table">
                    <thead>
                        <tr>
                            <th>Nome do Tipo</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody id="corpoTabela">

                    </tbody>
                </table>

                <div class="text-center mt-4">
                    <a href="index.php" class="btn btn-primary">Voltar</a>
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="js/tipoproduto.js"></script>
</body>

</html>
