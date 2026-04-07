// src/services/InscricaoService.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

// Criar inscrição
function criar(dados) {
  const { eventoId, participanteId } = dados;

  const erros = validar([
    isRequired(eventoId, "eventoId"),
    isRequired(participanteId, "participanteId"),
  ]);

  if (erros) throw new ValidationError(erros.join("; "));

  const evento = EventoModel.buscarPorId(parseInt(eventoId));
  if (!evento) throw new NotFoundError("Evento não encontrado");

  const participante = ParticipanteModel.buscarPorId(parseInt(participanteId));
  if (!participante) throw new NotFoundError("Participante não encontrado");

  return InscricaoModel.criar(
    parseInt(eventoId),
    parseInt(participanteId)
  );
}

// Listar todas inscrições
function listarTodas() {
  return InscricaoModel.listar();
}

// Listar por evento
function listarPorEvento(eventoId) {
  const evento = EventoModel.buscarPorId(parseInt(eventoId));

  if (!evento) {
    throw new NotFoundError("Evento não encontrado");
  }

  return InscricaoModel.listarPorEvento(parseInt(eventoId));
}

// Cancelar inscrição
function cancelar(id) {
  const inscricao = InscricaoModel.buscarPorId(id);

  if (!inscricao) {
    throw new NotFoundError("Inscrição não encontrada");
  }

  return InscricaoModel.cancelar(id);
}

module.exports = {
  criar,
  listarTodas,
  listarPorEvento,
  cancelar,
};