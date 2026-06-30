const express = require("express");
const router = express.Router();

const LivroController = require("../controllers/LivroController");
const autenticarToken = require("../middleware/AuthMiddleware");

router.get("/", autenticarToken, LivroController.listarLivros);

router.get("/:id", autenticarToken, LivroController.buscarLivroPorId);

router.post("/", autenticarToken, LivroController.criarLivro);

router.patch("/:id", autenticarToken, LivroController.atualizarLivro);

router.delete("/:id", autenticarToken, LivroController.deletarLivro);

module.exports = router;