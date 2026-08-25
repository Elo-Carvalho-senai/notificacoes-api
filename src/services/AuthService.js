const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { Usuario } = require("../models");
const {
  ValidationError,
  UnauthorizedError,
} = require("../errors/AppError");

async function registrar(dados) {
  const { nome, email, senha } = dados;

  if (!senha || senha.length < 6) {
    throw new ValidationError(
      "Senha deve ter pelo menos 6 caracteres"
    );
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
  });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

async function login(email, senha) {
  const usuario = await Usuario.findOne({
    where: { email },
  });

  if (!usuario) {
    throw new UnauthorizedError(
      "E-mail ou senha inválidos"
    );
  }

  const senhaConfere = await bcrypt.compare(
    senha,
    usuario.senha
  );

  if (!senhaConfere) {
    throw new UnauthorizedError(
      "E-mail ou senha inválidos"
    );
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}

module.exports = {
  registrar,
  login,
};