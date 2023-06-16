$(document).ready(function(){
    carregarTipos();
    atualizarTabela();

    $("#btnUpdate").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                descricao: $("#descricaoup").val(),
                fk_id_tipoempresa: $("#tipoEmpresaup").val(),
                idproduto: $("#idProdutoup").val()
            },
            success: function(resultado){
                alertify.success("Cadastro atualizado com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#descricaoup").val("");
                $("#tipoEmpresaup").val("1");
                $("#idProdutoup").val("");
            }
        });
    });

    $("#corpoTabela").on("click", ".btnAlterar", function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                idproduto: $(this).attr("idproduto")
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var produto = resposta[0];
                $("#nomeup").val(produto.nome);
                $("#descricaoup").val(produto.descricao);
                $("#tipoEmpresaup").val(produto.fk_id_tipoempresa)
                $("#idProdutoup").val(produto.id);
                $("#myModal").modal("show");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnExcluir", function(){
        alertify.confirm("Você deseja excluir o " + $(this).attr("idproduto") + "?",
        ()=>{
            $.ajax({
                url: "controle/produtocontrole.php",
                type: "POST",
                data:{
                    idproduto: $(this).attr("idproduto"),
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
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                descricao:  $("#descricao").val(),
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                acao : "inserir"
            },
            success: function(){
                $("#nome").val("");
                $("#descricao").val("");
                atualizarTabela();
            }
        });
    });

    $("#btnPesquisar").click(function(){
        var pesquisa = $("#pesquisaProduto").val();
        pesquisarProdutos(pesquisa);
    });

    $("#btnLimpar").click(function(){
        $("#pesquisaProduto").val("");
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

function atualizarTabela(){
    $.ajax({
        url: "controle/produtocontrole.php",
        type: "POST",
        data:{
            acao: "pegarTodos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
        }
    });
}

function pesquisarProdutos(pesquisa){
    $.ajax({
        url: "controle/produtocontrole.php",
        type: "POST",
        data:{
            acao: "pesquisarProduto",
            nome: pesquisa
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
            if (lista.length === 0) {
                $("#corpoTabela").append("<tr><td colspan='5' class='text-center'>Nenhum resultado encontrado.</td></tr>");
            } else {
                for(i=0; i < lista.length; i++){
                    var linha = "<tr>";
                    linha += "<td>"+lista[i].nome+"</td>";
                    linha += "<td>"+lista[i].descricao+"</td>";
                    linha += "<td>"+lista[i].nometipo+"</td>";
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idproduto='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idproduto='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}
