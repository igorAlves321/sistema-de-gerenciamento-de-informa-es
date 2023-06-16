<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/produto.php");
    class ProdutoControle{
        private $produto;
        function __construct(){
            $this->produto = new Produto();
        }

        function determinarAcao($acao){
           //inserir, alterar, excluir, pegarTodos, pegarPorId, pesquisarProduto
            if($acao == "inserir")
                echo $this->inserir();
            else if($acao == "alterar")
                echo $this->alterar();
            else if($acao == "excluir")
                echo $this->excluir();
            else if($acao == "pegarTodos")
                echo $this->pegarTodos();
            else if($acao == "pegarPorId")
                echo $this->pegarPorId();
            else if($acao == "pesquisarProduto")
                echo $this->pesquisarProduto();
        }

        function inserir(){
            $this->produto->nome = $_POST["nome"];
            $this->produto->descricao = $_POST["descricao"];
            $this->produto->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];
            $this->produto->inserir();

        }
        function alterar(){
            $this->produto->nome = $_POST["nome"];
            $this->produto->descricao = $_POST["descricao"];
            $this->produto->idproduto = $_POST["idproduto"];
            $this->produto->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];

            $this->produto->alterar();
        }
        function excluir(){
            $this->produto->idproduto = $_POST["idproduto"];
            $this->produto->excluir();
        }

        function pegarTodos(){
            return $this->produto->pegarTodos();
        }

        function pegarPorId(){
            $this->produto->idproduto = $_POST["idproduto"];
            return $this->produto->pegarPorId();
        }

        function pesquisarProduto(){
            $this->produto->nome = $_POST["nome"];
            return $this->produto->pesquisarProduto($this->produto->nome);
        }
    }

    $controle = new ProdutoControle();
    $controle->determinarAcao($_POST["acao"]);
?>