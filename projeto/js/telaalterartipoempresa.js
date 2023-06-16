$(document).ready(function(){
    carregarDados();
    carregarTipos();

    $("#btnVoltar").click(function(){
        window.location.href="index.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                id: $("#idtipoempresa").val(),
                acao: "alterar"
            },
            success: function(result){
                window.location.href="index.php";
            }
        });
    });

    function carregarDados(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type: "POST",
            data:{
                id: $("#idtipoempresa").val(),
                acao: "pegarPorId"
            },
            success: function(result){
                var lista = JSON.parse(result);
                var tipoEmpresa = lista[0];
                $("#nome").val(tipoEmpresa.nome);
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
