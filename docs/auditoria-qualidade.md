# Auditoria de Qualidade — Sprint 2

**Data:** 14/05/2026  
**Revisores:** Isa (Eventos), Raissa (Participantes), Maria Fernanda (Inscrições)

---

## Checklist de Qualidade

### Organização
- [x] Estrutura de pastas segue o padrão MVC + Services
- [x] Imports organizados (externos primeiro, internos depois)
- [x] Nomes de variáveis e funções são claros e consistentes

### Tratamento de Erros
- [x] Todos os controllers usam try/catch + next(erro)
- [x] Erros retornam formato padronizado
- [ ] Erros do Sequelize são tratados no errorHandler

### Validações
- [x] Todas as rotas POST/PUT têm validação
- [x] E-mails são validados
- [x] IDs são parseados corretamente

### Documentação
- [x] Swagger cobre todas as rotas atuais
- [x] README está atualizado
- [x] .env.example tem todas as variáveis

### Git
- [x] Todos os membros têm commits recentes
- [x] Mensagens de commit são descritivas
- [x] .gitignore está correto

---

## Dívidas Técnicas Encontradas

| # | Descrição | Arquivo | Prioridade | Responsável |
|---|----------|--------|-----------|------------|
| 1 | Validação de data do evento não verifica formato real | EventoService.js | Média | Isa |
| 2 | Uso de "throw new Error" em vez de ValidationError | InscricaoModel.js | Alta | Raissa |
| 3 | Falta validação de capacidade máxima do evento | EventoService.js | Média | Maria |
| 4 | Código duplicado em validações de controllers | ParticipanteController.js | Baixa | Isa |
| 5 | Falta tratamento específico para erro de duplicidade de inscrição | InscricaoService.js | Alta | Maria Fernanda |

---

## Observações Gerais

O projeto apresenta boa organização seguindo o padrão MVC + Services.  
O tratamento de erros está bem estruturado com uso de classes customizadas, porém ainda há alguns pontos de inconsistência (principalmente no model de inscrição).  

As validações estão implementadas na maioria das rotas, garantindo maior segurança na API.  

Como melhoria futura, recomenda-se:
- Padronizar totalmente os erros (evitar uso de Error padrão)
- Melhorar validações mais complexas (como datas)
- Reduzir código duplicado

---