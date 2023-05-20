<?php
    include_once("../utilitarios/conexao.php");
    include_once("../modelo/empresa.php");

    class EmpresaControle {
        private $empresa;

        function __construct() {
            $this->empresa = new Empresa();
        }

        function determinarAcao($acao) {
            //inserir, alterar, excluir, pegarTodos, pegarPorId, logar, pesquisarEmpresas
            if ($acao == "inserir")
                echo $this->inserir();
            else if ($acao == "alterar")
                echo $this->alterar();
            else if ($acao == "excluir")
                echo $this->excluir();
            else if ($acao == "pegarTodos")
                echo $this->pegarTodos();
            else if ($acao == "pegarPorId")
                echo $this->pegarPorId();
            else if ($acao == "logar")
                echo $this->logar();
            else if ($acao == "pesquisarEmpresas")
                echo $this->pesquisarEmpresas();
        }

        function inserir() {
            $this->empresa->nome = $_POST["nome"];
            $this->empresa->email = $_POST["email"];
            $this->empresa->telefone = $_POST["telefone"];
            $this->empresa->senha = $_POST["senha"];
            $this->empresa->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];

            $this->empresa->inserir();
        }

        function alterar() {
            $this->empresa->nome = $_POST["nome"];
            $this->empresa->email = $_POST["email"];
            $this->empresa->telefone = $_POST["telefone"];
            $this->empresa->id = $_POST["id"];
            $this->empresa->fk_id_tipoempresa = $_POST["fk_id_tipoempresa"];

            $this->empresa->alterar();
        }

        function excluir() {
            $this->empresa->id = $_POST["id"];
            $this->empresa->excluir();
        }

        function pegarTodos() {
            $pesquisa = isset($_POST["pesquisa"]) ? $_POST["pesquisa"] : ""; // Obter o valor da pesquisa (caso tenha sido enviado)
            if (!empty($pesquisa)) {
                $empresas = $this->empresa->buscarPorNome($pesquisa);
            } else {
                $empresas = $this->empresa->pegarTodos();
            }
            return $empresas;
        }

        function pegarPorId() {
            $this->empresa->id = $_POST["id"];
            return $this->empresa->pegarPorId();
        }

        function logar() {
            $this->empresa->email = $_POST["email"];
            $this->empresa->senha = $_POST["senha"];
            return $this->empresa->logar();
        }

        function pesquisarEmpresas() {
            $nomeEmpresa = isset($_POST["pesquisa"]) ? $_POST["pesquisa"] : ""; // Obter o valor da pesquisa (caso tenha sido enviado)
            if (!empty($nomeEmpresa)) {
                $empresas = $this->empresa->buscarPorNome($nomeEmpresa);
            } else {
                $empresas = $this->empresa->pegarTodos();
            }
            echo json_encode($empresas);
        }
    }

    $controle = new EmpresaControle();
    $controle->determinarAcao($_POST["acao"]);
?>
