const db = require("../database/database");

function ListarUsuarios() {
    return db.prepare("SELECT * FROM usuarios").all();
}

function BuscarUsuarioPorId(id) {
    return db.prepare(
        "SELECT * FROM usuarios WHERE id = ?"
    ).get(id);
}

function CriarUsuario(nome, email, telefone) {
    const resultado = db.prepare(`
        INSERT INTO usuarios (nome, email, telefone)
        VALUES (?, ?, ?)
    `).run(
        nome,
        email,
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

function DeletarUsuario(id) {
    return db.prepare(
        "DELETE FROM usuarios WHERE id = ?"
    ).run(id);
}

module.exports = {
    ListarUsuarios,
    BuscarUsuarioPorId,
    CriarUsuario,
    AtualizarUsuario,
    DeletarUsuario
};