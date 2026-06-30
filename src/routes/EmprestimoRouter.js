const express = require("express");
const router = express.Router();

const EmprestimoController = require("../controllers/EmprestimoController");
const autenticarToken = require("../middleware/AuthMiddleware");

router.get(
    "/",
    autenticarToken,
    EmprestimoController.listarEmprestimos
);

router.post(
    "/",
    autenticarToken,
    EmprestimoController.criarEmprestimo
);

router.patch(
    "/:id/devolver",
    autenticarToken,
    EmprestimoController.devolverEmprestimo
);

module.exports = router;