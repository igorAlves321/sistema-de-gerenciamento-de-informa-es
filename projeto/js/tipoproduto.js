$(document).ready(function(){
    $("#btnUpdate").click(function(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                id: $("#idTipoProdutop").val()
            },
            success: function(resultado){
                alertify.success("Tipo de produto atualizado com sucesso!");
                $("#myModal").modal("hide");
                $("#nomeup").val("");
                $("#idTipoProdutop").val("");
            }
        });
    });

    $("#corpoTabela").on("click", ".btnAlterar", function(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                id: $(this).attr("idtipoproduto")
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var tipoProduto = resposta[0];
                $("#nomeup").val(tipoProduto.nome);
                $("#idTipoProdutop").val(tipoProduto.id);
                $("#myModal").modal("show");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnExcluir", function(){
        alertify.confirm("Você deseja excluir o " + $(this).attr("idtipoproduto") + "?",
        ()=>{
            $.ajax({
                url: "controle/tipoprodutocontrole.php",
                type: "POST",
                data:{
                    id: $(this).attr("idtipoproduto"),
                    acao : "excluir"
                },
                success: function(result){
                    pesquisarTipos($("#pesquisaTipoProduto").val());
                }
            });
        });
    });

    $("#btnCadastrar").click(function(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val(),
                acao : "inserir"
            },
            success: function(){
                $("#nome").val("");
                pesquisarTipos($("#pesquisaTipoProduto").val());
            }
        });
    });

    $("#btnPesquisar").click(function(){
        var pesquisa = $("#pesquisaTipoProduto").val();
        pesquisarTipos(pesquisa);
    });

    $("#btnLimpar").click(function(){
        $("#pesquisaTipoProduto").val("");
        limparTabela();
    });
});

function limparTabela(){
    $("#corpoTabela").html("");
}

function pesquisarTipos(pesquisa){
    $.ajax({
        url: "controle/tipoprodutocontrole.php",
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
                    linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idtipoproduto='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idtipoproduto='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                    linha += "</tr>";
                    $("#corpoTabela").append(linha);
                }
            }
        }
    });
}
