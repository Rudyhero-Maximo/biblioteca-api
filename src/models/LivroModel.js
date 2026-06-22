const db = require("../database/database");

function ListarLivros() {
    const livros = db.prepare("SELECT * FROM livros").all();

    console.log("Livros:", livros);

    return livros;
}

function BuscarLivroPorId(id) {
    const livro = db.prepare(
        "SELECT * FROM livros WHERE id = ?"
    ).get(Number(id));

    console.log("Resultado SQL:", livro);

    return livro;
}

function CriarLivro(titulo, autor, quantidade) {
    const stmt = db.prepare(`
        INSERT INTO livros (titulo, autor, quantidade, disponiveis)
        VALUES (?, ?, ?, ?)
    `);

    const resultado = stmt.run(
        titulo,
        autor,
        quantidade,
        quantidade
    );

    return {
        id: resultado.lastInsertRowid,
        titulo,
        autor,
        quantidade,
        disponiveis: quantidade
    };
}

function AtualizarLivro(id, titulo, autor, quantidade) {
    return db.prepare(`
        UPDATE livros
        SET titulo = ?, autor = ?, quantidade = ?
        WHERE id = ?
    `).run(
        titulo,
        autor,
        quantidade,
        id
    );
}

function DeletarLivro(id) {
    return db.prepare(
        "DELETE FROM livros WHERE id = ?"
    ).run(id);
}

module.exports = {
    ListarLivros,
    BuscarLivroPorId,
    CriarLivro,
    AtualizarLivro,
    DeletarLivro
};