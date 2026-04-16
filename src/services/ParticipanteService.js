const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

// Listar todos os participantes
function listarTodos() {
  return ParticipanteModel.listar();
}

// Buscar participante por ID
function buscarPorId(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  return participante;
}

// Criar participante
function criar(dados) {
  const { nome, email } = dados;

  const erros = validar([
    isRequired(nome, "nome"),
    minLength(nome, "nome", 3),
    isRequired(email, "email"),
    isEmail(email, "email"),
  ]);

  if (erros) throw new ValidationError(erros.join("; "));

  return ParticipanteModel.criar({ nome, email });
}

// Atualizar participante
function atualizar(id, dados) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  const { nome, email } = dados;

  const erros = validar([
    nome ? minLength(nome, "nome", 3) : null,
    email ? isEmail(email, "email") : null,
  ]);

  if (erros) throw new ValidationError(erros.join("; "));

  return ParticipanteModel.atualizar(id, dados);
}

// Deletar participante
function deletar(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  ParticipanteModel.deletar(id);

  return { mensagem: "Participante deletado com sucesso" };
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};