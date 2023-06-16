<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/empresa.php");
    class EmpresaControle{
        private $empresa;
        function __construct(){
            $this->empresa = new Empresa();
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
            else if($acao == "logar")
                echo $this->logar();
            else if($acao == "pesquisarEmpresa")
                echo $this->pesquisarEmpresa();
        }

        function inserir(){
            $this->empresa->nome = $_POST["nome"];
            $this->empresa->email = $_POST["email"];
            $this->empresa->telefone = $_POST["telefone"];
            $this->empresa->senha = $_POST["senha"];
            $this->empresa->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];

            $this->empresa->inserir();
        }

        function alterar(){
            $this->empresa->nome = $_POST["nome"];
            $this->empresa->email = $_POST["email"];
            $this->empresa->telefone = $_POST["telefone"];
            $this->empresa->id = $_POST["id"];
            $this->empresa->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];

            $this->empresa->alterar();
        }

        function excluir(){
            $this->empresa->id = $_POST["id"];
            $this->empresa->excluir();
        }

        function pegarTodos(){
            return $this->empresa->pegarTodos();
        }

        function pegarPorId(){
            $this->empresa->id = $_POST["id"];
            return $this->empresa->pegarPorId();
        }

        function logar(){
            $this->empresa->email = $_POST["email"];
            $this->empresa->senha = $_POST["senha"];
            return $this->empresa->logar();
        }

        function pesquisarEmpresa(){
            $this->empresa->nome = $_POST["nome"];
            return $this->empresa->pesquisarEmpresa($this->empresa->nome);
        }
    }

    $controle = new EmpresaControle();
    $controle->determinarAcao($_POST["acao"]);
?>