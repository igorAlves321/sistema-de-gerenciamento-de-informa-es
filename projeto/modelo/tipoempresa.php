<?php
    class TipoEmpresa{
        public $id;
        public $nome;
        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function pegarTipos(){
            $stmt = Conexao::$conn->prepare('SELECT * FROM tipoempresa');
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    }
?>