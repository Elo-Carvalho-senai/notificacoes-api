# 📧 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

---

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.

A API é responsável por gerenciar:
- Eventos
- Participantes
- Inscrições

E enviar notificações como:
- Confirmação de inscrição
- Lembretes de eventos

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- Dotenv
- Nodemon
- CORS

---

## 📁 Estrutura do Projeto
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── errors/
├── helpers/
├── swagger.js
├── app.js
└── server.js


## 🔧 Scripts
| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor (produção) |
| `npm run dev` | Inicia com Nodemon (desenvolvimento) |


## 🚀 Como Rodar
1. Clone o repositório:
```bash
git clone https://github.com/Elo-Carvalho-senai/notificacoes-api-grupo3.git
