$(document).ready(function(){
    carregarTipos();

    $("#btnUpdate").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                descricao: $("#descricaoup").val(),
                fk_id_tipoproduto: $("#tipoProdutoup").val(),
                idproduto: $("#idProdutoup").val(),
                idempresa: $("#idempresa").val()
            },
            success: function(resultado){
                alertify.success("Cadastro atualizado com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#descricaoup").val("");
                $("#tipoProdutoup").val("1");
                $("#idProdutoup").val("");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnAlterar", function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                idproduto: $(this).attr("idproduto"),
                idempresa: $("#idempresa").val()
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var produto = resposta[0];
                $("#nomeup").val(produto.nome);
                $("#descricaoup").val(produto.descricao);
                $("#tipoProdutoup").val(produto.fk_id_tipoproduto);
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
                    idempresa: $("#idempresa").val(),
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
                fk_id_tipoproduto: $("#tipoProduto").val(),
                idempresa: $("#idempresa").val(),
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
        limparTabela();
    });

    function limparTabela(){
        $("#corpoTabela").html("");
    }

    function carregarTipos(){
        $.ajax({
            url: "controle/tipoprodutocontrole.php",
            type: "POST",
            data:{
                acao : "pegarTipos",
                idempresa: $("#idempresa").val()
            },
            success: function(result){
                var lista = JSON.parse(result);
                $("#tipoProduto").html("");
                for(i=0; i< lista.length; i++){
                    var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                    $("#tipoProduto").append(opcao);
                }

                $("#tipoProdutoup").html("");
                for(i=0; i< lista.length; i++){
                    var opcao = "<option value='"+lista[i].id+"'>"+lista[i].nome+"</option>";
                    $("#tipoProdutoup").append(opcao);
                }
            }
        });
    }

    function atualizarTabela(){
        var pesquisa = $("#pesquisaProduto").val();
        if (pesquisa === "") {
            limparTabela();
        } else {
            pesquisarProdutos(pesquisa);
        }
    }

    function pesquisarProdutos(pesquisa){
        limparTabela();
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao: "pesquisarProdutos",
                nome: pesquisa,
                idempresa: $("#idempresa").val()
            },
            success: function(result){
                var lista = JSON.parse(result);
                if (lista.length === 0) {
                    $("#corpoTabela").html("<tr><td colspan='4' class='text-center'>Nenhum resultado encontrado.</td></tr>");
                } else {
                    for(i=0; i < lista.length; i++){
                        var linha = "<tr>";
                        linha += "<td>"+lista[i].nome+"</td>";
                        linha += "<td>"+lista[i].descricao+"</td>";
                        linha += "<td>"+lista[i].nometipo+"</td>";
                        linha += "<td>"+lista[i].nomeempresa+"</td>";
                        linha += "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idproduto='"+lista[i].idproduto+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idproduto='"+lista[i].idproduto+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                        linha += "</tr>";
                        $("#corpoTabela").append(linha);
                    }
                }
            }
        });
    }
});
