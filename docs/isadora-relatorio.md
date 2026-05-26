# Relatório Técnico — API de Notificações
**Grupo:** [N°11,N°21,N°20,N°28]
**Membros:** [Isadora, Maria Fernanda, Maria Eloisa, Raissa]
**Data:** [26/05/2026]

---

## 1. Introdução

### 1.1 Objetivo do Projeto
O projeto “API de Notificações” foi desenvolvido com o objetivo de criar uma plataforma back-end para gerenciamento de eventos, participantes, inscrições e notificações automáticas. A aplicação permite cadastrar eventos, registrar participantes e controlar inscrições utilizando uma API REST construída em Node.js.

Além do gerenciamento básico, o sistema também implementa notificações automáticas por e-mail utilizando o padrão Observer. Sempre que uma inscrição é criada ou cancelada, o sistema gera notificações e envia e-mails automaticamente ao participante utilizando Nodemailer e Ethereal.

O projeto foi importante para o aprendizado de arquitetura MVC, banco de dados relacionais, middlewares, rotas REST, integração com MySQL e utilização de Design Patterns no desenvolvimento back-end.


### 1.2 Escopo
O projeto incluiu:

- CRUD de eventos
- CRUD de participantes
- Sistema de inscrições
- Persistência em banco MySQL
- Middlewares personalizados
- Tratamento de erros
- Upload de arquivos
- Exportação JSON/XML
- Sistema de notificações
- Envio de e-mails com Nodemailer
- Templates HTML reutilizáveis
 -Documentação da API

Não foram implementados:

- Front-end
- Sistema de autenticação/login
- Notificações push
- Agendamento automático de lembretes
---

## 2. Tecnologias Utilizadas
| Tecnologia | Versão | Justificativa                                          |
| ---------- | ------ | ------------------------------------------------------ |
| Node.js    | v18+   | Utilizado para desenvolvimento do back-end JavaScript  |
| Express.js | 4.x    | Facilita criação de rotas e APIs REST                  |
| MySQL      | 8.0    | Banco relacional utilizado para persistência dos dados |
| Sequelize  | 6.x    | ORM utilizado para comunicação com o          banco             |
| Nodemailer | 6.x    | Responsável pelo envio de e-mails                      |
| Postman    | Atual  | Utilizado para testes das rotas                        |
| Swagger    | Atual  | Utilizado para documentar endpoints                    |
| Git        | Atual  | Controle de versões do projeto                         |
| GitHub     | Atual  | Armazenamento e colaboração do código                  |

---

## 3. Arquitetura do Sistema


### 3.1 Diagrama de Classes
O sistema foi modelado utilizando diagramas UML representando as entidades principais:

- Evento
- Participante
- Inscrição
- Notificação

Os relacionamentos incluem:

- Um evento possui várias inscrições
- Um participante possui várias inscrições
- Uma inscrição possui notificações

### 3.2 Arquitetura em Camadas
O projeto utiliza arquitetura MVC organizada em camadas:

Routes → Controllers → Services → Models → MySQL

- Routes: definem os endpoints da API
- Controllers: recebem as requisições HTTP
- Services: implementam regras de negócio
- Models: representam as tabelas do banco
- MySQL: armazenamento persistente

Essa separação facilitou organização, manutenção e reutilização do código.

### 3.3 Banco de Dados
O banco possui as seguintes tabelas principais:

- eventos
- participantes
- inscricoes
- notificacoes

Principais relacionamentos:

- Evento 1:N Inscrição
- Participante 1:N Inscrição
- Inscrição 1:N Notificação

O Sequelize foi utilizado para mapear os relacionamentos entre as tabelas.
---

## 4. Funcionalidades Implementadas
| Funcionalidade             | Status     | Bloco PBE |
| -------------------------- | ---------- | --------- |
| CRUD de Eventos            | ✅ Completo | 1 e 3     |
| CRUD de Participantes      | ✅ Completo | 1 e 3     |
| Sistema de Inscrições      | ✅ Completo | 1 e 3     |
| Middlewares personalizados | ✅ Completo | 2         |
| Tratamento de erros        | ✅ Completo | 2         |
| Persistência MySQL         | ✅ Completo | 3         |
| Upload de arquivos         | ✅ Completo | 3         |
| Exportação JSON/XML        | ✅ Completo | 3         |
| Observer Pattern           | ✅ Completo | 4         |
| Notificações automáticas   | ✅ Completo | 4         |
| Envio de e-mails           | ✅ Completo | 4         |
| Templates HTML de e-mail   | ✅ Completo | 4         |
| Documentação Swagger       | ✅ Completo | 5         |


---

## 5. Processo de Desenvolvimento


### 5.1 Metodologia
O grupo utilizou metodologia ágil com divisão de tarefas entre os integrantes. O desenvolvimento ocorreu por blocos de funcionalidades, permitindo evolução gradual da API.

As tarefas foram divididas conforme as habilidades e disponibilidade de cada integrante.

### 5.2 Divisão de Trabalho
- Isadora: testes no Postman, integração e validação das notificações, testes de e-mail e rotas de notificações
- Maria Fernanda: implementação de funcionalidades relacionadas ao banco de dados
- Maria Eloisa: desenvolvimento dos templates de e-mail e observers
- Raissa: organização geral do projeto e suporte nas funcionalidades da API


### 5.3 Controle de Versão
O projeto utilizou Git e GitHub para versionamento.

Foram realizados commits frequentes durante o desenvolvimento para registrar alterações e facilitar integração entre as integrantes.

O grupo também utilizou pull antes de enviar novas alterações para evitar conflitos.

---

## 6. Desafios e Soluções
| Desafio                               | Como resolvemos                                     |
| ------------------------------------- | --------------------------------------------------- |
| Erros de relacionamento no Sequelize  | Revisamos os aliases e foreign keys dos models      |
| Observer não salvava notificações     | Ajustamos os nomes corretos dos campos no model     |
| Timeout no envio de e-mails           | Utilizamos modo de teste temporário no EmailService |
| Erros de módulos não encontrados      | Criamos corretamente as rotas e arquivos ausentes   |
| Conflitos entre banco e máquina local | Padronizamos IDs existentes para testes             |


---

## 7. Lições Aprendidas
Durante o desenvolvimento do projeto, aprendemos conceitos importantes de desenvolvimento back-end, organização de APIs REST e integração com banco de dados.

Também aprendemos sobre:

- arquitetura MVC
- uso de middlewares
- tratamento de erros
- Design Patterns
- envio de e-mails com Nodemailer
- testes de API utilizando Postman
- integração entre equipe usando GitHub

O projeto contribuiu para melhorar trabalho em equipe e resolução de problemas em desenvolvimento real.
---

## 8. Próximos Passos (se o projeto continuasse)
Se o projeto continuasse, poderíamos implementar:

- autenticação de usuários
- painel front-end
- notificações push
- lembretes automáticos de eventos
- dashboard administrativo
- deploy em nuvem
- sistema de permissões
- fila de envio de e-mails
---

## 9. Referências
- [Documentação do Express.js](https://expressjs.com/)
- [Documentação do Sequelize](https://sequelize.org/)
- [Documentação do Nodemailer](https://nodemailer.com/)