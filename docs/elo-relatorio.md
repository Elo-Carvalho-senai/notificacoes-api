# Relatório Técnico — API de Notificações

**Grupo:** [número do grupo]
**Membros:** [nomes dos integrantes]
**Data:** [data da apresentação]

---

# 1. Introdução

## 1.1 Objetivo do Projeto

A API de Notificações foi desenvolvida com o objetivo de gerenciar eventos, participantes e inscrições de forma organizada, automatizada e escalável. O sistema permite que usuários se cadastrem em eventos e recebam notificações automáticas por e-mail sempre que ações importantes acontecem, como confirmação de inscrição ou cancelamento.

O projeto foi construído para simular um ambiente profissional de desenvolvimento back-end, utilizando arquitetura em camadas, banco de dados relacional, tratamento de erros, design patterns e integração com serviços de e-mail. Durante o desenvolvimento, foram aplicados conceitos estudados ao longo do semestre em Programação Back-End e Projetos de Software.

Além disso, o sistema foi estruturado pensando em manutenção e crescimento futuro, permitindo adicionar novos tipos de notificações, observadores e integrações sem modificar a lógica principal da aplicação.

---

## 1.2 Escopo

### Funcionalidades incluídas

* CRUD completo de eventos
* CRUD completo de participantes
* Sistema de inscrições
* Persistência em banco MySQL
* Relacionamentos com Sequelize
* Middleware de tratamento de erros
* Validação de dados
* Sistema de notificações automáticas
* Envio de e-mails com Nodemailer
* Templates reutilizáveis de e-mail
* Implementação do padrão Observer
* Logs automáticos de ações
* Rotas RESTful
* Testes via Postman
* Organização MVC

### Funcionalidades não implementadas

* Autenticação JWT
* Front-end da aplicação
* Painel administrativo
* Agendamento automático de lembretes
* Upload real em nuvem
* Deploy final em produção

---

# 2. Tecnologias Utilizadas

| Tecnologia | Versão | Justificativa                                        |
| ---------- | ------ | ---------------------------------------------------- |
| Node.js    | v20+   | Ambiente moderno e rápido para aplicações back-end   |
| Express.js | 4.x    | Facilidade na criação de APIs REST                   |
| MySQL      | 8.x    | Banco relacional robusto e amplamente utilizado      |
| Sequelize  | 6.x    | ORM para facilitar relacionamentos e consultas       |
| Nodemailer | 6.x    | Biblioteca padrão para envio de e-mails              |
| MailPit    | Latest | Ambiente de testes SMTP para visualização de e-mails |
| dotenv     | 16.x   | Gerenciamento de variáveis de ambiente               |
| cors       | 2.x    | Permitir comunicação entre aplicações                |
| nodemon    | 3.x    | Reinício automático durante desenvolvimento          |
| Postman    | Latest | Testes das rotas da API                              |
| Swagger    | 5.x    | Documentação da API                                  |

---

# 3. Arquitetura do Sistema

## 3.1 Diagrama de Classes

O sistema foi modelado utilizando entidades principais:

* Evento
* Participante
* Inscrição
* Notificação

Os relacionamentos implementados foram:

* Um Evento possui várias Inscrições
* Um Participante possui várias Inscrições
* Uma Inscrição possui várias Notificações

---

## 3.2 Arquitetura em Camadas

O projeto utiliza arquitetura MVC adaptada para APIs REST.

### Fluxo da aplicação

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MySQL
```

### Responsabilidade de cada camada

| Camada      | Responsabilidade        |
| ----------- | ----------------------- |
| Routes      | Define endpoints da API |
| Controllers | Recebe requisições HTTP |
| Services    | Regras de negócio       |
| Models      | Comunicação com o banco |
| Database    | Persistência dos dados  |

---

## 3.3 Banco de Dados

O banco de dados foi estruturado com as seguintes tabelas:

| Tabela        | Função                            |
| ------------- | --------------------------------- |
| eventos       | Armazena eventos                  |
| participantes | Armazena participantes            |
| inscricoes    | Relaciona participantes e eventos |
| notificacoes  | Registra notificações enviadas    |

### Principais relacionamentos

```text
Evento 1:N Inscricao
Participante 1:N Inscricao
Inscricao 1:N Notificacao
```

---

# 4. Funcionalidades Implementadas

| Funcionalidade            | Status     | Bloco |
| ------------------------- | ---------- | ----- |
| CRUD de Eventos           | ✅ Completo | 1 e 3 |
| CRUD de Participantes     | ✅ Completo | 1 e 3 |
| Sistema de Inscrições     | ✅ Completo | 1 e 3 |
| Middlewares de erro       | ✅ Completo | 2     |
| Validação de dados        | ✅ Completo | 2     |
| Persistência MySQL        | ✅ Completo | 3     |
| Relacionamentos Sequelize | ✅ Completo | 3     |
| Sistema Observer          | ✅ Completo | 4     |
| Notificações automáticas  | ✅ Completo | 4     |
| Envio de e-mails          | ✅ Completo | 4     |
| Templates de e-mail       | ✅ Completo | 4     |
| Logs automáticos          | ✅ Completo | 4     |
| Documentação Swagger      | ✅ Completo | 5     |
| Deploy                    | ⏳ Parcial  | 5     |

---

# 5. Processo de Desenvolvimento

## 5.1 Metodologia

O grupo utilizou metodologia ágil baseada em pequenas entregas semanais. O desenvolvimento foi dividido em etapas, acompanhando os blocos da disciplina.

Foram realizadas:

* Divisão de tarefas
* Revisão coletiva
* Testes contínuos
* Integração incremental

---

## 5.2 Divisão de Trabalho

| Integrante   | Responsabilidades       |
| ------------ | ----------------------- |
| Integrante 1 | CRUD e Models           |
| Integrante 2 | Controllers e rotas     |
| Integrante 3 | Observer e notificações |
| Integrante 4 | Templates e testes      |

---

## 5.3 Controle de Versão

O projeto foi versionado utilizando Git e GitHub.

### Estratégias utilizadas

* Commits frequentes
* Organização por funcionalidades
* Pull antes de push
* Branches para testes

---

# 6. Desafios e Soluções

| Desafio                                      | Solução                                  |
| -------------------------------------------- | ---------------------------------------- |
| Relacionamentos do Sequelize não funcionavam | Correção dos aliases (`as`)              |
| Observer não criava notificações             | Ajuste na importação do observer         |
| Tabela notificacoes vazia                    | Correção do relacionamento com Inscricao |
| Erro ao usar migrations                      | Ajuste do config/database                |
| Preview do Ethereal não aparecia             | Migração para MailPit                    |
| Templates muito repetitivos                  | Criação de baseTemplate                  |
| Erros assíncronos nos observers              | Uso de try/catch isolado                 |
| Problemas no EventEmitter                    | Centralização do appEmitter              |

---

# 7. Lições Aprendidas

Durante o projeto, os integrantes desenvolveram conhecimentos importantes sobre desenvolvimento back-end profissional.

### Principais aprendizados

* Estruturação de APIs REST
* Organização MVC
* Uso do Sequelize ORM
* Relacionamentos entre tabelas
* Eventos assíncronos
* Design Pattern Observer
* Envio de e-mails automatizados
* Templates HTML reutilizáveis
* Tratamento de erros
* Debugging de aplicações Node.js
* Integração entre serviços

O projeto também ajudou no desenvolvimento de trabalho em equipe, resolução de problemas e organização de código em projetos maiores.

---

# 8. Sistema de Notificações

## 8.1 Observer Pattern

Foi implementado o padrão Observer utilizando o `EventEmitter` do Node.js.

### Eventos implementados

| Evento              | Função               |
| ------------------- | -------------------- |
| inscricao:criada    | Dispara confirmação  |
| inscricao:cancelada | Dispara cancelamento |
| participante:criado | Dispara boas-vindas  |
| evento:criado       | Registra logs        |

### Benefícios da abordagem

* Baixo acoplamento
* Escalabilidade
* Fácil manutenção
* Separação de responsabilidades

---

## 8.2 Templates de E-mail

Os e-mails foram separados em templates reutilizáveis:

| Template              | Função                   |
| --------------------- | ------------------------ |
| baseTemplate          | Layout padrão            |
| confirmacaoInscricao  | Confirma inscrição       |
| cancelamentoInscricao | Informa cancelamento     |
| lembreteEvento        | Lembrete de evento       |
| boasVindas            | Recepção de participante |

---

## 8.3 Sistema de Logs

Foi criado um observer responsável por registrar ações importantes no arquivo:

```text
logs/app.log
```

### Exemplo de log

```text
[2026-05-20T19:32:15.000Z] Inscrição #1 criada
```

---

# 9. Estrutura Final do Projeto

```text
notificacoes-api/
├── logs/
│   └── app.log
├── src/
│   ├── config/
│   ├── controllers/
│   ├── events/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── templates/
│   │   └── email/
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

# 10. Próximos Passos

Se o projeto continuasse sendo desenvolvido, seriam implementadas as seguintes melhorias:

* Autenticação JWT
* Controle de permissões
* Dashboard administrativo
* Front-end React
* Upload de imagens
* Deploy completo em nuvem
* Push notifications
* Cron jobs para lembretes automáticos
* Sistema de filas
* Integração com WhatsApp
* Envio real de e-mails em produção

---

# 11. Conclusão

O desenvolvimento da API de Notificações permitiu aplicar diversos conceitos fundamentais do desenvolvimento back-end moderno. O projeto evoluiu desde um CRUD básico até uma aplicação estruturada com eventos assíncronos, templates reutilizáveis e envio automatizado de notificações.

A utilização do padrão Observer tornou o sistema mais desacoplado e preparado para futuras expansões, enquanto o uso do Nodemailer e MailPit aproximou o projeto de cenários reais utilizados no mercado.

Além dos conhecimentos técnicos, o projeto também fortaleceu habilidades de colaboração, organização e resolução de problemas em equipe.

---

# 12. Referências

* [Express.js](https://expressjs.com?utm_source=chatgpt.com)
* [Sequelize ORM](https://sequelize.org?utm_source=chatgpt.com)
* [Node.js](https://nodejs.org?utm_source=chatgpt.com)
* [Nodemailer](https://nodemailer.com?utm_source=chatgpt.com)
* [MailPit](https://mailpit.axllent.org?utm_source=chatgpt.com)
* [MySQL Documentation](https://dev.mysql.com/doc?utm_source=chatgpt.com)
* [Postman](https://www.postman.com?utm_source=chatgpt.com)
* [Swagger OpenAPI](https://swagger.io?utm_source=chatgpt.com)
