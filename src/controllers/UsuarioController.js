const UsuarioModel = require("../models/UsuarioModel");

function listarUsuarios(req, res) {
    const usuarios = UsuarioModel.ListarUsuarios();
    res.json(usuarios);
}

function buscarUsuarioPorId(req, res) {
    const { id } = req.params;

    const usuario = UsuarioModel.BuscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    res.json(usuario);
}

function criarUsuario(req, res) {
    const { nome, email, telefone } = req.body;

    const usuario = UsuarioModel.CriarUsuario(
        nome,
        email,
        telefone
    );

    res.status(201).json(usuario);
}

function atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    const resultado = UsuarioModel.AtualizarUsuario(
        id,
        nome,
        email,
        telefone
    );

    if (resultado.changes === 0) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    res.json({
        mensagem: "Usuário atualizado com sucesso"
    });
}

function deletarUsuario(req, res) {
    const { id } = req.params;

    const resultado = UsuarioModel.DeletarUsuario(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    res.json({
        mensagem: "Usuário removido com sucesso"
    });
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};