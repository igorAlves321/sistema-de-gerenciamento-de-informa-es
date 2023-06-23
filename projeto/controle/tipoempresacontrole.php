<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/tipoempresa.php");

    class TipoEmpresaControle{
        private $tipoEmpresa;

        function __construct(){
            $this->tipoEmpresa = new TipoEmpresa();
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
            return $this->tipoEmpresa->pegarTipos();
        }

        function inserir(){
            $this->tipoEmpresa->nome = $_POST["nome"];
            $this->tipoEmpresa->inserir();
        }

        function alterar(){
            $this->tipoEmpresa->id = $_POST["id"];
            $this->tipoEmpresa->nome = $_POST["nome"];
            $this->tipoEmpresa->alterar();
        }

        function excluir(){
            $this->tipoEmpresa->id = $_POST["id"];
            $this->tipoEmpresa->excluir();
        }

        function pegarPorId(){
            $this->tipoEmpresa->id = $_POST["id"];
            return $this->tipoEmpresa->pegarPorId();
        }

function pesquisarTipo(){
    $this->tipoEmpresa->nome = $_POST["nome"];
    return $this->tipoEmpresa->pesquisarTipo($this->tipoEmpresa->nome);
}

    }

    $controle = new TipoEmpresaControle();
    $controle->determinarAcao($_POST["acao"]);

?>
