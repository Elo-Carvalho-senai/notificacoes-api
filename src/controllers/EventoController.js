// src/controllers/EventoController.js
const EventoService = require('../services/EventoService');
const cache = require('../config/cache');

async function index(req, res, next) {
  try {
    const resultado = await EventoService.listarTodos(req.query); // ✅ simplificado
    res.json(resultado);
  } catch (erro) {
    next(erro);
  }
}

async function futuros(req, res, next) {
  try {
    const eventos = await EventoService.listarFuturos();
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
}

async function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const evento = await EventoService.buscarPorId(id);
    res.json(evento);
  } catch (erro) {
    next(erro);
  }
}

async function store(req, res, next) {
  try {
    const novoEvento = await EventoService.criar(req.body);

    cache.flushAll();

    res.status(201).json(novoEvento);
  } catch (erro) {
    next(erro);
  }
}

async function update(req, res, next) {
  try {
    const eventoAtualizado = await EventoService.atualizar(
      req.params.id,
      req.body
    );

    cache.flushAll();

    res.json(eventoAtualizado);
  } catch (erro) {
    next(erro);
  }
}

async function destroy(req, res, next) {
  try {
    await EventoService.deletar(req.params.id);

    cache.flushAll();

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { 
  index,
  futuros, 
  show, 
  store, 
  update, 
  destroy 
};