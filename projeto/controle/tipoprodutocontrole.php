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
    else if($acao == "inserir")
        echo $this->inserir();
    else if($acao == "alterar")
        echo $this->alterar();
    else if($acao == "excluir")
        echo $this->excluir();
    else if($acao == "pegarPorId")
        echo $this->pegarPorId();
    else if($acao == "pesquisarTipo")
        echo $this->pesquisarTipo();
}

        function pegarTipos(){
            return $this->tipoProduto->pegarTipos();
        }

        function inserir(){
            $this->tipoProduto->nome = $_POST["nome"];
            $this->tipoProduto->inserir();
        }

        function alterar(){
            $this->tipoProduto->id = $_POST["id"];
            $this->tipoProduto->nome = $_POST["nome"];
            $this->tipoProduto->alterar();
        }

        function excluir(){
            $this->tipoProduto->id = $_POST["id"];
            $this->tipoProduto->excluir();
        }

        function pegarPorId(){
            $this->tipoProduto->id = $_POST["id"];
            return $this->tipoProduto->pegarPorId();
        }

function pesquisarTipo(){
    $this->tipoProduto->nome = $_POST["nome"];
    return $this->tipoProduto->pesquisarTipo($this->tipoProduto->nome);
}

    }

    $controle = new TipoProdutoControle();
    $controle->determinarAcao($_POST["acao"]);

?>
