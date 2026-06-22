const EmprestimoModel = require("../models/EmprestimoModel");

function listarEmprestimos(req, res) {
    const emprestimos = EmprestimoModel.ListarEmprestimos();
    res.json(emprestimos);
}

function criarEmprestimo(req, res) {
    const { livro_id, usuario_id } = req.body;

    const livro = EmprestimoModel.BuscarLivroPorId(livro_id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    if (livro.disponiveis <= 0) {
        return res.status(400).json({
            mensagem: "Livro indisponível"
        });
    }

    const data_emprestimo = new Date().toISOString();

    EmprestimoModel.CriarEmprestimo(
        livro_id,
        usuario_id,
        data_emprestimo
    );

    EmprestimoModel.AtualizarDisponiveis(
        livro_id,
        livro.disponiveis - 1
    );

    res.status(201).json({
        mensagem: "Empréstimo realizado com sucesso"
    });
}

function devolverEmprestimo(req, res) {
    const { id } = req.params;

    const emprestimo = EmprestimoModel.BuscarEmprestimoPorId(id);

    if (!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado"
        });
    }

    const livro = EmprestimoModel.BuscarLivroPorId(
        emprestimo.livro_id
    );

    const data_devolucao = new Date().toISOString();

    EmprestimoModel.DevolverEmprestimo(
        id,
        data_devolucao
    );

    EmprestimoModel.AtualizarDisponiveisLivro(
        livro.id,
        livro.disponiveis + 1
    );

    res.json({
        mensagem: "Livro devolvido com sucesso"
    });
}

module.exports = {
    listarEmprestimos,
    criarEmprestimo,
    devolverEmprestimo
};