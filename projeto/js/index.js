$(document).ready(function(){
    carregarTipos();
    atualizarTabela();

    $("#btnUpdate").click(function(){
        $.ajax({
            url: "controle/empresacontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                telefone: $("#telefoneup").val(),
                email: $("#emailup").val(),
                fk_id_tipoempresa: $("#tipoEmpresaup").val(),
                id: $("#idEmpresaup").val()
            },
            success: function(resultado){
                alertify.success("Cadastro atualizado com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#telefoneup").val("");
                $("#emailup").val("");
                $("#tipoEmpresaup").val("1");
                $("#idEmpresaup").val("");
            }
        });
    });

    $("#corpoTabela").on("click", ".btnAlterar", function(){
        $.ajax({
            url: "controle/empresacontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                id: $(this).attr("idempresa")
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var empresa = resposta[0];
                $("#nomeup").val(empresa.nome);
                $("#telefoneup").val(empresa.telefone);
                $("#emailup").val(empresa.email);
                $("#tipoEmpresaup").val(empresa.fk_id_tipoempresa)
                $("#idEmpresaup").val(empresa.id);
                $("#myModal").modal("show");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnExcluir", function(){
        alertify.confirm("Você deseja excluir o " + $(this).attr("idempresa") + "?",
        ()=>{
            $.ajax({
                url: "controle/empresacontrole.php",
                type: "POST",
                data:{
                    id: $(this).attr("idempresa"),
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
            url: "controle/empresacontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                telefone:  $("#telefone").val(),
                email:  $("#email").val(),
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                senha: $("#senha").val(),
                acao : "inserir"
            },
            success: function(){
                $("#nome").val("");
                $("#telefone").val("");
                $("#email").val("");
                $("#senha").val("");
                atualizarTabela();
            }
        });
    });

    $("#btnPesquisar").click(function(){
        var pesquisa = $("#pesquisaEmpresa").val();
        pesquisarEmpresas(pesquisa);
    });

    $("#btnLimpar").click(function(){
        $("#pesquisaEmpresa").val("");
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
            console.log("result", result); 
            var lista = JSON.parse(result);
            $("#tipoEmpresa").html("");
            for(i=0; i< lista.length; i++){
                var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                $("#tipoEmpresa").append(opcao);
            }

            $("#tipoEmpresaup").html("");
            for(i=0; i< lista.length; i++){
                var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                $("#tipoEmpresaup").append(opcao);
            }
        }
    });
}

function limparTabela() {
    $("#corpoTabela").html("");
}

function atualizarTabela(){
    limparTabela();
    $.ajax({
        url: "controle/empresacontrole.php",
        type: "POST",
        data:{
            acao: "pegarTodos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            if (lista.length === 0) {
                $("#corpoTabela").append("<tr><td colspan='5' class='text-center'>Nenhum resultado encontrado.</td></tr>");
            } else {
                for(i=0; i < lista.length; i++){
                    var linha = "<tr>";
                    linha += "<td>"+lista[i].nome+"</td>";
                    linha += "<td>"+lista[i].telefone+"</td>";
                    linha += "<td>"+lista[i].email+"</td>";
                    linha += "<td>"+lista[i].nometipo+"</td>";
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idempresa='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idempresa='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}

function pesquisarEmpresas(pesquisa){
    limparTabela();
    $.ajax({
        url: "controle/empresacontrole.php",
        type: "POST",
        data:{
            acao: "pesquisarEmpresa",
            nome: pesquisa
        },
        success: function(result){
            var lista = JSON.parse(result);
            if (lista.length === 0) {
                $("#corpoTabela").append("<tr><td colspan='5' class='text-center'>Nenhum resultado encontrado.</td></tr>");
            } else {
                for(i=0; i < lista.length; i++){
                    var linha = "<tr>";
                    linha += "<td>"+lista[i].nome+"</td>";
                    linha += "<td>"+lista[i].telefone+"</td>";
                    linha += "<td>"+lista[i].email+"</td>";
                    linha += "<td>"+lista[i].nometipo+"</td>";
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idempresa='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idempresa='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}
