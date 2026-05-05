const express = require("express");
const router = express.Router();

const ExportacaoController = require("../controllers/ExportacaoController");

router.get("/inscricoes/xml", ExportacaoController.exportarInscricoesXML);

module.exports = router;