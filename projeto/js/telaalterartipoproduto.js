$(document).ready(function(){
    carregarDados();

    $("#btnVoltar").click(function(){
        window.location.href="index.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                id: $("#idtipoproduto").val(),
                acao: "alterar"
            },
            success: function(result){
                window.location.href="index.php";
            }
        });
    });

    function carregarDados(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                id: $("#idtipoproduto").val(),
                acao: "pegarPorId"
            },
            success: function(result){
                var lista = JSON.parse(result);
                if(lista.length > 0) {
                    var tipoProduto = lista[0];
                    $("#nome").val(tipoProduto.nome);
                }
            }
        });
    }

    function carregarTipos(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                acao: "pegarTipos"
            },
            success: function(result){
                var lista = JSON.parse(result);
                $("#tipoProduto").html("");
                if(lista.length > 0) {
                    for(var i = 0; i < lista.length; i++){
                        var opcao = "<option value='" + lista[i].id + "'>" + lista[i].nome + "</option>";
                        $("#tipoProduto").append(opcao);
                    }
                } else {
                    $("#tipoProduto").append("<option>Nenhum tipo de produto encontrado</option>");
                }
            }
        });
    }

    carregarTipos();
});
