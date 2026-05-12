# 📧 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

---

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.

A API é responsável por gerenciar:
- Eventos
- Participantes
- Inscrições
- Notificações

E enviar notificações como:
- Confirmação de inscrição
- Lembretes de eventos

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- Sequelize
- Swagger (`swagger-jsdoc` + `swagger-ui-express`)
- Dotenv
- Nodemon
- CORS
- Multer

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

## 📊 Visão Geral da Arquitetura

A aplicação segue uma arquitetura em camadas, separando responsabilidades em diferentes partes do sistema.

### Camadas

- **Controller:** recebe requisições e retorna respostas
- **Service:** contém regras de negócio e validações
- **Model:** manipula os dados no banco
- **Routes:** define as rotas da API
- **Helpers:** funções reutilizáveis
- **Errors:** tratamento de erros personalizados

### Fluxo da aplicação

```text
Request → Route → Controller → Service → Model → Response
```

Essa estrutura facilita a organização, manutenção e escalabilidade do sistema.

---

## 🔧 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor em produção |
| `npm run dev` | Inicia o servidor em modo desenvolvimento com Nodemon |
| `npm run db:migrate` | Executa as migrations |
| `npm run db:migrate:undo` | Desfaz a última migration |
| `npm run db:seed` | Executa os seeds |
| `npm run db:reset` | Recria o banco completo |

---

## 🗄️ Banco de Dados

- **SGBD:** MySQL
- **ORM:** Sequelize
- **Tabelas:** eventos, participantes, inscricoes, notificacoes

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Elo-Carvalho-senai/notificacoes-api-grupo3.git
```

### 2. Acesse a pasta do projeto

```bash
cd notificacoes-api-grupo3
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o arquivo `.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=notificacoes_api
DB_USER=root
DB_PASS=sua_senha
```

### 5. Execute as migrations

```bash
npm run db:migrate
```

### 6. Execute os seeds

```bash
npm run db:seed
```

### 7. Inicie o servidor

```bash
npm run dev
```

---

## 📌 Rotas Principais

### 🎉 Eventos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/eventos` | Lista eventos |
| GET | `/eventos/:id` | Busca evento por ID |
| POST | `/eventos` | Cria evento |
| PUT | `/eventos/:id` | Atualiza evento |
| DELETE | `/eventos/:id` | Remove evento |
| POST | `/eventos/:id/banner` | Upload de banner |

---

### 👥 Participantes

| Método | Rota | Descrição |
|---|---|---|
| GET | `/participantes` | Lista participantes |
| POST | `/participantes` | Cadastra participante |

---

### 📝 Inscrições

| Método | Rota | Descrição |
|---|---|---|
| GET | `/inscricoes` | Lista inscrições |
| POST | `/inscricoes` | Realiza inscrição |
| GET | `/inscricoes/evento/:id` | Lista inscrições por evento |
| PATCH | `/inscricoes/:id/cancelar` | Cancela inscrição |

---

### 📤 Exportação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/exportar/eventos/json` | Exporta eventos em JSON |
| GET | `/exportar/eventos/xml` | Exporta eventos em XML |
| GET | `/exportar/relatorio/inscricoes` | Retorna relatório de inscrições |

---

## 📚 Documentação Swagger

A documentação da API pode ser acessada em:

```bash
http://localhost:3000/api-docs
```

---

## 🧪 Testes da API

Os testes foram realizados utilizando:

- Postman
- Swagger UI

A collection atualizada está disponível em:

```bash
docs/postman-collection.json
```

---

## 📂 Estrutura Final do Projeto

```bash
notificacoes-api/
├── src/
├── uploads/
├── docs/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 👨‍💻 Integrantes do Grupo

- Elo Carvalho
- Raissa
- Maria Fernanda
- Isadora

---

## 📄 Licença

Projeto desenvolvido para fins educacionais no curso Técnico de Desenvolvimento de Sistemas do SENAI.

## 🚀 Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/Elo-Carvalho-senai/notificacoes-api-grupo3.git
```