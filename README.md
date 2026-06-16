
# 📧 Notificações API

API REST desenvolvida para gerenciar notificações por e-mail em uma plataforma de eventos, permitindo o gerenciamento de eventos, participantes, inscrições e notificações automáticas.

![Node.js](https://img.shields.io/badge/Node.js-24+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Swagger](https://img.shields.io/badge/Swagger-API_Docs-green)

---

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte da Situação de Aprendizagem do curso Técnico em Desenvolvimento de Sistemas do SENAI.

A API é responsável por:

* 🎉 Gerenciamento de eventos
* 👥 Cadastro de participantes
* 📝 Controle de inscrições
* 📧 Envio de notificações automáticas por e-mail

### Funcionalidades

* Cadastro, edição e remoção de eventos
* Cadastro de participantes
* Realização e cancelamento de inscrições
* Upload de banners para eventos
* Exportação de relatórios
* Dashboard de notificações
* Documentação completa com Swagger
* Envio automático de e-mails utilizando o padrão Observer

---

## 👨‍💻 Equipe

* Elo Carvalho
* Raissa Fernandes
* Maria Fernanda
* Isadora

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade                   |
| ---------- | ---------------------------- |
| Node.js    | Runtime JavaScript           |
| Express.js | Framework Back-End           |
| MySQL      | Banco de Dados               |
| Sequelize  | ORM                          |
| Swagger    | Documentação da API          |
| Multer     | Upload de Arquivos           |
| Nodemon    | Desenvolvimento              |
| Dotenv     | Variáveis de Ambiente        |
| CORS       | Comunicação entre aplicações |

---

## 📁 Estrutura do Projeto

```bash
src/
├── config/
├── controllers/
├── database/
│   ├── migrations/
│   └── seeders/
├── services/
├── models/
├── routes/
├── middlewares/
├── errors/
├── helpers/
├── swagger.js
├── app.js
└── server.js
```

---

## 📊 Arquitetura

A aplicação utiliza arquitetura em camadas para separar responsabilidades e facilitar a manutenção do código.

### Fluxo da Aplicação

```text
Request
   ↓
Routes
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
Database
   ↓
Response
```

### Responsabilidades

* **Routes:** Define os endpoints da API.
* **Controllers:** Recebem requisições e retornam respostas.
* **Services:** Implementam regras de negócio.
* **Models:** Manipulam os dados do banco.
* **Helpers:** Funções auxiliares reutilizáveis.
* **Errors:** Tratamento centralizado de erros.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/Elo-Carvalho-senai/notificacoes-api-grupo3.git
cd notificacoes-api-grupo3
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente

O projeto já possui um arquivo `.env.example`.

Crie uma cópia para `.env`:

```bash
cp .env.example .env
```

Ou crie manualmente um arquivo `.env` utilizando o modelo disponível em `.env.example`.

Exemplo:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=notificacoes_db
DB_USER=root
DB_PASSWORD=sua_senha_aqui

SMTP_HOST=10.137.146.106
SMTP_PORT=1025
```

### 4. Executar Migrations

```bash
npm run db:migrate
```

### 5. Executar Seeds

```bash
npm run db:seed
```

### 6. Iniciar o Servidor

```bash
npm run dev
```

### 7. Acessar a Aplicação

API:
http://localhost:3000

Swagger:
http://localhost:3000/api-docs

---

## 🔧 Scripts Disponíveis

| Comando                 | Descrição               |
| ----------------------- | ----------------------- |
| npm start               | Executa em produção     |
| npm run dev             | Executa com Nodemon     |
| npm run db:migrate      | Executa migrations      |
| npm run db:migrate:undo | Desfaz última migration |
| npm run db:seed         | Executa seeds           |
| npm run db:reset        | Reinicia o banco        |

---

## 📌 Principais Rotas

### Eventos

| Método | Endpoint            |
| ------ | ------------------- |
| GET    | /eventos            |
| GET    | /eventos/:id        |
| POST   | /eventos            |
| PUT    | /eventos/:id        |
| DELETE | /eventos/:id        |
| POST   | /eventos/:id/banner |

### Participantes

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /participantes |
| POST   | /participantes |

### Inscrições

| Método | Endpoint                 |
| ------ | ------------------------ |
| GET    | /inscricoes              |
| POST   | /inscricoes              |
| GET    | /inscricoes/evento/:id   |
| PATCH  | /inscricoes/:id/cancelar |

### Notificações

| Método | Endpoint                     | Descrição                       |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/notificacoes`              | Listar (filtros: tipo, enviada) |
| GET    | `/notificacoes/estatisticas` | Dashboard de envios             |
| GET    | `/notificacoes/:id`          | Detalhes                        |
| POST   | `/notificacoes/:id/reenviar` | Reenviar                        |
| POST   | `/notificacoes/teste-email`  | Enviar e-mail de teste          |

### Exportação

| Método | Endpoint                         | Descrição                  |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/exportar/eventos/xml`          | Eventos em XML             |
| GET    | `/exportar/eventos/json`         | Eventos em JSON (download) |
| GET    | `/exportar/relatorio/inscricoes` | Relatório de inscrições    |

---

## 📧 Sistema de Notificações

A API utiliza o padrão de projeto **Observer** para automatizar o envio de notificações.

### Notificações Automáticas

* ✅ Confirmação de inscrição
* ✅ Cancelamento de inscrição
* ✅ Lembretes de eventos

Durante o desenvolvimento, os e-mails são capturados pelo MailPit.

```text
http://MAILPIT_IP:8025
```

---

## 📚 Documentação

Swagger disponível em:

```text
http://localhost:3000/api-docs
```

---

## 🧪 Testes

Os testes da API foram realizados utilizando:

* Postman
* Swagger UI

Collection disponível em:

```text
docs/postman-collection.json
```

---

## 📄 Licença

Projeto acadêmico desenvolvido para o curso Técnico em Desenvolvimento de Sistemas (DEV-2) – SENAI.