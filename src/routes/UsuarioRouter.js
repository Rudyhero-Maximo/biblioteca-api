const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");
const autenticarToken = require("../middleware/AuthMiddleware");

router.post("/", UsuarioController.criarUsuario);

router.get("/", autenticarToken, UsuarioController.listarUsuarios);

router.get("/:id", autenticarToken, UsuarioController.buscarUsuarioPorId);

router.patch("/:id", autenticarToken, UsuarioController.atualizarUsuario);

router.delete("/:id", autenticarToken, UsuarioController.deletarUsuario);

module.exports = router;