<?php
    class TipoProduto{
        public $id;
        public $nome;
        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function pegarTipos(){
            $stmt = Conexao::$conn->prepare('SELECT * FROM tipoproduto');
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    }
?>