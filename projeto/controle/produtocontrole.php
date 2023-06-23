<?php
include_once("../utilitarios/conexao.php");
include_once("../modelo/produto.php");
class ProdutoControle{
    private $produto;

    function __construct(){
        $this->produto = new Produto();
    }

    function determinarAcao($acao){
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
        else if($acao == "pesquisarProdutos")
            echo $this->pesquisarProdutos();
    }

    function inserir(){
        $this->produto->nome = $_POST["nome"];
        $this->produto->descricao = $_POST["descricao"];
        $this->produto->idempresa = $_POST["idempresa"];
        $this->produto->fk_id_tipoproduto = $_POST["fk_id_tipoproduto"];
        $this->produto->inserir();
    }

    function alterar(){
        $this->produto->nome = $_POST["nome"];
        $this->produto->descricao = $_POST["descricao"];
        $this->produto->idproduto = $_POST["idproduto"];
        $this->produto->idempresa = $_POST["idempresa"];
        $this->produto->fk_id_tipoproduto = $_POST["fk_id_tipoproduto"];
        $this->produto->alterar();
    }

    function excluir(){
        if (!isset($_POST["idproduto"])) {
            return;
        }
        $this->produto->idproduto = $_POST["idproduto"];
        $this->produto->excluir();
    }

    function pegarTodos(){
        if (!isset($_POST["idempresa"])) {
            return;
        }
        $this->produto->idempresa = $_POST["idempresa"];
        return $this->produto->pegarTodos();
    }

    function pegarPorId(){
        $this->produto->idproduto = $_POST["idproduto"];
        return $this->produto->pegarPorId();
    }

    function pesquisarProdutos(){
        $this->produto->nome = $_POST["nome"];
        $this->produto->idempresa = $_POST["idempresa"];
        return $this->produto->pesquisarProdutos($this->produto->nome);
    }
}

$controle = new ProdutoControle();
$controle->determinarAcao($_POST["acao"]);
?>
