# Atividade 01 — Estudo Dirigido: Anatomia do Módulo de Notificações
**UC:** Testes de Software (TSOF)  
**Data:** 13/08/2026  
**Grupo:** Isadora, Maria Eloisa, Maria Fernanda e Raíssa 

---

## Parte 1 — Inventário da Arquitetura

### Tabela de Camadas

| Camada | Arquivos Encontrados | Responsabilidade (em uma frase) |
| :--- | :--- | :--- |
| **Rotas** | `routes/auth.routes.js`, `notificacao.routes.js`, `evento.routes.js`, `participante.routes.js` | Mapear caminho + verbo HTTP para um controller; aplicar middlewares. |
| **Controllers** | `controllers/...` *(listar arquivos)* | Receber a requisição HTTP, extrair dados, chamar a camada de serviço e retornar a resposta formatada. |
| **Services** | `services/...` *(listar arquivos)* | Executar a lógica de negócio principal do sistema e coordenar operações com banco e serviços externos. |
| **Models** | `models/...` *(listar arquivos)* | Definir as estruturas de dados, schemas e a interface de acesso/comunicação direta com o banco. |
| **Middlewares** | `middlewares/...` *(listar arquivos)* | Interceptar requisições para realizar autenticação (JWT), validações de dados e tratamento centralizado de erros. |
| **Configuração / .env** | `.env`, `.env.example`, `config/...` | Armazenar variáveis de ambiente sensíveis, conexões de banco de dados e credenciais de e-mail. |
| **Outros (utils, helpers...)**| `utils/...`, `helpers/...` | Disponibilizar funções utilitárias reutilizáveis (como formatadores, validadores de CPF/e-mail, hash de senha). |

### Perguntas e Respostas da Parte 1

1. **Quantos arquivos existem em cada camada?**
   * Rotas: X arquivos
   * Controllers: X arquivos
   * Services: X arquivos
   * Models: X arquivos
   * Middlewares: X arquivos
   * Utils/Helpers: X arquivos

2. **As responsabilidades estão de fato separadas, ou existe camada fazendo o trabalho de outra?**
   * *(Ajustem conforme o projeto de vocês)* Exemplo: *A separação está clara na maioria das partes, porém no controller X vimos queries acessando o banco diretamente sem passar pelo service, ou as validações estão misturadas na rota.*

3. **Onde está a comunicação com o banco de dados?**
   * Está localizada nos arquivos da camada `models/` (ou no arquivo de configuração do ORM/ODM na pasta `config/` / `database.js`).

4. **Onde está a comunicação com o serviço de e-mail (Nodemailer/MailPit)?**
   * Está implementada na camada `services/` (ex.: `services/email.service.js` ou `services/notificacao.service.js`), onde a biblioteca do Nodemailer é configurada e executada.

---

## Parte 2 — Mapa das Rotas

| # | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| :-: | :--- | :--- | :-: | :--- | :--- | :--- | :--- |
| 1 | POST | `/auth/login` | Não | AuthController | AuthService | Usuario | Gera token |
| 2 | POST | `/notificacoes` | Sim | NotificacaoController | NotificacaoService | Notificacao, Usuario | Grava no banco, envia e-mail |
| 3 | GET | `/notificacoes` | Sim | NotificacaoController | NotificacaoService | Notificacao | Nenhum (apenas leitura) |
| 4 | POST | `/eventos` | Sim | EventoController | EventoService | Evento | Grava no banco |
| 5 | POST | `/participantes` | Sim | ParticipanteController | ParticipanteService | Participante, Evento | Grava no banco |
*(Complete a tabela com TODAS as rotas registradas na aplicação de vocês)*

---

## Parte 3 — Que Nível de Teste Cabe Onde?

| # | Comportamento a verificar | Nível | Por que este nível |
| :-: | :--- | :--- | :--- |
| **1** | [Autenticação] Login com senha incorreta devolve 401 | **endpoint** | A verificação envolve diretamente a resposta HTTP (status code 401) pela porta da frente da API. |
| **2** | [Notificações] Formatação correta do HTML da mensagem antes do envio | **unitário** | É uma regra de negócio pura que transforma dados sem precisar de rede ou banco de dados. |
| **3** | [Notificações] Disparo do e-mail e salvamento do status de envio | **integração** | Precisa verificar se o serviço realmente grava no banco e se comunica adequadamente com o MailPit/Nodemailer. |
| **4** | [Eventos] Criação de evento gravando no banco e retornando `201 Created` | **endpoint** | Testa a rota completa cobrindo HTTP, middleware de autenticação, controller e banco. |
| **5** | [Participantes] Impedir cadastro duplo do mesmo participante no mesmo evento | **integração** | A validação da restrição precisa consultar o estado atual gravado no banco de dados. |

---

## Parte 4 — Análise

**4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê?**  
> *Resposta:* O envio das **notificações/e-mails de confirmação**. Se o sistema falhar silenciosamente ao disparar as notificações, a API responderá com sucesso, o banco gravará o registro, mas o usuário final jamais receberá o aviso importante (como um ingresso, código de acesso ou alerta). Isso gera falsa sensação de funcionamento e causa grande prejuízo ao negócio e à experiência do usuário.

**4.2 Quais pontos do módulo dependem de algo externo ao código de vocês (banco, servidor de e-mail, relógio do sistema, variáveis de ambiente)? Listem todos.**  
> *Resposta:*
> * **Banco de Dados (PostgreSQL/MongoDB/MySQL):** Dependência de rede, credenciais e disponibilidade do banco.
> * **Servidor de E-mail (MailPit / SMTP / Nodemailer):** Dependência do serviço de e-mail externo para entrega de mensagens.
> * **Relógio do Sistema (System Clock):** Dependência para validar expiração de Tokens JWT e datas dos eventos/notificações.
> * **Variáveis de Ambiente (`.env`):** Dependência do arquivo contendo `PORT`, `JWT_SECRET`, URLs de conexão e portas.

**4.3 Escolham uma função ou método que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede. Copiem o nome e o arquivo.**  
> *Resposta:*
> * **Função:** `validarEmail()` (ou `formatarTemplateNotificacao()`)
> * **Arquivo:** `src/utils/validators.js` (ou `src/services/notificacao.service.js`)

**4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz? Registrem qual.**  
> *Resposta:* *(Sejam honestos! Exemplo:)* "O middleware de tratamento global de erros no arquivo `middlewares/errorHandler.js` e a forma como a assinatura da chave pública do JWT está configurada no `auth.js`."

---

## Parte 5 — Desafio Extra (Risco)

* **Rota de Maior Risco:** `POST /notificacoes`
  * **Probabilidade de defeito:** Alta — conecta múltiplos pontos (banco, renderização de template, validação de payload e integração externa de e-mail via Nodemailer).
  * **Impacto se falhar:** Alto — a falha impede a entrega de comunicações críticas para centenas de usuários do sistema.
* **Rota de Menor Risco:** `GET /eventos`
  * **Probabilidade de defeito:** Baixa — rota simples de leitura, sem efeitos colaterais.
  * **Impacto se falhar:** Baixo — falha temporária de visualização sem perda ou corrupção de dados.

  🎫 Ticket de Saída — Individual (Para entregar no papel)
Respostas para você preencher na folha de papel:

Com suas palavras: qual a diferença entre defeito e falha?

Defeito (Bug/Erro no código): É a causa imperfeita criada pelo desenvolvedor dentro do código fonte (ex.: um operador <= escrito errado ou uma variável não tratada).

Falha: É o comportamento incorreto visível na execução do sistema para o usuário ou teste (ex.: o sistema retornar um erro 500 ou enviar um e-mail duplicado porque o defeito no código foi executado).

Dê um exemplo de teste não funcional que faria sentido no módulo do seu grupo.

Teste de Carga / Desempenho (Performance): Avaliar se a API de Notificações consegue processar e disparar 1.000 requisições simultâneas de envio de e-mail no endpoint POST /notificacoes mantendo um tempo de resposta inferior a 2 segundos por requisição.

Se o teste "POST /notificacoes retorna 201" falhar, o que esse resultado te diz — e o que ele NÃO te diz?

O que ele DIZ: Diz apenas que a rota de criação de notificações não entregou a resposta esperada no nível de HTTP (a API não retornou o código de status HTTP 201 Created).

O que ele NÃO te diz: Não diz onde ocorreu o problema. Não diz se a falha foi no banco de dados ao salvar, na autenticação do token JWT, no servidor de e-mail que caiu, em uma validação de campo incorreta no controller ou em um erro interno no servidor (500).