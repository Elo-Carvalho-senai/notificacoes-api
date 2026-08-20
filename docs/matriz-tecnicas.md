# Matriz Técnica × Camada — Módulo de Notificações

**UC:** Testes de Software (TSOF)  
**Data:** 20/08/2026  
**Grupo:** Grupo 3

## Integrantes

- Elo Carvalho
- Raissa Fernandes
- Maria Fernanda
- Isadora Moraes

---

# Parte 1 — Matriz Técnica × Camada

As prioridades foram definidas considerando as funcionalidades existentes no projeto,
os riscos envolvidos, os recursos disponíveis e o escopo da UC.

| Camada / Grupo de rotas | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
|---|---|---|---|---|---|---|
| **Autenticação (`/auth/*`)** | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo |
| **Notificações** | Alta | Alta | Alta | Média | Fora do escopo | Fora do escopo |
| **Eventos** | Alta | Média | Média | Baixa | Fora do escopo | Fora do escopo |
| **Participantes / inscrições** | Alta | Alta | Alta | Média | Fora do escopo | Fora do escopo |
| **Envio de e-mail (Nodemailer/MailPit)** | Alta | Média | Alta | Baixa | Fora do escopo | Fora do escopo |
| **Camada de dados (Models + MySQL)** | Alta | Alta | Alta | Média | Fora do escopo | Fora do escopo |

---

## Justificativas das células de Alta prioridade

### Notificações × Regressão — ALTA

Justificativa: o módulo de notificações possui várias funcionalidades relacionadas entre si,
como listagem, estatísticas, detalhes, reenvio e envio de e-mails. Alterações em uma regra
podem afetar funcionalidades que já estavam funcionando.

### Notificações × Segurança — ALTA

Justificativa: as notificações armazenam informações relacionadas aos participantes e aos
e-mails enviados. É importante verificar se os dados retornados pelas rotas estão corretos
e se não há exposição indevida de informações.

### Notificações × Recuperação — ALTA

Justificativa: uma falha durante o envio de uma notificação pode afetar o histórico de
notificações ou deixar o sistema em um estado inconsistente. É importante verificar o
comportamento quando o serviço de e-mail estiver indisponível.

### Eventos × Regressão — ALTA

Justificativa: eventos são utilizados pelas inscrições e pelas notificações. Uma alteração
nas regras de eventos pode afetar outras partes do sistema que dependem desses dados.

### Participantes / inscrições × Regressão — ALTA

Justificativa: inscrições possuem integração com eventos, participantes e notificações.
Alterações nessa funcionalidade podem quebrar o cadastro, cancelamento ou disparo de
notificações que já funcionavam.

### Participantes / inscrições × Segurança — ALTA

Justificativa: as rotas manipulam dados pessoais dos participantes, como nome e e-mail.
É necessário verificar se os dados são tratados corretamente e se entradas inválidas não
causam comportamento indevido.

### Participantes / inscrições × Recuperação — ALTA

Justificativa: uma falha durante uma inscrição pode resultar em dados inconsistentes ou
em uma inscrição registrada sem que a notificação correspondente seja processada.
O comportamento do sistema após uma falha deve ser verificado.

### Envio de e-mail × Regressão — ALTA

Justificativa: o envio automático de e-mails é uma funcionalidade principal do projeto.
Alterações no Nodemailer, nos templates ou nos observers podem afetar confirmações,
cancelamentos e outras notificações.

### Envio de e-mail × Recuperação — ALTA

Justificativa: o MailPit ou o servidor SMTP pode ficar indisponível. É necessário verificar
como a aplicação se comporta quando o envio falha e se os dados principais da operação
continuam consistentes.

### Camada de dados × Regressão — ALTA

Justificativa: os Models e o banco de dados são utilizados por praticamente todas as
funcionalidades da API. Alterações nas consultas, Models ou relacionamentos podem causar
falhas em várias rotas.

### Camada de dados × Segurança — ALTA

Justificativa: o banco armazena dados de eventos, participantes, inscrições e notificações.
É necessário verificar se os dados são armazenados corretamente e se informações que
não deveriam ser expostas não aparecem nas respostas da API.

### Camada de dados × Recuperação — ALTA

Justificativa: uma falha ou indisponibilidade do banco pode ocorrer durante uma operação.
O sistema deve ser avaliado quanto à capacidade de voltar a funcionar sem deixar registros
incompletos ou inconsistentes.

---

# Justificativas das células Fora do escopo

## Autenticação × Regressão — FORA DO ESCOPO

Justificativa: o projeto atual não possui uma camada `/auth/*` ou funcionalidade de
autenticação nas rotas implementadas. Portanto, não há funcionalidade de autenticação
para ser testada.

## Autenticação × Segurança — FORA DO ESCOPO

Justificativa: não existe autenticação por usuário, token ou sessão implementada no
módulo atual. Portanto, testes como token inválido, token expirado ou acesso de usuário
a outro usuário não se aplicam ao projeto atual.

## Autenticação × Recuperação — FORA DO ESCOPO

Justificativa: não há serviço de autenticação ou sessão cuja recuperação após falha possa
ser avaliada.

## Autenticação × Performance — FORA DO ESCOPO

Justificativa: não existe camada de autenticação implementada e, portanto, não há
endpoint de autenticação cujo desempenho possa ser medido.

## Autenticação × Estresse — FORA DO ESCOPO

Justificativa: não existe funcionalidade de autenticação no projeto e também não há
ferramenta de teste de carga configurada no ambiente da UC.

## Autenticação × Paralelo — FORA DO ESCOPO

Justificativa: não existe um sistema anterior de autenticação em operação para comparar
as respostas com a implementação atual.

---

## Notificações × Estresse — FORA DO ESCOPO

Justificativa: o ambiente da UC não possui ferramenta de teste de carga configurada,
como k6, Artillery ou JMeter. O teste de estresse exigiria uma preparação adicional
que não faz parte do ambiente atual.

## Notificações × Paralelo — FORA DO ESCOPO

Justificativa: não existe uma versão anterior do módulo de notificações em operação para
executar as mesmas entradas e comparar os resultados.

## Eventos × Estresse — FORA DO ESCOPO

Justificativa: não há ferramenta de carga configurada no ambiente atual para gerar carga
extrema sobre as rotas de eventos.

## Eventos × Paralelo — FORA DO ESCOPO

Justificativa: não existe uma versão anterior do sistema de eventos em operação que possa
ser utilizada como referência para comparação.

## Participantes / inscrições × Estresse — FORA DO ESCOPO

Justificativa: o teste de estresse de inscrições simultâneas exigiria uma ferramenta de
carga que não está configurada no ambiente da UC.

## Participantes / inscrições × Paralelo — FORA DO ESCOPO

Justificativa: não existe um sistema anterior em operação para comparar o comportamento
das inscrições com o sistema atual.

## Envio de e-mail × Estresse — FORA DO ESCOPO

Justificativa: não há ferramenta de carga configurada para gerar grande quantidade de
envios simultâneos e avaliar o comportamento do serviço de e-mail sob carga extrema.

## Envio de e-mail × Paralelo — FORA DO ESCOPO

Justificativa: não existe uma implementação anterior do sistema de envio de e-mails em
operação para comparação.

## Camada de dados × Estresse — FORA DO ESCOPO

Justificativa: o projeto não possui ferramenta de carga configurada para submeter o banco
a uma quantidade extrema de operações.

## Camada de dados × Paralelo — FORA DO ESCOPO

Justificativa: não existe uma versão anterior do banco ou da camada de dados em operação
que possa ser utilizada como referência para comparação.

---

# Parte 2 — Escopo

## 2.1 Técnicas dentro do escopo

| Técnica | Ferramenta prevista | Em que nível será aplicada |
|---|---|---|
| **Regressão** | Jest, Supertest e Postman | Endpoint, integração e testes automatizados |
| **Segurança** | Postman, Swagger e consultas ao MySQL | Endpoint e integração |
| **Recuperação** | Postman, aplicação, MySQL e MailPit | Endpoint e integração |
| **Performance** | Postman e medição do tempo de resposta | Endpoint |

### Regressão

A regressão será utilizada para repetir testes já realizados depois de alterações no
código. A suíte de testes deverá ser executada novamente antes das entregas e após
alterações importantes nas regras de negócio.

### Segurança

A segurança será avaliada verificando o tratamento das entradas, a exposição de dados
nas respostas e a proteção dos dados armazenados no banco. O projeto atual não possui
autenticação, portanto não serão realizados testes de token ou sessão.

### Recuperação

A recuperação será avaliada observando o comportamento da aplicação quando componentes
como o banco de dados ou o serviço de e-mail ficam temporariamente indisponíveis.

### Performance

A performance será medida principalmente pelo tempo de resposta dos endpoints. Como o
projeto não possui um requisito não funcional formal de tempo de resposta, as medições
serão registradas apenas como referência, sem utilizar um valor arbitrário como critério
de aprovação.

---

## 2.2 Técnicas fora do escopo

| Técnica descartada | Motivo | Tipo de motivo |
|---|---|---|
| **Estresse** | Não há ferramenta de teste de carga configurada no ambiente da UC. | ☒ Falta de ferramenta |
| **Paralelo** | Não existe uma versão anterior do sistema em operação para comparação. | ☒ Não se aplica ao sistema |

### Estresse

A técnica de estresse ficará fora do escopo porque o ambiente da UC não possui uma
ferramenta de carga configurada. A realização de testes com centenas de requisições
simultâneas exigiria ferramentas e preparação que não estão disponíveis neste momento.

### Paralelo

A técnica de teste paralelo não se aplica porque o projeto atual não possui um sistema
anterior em operação com o qual seja possível executar as mesmas entradas e comparar
as saídas.

---

## 2.3 Riscos aceitos pelas técnicas descartadas

### Estresse

Ao não realizar testes de estresse, o projeto aceita o risco de não conhecer
completamente o comportamento da API em situações de carga extrema. Também não é
possível determinar, neste momento, como o sistema se comportaria diante de muitas
requisições simultâneas.

### Paralelo

Não há risco de divergência em relação a um sistema anterior porque não existe uma
versão anterior em operação. O risco aceito é não ter uma referência externa para
comparar o comportamento da implementação atual.

---

# Parte 3 — Verificações de Segurança

Foram definidas três verificações de segurança compatíveis com as funcionalidades
existentes no projeto.

| # | O que verificar | Nível | Resultado esperado |
|---|---|---|---|
| **1** | Enviar dados inválidos ou entradas inesperadas nas rotas de criação de eventos e participantes | Endpoint | A API deve rejeitar os dados inválidos com resposta de erro adequada, sem quebrar o servidor ou executar uma operação incorreta. |
| **2** | Verificar se dados sensíveis ou desnecessários aparecem nas respostas das rotas de participantes, inscrições e notificações | Endpoint | A resposta deve conter somente os dados necessários para aquela operação e não deve expor informações internas ou credenciais. |
| **3** | Verificar os dados armazenados no banco de dados para participantes e demais entidades | Integração | Os dados devem estar armazenados nos campos corretos e as informações de configuração do banco, como senha do banco, não devem estar expostas no código versionado. |

### Observação sobre autenticação

O projeto atual não possui rotas `/auth/*`, login, tokens ou sessões. Por isso, testes
de segurança envolvendo JWT, token expirado, token adulterado ou acesso entre usuários
não fazem parte desta matriz.

---

# Parte 4 — Regressão no calendário

## 4.1 Em que momentos o grupo vai rodar a suíte completa?

A suíte completa deverá ser executada:

- após alterações importantes em Services, Controllers, Models ou regras de negócio;
- antes de cada entrega;
- depois de corrigir um defeito;
- antes do commit final de uma funcionalidade importante;
- antes da apresentação final do projeto.

Além dos testes automatizados, os principais endpoints poderão ser revalidados no
Postman quando houver alterações relacionadas às rotas.

---

## 4.2 Quem é responsável por verificar a suíte antes de uma entrega?

A responsabilidade será compartilhada entre os integrantes do grupo. O integrante
responsável pela alteração deverá verificar os testes relacionados à sua funcionalidade,
e o grupo deverá confirmar a execução da suíte completa antes de uma entrega.

---

## 4.3 O que fazer se um teste que antes passava começar a falhar?

Se um teste que anteriormente passava começar a falhar:

1. A entrega não será considerada pronta imediatamente.
2. O grupo deverá identificar se a falha foi causada pela alteração recente ou se é um
   problema no próprio teste ou ambiente.
3. O código deverá ser corrigido e o teste executado novamente.
4. Depois da correção, a suíte completa deverá ser executada novamente para verificar
   possíveis efeitos em outras funcionalidades.
5. A alteração somente será considerada pronta quando os testes relevantes voltarem a
   passar ou quando uma falha conhecida estiver documentada e sua decisão estiver
   registrada pelo grupo.

---

# Resumo das técnicas selecionadas

| Técnica | Situação | Justificativa |
|---|---|---|
| **Regressão** | ✅ Dentro do escopo | Essencial para garantir que alterações não quebrem funcionalidades existentes. |
| **Segurança** | ✅ Dentro do escopo | O sistema manipula dados de participantes, inscrições e notificações. |
| **Recuperação** | ✅ Dentro do escopo | É importante verificar o comportamento diante de falhas do banco ou serviço de e-mail. |
| **Performance** | ⚠️ Dentro do escopo, sem critério formal | É possível medir tempo de resposta, mas não existe requisito formal de desempenho. |
| **Estresse** | ❌ Fora do escopo | Falta ferramenta de teste de carga no ambiente. |
| **Paralelo** | ❌ Fora do escopo | Não existe sistema anterior em operação para comparação. |

---

# Conclusão

A matriz foi definida considerando as funcionalidades atualmente implementadas no
módulo de notificações, os riscos das diferentes camadas e os recursos disponíveis
para o grupo.

As técnicas de **regressão, segurança, recuperação e performance** permanecem dentro
do escopo, enquanto **estresse e paralelo** ficam fora do escopo por motivos
documentados.

A ausência de autenticação também foi considerada na análise: como o projeto não possui
uma camada `/auth/*`, os testes específicos de autenticação não são aplicáveis ao
sistema atual.