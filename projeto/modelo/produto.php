<?php
class Produto{
    public $idproduto;
    public $nome;
    public $descricao;
    public $idempresa;
    public $fk_id_tipoproduto;

    function __construct(){
        $this->conexao = new Conexao();
    }

    function inserir() {
        $parametros = Array(
            ":nome" => $this->nome,
            ":descricao" => $this->descricao,
            ":idempresa" => $this->idempresa,
            ":fk_id_tipoproduto" => $this->fk_id_tipoproduto,
        );
        $stmt = Conexao::$conn->prepare('insert into produto (nome, descricao, idempresa, fk_id_tipoproduto) 
                values (:nome, :descricao, :idempresa, :fk_id_tipoproduto)');
        $stmt->execute($parametros);
    }

    function alterar() {
        $parametros = Array(
            ":nome" => $this->nome,
            ":descricao" => $this->descricao,
            ":idempresa" => $this->idempresa,
            ":fk_id_tipoproduto" => $this->fk_id_tipoproduto,
            ":idproduto" => $this->idproduto
        );
        $stmt = Conexao::$conn->prepare('
        update produto set nome = :nome, descricao = :descricao, idempresa = :idempresa, 
        fk_id_tipoproduto = :fk_id_tipoproduto where idproduto = :idproduto');
        $stmt->execute($parametros);
    }

    function pegarTodos() {
        $parametros = Array(
            ":idempresa" => $this->idempresa
        );
        $stmt = Conexao::$conn->prepare('select p.*, tp.nome as nometipo, e.nome as nomeempresa 
        from produto p 
        join tipoproduto tp on tp.id = p.fk_id_tipoproduto 
        join empresa e on e.id = p.idempresa where p.idempresa = :idempresa');
        $stmt->execute($parametros);
        return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    function excluir() {
        $parametros = Array(
            ":idproduto" => $this->idproduto
        );
        $stmt = Conexao::$conn->prepare('delete from produto where idproduto = :idproduto');
        $stmt->execute($parametros);
    }

    function pegarPorId() {
        $parametros = Array(
            ":idproduto" => $this->idproduto
        );
        $stmt = Conexao::$conn->prepare('select p.* from produto p where idproduto = :idproduto ');
        $stmt->execute($parametros);
        return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    function pesquisarProdutos($nome) {
        $parametros = Array(
            ":nome" => '%'.$nome.'%',
            ":idempresa" => $this->idempresa
        );
        $stmt = Conexao::$conn->prepare('select * from produto 
        where nome like :nome and idempresa = :idempresa');
        $stmt->execute($parametros);
        return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}
?>
