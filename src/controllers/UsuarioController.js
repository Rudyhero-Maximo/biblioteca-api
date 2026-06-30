const bcrypt = require("bcrypt");
const UsuarioModel = require("../models/UsuarioModel");

async function listarUsuarios(req, res) {
    const usuarios = UsuarioModel.ListarUsuarios();
    res.json(usuarios);
}

async function buscarUsuarioPorId(req, res) {
    const { id } = req.params;

    const usuario = UsuarioModel.BuscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    res.json(usuario);
}

async function criarUsuario(req, res) {
    const { nome, email, senha, telefone } = req.body;

    const usuarioExistente = UsuarioModel.BuscarUsuarioPorEmail(email);

    if (usuarioExistente) {
        return res.status(400).json({
            mensagem: "E-mail já cadastrado"
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = UsuarioModel.CriarUsuario(
        nome,
        email,
        senhaCriptografada,
        telefone
    );

    res.status(201).json(usuario);
}

async function atualizarUsuario(req, res) {
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

async function deletarUsuario(req, res) {
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