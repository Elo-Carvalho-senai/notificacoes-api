# Atividade 01 — Estudo Dirigido: Anatomia do Módulo de Notificações
**UC:** Testes de Software (TSOF)  
**Data:** 13/08/2026  
<<<<<<< HEAD
**Grupo:** Isadora, Maria Eloisa, Maria Fernanda e Raíssa  
=======
**Grupo:** Isadora, Maria Eloisa, Maria Fernanda e Raissa 
>>>>>>> 06a9183bb4d6e01c76193e707992891b0daa923a

---

## Parte 1 — Inventário da Arquitetura

### Tabela de Camadas

| Camada | Arquivos Encontrados | Responsabilidade (em uma frase) |
| :--- | :--- | :--- |
| **Rotas** | `eventoRoutes.js`, `exportacaoRoutes.js`, `inscricaoRoutes.js`, `notificacaoRoutes.js`, `participanteRoutes.js` | Mapear caminho + verbo HTTP para um controller correspondente e aplicar middlewares. |
| **Controllers** | `EventoController.js`, `ExportacaoController.js`, `InscricaoController.js`, `ParticipanteController.js` | Receber a requisição HTTP, extrair parâmetros e payload, chamar a camada de serviço e retornar a resposta HTTP. |
| **Services** | `EmailService.js`, `EventoService.js`, `ExportacaoService.js`, `InscricaoService.js`, `NotificacaoService.js`, `ParticipanteService.js` | Concentrar as regras de negócio do sistema e coordenar operações com banco de dados e serviços externos (e-mail). |
| **Models** | `EventoModel.js`, `InscricaoModel.js`, `NotificacaoModel.js`, `ParticipanteModel.js`, `index.js` | Mapear as entidades do banco de dados (Sequelize) e fornecer a interface para operações de persistência. |
| **Middlewares** | `cacheMiddleware.js`, `errorHandler.js`, `logger.js`, `notFound.js`, `responseTime.js` | Interceptar requisições HTTP para aplicar regras transversais como log, cache, métricas de tempo e tratamento global de erros. |
| **Configuração / .env** | `config/cache.js`, `config/database.js`, `config/database.json`, `config/swagger.js`, `config/upload.js`, `.env` | Definir variáveis de ambiente e parâmetros de configuração para banco de dados, upload de arquivos e documentação. |
| **Outros (events, helpers, errors...)** | `events/` (`boasVindasObserver.js`, `eventEmitter.js`, `eventoObserver.js`, `logObserver.js`, `notificacaoObserver.js`), `helpers/validators.js`, `errors/AppError.js` | Implementar o padrão Observer para eventos do sistema, validações auxiliares reutilizáveis e classes customizadas de erro. |

### Perguntas e Respostas da Parte 1

1. **Quantos arquivos existem em cada camada?**
   * **Rotas:** 5 arquivos `.js` ativos (desconsiderando o arquivo de backup `.bkp`)
   * **Controllers:** 4 arquivos
   * **Services:** 6 arquivos
   * **Models:** 5 arquivos
   * **Middlewares:** 5 arquivos
   * **Configuração:** 5 arquivos JS/JSON na pasta `src/config`
   * **Outros (Events, Helpers, Errors, Templates):** 11 arquivos (`events`: 5, `helpers`: 1, `errors`: 1, `templates/email`: 4)

2. **As responsabilidades estão de fato separadas, ou existe camada fazendo o trabalho de outra?**
   * A arquitetura apresenta uma boa separação geral entre Rotas, Controllers, Services e Models, além da implementação de um padrão Observer para disparo de eventos desvinculados. Notamos apenas a ausência de um `NotificacaoController.js` específico (as ações de notificação são tratadas via `NotificacaoService.js` acopladas aos eventos de inscrição/sistema ou manipuladas diretamente em serviços compostos).

3. **Onde está a comunicação com o banco de dados?**
   * A configuração de conexão reside em `src/config/database.js` e `src/config/database.json`. A definição das tabelas/relacionamentos fica na camada `src/models/`, e as consultas executadas pelas regras de negócio ocorrem através dessas instâncias de Models dentro dos arquivos de `src/services/`.

4. **Onde está a comunicação com o serviço de e-mail (Nodemailer/MailPit)?**
   * A comunicação de e-mail está encapsulada em `src/services/EmailService.js`, que utiliza os templates em HTML/JS localizados na pasta `src/templates/email/` (`baseTemplate.js`, `confirmacaoInscricao.js`, `cancelamentoInscricao.js`, `lembreteEvento.js`).

---

## Parte 2 — Mapa das Rotas

| # | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| :-: | :--- | :--- | :-: | :--- | :--- | :--- | :--- |
| 1 | POST | `/eventos` | Não | EventoController | EventoService | EventoModel | Grava evento no banco |
| 2 | GET | `/eventos` | Não | EventoController | EventoService | EventoModel | Nenhum (apenas leitura) |
| 3 | GET | `/eventos/:id` | Não | EventoController | EventoService | EventoModel | Nenhum (apenas leitura) |
| 4 | PUT | `/eventos/:id` | Não | EventoController | EventoService | EventoModel | Atualiza evento no banco |
| 5 | DELETE | `/eventos/:id` | Não | EventoController | EventoService | EventoModel | Remove evento do banco |
| 6 | POST | `/participantes` | Não | ParticipanteController | ParticipanteService | ParticipanteModel | Grava participante no banco |
| 7 | GET | `/participantes` | Não | ParticipanteController | ParticipanteService | ParticipanteModel | Nenhum (apenas leitura) |
| 8 | POST | `/inscricoes` | Não | InscricaoController | InscricaoService | InscricaoModel, ParticipanteModel, EventoModel | Grava inscrição no banco, dispara e-mail de confirmação via Observer |
| 9 | DELETE | `/inscricoes/:id` | Não | InscricaoController | InscricaoService | InscricaoModel | Cancela inscrição no banco, dispara e-mail de cancelamento |
| 10 | POST | `/notificacoes/disparar` | Não | Direct / Service | NotificacaoService, EmailService | NotificacaoModel | Grava notificação no banco e envia e-mails via Nodemailer |
| 11 | GET | `/exportacao/participantes` | Não | ExportacaoController | ExportacaoService | ParticipanteModel | Gera arquivo/stream de exportação de dados |

---

## Parte 3 — Que Nível de Teste Cabe Onde?

| # | Comportamento a verificar | Nível | Por que este nível |
| :-: | :--- | :--- | :--- |
| **1** | [Autenticação / Validação] Tentar cadastrar evento com campos obrigatórios ausentes retorna `400 Bad Request` | **endpoint** | A verificação envolve diretamente o status code HTTP e o formato do corpo da resposta tratada pelo controller/middleware. |
| **2** | [Notificações] Validação de formato de e-mail e interpolação de dados no template HTML de e-mail | **unitário** | Trata-se de uma regra de negócio e manipulação de string puras (em `helpers/validators.js` ou `templates/email`), sem dependência de banco ou rede. |
| **3** | [Notificações] Disparo do e-mail de confirmação ao realizar uma inscrição (`EmailService` integrando com MailPit) | **integração** | Precisa verificar se o serviço de inscrição consegue acionar o `EmailService` e comunicar com sucesso com o servidor SMTP simulado. |
| **4** | [Eventos] Requisição `POST /eventos` com payload válido cria o registro e retorna `201 Created` | **endpoint** | Testa o fluxo completo do endpoint (HTTP, Controller, Service e persistência final no banco de dados). |
| **5** | [Participantes] Impedir a criação de inscrição duplicada para o mesmo participante no mesmo evento | **integração** | A validação da regra precisa obrigatoriamente consultar o estado persistido das inscrições existentes no banco de dados. |

---

## Parte 4 — Análise

**4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê?**  
> *Resposta:* O disparo assíncrono de notificações via eventos/observers (`notificacaoObserver.js` / `EmailService.js`). Se a requisição de inscrição retornar sucesso (HTTP 201), mas a notificação falhar silenciosamente sem salvar logs ou registrar erro, o usuário acreditará que o processo foi concluído e não receberá o e-mail de confirmação ou ingresso. Isso gera incerteza no usuário, chamados no suporte e falha direta na proposta principal do módulo de Notificações.

**4.2 Quais pontos do módulo dependem de algo externo ao código de vocês (banco, servidor de e-mail, relógio do sistema, variáveis de ambiente)? Listem todos.**  
> *Resposta:*
> * **Banco de Dados (Configurado via Sequelize em `config/database.js`):** Dependência de disponibilidade do servidor MySQL/PostgreSQL e conexão de rede.
> * **Servidor de E-mail / SMTP (MailPit / Nodemailer em `EmailService.js`):** Dependência de serviço de e-mail externo para entrega dos e-mails.
> * **Sistema de Arquivos / Sistema Operacional (Uploads e Logs):** Dependência de permissões de escrita para a pasta de logs (`app.log`) e upload de imagens (`config/upload.js`).
> * **Variáveis de Ambiente (`.env`):** Dependência de chaves e parâmetros como `PORT`, credenciais do banco e configurações de SMTP.
> * **Relógio do Sistema (System Clock):** Dependência para carimbo de data/hora nas migrations, criação de eventos e agendamento/envio de notificações.

**4.3 Escolham uma função ou método que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede. Copiem o nome e o arquivo.**  
> *Resposta:*
> * **Função:** `validarEmail` (ou as funções de validação dentro do auxiliar)
> * **Arquivo:** `src/helpers/validators.js`

**4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz? Registrem qual.**  
> *Resposta:* O funcionamento do middleware `cacheMiddleware.js` juntamente com as configurações em `src/config/cache.js`, e como o fluxo do `eventEmitter.js` gerencia o encadeamento assíncrono de eventos quando múltiplos observers são acionados na mesma requisição.

---

## Parte 5 — Desafio Extra (Risco)

* **Rota de Maior Risco:** `POST /inscricoes`
  * **Probabilidade de defeito:** Alta — Envolve coordenação entre múltiplos Models (`InscricaoModel`, `ParticipanteModel`, `EventoModel`), validação de duplicidade e acionamento de eventos assíncronos de e-mail via `boasVindasObserver.js` / `EmailService.js`.
  * **Impacto se falhar:** Alto — Impede que participantes se inscrevam nos eventos, interrompe o fluxo principal do sistema e impede a entrega das confirmações por e-mail.
* **Rota de Menor Risco:** `GET /eventos`
<<<<<<< HEAD
  * **Probabilidade de defeito:** Baixa — Rota somente de leitura, sem efeitos colaterais ou integrações externas.
  * **Impacto se falhar:** Baixo — Causa indisponibilidade temporária de listagem, sem risco de corrupção ou perda de dados no banco.
=======
  * **Probabilidade de defeito:** Baixa — rota simples de leitura, sem efeitos colaterais.
  * **Impacto se falhar:** Baixo — falha temporária de visualização sem perda ou corrupção de dados.
<<<<<<< HEAD
>>>>>>> 06a9183bb4d6e01c76193e707992891b0daa923a
=======


----
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
>>>>>>> 23db293b8c7cdb2ded72dd358a89b8118e7c6b0a
