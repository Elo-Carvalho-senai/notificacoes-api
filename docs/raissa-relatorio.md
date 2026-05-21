# Relatório Técnico — API de Notificações

**Grupo:** [número do grupo]  
**Membros:** [nomes dos integrantes]  
**Data:** 21/05/2026

---

# 1. Introdução

## 1.1 Objetivo do Projeto

O projeto API de Notificações foi desenvolvido com o objetivo de gerenciar eventos, participantes e inscrições de maneira organizada e automatizada. A aplicação permite o cadastro de eventos, controle de participantes e gerenciamento das inscrições realizadas em cada evento.

Além do gerenciamento básico, o sistema também implementa notificações automáticas por e-mail utilizando NodeMailer e MailPit, permitindo o envio de confirmações e cancelamentos de inscrição. Isso torna o sistema mais próximo de aplicações reais utilizadas em empresas e plataformas de eventos.

O projeto foi construído utilizando arquitetura em camadas, banco de dados relacional MySQL e boas práticas de desenvolvimento com Express.js, Sequelize e tratamento centralizado de erros.

---

## 1.2 Escopo

### Funcionalidades incluídas:
- CRUD de eventos
- CRUD de participantes
- Sistema de inscrições
- Validação de dados
- Tratamento de erros
- Persistência com MySQL
- Upload de arquivos
- Exportação JSON/XML
- Documentação Swagger
- Sistema de notificações por e-mail
- Observer Pattern para eventos do sistema

### Funcionalidades não implementadas:
- Autenticação de usuários
- Front-end web/mobile
- Notificações push
- Dashboard administrativo
- Deploy em produção

---

# 2. Tecnologias Utilizadas

| Tecnologia | Versão | Justificativa |
| ---------- | ------ | --------------------------- |
| Node.js | v18+ | Ambiente JavaScript moderno e rápido |
| Express.js | 4.x | Framework simples e eficiente para APIs |
| MySQL | 8.0 | Banco relacional robusto e amplamente utilizado |
| Sequelize | 6.x | ORM para facilitar operações no banco |
| Nodemailer | 6.x | Envio automatizado de e-mails |
| MailPit | latest | Simulação local de caixa de e-mails |
| Swagger | 5.x | Documentação interativa da API |
| Multer | 1.x | Upload de arquivos |
| Dotenv | 16.x | Gerenciamento de variáveis de ambiente |

---

# 3. Arquitetura do Sistema

## 3.1 Diagrama de Classes

O sistema foi modelado utilizando diagramas UML representando as entidades principais:
- Evento
- Participante
- Inscrição
- Notificação

Os diagramas foram armazenados na pasta docs/ do projeto.

---

## 3.2 Arquitetura em Camadas

O projeto segue arquitetura em camadas:

Routes → Controllers → Services → Models → MySQL

### Camadas:
- Routes: definição das rotas da API
- Controllers: controle das requisições HTTP
- Services: regras de negócio
- Models: comunicação com banco de dados
- MySQL: persistência dos dados

Essa separação melhora a organização, manutenção e escalabilidade do sistema.

---

## 3.3 Banco de Dados

O banco de dados possui as seguintes tabelas principais:
- eventos
- participantes
- inscricoes
- notificacoes

### Relacionamentos:
- Um evento possui várias inscrições
- Um participante possui várias inscrições
- Uma inscrição pertence a um evento
- Uma inscrição pertence a um participante
- Uma inscrição pode gerar notificações

---

# 4. Funcionalidades Implementadas

| Funcionalidade | Status | Bloco PBE |
| --------------------------------- | ----------- | --------- |
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Inscrições | ✅ Completo | 1 e 3 |
| Middlewares e tratamento de erros | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| Persistência MySQL | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Notificações por e-mail | ✅ Completo | 4 |
| Deploy | ⚠️ Parcial | 5 |
| Documentação Swagger | ✅ Completo | 5 |

---

# 5. Processo de Desenvolvimento

## 5.1 Metodologia

O grupo utilizou metodologia ágil com divisão de tarefas por etapas. As atividades foram organizadas utilizando GitHub e planejamento semanal das funcionalidades.

---

## 5.2 Divisão de Trabalho

As tarefas foram divididas entre os integrantes do grupo:
- Desenvolvimento das rotas
- Modelagem do banco de dados
- Implementação dos services
- Criação dos templates de e-mail
- Documentação Swagger
- Testes e correções

---

## 5.3 Controle de Versão

O projeto utilizou Git e GitHub para versionamento do código.

Foram utilizadas:
- branches para funcionalidades
- commits frequentes
- organização do histórico de alterações

---

# 6. Desafios e Soluções

| Desafio | Como resolvemos |
| ------------------------------- | ------------------------------------------- |
| Relacionamentos Sequelize | Ajustamos os aliases e includes |
| Erros de validação | Criamos tratamento centralizado |
| Problemas com ENUM | Atualizamos estrutura do banco |
| Observer não salvava notificações | Corrigimos os nomes dos campos |
| Conflitos de merge | Organização do fluxo de commits |
| Configuração de e-mail | Utilizamos MailPit para testes |

---

# 7. Lições Aprendidas

Durante o projeto, o grupo aprendeu:
- Estruturação de APIs REST
- Organização em arquitetura MVC
- Uso do Sequelize com MySQL
- Tratamento de erros
- Relacionamentos entre tabelas
- Uso de eventos com Observer Pattern
- Envio automatizado de e-mails
- Trabalho em equipe utilizando GitHub

O projeto também ajudou no desenvolvimento de habilidades de comunicação, resolução de problemas e colaboração.

---

# 8. Próximos Passos

Caso o projeto continuasse, poderiam ser implementadas:
- autenticação JWT
- painel administrativo
- deploy em nuvem
- notificações push
- integração com front-end React
- recuperação de senha
- dashboard de relatórios
- testes automatizados

---

# 9. Referências

- https://expressjs.com/
- https://sequelize.org/
- https://nodemailer.com/
- https://swagger.io/
- https://nodejs.org/
- https://dev.mysql.com/doc/