<?php
    class Empresa{
        public $id;
        public $nome;
        public $email;
        public $telefone; 
        public $senha;
        public $fk_id_tipoempresa;
        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function inserir(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":email" => $this->email,
                ":telefone" => $this->telefone,
                ":senha" => md5($this->senha),
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa
            );
            $stmt = Conexao::$conn->prepare('INSERT INTO empresa (nome, email, telefone, senha, fk_id_tipoempresa) VALUES (:nome, :email, :telefone, :senha, :fk_id_tipoempresa)');
            $stmt->execute($parametros);
        }

        function alterar(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":email" => $this->email,
                ":telefone" => $this->telefone,
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa,
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('
            update empresa set nome = :nome, email = :email, telefone = :telefone,
            fk_id_tipoempresa = :fk_id_tipoempresa where id = :id');
            $stmt->execute($parametros);
        }

        function pegarTodos(){
            $stmt = Conexao::$conn->prepare('select e.*, tp.nome as nometipo from empresa e join tipoempresa tp on tp.id = e.fk_id_tipoempresa ');
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        function excluir(){
            $parametros = Array(
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('delete from empresa where id = :id');
            $stmt->execute($parametros);
        }

        function pegarPorId(){
            $parametros = Array(
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('select e.* from empresa e where id = :id ');
            $stmt->execute($parametros);
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        function logar(){
            $parametros = Array(
                ":email" => $this->email,
                ":senha" => md5($this->senha)
            );
            $stmt = Conexao::$conn->prepare('select * from empresa 
            where email = :email and senha = :senha ');
            $stmt->execute($parametros);
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if( count($resultado) > 0){
                $_SESSION["logado"] = "1";
                $_SESSION["nome"] = $resultado[0]["nome"];
                $_SESSION["empresa_id"] = $resultado[0]["id"];  // linha adicionada
                return "1";
            }else{
                return "0";
            }
        }

        function pesquisarEmpresa($nome){
            $parametros = Array(
                ":nome" => '%'.$nome.'%'
            );
            $stmt = Conexao::$conn->prepare('select * from empresa 
            where nome like :nome');
            $stmt->execute($parametros);
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    }
?>