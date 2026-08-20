# Atividade 02 — Matriz Técnica × Camada do Módulo de Notificações

**Componente Curricular:** Testes de Software (TSOF)  
**Data:** 20/08/2026 | **Modalidade:** Em grupo  
**Grupo / Integrantes:**  
* [Raissa Fernandes]
* [Maria Eloisa]
* [Maria Fernanda]
* [Isadora Moraes]

---

## Parte 1 — Matriz técnica × camada

| Camada / grupo de rotas | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Autenticação ( `/auth/*` ) | Alta | Alta | Baixa | Média | Fora do escopo | Fora do escopo |
| Notificações | Alta | Média | Fora do escopo | Alta | Média | Fora do escopo |
| Eventos | Média | Média | Fora do escopo | Média | Fora do escopo | Fora do escopo |
| Participantes / inscrições | Alta | Alta | Baixa | Média | Fora do escopo | Fora do escopo |
| Envio de e-mail (Nodemailer/MailPit) | Média | Baixa | Alta | Média | Fora do escopo | Fora do escopo |
| Camada de dados (models + MySQL) | Alta | Alta | Alta | Média | Fora do escopo | Fora do escopo |

### Justificativas de células marcadas como Alta ou Fora do escopo

* **Autenticação × Segurança — ALTA**  
  *Justificativa:* É a porta de entrada do sistema. Qualquer falha de segurança aqui compromete a integridade e os dados de todos os usuários do módulo.
* **Autenticação × Regressão — ALTA**  
  *Justificativa:* Caso uma alteração quebre o fluxo de login, nenhum usuário ou outro teste conseguirá consumir o restante das rotas do sistema.
* **Notificações × Regressão — ALTA**  
  *Justificativa:* Sendo o core business do módulo, precisamos garantir que novos commits não quebrem a entrega principal de alertas e mensagens.
* **Notificações × Performance — ALTA**  
  *Justificativa:* O disparo de notificações não pode travar a aplicação; precisa ser rápido para garantir uma boa experiência em tempo real.
* **Participantes × Segurança — ALTA**  
  *Justificativa:* A rota exige token e precisa impedir que um usuário inscreva outro. É a rota com o maior risco de acesso indevido do módulo.
* **Envio de e-mail × Recuperação — ALTA**  
  *Justificativa:* Se o serviço externo do Nodemailer/MailPit falhar, o sistema precisa saber tratar o erro e retransmitir sem derrubar o servidor.
* **Camada de dados × Regressão — ALTA**  
  *Justificativa:* Mudanças estruturais no banco de dados (MySQL) podem quebrar as queries de todos os models em cascata.
* **Camada de dados × Segurança — ALTA**  
  *Justificativa:* Risco crítico de SQL Injection. Precisamos garantir a sanitização dos dados antes de qualquer persistência no MySQL.
* **Camada de dados × Recuperação — ALTA**  
  *Justificativa:* Imprescindível validar o comportamento do sistema caso a conexão com o banco caia temporariamente (mecanismo de reconexão automática).
* **Módulo Inteiro × Estresse — FORA DO ESCOPO**  
  *Justificativa:* Exige simulação de carga massiva destrutiva, extrapolando o tempo de desenvolvimento da disciplina (39 aulas) e a infraestrutura local disponível.
* **Módulo Inteiro × Paralelo — FORA DO ESCOPO**  
  *Justificativa:* O módulo foi desenhado com arquitetura síncrona/assíncrona linear padrão, sem processamento concorrente complexo que justifique a técnica no momento.

---

## Parte 2 — Escopo: o que fica dentro e o que fica fora

### 2.1 Técnicas que ficam dentro do escopo

| Técnica | Ferramenta prevista | Em que nível será aplicada |
| :--- | :--- | :--- |
| Regressão | Jest | Integração / API |
| Segurança | Jest / Postman | Integração / API |
| Performance | k6 | Sistema / End-to-End |
| Recuperação | Jest (Mocks de falha) | Integração / Componente |

### 2.2 Técnicas que ficam fora do escopo

| Técnica descartada | Motivo | Tipo de motivo |
| :--- | :--- | :--- |
| Teste de Estresse | Falta de infraestrutura de nuvem para carga massiva e tempo limitado nas aulas. | [X] Falta de tempo<br>[X] Falta de ferramenta |
| Teste Paralelo | A arquitetura atual não executa processamento paralelo complexo de dados. | [X] Não se aplica ao sistema |

### 2.3 Riscos aceitos por não cobrir as técnicas descartadas
* **Risco do descarte de Estresse:** O projeto aceita o risco de instabilidade ou queda total do servidor caso haja um pico imprevisto de acessos muito acima do limite operacional comum.

---

## Parte 3 — Verificações de segurança

| # | O que verificar | Nível | Resultado esperado |
| :-: | :--- | :--- | :--- |
| 1 | Envio de requisição para `/auth/*` e rotas privadas sem Token JWT no cabeçalho. | API | Retornar Status `401 Unauthorized` e bloquear o acesso. |
| 2 | Tentativa de um usuário autenticado alterar dados ou inscrições de outro usuário (ID diferente). | API | Retornar Status `403 Forbidden` impedindo a manipulação. |
| 3 | Armazenamento de dados sensíveis no banco: garantir que o campo de senha na tabela do MySQL não esteja em texto limpo. | Banco de Dados | Senhas salvas exclusivamente utilizando Hash seguro (Ex: bcrypt). |

---

## Parte 4 — Regressão no calendário

* **4.1 Momentos para rodar a suíte completa:** A suíte completa de testes será executada obrigatoriamente de forma local antes de cada `git push` feito pelo grupo para a branch principal (`main`), e ao final de cada aula prática.
* **4.2 Responsável pela verificação:** Todos os integrantes são responsáveis por rodar os testes, mas a validação final antes de cada entrega será centralizada e revisada por **[Nome do Aluno Responsável]**.
* **4.3 Regra para falhas na véspera da entrega:** Caso a suíte acuse falha em um teste que antes passava na véspera da entrega, o commit causador do erro será revertido imediatamente para a última versão estável conhecida. A funcionalidade com bug será isolada para que o projeto seja entregue 100% funcional, sem atrasos.
