$(document).ready(function(){
    carregarTipos();
    carregarDados();

    $("#btnVoltar").click(function(){
        window.location.href="index.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                descricao: $("#descricao").val(),
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                idproduto: $("#idproduto").val(),
                acao: "alterar"
            },
            success: function(result){
                window.location.href="index.php";
            }
        });
    });

    function carregarDados(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                idproduto: $("#idproduto").val(),
                acao: "pegarPorId"
            },
            success: function(result){
                var lista = JSON.parse(result);
                var produto = lista[0];
                $("#nome").val(produto.nome);
                $("#descricao").val(produto.descricao);
                $("#tipoEmpresa").val(produto.fk_id_tipoempresa);
            }
        });
    }

    function carregarTipos(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type: "POST",
            data:{
                acao: "pegarTipos"
            },
            success: function(result){
                var lista = JSON.parse(result);
                $("#tipoEmpresa").html("");
                for(var i = 0; i < lista.length; i++){
                    var opcao = "<option value='" + lista[i].id + "'>" + lista[i].nome + "</option>";
                    $("#tipoEmpresa").append(opcao);
                }
            }
        });
    }
});
