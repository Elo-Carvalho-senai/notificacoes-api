const ExportacaoService = require("../services/ExportacaoService");

async function exportarInscricoesXML(req, res, next) {
  try {
    const xml = await ExportacaoService.exportarInscricoesXML();

    res.header("Content-Type", "application/xml");
    res.send(xml);

  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  exportarInscricoesXML,
};