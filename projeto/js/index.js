$(document).ready(function(){
    atualizarTabela();
    carregarTipos();

    $("#btnUpdate").click(function(){
alert("oioioi");
        $.ajax({
            url: "controle/empresacontrole.php",
            type:"POST",
            data:{
                acao : "alterar",
                nome: $("#nomeup").val(),
                telefone: $("#telefoneup").val(),
                email: $("#emailup").val() ,
                senha: $("#senhaup").val() ,
                fk_id_tipoEmpresa: $("#tipoEmpresasup").val() ,
                id: $("#idEmpresasup").val()
            },
            success: function(resultado){
                alertify.success("Cadastro atualizado com sucesso!");
                $("#myModal").modal("hide");
                atualizarTabela();
                $("#nomeup").val("");
                $("#telefoneup").val("");
                $("#emailup").val("");
                $("#senhaup").val("");
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
                id: $(this).attr("idEmpresa")
            },
            success: function(resultado){
                var resposta = JSON.parse(resultado);
                var empresa = resposta[0];
                $("#nomeup").val(empresa.nome);
                $("#telefoneup").val(empresa.telefone);
                $("#emailup").val(empresa.email);
                $("#senhaup").val(empresa.senha);
                $("#tipoEmpresaup").val(empresa.fk_id_tipoempresa)
                $("#idEmpresaup").val(empresa.id);
                $("#myModal").modal("show");
            }
        });
    });

    $("#corpoTabela").on("click" , ".btnExcluir", function(){
confirm("Você deseja excluir o "+$(this).attr("idEmpresa")+"?",
        ()=>{
            $.ajax({
                url: "controle/empresacontrole.php",
                type: "POST",
                data:{
                    id: $(this).attr("idEmpresa"),
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
            url: "controle/empresacontrole.php",
            type: "POST",
            data:{
                nome: $("#nome").val() ,
                telefone:  $("#telefone").val() ,
                email:  $("#email").val(),
                fk_id_tipoempresa: $("#tipoEmpresa").val(),
                senha: $("#senha").val(),
                acao : "inserir"
            },
            success: function(result){
                console.log(result);
                $("#nome").val("");
                $("#telefone").val("");
                $("#email").val("");
                $("#senha").val("");
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
        url: "controle/empresacontrole.php",
        type: "POST",
        data:{
            acao: "pegarTodos"
        },
        success: function(result){
            var lista = JSON.parse(result);
            $("#corpoTabela").html("");
            for(i=0; i < lista.length; i++){
                var linha = "<tr>";
                linha = linha + "<td>"+lista[i].nome+"</td>";
                linha = linha + "<td>"+lista[i].telefone+"</td>";
                linha = linha + "<td>"+lista[i].email+"</td>";
                linha = linha + "<td>"+lista[i].senha+"</td>";
                linha = linha + "<td>"+lista[i].nometipo+"</td>";
                linha = linha + "<td><button title='Excluir "+lista[i].nome+"' class='btn btn-danger btnExcluir' idEmpresa='"+lista[i].id+"'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar "+lista[i].nome+"' class='btn btn-warning btnAlterar' idEmpresa='"+lista[i].id+"'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
                linha = linha + "</tr>";
                $("#corpoTabela").append(linha);
            }
        }
    });
}