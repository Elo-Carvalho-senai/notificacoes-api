const { Inscricao, Evento, Participante } = require("../models");

// Exportar inscrições para XML
async function exportarInscricoesXML() {

  const inscricoes = await Inscricao.findAll({

    include: [

      {
        model: Evento,
        as: "evento",
        attributes: ["nome"],
      },

      {
        model: Participante,
        as: "participante",
        attributes: ["nome", "email"],
      },

    ],

    order: [["id", "ASC"]],

  });

  let xml = `<inscricoes>`;

  inscricoes.forEach(inscricao => {

    xml += `
  <inscricao>
    <id>${inscricao.id}</id>
    <status>${inscricao.status}</status>

    <evento>
      ${inscricao.evento.nome}
    </evento>

    <participante>
      <nome>${inscricao.participante.nome}</nome>
      <email>${inscricao.participante.email}</email>
    </participante>

  </inscricao>`;

  });

  xml += `
</inscricoes>`;

  return xml;

}

module.exports = {
  exportarInscricoesXML,
};