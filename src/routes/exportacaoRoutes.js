const express = require("express");
const router = express.Router();

const ExportacaoController = require("../controllers/ExportacaoController");
const { Inscricao, Evento, Participante } = require("../models");

/**
 * @swagger
 * /exportacao/inscricoes/xml:
 * get:
 * summary: Exportar inscrições em formato XML
 * description: Gera e exporta um arquivo XML contendo todas as inscrições do sistema.
 * tags: [Exportação]
 * responses:
 * 200:
 * description: Arquivo XML gerado com sucesso para download.
 * content:
 * application/xml:
 * schema:
 * type: string
 * format: binary
 */
router.get("/inscricoes/xml", ExportacaoController.exportarInscricoesXML);

/**
 * @swagger
 * /exportacao/relatorio/inscricoes/csv:
 * get:
 * summary: Exportar relatório de inscrições em formato CSV
 * description: Gera um arquivo CSV com o relatório detalhado das inscrições, incluindo dados do evento e do participante.
 * tags: [Exportação]
 * responses:
 * 200:
 * description: Arquivo CSV gerado com sucesso para download.
 * content:
 * text/csv:
 * schema:
 * type: string
 * format: binary
 */
router.get('/relatorio/inscricoes/csv', async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        { model: Evento, as: 'evento', attributes: ['nome', 'data'] },
        { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
      ],
      raw: true,
      nest: true,
    });

    let csv = 'ID,Evento,Data Evento,Participante,Email,Status,Data Inscricao\n';

    inscricoes.forEach(i => {
      csv += `${i.id},` +
        `${i.evento.nome},` +
        `${i.evento.data},` +
        `${i.participante.nome},` +
        `${i.participante.email},` +
        `${i.status},` +
        `${i.dataInscricao}\n`;
    });

    res.set('Content-Type', 'text/csv');
    res.set(
      'Content-Disposition',
      'attachment; filename="inscricoes.csv"'
    );

    res.send(csv);

  } catch (erro) {
    next(erro);
  }
});

module.exports = router;