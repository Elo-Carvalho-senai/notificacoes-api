const { Evento } = require("../models");
const { NotFoundError, ValidationError } = require("../errors/AppError");

async function listarTodos() {
    const eventos = await Evento.findAll({
        order: [["data", "ASC"]],
    });
    return eventos;
}

async function buscarPorId(id) {
    const evento = await Evento.findByPk(id);

    if (!evento) {
        throw new NotFoundError("Evento");
    }

    return evento;
}

async function criar(dados) {
    try {
        const novoEvento = await Evento.create(dados);
        return novoEvento;
    } catch (erro) {
        if (erro.name === "SequelizeValidationError") {
            const mensagens = erro.errors.map(e => e.message).join("; ");
            throw new ValidationError(mensagens);
        }
        throw erro;
    }
}

// Ainda não implementados (próxima aula)
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
    deletar,
};