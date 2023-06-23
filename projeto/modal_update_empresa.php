<div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Alterar Empresa</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <input type="hidden" id="idEmpresaup" >
                    <div class="mb-3 mt-3">
                        <label for="nomeup" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="nomeup" 
                                                    placeholder="Digite seu nome">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="telefoneup" class="form-label">Telefone:</label>
                        <input type="text" class="form-control" id="telefoneup" placeholder="Digite seu telefone">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="emailup" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="emailup" 
                                                    placeholder="Digite seu email">
                    </div>
                    <label for="tipoEmpresa" class="form-label">Tipo de Empresa:</label>
<select id="tipoEmpresa" class="form-select mb-3">
</select>

                    </select>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button  type="button" class="btn btn-warning" id="btnUpdate">Alterar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                </div>

                </div>
            </div>
        </div>