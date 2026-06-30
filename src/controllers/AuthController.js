const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioModel = require("../models/UsuarioModel");

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "E-mail e senha são obrigatórios"
        });
    }

    const usuario = UsuarioModel.BuscarUsuarioPorEmail(email);

    if (!usuario) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos"
        });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos"
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    res.json({
        mensagem: "Login realizado com sucesso",
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
}

module.exports = {
    login
};