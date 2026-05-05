const { Inscricao, Evento, Participante } = require("../models");

async function exportarInscricoesXML() {
  const inscricoes = await Inscricao.findAll({
    include: [
      {
        model: Evento,
        attributes: ["nome"],
      },
      {
        model: Participante,
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
    <evento>${inscricao.Evento.nome}</evento>
    <participante>
      <nome>${inscricao.Participante.nome}</nome>
      <email>${inscricao.Participante.email}</email>
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