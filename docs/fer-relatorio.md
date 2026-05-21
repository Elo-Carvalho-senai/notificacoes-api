fer relatorio: 
# 📩 API de Notificações

## 👥 Grupo
**N°11, N°21, N°20, N°28**  

## ✨ Membros
Isadora, Maria Fernanda, Maria Eloisa, Raissa  

## 📅 Data
21/05/2026  

---

## 📌 Sobre o Projeto

A **API de Notificações** é um sistema backend desenvolvido para gerenciar eventos, participantes e inscrições, permitindo o controle eficiente de informações e comunicação entre usuários.

O objetivo principal do projeto é centralizar o gerenciamento de eventos, garantindo organização, escalabilidade e facilidade de manutenção.

A API também foi estruturada para futuras expansões, como envio automático de e-mails, notificações em tempo real e integração com interfaces front-end.

---

## 🎯 Escopo do Projeto

### ✔️ Incluído
- CRUD de Eventos  
- CRUD de Participantes  
- Sistema de Inscrições  
- Validações de dados  
- Middlewares de tratamento de erros  
- Persistência com MySQL  
- Arquitetura em camadas  
- Exportação de dados (JSON/XML)  
- Upload de arquivos  

### ❌ Não incluído
- Front-end  
- App mobile  
- Sistema de pagamento  
- Notificações push em tempo real  

---

## 🛠️ Tecnologias Utilizadas

- Node.js (v18+)  
- Express.js  
- MySQL  
- Sequelize (ORM)  
- Nodemailer (envio de e-mails)  
- Multer (upload de arquivos)  

---

## 🧱 Arquitetura

O projeto segue uma arquitetura em camadas:

### 📦 Banco de Dados
O sistema possui 3 tabelas principais:
- Eventos  
- Participantes  
- Inscrições  

Relacionamento:
- Muitos-para-muitos entre Eventos e Participantes (via Inscrições)

---

## ⚙️ Funcionalidades

| Funcionalidade | Status | Bloco |
|----------------|--------|-------|
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Inscrições | ✅ Completo | 1 e 3 |
| Middlewares | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| MySQL | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Notificações por e-mail | 🚧 Em desenvolvimento | 4 |
| Deploy | ❌ Não iniciado | 5 |
| Swagger | 🚧 Em desenvolvimento | 5 |

---

## 🧑‍💻 Processo de Desenvolvimento

### 📌 Metodologia
Metodologia ágil com organização em Kanban (GitHub Projects) e entregas por etapas.

### 👤 Divisão de Trabalho
- Isadora → Rotas e Controllers  
- Maria Fernanda → Banco de dados e Sequelize  
- Maria Eloisa → Validações e regras de negócio  
- Raissa → Documentação e testes  

### 🔁 Versionamento
- Git + GitHub  
- Branches por funcionalidade  
- Commits frequentes  

---

## ⚠️ Desafios e Soluções

- Conflitos de merge → organização de pull antes de commits  
- Estrutura do projeto → arquitetura em camadas  
- Integração com banco → ajustes no Sequelize  
- Validações → criação de middlewares  

---

## 📚 Aprendizados

- Criação de APIs REST  
- Uso de ORM (Sequelize)  
- Arquitetura em camadas  
- Trabalho em equipe com Git  
- Organização de projetos backend  

---

## 🚀 Próximos Passos

- Autenticação com JWT  
- Front-end para consumir a API  
- Notificações em tempo real (WebSocket)  
- Deploy em nuvem  
- Sistema de permissões  

---

## 📖 Referências

- https://expressjs.com/  
- https://sequelize.org/  
- https://nodemailer.com/  
- https://dev.mysql.com/doc/  