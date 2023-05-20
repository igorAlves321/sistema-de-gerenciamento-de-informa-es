<?php
    class Empresa{
        public $id;
        public $nome;
        public $email;
        public $telefone;
        public $fk_id_tipoempresa;
        public $senha;
        public $pdo;

        function __construct(){
            $this->pdo = new Conexao();
        }

        function inserir(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":telefone" => $this->telefone,
                ":email" => $this->email,
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa,
                ":senha" => md5($this->senha)
            );
            $stmt = Conexao::$conn->prepare('insert into empresa (nome, telefone, email, fk_id_tipoempresa, senha) 
                    values (:nome, :telefone, :email, :fk_id_tipoempresa, :senha)');
            $stmt->execute($parametros);
        }

        function alterar(){
            $parametros = Array(
                ":nome" => $this->nome,
                ":telefone" => $this->telefone,
                ":email" => $this->email,
                ":fk_id_tipoempresa" => $this->fk_id_tipoempresa,
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('
            update empresa set nome = :nome, telefone = :telefone, email = :email,
            fk_id_tipoempresa = :fk_id_tipoempresa where id = :id');
            $stmt->execute($parametros);
        }

        function pegarTodos(){
            $stmt = Conexao::$conn->prepare('select p.*, tp.nome as nometipo from empresa p join tipoempresa tp on tp.id = p.fk_id_tipoempresa ');
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

        function buscarPorNome($nome){
            $stmt = Conexao::$conn->prepare('SELECT * FROM empresa WHERE nome LIKE :nome');
            $stmt->bindValue(':nome', '%' . $nome . '%');
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

        function pegarPorId(){
            $parametros = Array(
                ":id" => $this->id
            );
            $stmt = Conexao::$conn->prepare('select p.* from empresa p where id = :id ');
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
                return "1";
            }else{
                return "0";
            }
        }
    }

?>
