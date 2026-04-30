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
    buscarPorId,
    criar,
    atualizar,
    deletar,
};

// Substituiu o uso de um model em memória (EventoModel) pelo Sequelize, passando a acessar o banco de dados real.
// Conectou o Service ao banco de dados, Tornou funções assíncronas, Implementou Create e Read com Sequelize, Removeu validação manual, Passou a usar validação automática do Sequelize

// atualizar → busca o evento, valida e atualiza
// deletar → busca o evento e remove do banco
// Tratamento de erro igual ao criar (validação do Sequelize)