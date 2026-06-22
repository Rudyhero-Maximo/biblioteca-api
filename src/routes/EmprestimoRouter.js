const express = require("express");
const router = express.Router();

const EmprestimoController = require("../controllers/EmprestimoController");

router.get("/", EmprestimoController.listarEmprestimos);

router.post("/", EmprestimoController.criarEmprestimo);

router.patch(
    "/:id/devolver",
    EmprestimoController.devolverEmprestimo
);

module.exports = router;