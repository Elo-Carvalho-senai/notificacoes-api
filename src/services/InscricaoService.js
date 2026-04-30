const { Inscricao, Evento, Participante } = require("../models");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// Criar inscrição
async function criar(dados) {
  const { eventoId, participanteId } = dados;

  // Verificar se o evento existe
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new NotFoundError("Evento");

  // Verificar se o participante existe
  const participante = await Participante.findByPk(participanteId);
  if (!participante) throw new NotFoundError("Participante");

  // Verificar duplicata
  const jaInscrito = await Inscricao.findOne({
    where: {
      evento_id: eventoId,
      participante_id: participanteId,
    },
  });

  if (jaInscrito) {
    throw new ValidationError("Participante já inscrito neste evento");
  }

  // Criar inscrição
  const novaInscricao = await Inscricao.create({
    evento_id: eventoId,
    participante_id: participanteId,
  });

  return novaInscricao;
}

// Listar todas
async function listarTodas() {
  const inscricoes = await Inscricao.findAll({
    include: [
      {
        model: Evento,
        as: "evento",
        attributes: ["id", "nome", "data"],
      },
      {
        model: Participante,
        as: "participante",
        attributes: ["id", "nome", "email"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return inscricoes;
}

async function listarPorEvento(eventoId) {
  const evento = await Evento.findByPk(eventoId);

  if (!evento) throw new NotFoundError("Evento");

  const inscricoes = await Inscricao.findAll({
    where: { evento_id: eventoId },
    include: [
      {
        model: Participante,
        as: "participante",
        attributes: ["id", "nome", "email"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return inscricoes;
}

async function cancelar(id) {
  const inscricao = await Inscricao.findByPk(id);

  if (!inscricao) throw new NotFoundError("Inscrição");

  await inscricao.update({ status: "cancelada" });

  return inscricao;
}

module.exports = {
  criar,
  listarTodas,
  listarPorEvento,
  cancelar,
};