const db = require("../database/database");

function ListarUsuarios() {
    return db.prepare(`
        SELECT id, nome, email, telefone
        FROM usuarios
    `).all();
}

function BuscarUsuarioPorId(id) {
    return db.prepare(`
        SELECT id, nome, email, telefone
        FROM usuarios
        WHERE id = ?
    `).get(id);
}

function BuscarUsuarioPorEmail(email) {
    return db.prepare(`
        SELECT *
        FROM usuarios
        WHERE email = ?
    `).get(email);
}

function CriarUsuario(nome, email, senha, telefone) {
    const resultado = db.prepare(`
        INSERT INTO usuarios (nome, email, senha, telefone)
        VALUES (?, ?, ?, ?)
    `).run(
        nome,
        email,
        senha,
        telefone
    );

    return {
        id: resultado.lastInsertRowid,
        nome,
        email,
        telefone
    };
}

function AtualizarUsuario(id, nome, email, telefone) {
    return db.prepare(`
        UPDATE usuarios
        SET nome = ?, email = ?, telefone = ?
        WHERE id = ?
    `).run(
        nome,
        email,
        telefone,
        id
    );
}

function AtualizarSenha(id, senha) {
    return db.prepare(`
        UPDATE usuarios
        SET senha = ?
        WHERE id = ?
    `).run(
        senha,
        id
    );
}

function DeletarUsuario(id) {
    return db.prepare(`
        DELETE FROM usuarios
        WHERE id = ?
    `).run(id);
}

module.exports = {
    ListarUsuarios,
    BuscarUsuarioPorId,
    BuscarUsuarioPorEmail,
    CriarUsuario,
    AtualizarUsuario,
    AtualizarSenha,
    DeletarUsuario
};