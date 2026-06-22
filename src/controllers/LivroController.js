const LivroModel = require("../models/LivroModel");

function listarLivros(req, res) {
    const livros = LivroModel.ListarLivros();
    res.json(livros);
}

function buscarLivroPorId(req, res) {
    const { id } = req.params;

    console.log("ID recebido:", id);

    const livro = LivroModel.BuscarLivroPorId(id);

    console.log("Livro encontrado:", livro);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    res.json(livro);
}

function criarLivro(req, res) {
    const { titulo, autor, quantidade } = req.body;

    const livro = LivroModel.CriarLivro(
        titulo,
        autor,
        quantidade
    );

    res.status(201).json(livro);
}

function atualizarLivro(req, res) {
    const { id } = req.params;
    const { titulo, autor, quantidade } = req.body;

    const resultado = LivroModel.AtualizarLivro(
        id,
        titulo,
        autor,
        quantidade
    );

    if (resultado.changes === 0) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    res.json({
        mensagem: "Livro atualizado com sucesso"
    });
}

function deletarLivro(req, res) {
    const { id } = req.params;

    const resultado = LivroModel.DeletarLivro(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    res.json({
        mensagem: "Livro removido com sucesso"
    });
}

module.exports = {
    listarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro
};