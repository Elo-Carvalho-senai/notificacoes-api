const express = require("express");
const router = express.Router();

const ExportacaoController = require("../controllers/ExportacaoController");

router.get("/inscricoes/xml", ExportacaoController.exportarInscricoesXML);


const { Inscricao, Evento, Participante } = require("../models");

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