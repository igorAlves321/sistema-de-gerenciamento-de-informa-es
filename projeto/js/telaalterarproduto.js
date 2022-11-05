$(document).ready(function(){
    carregarTipos();
    carregarDados();

    $("#btnVoltar").click(function(){
        window.location.href="produto.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                descricao: $("#email").val(),
                fk_id_tipoproduto: $("#tipoProduto").val(),
                id : $("#idproduto").val(),
                acao : "alterar"
            },
            success: function(result){
                window.location.href="produto.php";
            }
        });
    });
});

function carregarDados(){
    $.ajax({
        url: "controle/produtocontrole.php",
        type : "POST",
        data:{
            id : $("#idproduto").val(),
            acao : "pegarPorId"
        },
        success: function(result){
            var lista = JSON.parse(result);
            var produto = lista[0];
            $("#nome").val(produto.nome);
            $("#descricao").val(produto.descricao);
            $("#tipoProduto").val(produto.fk_id_tipoproduto);
        }
    });
}

function carregarTipos(){
    $.ajax({
        url: "controle/tipoprodutocontrole.php",
        type: "POST",
        data:{
            acao : "pegarTipos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#tipoProduto").html("");
            for(i=0; i< lista.length; i++){
                var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                $("#tipoProduto").append(opcao);
            }
        }
    });
}