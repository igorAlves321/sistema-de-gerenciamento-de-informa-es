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
        }

        function pegarTipos(){
            return $this->tipoEmpresa->pegarTipos();
        }
    }

    $controle = new TipoEmpresaControle();
    $controle->determinarAcao($_POST["acao"]);

?>