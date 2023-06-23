<div class="modal" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Alterar Produto</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <input type="hidden" id="idProdutoup">
                <div class="mb-3 mt-3">
                    <label for="nomeup" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="nomeup" placeholder="Digite o nome do produto">
                </div>
                <div class="mb-3 mt-3">
                    <label for="descricaoup" class="form-label">Descricao:</label>
                    <input type="text" class="form-control" id="descricaoup" placeholder="Digite uma descrição">
                </div>
                <div class="mb-3 mt-3">
                    <label for="tipoProdutoup" class="form-label">Tipo de Produto:</label>
                    <select id="tipoProdutoup" class="form-select mb-3">
                    </select>
                </div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" id="btnUpdate">Alterar</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
