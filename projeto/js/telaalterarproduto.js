$(document).ready(function(){
    carregarTipos();
    carregarDados();

    $("#btnVoltar").click(function(){
        window.location.href = "index.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao: "alterar",
                nome: $("#nome").val(),
                descricao: $("#descricao").val(),
                fk_id_tipoproduto: $("#tipoProduto").val(),
                idproduto: $("#idproduto").val(),
                idempresa: $("#idempresa").val()
            },
            success: function(result){
                window.location.href = "index.php";
            }
        });
    });

    function carregarDados(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao: "pegarPorId",
                idproduto: $("#idproduto").val(),
                idempresa: $("#idempresa").val()
            },
            success: function(result){
                var produto = JSON.parse(result);
                $("#nome").val(produto[0].nome);
                $("#descricao").val(produto[0].descricao); // Alteração aqui
                $("#tipoProduto").val(produto[0].fk_id_tipoproduto); // Alteração aqui
            }
        });
    }

    function carregarTipos(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                acao: "pegarTipos",
                idempresa: $("#idempresa").val()
            },
            success: function(result){
                var lista = JSON.parse(result);
                $("#tipoProduto").html("");
                for(var i = 0; i < lista.length; i++){
                    var opcao = "<option value='" + lista[i].id + "'>" + lista[i].nome + "</option>"; // Alteração aqui
                    $("#tipoProduto").append(opcao);
                }
            }
        });
    }
});
