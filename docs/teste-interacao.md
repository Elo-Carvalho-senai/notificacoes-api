# Teste de Integração — Bloco 4

**Data:** 26/05/2026  
**Testador:** Isadora Aquino

| # | Teste | Resultado | Observação |
|---|---|---|---|
| 1 | GET /eventos (seed) | ✅ | Eventos retornados corretamente |
| 2 | POST /eventos | ✅ | Evento criado com sucesso |
| 3 | POST /participantes | ✅ | Participante criado |
| 4 | POST /inscricoes | ✅ | Inscrição criada com sucesso |
| 5 | Verificar e-mail enviado | ✅ | E-mail exibido no MailPit |
| 6 | GET /notificacoes | ✅ | Histórico retornado corretamente |
| 7 | Inscrição duplicada | ✅ | Regra de validação funcionando |
| 8 | PATCH cancelar inscrição | ✅ | Status alterado para cancelada |
| 9 | E-mail de cancelamento | ✅ | Template funcionando corretamente |
| 10 | GET /notificacoes/estatisticas | ✅ | Estatísticas retornadas corretamente |
| 11 | POST /notificacoes/:id/reenviar | ✅ | Reenvio funcionando |
| 12 | GET /exportar/inscricoes/xml | ✅ | XML gerado corretamente |
| 13 | GET /relatorio/inscricoes/csv | ✅ | Relatório gerado corretamente |
| 14 | Upload de banner | ✅ | Upload realizado com sucesso |
| 15 | GET /api-docs | ✅ | Swagger funcionando |
| 16 | Reiniciar servidor | ✅ | Servidor reiniciado sem erros |
| 17 | Persistência após reinício | ✅ | Dados mantidos no banco |

## Problemas encontrados

- Necessidade de validar os relacionamentos do Sequelize para garantir o funcionamento dos includes.
- Necessidade de verificar o observer de notificações durante os testes.
- Documentação Swagger precisava ser revisada e atualizada.

## Correções feitas

- Validados os relacionamentos entre Evento, Participante, Inscrição e Notificação.
- Testado e validado o observer de notificações.
- Revisada a configuração dos includes e aliases (`as`).
- Atualizada a documentação Swagger das rotas de notificações.
- Realizados testes de envio, cancelamento e reenvio de e-mails.