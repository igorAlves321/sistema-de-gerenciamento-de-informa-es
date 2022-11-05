$(document).ready(function(){
    carregarTipos();
    carregarDados();

    $("#btnVoltar").click(function(){
        window.location.href="index.php";       
    });

    $("#btnAlterar").click(function(){
        $.ajax({
            url: "controle/empresacontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                email: $("#email").val(),
                telefone: $("#telefone").val(),
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                id : $("#idempresa").val(),
                acao : "alterar"
            },
            success: function(result){
                window.location.href="index.php";
            }
        });
    });
});

function carregarDados(){
    $.ajax({
        url: "controle/empresacontrole.php",
        type : "POST",
        data:{
            id : $("#idempresa").val(),
            acao : "pegarPorId"
        },
        success: function(result){
            var lista = JSON.parse(result);
            var empresa = lista[0];
            $("#nome").val(empresa.nome);
            $("#email").val(empresa.email);
            $("#telefone").val(empresa.telefone);
            $("#tipoEmpresa").val(empresa.fk_id_tipoempresa);
        }
    });
}

function carregarTipos(){
    $.ajax({
        url: "controle/tipoempresacontrole.php",
        type: "POST",
        data:{
            acao : "pegarTipos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#tipoEmpresa").html("");
            for(i=0; i< lista.length; i++){
                var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                $("#tipoEmpresa").append(opcao);
            }
        }
    });
}