// src/services/ParticipanteService.js

const { Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function listarTodos() {
  const participantes = await Participante.findAll({
    order: [['nome', 'ASC']],
  });

  return participantes;
}

async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);

    return novoParticipante;

  } catch (erro) {

    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }

    throw erro;
  }
}

// Próxima aula
async function atualizar(id, dados) {
  // TODO
}

async function deletar(id) {
  // TODO
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};