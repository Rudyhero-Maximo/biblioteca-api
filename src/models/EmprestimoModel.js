const db = require("../database/database");

function ListarEmprestimos() {
    return db.prepare(`
        SELECT
            e.id,
            l.titulo AS livro,
            u.nome AS usuario,
            e.data_emprestimo,
            e.data_devolucao,
            e.status
        FROM emprestimos e
        JOIN livros l ON e.livro_id = l.id
        JOIN usuarios u ON e.usuario_id = u.id
    `).all();
}

function CriarEmprestimo(livro_id, usuario_id, data_emprestimo) {
    return db.prepare(`
        INSERT INTO emprestimos (
            livro_id,
            usuario_id,
            data_emprestimo
        )
        VALUES (?, ?, ?)
    `).run(
        livro_id,
        usuario_id,
        data_emprestimo
    );
}

function BuscarLivroPorId(id) {
    return db.prepare(`
        SELECT *
        FROM livros
        WHERE id = ?
    `).get(id);
}

function BuscarEmprestimoPorId(id) {
    return db.prepare(`
        SELECT *
        FROM emprestimos
        WHERE id = ?
    `).get(id);
}

function DevolverEmprestimo(id, data_devolucao) {
    return db.prepare(`
        UPDATE emprestimos
        SET
            status = 'DEVOLVIDO',
            data_devolucao = ?
        WHERE id = ?
    `).run(
        data_devolucao,
        id
    );
}

function AtualizarDisponiveisLivro(livro_id, disponiveis) {
    return db.prepare(`
        UPDATE livros
        SET disponiveis = ?
        WHERE id = ?
    `).run(
        disponiveis,
        livro_id
    );
}

module.exports = {
    ListarEmprestimos,
    CriarEmprestimo,
    BuscarLivroPorId,
    BuscarEmprestimoPorId,
    DevolverEmprestimo,
    AtualizarDisponiveisLivro
};