require("dotenv").config();
require("./src/database/database");

const express = require("express");
const cors = require("cors");

const livroRouter = require("./src/routes/LivroRouter");
const usuarioRouter = require("./src/routes/UsuarioRouter");
const emprestimoRouter = require("./src/routes/EmprestimoRouter");
const authRouter = require("./src/routes/AuthRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/livros", livroRouter);
app.use("/usuarios", usuarioRouter);
app.use("/emprestimos", emprestimoRouter);

app.get("/", (req, res) => {
    res.send("API da Biblioteca funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});