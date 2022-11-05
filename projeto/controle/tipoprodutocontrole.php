<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/tipoproduto.php");

    class TipoProdutoControle{
        private $tipoproduto;

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

    $controle = new TipoProdutoControle();
    $controle->determinarAcao($_POST["acao"]);

?>