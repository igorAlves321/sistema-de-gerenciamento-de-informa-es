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

        function pesquisarEmpresasPorTipo($idTipo){
            $stmt = Conexao::$conn->prepare('SELECT * FROM empresa WHERE fk_id_tipoempresa = :idTipo');
            $stmt->bindValue(':idTipo', $idTipo);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>