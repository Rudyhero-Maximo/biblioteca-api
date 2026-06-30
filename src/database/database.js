const Database = require("better-sqlite3");

const db = new Database("biblioteca.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    disponiveis INTEGER NOT NULL DEFAULT 1
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT,
    telefone TEXT NOT NULL
)
`).run();

const colunasUsuarios = db.prepare("PRAGMA table_info(usuarios)").all();

const existeSenha = colunasUsuarios.some(coluna => coluna.name === "senha");

if (!existeSenha) {
    db.prepare("ALTER TABLE usuarios ADD COLUMN senha TEXT").run();
}

db.prepare(`
CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livro_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_emprestimo TEXT NOT NULL,
    data_devolucao TEXT,
    status TEXT DEFAULT 'EMPRESTADO',
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
)
`).run();

console.log("Banco de dados conectado!");

module.exports = db;