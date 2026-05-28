const { Participante } = require('../models');

const {
  NotFoundError,
  ValidationError
} = require('../errors/AppError');

const appEmitter = require('../events/eventEmitter');

// Listar todos os participantes

async function listarTodos() {

  const participantes = await Participante.findAll({
    order: [['nome', 'ASC']],
  });

  return participantes;

}

// Buscar por ID

async function buscarPorId(id) {

  const participante =
    await Participante.findByPk(id);

  if (!participante) {

    throw new NotFoundError('Participante');

  }

  return participante;

}

// Criar novo participante

async function criar(dados) {

  try {

    const novoParticipante =
      await Participante.create(dados);

    // Emitir evento
    appEmitter.emit(
      'participante:criado',
      novoParticipante
    );

    console.log(
      'EVENTO participante:criado emitido'
    );

    return novoParticipante;

  } catch (erro) {

    if (
      erro.name === 'SequelizeValidationError'
    ) {

      const mensagens =
        erro.errors
          .map(e => e.message)
          .join('; ');

      throw new ValidationError(mensagens);

    }

    throw erro;

  }

}

// Atualizar participante

async function atualizar(id, dados) {

  const participante =
    await Participante.findByPk(id);

  if (!participante) {

    throw new NotFoundError('Participante');

  }

  try {

    await participante.update(dados);

    return participante;

  } catch (erro) {

    if (
      erro.name === 'SequelizeValidationError'
    ) {

      const mensagens =
        erro.errors
          .map(e => e.message)
          .join('; ');

      throw new ValidationError(mensagens);

    }

    throw erro;

  }

}

// Deletar participante

async function deletar(id) {

  const participante =
    await Participante.findByPk(id);

  if (!participante) {

    throw new NotFoundError('Participante');

  }

  await participante.destroy();

  return true;

}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};