# Pesquisa de Mercado — Serviços de Notificação

## Serviços de E-mail Transacional
| Serviço | Plano Gratuito | Preço Inicial | Diferenciais |
| ---------- | ------------------------ | ------------- | ---------------------- |
| SendGrid | 100 emails/dia | US$ 15/mês | API robusta, templates |
| Mailgun | 5.000/mês (3 meses) | US$ 35/mês | Foco em devs |
| Amazon SES | 62.000/mês (se usar EC2) | US$ 0.10/1000 | Escala, preço |
| Mailtrap | 500/mês (teste) | US$ 15/mês | Sandbox para testes |

---

## Como o nosso projeto se compara?

O nosso projeto de API de Notificações apresenta similaridade com esses serviços no conceito de envio de e-mails automatizados a partir de eventos do sistema, como confirmações de inscrição.

No entanto, existem diferenças importantes:

- Nosso projeto é mais simples e voltado para aprendizado, enquanto os serviços do mercado são altamente escaláveis e preparados para grandes volumes de envio
- Não possuímos ainda recursos como filas de envio, controle de entrega, métricas ou templates avançados
- Utilizamos ferramentas como Nodemailer, que dependem de configurações manuais, enquanto os serviços analisados oferecem APIs prontas e otimizadas
- Não há gerenciamento de falhas, reenvio automático ou relatórios detalhados de envio

Mesmo assim, o projeto já segue conceitos reais utilizados no mercado, como envio automatizado, integração com eventos do sistema e separação de responsabilidades no back-end.

---

## O que poderíamos adotar no futuro?

Caso o projeto evolua, algumas melhorias inspiradas nesses serviços poderiam ser implementadas:

- Uso de filas de processamento (ex: envio assíncrono de e-mails)
- Templates de e-mail dinâmicos e reutilizáveis
- Integração com serviços externos como SendGrid ou Amazon SES
- Monitoramento de envio (taxa de sucesso, falhas, logs)
- Sistema de retry automático em caso de erro no envio
- Dashboard administrativo para visualizar notificações enviadas
- Personalização de mensagens para diferentes tipos de eventos

Essas melhorias tornariam o sistema mais robusto, escalável e próximo de soluções utilizadas no mercado profissional.