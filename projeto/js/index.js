$(document).ready(function() {

  carregarTipos();

  $("#btnPesquisar").click(function() {
    var nomeEmpresa = $("#pesquisaEmpresa").val();
    pesquisarEmpresas(nomeEmpresa);
  });

  $("#corpoTabela").on("click", ".btnAlterar", function() {
    var idEmpresa = $(this).attr("idEmpresa");
    pegarEmpresaPorId(idEmpresa);
  });

  $("#corpoTabela").on("click", ".btnExcluir", function() {
    var idEmpresa = $(this).attr("idEmpresa");
    excluirEmpresa(idEmpresa);
  });

  $("#btnCadastrar").click(function() {
    cadastrarEmpresa();
  });

  function carregarTipos() {
    $.ajax({
      url: "controle/tipoempresacontrole.php",
      type: "POST",
      data: {
        acao: "pegarTipos"
      },
      success: function(result) {
        var lista = JSON.parse(result);

        $("#tipoEmpresa").html("");
        for (var i = 0; i < lista.length; i++) {
          var opcao = "<option value='" + lista[i].id + "'>" + lista[i].nome + "</option>";
          $("#tipoEmpresa").append(opcao);
        }
      }
    });
  }

  function atualizarTabela() {
    $.ajax({
      url: "controle/empresacontrole.php",
      type: "POST",
      data: {
        acao: "pegarTodos"
      },
      success: function(result) {
        var lista = JSON.parse(result);

        $("#corpoTabela").html("");
        for (var i = 0; i < lista.length; i++) {
          var linha = "<tr>";
          linha += "<td>" + lista[i].nome + "</td>";
          linha += "<td>" + lista[i].telefone + "</td>";
          linha += "<td>" + lista[i].email + "</td>";
          linha += "<td>" + lista[i].senha + "</td>";
          linha += "<td>" + lista[i].nometipo + "</td>";
          linha +=
            "<td><button title='Excluir " +
            lista[i].nome +
            "' class='btn btn-danger btnExcluir' idEmpresa='" +
            lista[i].id +
            "'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar " +
            lista[i].nome +
            "' class='btn btn-warning btnAlterar' idEmpresa='" +
            lista[i].id +
            "'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
          linha += "</tr>";
          $("#corpoTabela").append(linha);
        }
      }
    });
  }

function pesquisarEmpresas(nomeEmpresa) {
  $.ajax({
    url: "controle/empresacontrole.php",
    type: "POST",
    data: {
      acao: "pesquisarEmpresas",
      pesquisa: nomeEmpresa
    },
    success: function(result) {
      var lista = JSON.parse(result);
      $("#corpoTabela").html("");
      if (lista.length === 0) {
        $("#corpoTabela").append("<tr><td colspan='5' class='text-center'>Nenhum resultado encontrado.</td></tr>");
      } else {
        for (var i = 0; i < lista.length; i++) {
          var linha = "<tr>";
          linha += "<td>" + lista[i].nome + "</td>";




          linha += "<td>" + lista[i].telefone + "</td>";
          linha += "<td>" + lista[i].email + "</td>";
          linha += "<td>" + lista[i].senha + "</td>";
          linha += "<td>" + lista[i].nometipo + "</td>";
          linha +=
            "<td><button title='Excluir " +
            lista[i].nome +
            "' class='btn btn-danger btnExcluir' idEmpresa='" +
            lista[i].id +
            "'><span class='oi oi-x' title='icon name' aria-hidden='true'></span></button> <button title='Alterar " +
            lista[i].nome +
            "' class='btn btn-warning btnAlterar' idEmpresa='" +
            lista[i].id +
            "'><span class='oi oi-loop-circular' title='icon name' aria-hidden='true'></span></button></td>";
          linha += "</tr>";

          $("#corpoTabela").append(linha);
        }
      }
    }
  });
}

  function pegarEmpresaPorId(idEmpresa) {
    $.ajax({
      url: "controle/empresacontrole.php",
      type: "POST",
      data: {
        acao: "pegarPorId",
        id: idEmpresa
      },
      success: function(result) {
        var resposta = JSON.parse(result);
        var empresa = resposta[0];
        $("#nomeup").val(empresa.nome);
        $("#telefoneup").val(empresa.telefone);
        $("#emailup").val(empresa.email);
        $("#senhaup").val(empresa.senha);
        $("#tipoEmpresaup").val(empresa.fk_id_tipoempresa);
        $("#idEmpresaup").val(empresa.id);
        $("#myModal").modal("show");
      }
    });
  }

  function excluirEmpresa(idEmpresa) {
    alertify.confirm(
      "Você deseja excluir o " + idEmpresa + "?",
      () => {
        $.ajax({
          url: "controle/empresacontrole.php",
          type: "POST",
          data: {
            id: idEmpresa,
            acao: "excluir"
          },
          success: function(result) {
            atualizarTabela();
          }
        });
      },
      () => {}
    );
  }

  function cadastrarEmpresa() {
    $.ajax({
      url: "controle/empresacontrole.php",
      type: "POST",
      data: {
        nome: $("#nome").val(),
        telefone: $("#telefone").val(),
        email: $("#email").val(),
        fk_id_tipoempresa: $("#tipoEmpresa").val(),
        senha: $("#senha").val(),
        acao: "inserir"
      },
      success: function(result) {
        $("#nome").val("");
        $("#telefone").val("");
        $("#email").val("");
        $("#senha").val("");
        atualizarTabela();
      }
    });
  }
});
