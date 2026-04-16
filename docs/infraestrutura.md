# Infraestrutura e Dependências

## Ambiente de Desenvolvimento
- **OS:** Windows 10/11
- **Runtime:** Node.js v18+
- **IDE:** VS Code
- **Banco:** MySQL 8.0 (instalado na UC de BD)
- **Versionamento:** Git + GitHub

## Dependências do Projeto (package.json)

| Pacote | Versão | Finalidade |
|--------|--------|------------|
| express | ^4.x | Framework web para criação da API |
| mysql2 | ^3.x | Driver para conexão com MySQL |
| sequelize | ^6.x | ORM para manipulação do banco |
| swagger-jsdoc | ^6.x | Geração automática da documentação |
| swagger-ui-express | ^5.x | Interface visual da documentação |
| dotenv | ^16.x | Gerenciamento de variáveis de ambiente |
| cors | ^2.x | Permitir requisições entre diferentes origens |
| multer | ^1.x | Upload de arquivos |
| nodemailer | ^6.x | Envio de e-mails (simulado) |
| node-cache | ^5.x | Cache em memória para otimização |

## Dependências de Desenvolvimento

| Pacote | Versão | Finalidade |
|--------|--------|------------|
| nodemon | ^3.x | Reinício automático do servidor |
| sequelize-cli | ^6.x | Criação de migrations e seeds |

## Serviços Externos
- **Mailtrap/Ethereal** — servidor de e-mail simulado para testes
- **Render/Railway** — plataforma de deploy da aplicação

## Configurações do Ambiente

- Utilização de arquivo `.env` para armazenar:
  - Credenciais do banco de dados
  - Porta do servidor
  - Configurações de e-mail

- Padrão de estrutura:
  - Arquitetura MVC (Models, Controllers, Routes, Services)

## Integrações

- Integração com banco de dados MySQL via Sequelize
- Integração com serviço de e-mail (simulado)
- Integração com Swagger para documentação da API

## Observações

- Todas as dependências devem ser instaladas com `npm install`
- O projeto deve ser executado com:
  - `npm run dev` (desenvolvimento)
  - `npm start` (produção)