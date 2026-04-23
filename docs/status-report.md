# Status Report — API de Notificações

**Data:** 20/04

**Grupo:** 3


## Progresso Geral
| Fase da WBS | Status | % Concluído |
| --------------------------------- | --------------- | ----------- |
| 1. Planejamento | ✅ Concluído | 100% |
| 2. Desenvolvimento — Base | ✅ Concluído | 100% |
| 3. Desenvolvimento — Persistência | 🟡 Em progresso | [X%] |
| 4. Desenvolvimento — Notificações | ⬜ Não iniciado | 0% |
| 5. Finalização | ⬜ Não iniciado | 0% |




## Riscos Atualizados
O risco de "tempo insuficiente" concretizou-se parcialmente, causado pela complexidade inesperada na integração do Nodemailer.
Novos Riscos Identificados:
Curva de aprendizado elevada para a configuração do transporte SMTP.
Necessidade de reajuste na sequência lógica das Migrations do banco de dados para evitar erros de consistência.



## Cronograma
O projeto está dentro do prazo, porém com uma leve necessidade de ajuste na velocidade de desenvolvimento. A Sprint 1 serviu para identificar que algumas tarefas precisam ser quebradas em partes menores para evitar atrasos na entrega das funcionalidades de notificação.


## Próximos Passos
Sprint 2: Concluir o envio de e-mails, o upload de arquivos e iniciar o módulo de notificações.

Qualidade: Implementar middlewares de validação e tratamento de erros para atender à Definition of Done.

Documentação: Atualizar o Kanban no GitHub e preparar o documento de Auditoria de Qualidade para a Semana 8.