# Teste de Integração — Bloco 4

**Data:** 26/05/2026  
**Testador:** Isadora Aquino

| # | Teste | Resultado | Observação |
|---|---|---|---|
| 1 | GET /eventos (seed) | ✅ | Eventos retornados corretamente |
| 2 | POST /eventos | ✅ | Evento criado com sucesso |
| 3 | POST /participantes | ✅ | Participante criado |
| 4 | POST /inscricoes | ✅ | Inscrição criada |
| 5 | Verificar e-mail enviado | ✅ | E-mail exibido no MailPit |
| 6 | GET /notificacoes | ✅ | Histórico retornado |
| 7 | Inscrição duplicada | ✅ | Erro tratado corretamente |
| 8 | PATCH cancelar inscrição | ✅ | Status alterado |
| 9 | E-mail de cancelamento | ✅ | Template funcionando |
| 10 | GET /notificacoes/estatisticas | ✅ | Estatísticas corretas |
| 11 | POST /notificacoes/:id/reenviar | ✅ | Reenvio funcionando |
| 12 | GET /exportar/inscricoes/xml | ✅ | XML gerado |
| 13 | GET /relatorio/inscricoes/csv | ✅ | CSV gerado |
| 14 | Upload de banner | ✅ | Upload funcionando |
| 15 | GET /api-docs | ✅ | Swagger funcionando |
| 16 | Reiniciar servidor | ✅ | Servidor reiniciado sem erros |
| 17 | Persistência após reinício | ✅ | Dados mantidos no banco |

## Problemas encontrados
- Erro de alias no Sequelize (`as`)
- Observer não encontrava dados relacionados
- Swagger não configurado inicialmente
- Problema no template de confirmação

## Correções feitas
- Ajustado `include` com aliases corretos
- Refatorado observer
- Configurado Swagger
- Corrigido template de e-mail
- Ajustadas rotas de exportação