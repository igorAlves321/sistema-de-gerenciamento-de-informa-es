$(document).ready(function(){
    atualizarTabela();
    carregarTipos();

    $("#btnUpdate").click(function(){
alert("teste");
        $.ajax({
            url: "controle/produtocontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                descricao: $("#descricaoup").val(),
                fk_id_tipoEmpresa: $("#tipoEmpresasup").val() ,
                id: $("#idProdutosup").val()
            },
            success: function(resultado){
                alertify.success("Cadastro do produto concluido com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#descricaoup").val("");
                $("#tipoEmpresaup").val("1");
                $("#idprodutoup").val("");
            }
        });
    });

    $("#corpoTabela").on("click", ".btnAlterar", function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                acao : "pegarPorId",
                id: $(this).attr("idProduto")
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
confirm("Você deseja excluir o "+$(this).attr("idProduto")+"?",
        ()=>{
            $.ajax({
                url: "controle/produtocontrole.php",
                type: "POST",
                data:{
                    id: $(this).attr("idProduto"),
                    acao : "excluir"
                },
                success: function(result){
                    atualizarTabela();
                }
            });
        });
        /**/
    });

    $("#btnCadastrar").click(function(){
        $.ajax({
            url: "controle/produtocontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val() ,
                descricao:  $("#descricao").val() ,
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                acao : "inserir"
            },
            success: function(result){
                console.log(result);
                $("#nome").val("");
                $("#descricao").val("");
                atualizarTabela();
            }
        });
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
            console.log(result);
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
            for(i=0; i < lista.length; i++){
                var linha = "<tr>";
                linha = linha + "<td>"+lista[i].nome+"</td>";
                linha = linha + "<td>"+lista[i].descricao+"</td>";
                linha = linha + "<td>"+lista[i].nometipo+"</td>";
                linha = linha + "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idproduto='"+lista[i].id+"'><span class='teste teste-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idProduto='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                linha = linha + "</tr>";
                $("#corpoTabela").append(linha);
            }
        }
    });
}