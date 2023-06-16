<?php
    class TipoEmpresa{
        public $id;
        public $nome;
        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function inserir(){
            $parametros = Array(
                ":nome" => $this->nome
            );
            $stmt = Conexao::$conn->prepare('INSERT INTO tipoempresa (nome) VALUES (:nome)');
            $stmt->execute($parametros);
        }

        function alterar(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('UPDATE tipoempresa SET nome = :nome WHERE id = :id');
            $stmt->execute($parametros);
        }

        function excluir(){
            $parametros = Array(
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('DELETE FROM tipoempresa WHERE id = :id');
            $stmt->execute($parametros);
        }

        function pegarPorId(){
            $parametros = Array(
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('SELECT * FROM tipoempresa WHERE id = :id');
            $stmt->execute($parametros);
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        function pegarTipos(){
            $stmt = Conexao::$conn->prepare('SELECT * FROM tipoempresa');
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

function pesquisarTipo($nome){
    $parametros = Array(
        ":nome" => '%'.$nome.'%'
    );
    $stmt = Conexao::$conn->prepare('select * from tipoempresa 
    where nome like :nome');
    $stmt->execute($parametros);
    return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

    }
    
?>
