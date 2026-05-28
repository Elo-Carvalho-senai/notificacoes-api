const { Evento } = require("../models");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { Op } = require("sequelize"); // ✅ melhor importar uma vez só
const appEmitter = require('../events/eventEmitter');

// Listar todos os eventos com filtros
async function listarTodos(opcoes = {}) {
  const {
    pagina = 1,
    porPagina = 10,
    ordenarPor = 'data',
    ordem = 'ASC',
    busca = null,
  } = opcoes;

  const where = {};

  if (busca) {
    where.nome = { [Op.like]: `%${busca}%` };
  }

  const { count, rows } = await Evento.findAndCountAll({
    where,
    order: [[ordenarPor, ordem.toUpperCase()]],
    limit: parseInt(porPagina),
    offset: (parseInt(pagina) - 1) * parseInt(porPagina),
  });

  return {
    dados: rows,
    total: count,
    pagina: parseInt(pagina),
    porPagina: parseInt(porPagina),
    totalPaginas: Math.ceil(count / parseInt(porPagina)),
  };
}

// Listar eventos futuros
async function listarFuturos() {
  const eventos = await Evento.findAll({
    where: {
      data: {
        [Op.gt]: new Date() 
      }
    },
    order: [['data', 'ASC']],
  });

  return eventos;
}

// Buscar evento por ID
async function buscarPorId(id) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  return evento;
}

// Criar novo evento
async function criar(dados) {

  try {
    const novoEvento = await Evento.create(dados);

    // Emitir evento
    appEmitter.emit('evento:criado', novoEvento);
    return novoEvento;

  } catch (erro) {

    if (erro.name === "SequelizeValidationError") {
      const mensagens =
        erro.errors.map(e => e.message).join("; ");

      throw new ValidationError(mensagens);
    }
    throw erro;
  }

}

// Atualizar evento
async function atualizar(id, dados) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  try {
    await evento.update(dados);
    return evento;
  } catch (erro) {
    if (erro.name === "SequelizeValidationError") {
      const mensagens = erro.errors.map(e => e.message).join("; ");
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

// Deletar evento
async function deletar(id) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  await evento.destroy();
  return true;
}

module.exports = {
  listarTodos,
  listarFuturos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};