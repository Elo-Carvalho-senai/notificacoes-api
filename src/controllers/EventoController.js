// src/controllers/EventoController.js
const EventoService = require('../services/EventoService');

async function index(req, res, next) {
  try {
    const resultado = await EventoService.listarTodos({
      pagina: req.query.pagina,
      porPagina: req.query.porPagina,
      ordenarPor: req.query.ordenarPor,
      ordem: req.query.ordem,
      busca: req.query.busca,
    });
    res.json(resultado);
  } catch (erro) {
    next(erro);
  }
}

async function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = await EventoService.buscarPorId(id);
        res.json(evento);
    }
    catch (erro) {
        next(erro);
    }
}

async function store(req, res, next) {
    try {
        const novoEvento = await EventoService.criar(req.body);
        res.status(201).json(novoEvento);
    }
    catch (erro) {
        next(erro);
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const eventoAtualizado = await EventoService.atualizar(id, req.body);
        res.json(eventoAtualizado);
    }
    catch (erro) {
        next(erro);
    }
}

async function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await EventoService.deletar(id);
        res.status(204).send();
    }
    catch (erro) {
        next(erro);
    }
}

module.exports = { 
    index, 
    show, 
    store, 
    update, 
    destroy 
};



// Você adaptou o Controller para trabalhar com funções assíncronas (async/await), já que o Service agora usa Sequelize.
// Transformou o Controller em assíncrono, Passou a usar await, Centralizou tratamento de erro com next, Manteve o Controller simples e organizado