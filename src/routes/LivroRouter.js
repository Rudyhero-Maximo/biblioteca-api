const express = require("express");
const router = express.Router();

const LivroController = require("../controllers/LivroController");


router.get("/", LivroController.listarLivros);


router.get("/:id", LivroController.buscarLivroPorId);


router.post("/", LivroController.criarLivro);


router.patch("/:id", LivroController.atualizarLivro);


router.delete("/:id", LivroController.deletarLivro);

module.exports = router;