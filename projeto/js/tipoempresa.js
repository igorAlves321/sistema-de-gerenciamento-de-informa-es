$(document).ready(function(){
    carregarTipos();
    atualizarTabela();

    $("#btnUpdate").click(function(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                id: $("#idTipoEmpresap").val()
            },
            success: function(resultado){
                alertify.success("Tipo de empresa atualizado com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#idTipoEmpresap").val("");
            }
        });
    });

    $("#corpoTabela").on("click", ".btnAlterar", function(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                id: $(this).attr("idtipoempresa")
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var tipoEmpresa = resposta[0];
                $("#nomeup").val(tipoEmpresa.nome);
                $("#idTipoEmpresap").val(tipoEmpresa.id);
                $("#myModal").modal("show");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnExcluir", function(){
        alertify.confirm("Você deseja excluir o " + $(this).attr("idtipoempresa") + "?",
        ()=>{
            $.ajax({
                url: "controle/tipoempresacontrole.php",
                type: "POST",
                data:{
                    id: $(this).attr("idtipoempresa"),
                    acao : "excluir"
                },
                success: function(result){
                    atualizarTabela();
                }
            });
        });
    });

    $("#btnCadastrar").click(function(){
        $.ajax({
            url: "controle/tipoempresacontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                acao : "inserir"
            },
            success: function(){
                $("#nome").val("");
                atualizarTabela();
            }
        });
    });

    $("#btnPesquisar").click(function(){
        var pesquisa = $("#pesquisaTipoEmpresa").val();
        pesquisarTipos(pesquisa);
    });

    $("#btnLimpar").click(function(){
        $("#pesquisaTipoEmpresa").val("");
        atualizarTabela();
    });
});

function carregarTipos(){
    $.ajax({
        url: "controle/tipoempresacontrole.php",
        type: "POST",
        data:{
            acao : "pegarTipos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
            if (lista.length === 0) {
                $("#corpoTabela").append("<tr><td colspan='2' class='text-center'>Nenhum resultado encontrado.</td></tr>");
            } else {
                for(i=0; i < lista.length; i++){
                    var linha = "<tr>";
                    linha += "<td>"+lista[i].nome+"</td>";
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idtipoempresa='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idtipoempresa='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}

function atualizarTabela(){
    carregarTipos(); // reutilizando a função que já busca todos os tipos
}

function pesquisarTipos(pesquisa){
    $.ajax({
        url: "controle/tipoempresacontrole.php",
        type: "POST",
        data:{
            acao: "pesquisarTipo",
            nome: pesquisa
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
            if (lista.length === 0) {
                $("#corpoTabela").append("<tr><td colspan='2' class='text-center'>Nenhum resultado encontrado.</td></tr>");
            } else {
                for(i=0; i < lista.length; i++){
                    var linha = "<tr>";
                    linha += "<td>"+lista[i].nome+"</td>";
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idtipoempresa='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idtipoempresa='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}
