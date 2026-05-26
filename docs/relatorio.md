# Relatório Técnico — API de Notificações

**Grupo:** N°11, N°21, N°20, N°28  
**Membros:** Isadora, Maria Fernanda, Maria Eloisa, Raissa  
**Data:** 26/05/2026  

---

# 1. Introdução

## 1.1 Objetivo do Projeto

A API de Notificações foi desenvolvida com o objetivo de gerenciar eventos, participantes, inscrições e notificações automáticas de maneira organizada, automatizada e escalável. O sistema permite cadastrar eventos, registrar participantes, controlar inscrições e enviar notificações por e-mail sempre que ações importantes acontecem, como confirmações ou cancelamentos de inscrição.

O projeto foi construído para simular um ambiente profissional de desenvolvimento back-end, utilizando arquitetura em camadas, banco de dados relacional, integração com serviços SMTP, tratamento centralizado de erros e padrões de projeto amplamente utilizados no mercado, como o Observer Pattern.

Além das funcionalidades básicas de CRUD, a aplicação evoluiu para um sistema mais completo, com templates reutilizáveis de e-mail, histórico de notificações, regras de negócio, documentação Swagger e integração com ferramentas de testes e desenvolvimento.

O desenvolvimento do projeto permitiu aplicar conhecimentos adquiridos ao longo do semestre nas disciplinas de Programação Back-End e Projetos de Software, aproximando os alunos de situações reais de desenvolvimento de software.

---

## 1.2 Escopo

### Funcionalidades incluídas

- CRUD completo de eventos
- CRUD completo de participantes
- Sistema de inscrições
- Persistência de dados com MySQL
- Relacionamentos utilizando Sequelize ORM
- Middleware de tratamento de erros
- Validação de dados
- Sistema de notificações automáticas
- Envio de e-mails com Nodemailer
- Templates HTML reutilizáveis
- Implementação do padrão Observer
- Histórico de notificações
- Reenvio de notificações
- Estatísticas de envio
- Exportação JSON/XML
- Upload de arquivos
- Rotas RESTful
- Testes via Postman
- Documentação Swagger/OpenAPI
- Logs automáticos de ações do sistema

### Funcionalidades não implementadas

- Sistema de autenticação JWT
- Front-end da aplicação
- Painel administrativo
- Notificações push em tempo real
- Agendamento automático de lembretes
- Sistema de filas de processamento
- Deploy completo em produção
- Integração com serviços externos (WhatsApp, SMS)

---

# 2. Tecnologias Utilizadas

| Tecnologia | Versão | Justificativa |
|------------|---------|----------------|
| Node.js | v18+ / v20+ | Ambiente moderno e eficiente para aplicações back-end |
| Express.js | 4.x | Framework leve para criação de APIs REST |
| MySQL | 8.x | Banco de dados relacional robusto e amplamente utilizado |
| Sequelize | 6.x | ORM para facilitar consultas e relacionamentos |
| Nodemailer | 6.x | Biblioteca padrão para envio de e-mails |
| MailPit | Latest | Servidor SMTP de testes para visualização de e-mails |
| Swagger | 5.x | Documentação interativa da API |
| Postman | Latest | Testes de endpoints |
| Multer | 1.x | Upload de arquivos |
| dotenv | 16.x | Gerenciamento de variáveis de ambiente |
| Git | Atual | Controle de versão |
| GitHub | Atual | Armazenamento e colaboração do código |
| Nodemon | 3.x | Reinicialização automática durante desenvolvimento |
| CORS | 2.x | Comunicação entre aplicações |

---

# 3. Arquitetura do Sistema

## 3.1 Diagrama de Classes

O sistema foi modelado utilizando UML para representar as principais entidades da aplicação:

- Evento
- Participante
- Inscrição
- Notificação

### Relacionamentos implementados

- Um Evento possui várias Inscrições
- Um Participante possui várias Inscrições
- Uma Inscrição pertence a um Evento
- Uma Inscrição pertence a um Participante
- Uma Inscrição pode possuir várias Notificações

Os diagramas foram armazenados na pasta `docs/` do projeto.

---

## 3.2 Arquitetura em Camadas

A aplicação foi estruturada utilizando arquitetura MVC adaptada para APIs REST.

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

### Responsabilidades das camadas

| Camada | Responsabilidade |
|--------|------------------|
| Routes | Define endpoints da API |
| Controllers | Recebe e responde requisições HTTP |
| Services | Implementa regras de negócio |
| Models | Comunicação com banco de dados |
| Database | Persistência dos dados |

Essa organização facilitou manutenção, reutilização de código, separação de responsabilidades e escalabilidade do sistema.

---

## 3.3 Banco de Dados

O banco de dados foi estruturado com as seguintes tabelas:

| Tabela | Função |
|--------|---------|
| eventos | Armazena eventos |
| participantes | Armazena participantes |
| inscricoes | Relaciona participantes e eventos |
| notificacoes | Registra notificações enviadas |

### Relacionamentos principais

```text
Evento 1:N Inscricao
Participante 1:N Inscricao
Inscricao 1:N Notificacao
```

O Sequelize ORM foi utilizado para mapear os relacionamentos e facilitar consultas complexas com `include`, `associations` e `aliases`.

---

# 4. Funcionalidades Implementadas

| Funcionalidade | Status | Bloco PBE |
|----------------|---------|------------|
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Sistema de Inscrições | ✅ Completo | 1 e 3 |
| Middlewares personalizados | ✅ Completo | 2 |
| Tratamento de erros | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| Persistência MySQL | ✅ Completo | 3 |
| Relacionamentos Sequelize | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Observer Pattern | ✅ Completo | 4 |
| Notificações automáticas | ✅ Completo | 4 |
| Envio de e-mails | ✅ Completo | 4 |
| Templates HTML de e-mail | ✅ Completo | 4 |
| Histórico de notificações | ✅ Completo | 4 |
| Estatísticas de notificações | ✅ Completo | 4 |
| Reenvio de notificações | ✅ Completo | 4 |
| Logs automáticos | ✅ Completo | 4 |
| Documentação Swagger | ✅ Completo | 5 |
| Deploy | ⚠️ Parcial | 5 |

---

# 5. Sistema de Notificações

## 5.1 Observer Pattern

Foi implementado o padrão Observer utilizando o `EventEmitter` do Node.js para desacoplar regras de negócio do sistema de notificações.

### Eventos implementados

| Evento | Função |
|--------|---------|
| inscricao:criada | Envia confirmação de inscrição |
| inscricao:cancelada | Envia cancelamento |
| participante:criado | Envia boas-vindas |
| evento:criado | Registra logs |

### Benefícios da abordagem

- Baixo acoplamento
- Melhor organização
- Escalabilidade
- Facilidade de manutenção
- Separação de responsabilidades

---

## 5.2 Templates de E-mail

Os e-mails foram organizados em templates reutilizáveis:

| Template | Função |
|----------|---------|
| baseTemplate | Layout padrão compartilhado |
| confirmacaoInscricao | Confirma inscrição |
| cancelamentoInscricao | Informa cancelamento |
| lembreteEvento | Lembrete de evento |
| boasVindas | Recepção de participante |

A separação dos templates melhorou manutenção, reutilização e padronização visual dos e-mails.

---

## 5.3 Histórico e Regras de Negócio

O sistema passou a registrar notificações enviadas e aplicar regras importantes:

### Regras implementadas

- Evitar notificações duplicadas
- Histórico completo de envios
- Reenvio manual de notificações
- Consulta com filtros
- Estatísticas de envio

### Endpoints implementados

| Endpoint | Função |
|----------|---------|
| GET /notificacoes | Lista notificações |
| GET /notificacoes/estatisticas | Estatísticas |
| GET /notificacoes/:id | Busca detalhes |
| POST /notificacoes/:id/reenviar | Reenvia notificação |

---

## 5.4 Sistema de Logs

Foi implementado um sistema de logs para registrar eventos importantes da aplicação.

### Exemplo de log

```text
[2026-05-20T19:32:15.000Z] Inscrição #1 criada
```

---

# 6. Processo de Desenvolvimento

## 6.1 Metodologia

O grupo utilizou metodologia ágil baseada em entregas incrementais e organização por funcionalidades.

Foram realizadas:

- Divisão de tarefas
- Revisões coletivas
- Integração contínua
- Testes frequentes
- Organização via GitHub

---

## 6.2 Divisão de Trabalho

| Integrante | Responsabilidades |
|------------|-------------------|
| Isadora | Testes no Postman, rotas e validação das notificações |
| Maria Fernanda | Banco de dados, Sequelize e relacionamentos |
| Maria Eloisa | Templates de e-mail, Observer e regras de negócio |
| Raissa | Organização do projeto, documentação e suporte geral |

---

## 6.3 Controle de Versão

O projeto utilizou Git e GitHub para versionamento.

### Estratégias utilizadas

- Branches por funcionalidade
- Commits frequentes
- Pull antes de push
- Organização do histórico de alterações

---

# 7. Desafios e Soluções

| Desafio | Solução |
|----------|----------|
| Relacionamentos Sequelize não funcionavam | Ajuste dos aliases (`as`) |
| Observer não criava notificações | Correção das importações e eventos |
| Tabela notificacoes não salvava dados | Correção dos campos do model |
| Conflitos de merge | Organização de commits e pull antes de push |
| Problemas no envio de e-mails | Uso de MailPit para testes locais |
| Templates repetitivos | Criação de `baseTemplate` |
| Erros assíncronos | Uso de `try/catch` isolado |
| Problemas no EventEmitter | Centralização do `appEmitter` |
| ENUM incompatível no banco | Atualização da estrutura do model |

---

# 8. Lições Aprendidas

Durante o desenvolvimento do projeto, o grupo desenvolveu conhecimentos importantes sobre desenvolvimento back-end moderno.

### Principais aprendizados

- Estruturação de APIs REST
- Arquitetura MVC
- Uso do Sequelize ORM
- Relacionamentos entre tabelas
- Tratamento de erros
- Middlewares
- Eventos assíncronos
- Observer Pattern
- Templates HTML reutilizáveis
- Envio automatizado de e-mails
- Integração com SMTP
- Testes de API com Postman
- Organização de projetos Node.js
- Trabalho em equipe com GitHub

O projeto também fortaleceu habilidades de colaboração, comunicação e resolução de problemas em equipe.

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
├── docs/
├── .env
├── package.json
└── README.md
```

---

# 10. Próximos Passos

Caso o projeto continuasse sendo desenvolvido, poderiam ser implementadas as seguintes melhorias:

- Autenticação JWT
- Controle de permissões
- Dashboard administrativo
- Front-end React
- Deploy completo em nuvem
- Push notifications
- Cron jobs para lembretes automáticos
- Sistema de filas
- Integração com WhatsApp
- Recuperação de senha
- Testes automatizados

---

# 11. Conclusão

O desenvolvimento da API de Notificações permitiu aplicar diversos conceitos fundamentais do desenvolvimento back-end moderno. O projeto evoluiu de um CRUD básico para uma aplicação estruturada com eventos assíncronos, templates reutilizáveis, regras de negócio e notificações automatizadas.

A utilização do padrão Observer tornou o sistema mais desacoplado e preparado para futuras expansões, enquanto o uso do Nodemailer e MailPit aproximou o projeto de cenários reais utilizados no mercado.

Além dos conhecimentos técnicos, o projeto também contribuiu para o desenvolvimento de organização, colaboração e resolução de problemas em equipe, aproximando os integrantes da realidade profissional de desenvolvimento de software.

---

# 12. Referências

- https://expressjs.com/
- https://sequelize.org/
- https://nodejs.org/
- https://nodemailer.com/
- https://mailpit.axllent.org/
- https://dev.mysql.com/doc/
- https://www.postman.com/
- https://swagger.io/