<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/tipoproduto.php");

    class TipoProdutoControle{
        private $tipoProduto;

        function __construct(){
            $this->tipoProduto = new TipoProduto();
        }

        function determinarAcao($acao){
            if($acao == "pegarTipos")
                echo $this->pegarTipos();
        }

        function pegarTipos(){
            return $this->tipoProduto->pegarTipos();
        }
    }

    $controle = new TipoEmpresaControle();
    $controle->determinarAcao($_POST["acao"]);

?>
