<?php
    class Produto{
        public $idproduto;
        public $nome;
        public $descricao;
        public $fk_id_tipoempresa;

        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function inserir(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":descricao" => $this->descricao,
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa,

            );
            $stmt = Conexao::$conn->prepare('insert into produto (nome, descricao, idempresa) 
                    values (:nome, :descricao, :fk_id_tipoempresa)');
            $stmt->execute($parametros);
        }

        function alterar(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":descricao" => $this->descricao,
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa,
                ":idproduto" => $this->idproduto
            );
            $stmt = Conexao::$conn->prepare('
            update produto set nome = :nome, descricao = :descricao,
            fk_id_tipoempresa = :fk_id_tipoempresa where idproduto = :idproduto');
            $stmt->execute($parametros);
        }

        function pegarTodos(){
            $stmt = Conexao::$conn->prepare('select p.*, tp.nome as nometipo from produto p join tipoempresa tp on tp.idproduto = p.idempresa ');
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        function excluir(){
            $parametros = Array(
                ":idproduto" => $this->idproduto
            );
            $stmt = Conexao::$conn->prepare('delete from produto where idproduto = :idproduto');
            $stmt->execute($parametros);
        }

        function pegarPorId(){
            $parametros = Array(
                ":idproduto" => $this->idproduto
            );
            $stmt = Conexao::$conn->prepare('select p.* from produto p where idproduto = :idproduto ');
            $stmt->execute($parametros);
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        function pesquisarProduto($nome){
            $parametros = Array(
                ":nome" => '%'.$nome.'%'
            );
            $stmt = Conexao::$conn->prepare('select * from produto 
            where nome like :nome');
            $stmt->execute($parametros);
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
   }
    

?>
