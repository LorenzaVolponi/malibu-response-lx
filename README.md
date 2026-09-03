# Malibu Response LX

Site de venda da Malibu Response LX 2013. A prioridade técnica é manter o front premium e simples enquanto SEO/GEO, atribuição, observabilidade e precisão de claims funcionam no backend.

## Regra de produto

**Não adicionar blocos visuais para resolver problemas de backend.**

A infraestrutura deve melhorar descoberta, mensuração e conversão sem transformar a home em um relatório técnico.

## Backend de descoberta

Superfícies canônicas e machine-readable:

- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-images.xml`
- `/llms.txt`
- `/ai.txt`
- `/boat.json`
- `/feed.xml`
- `/dossie-tecnico`
- `/api/ai-readiness` — diagnóstico não indexável de crawler, canonical e política de evidência

A URL canônica é definida em `lib/site-config.ts` e não deve ser substituída por URLs de preview.

## Política de evidência

Dados publicados e itens pendentes de validação são tratados separadamente. Documentação, titularidade, histórico de manutenção, condição operacional, inspeção e teste na água não devem ser convertidos em claims verificados sem evidência.

## Lead attribution

Os CTAs existentes passam por `/api/whatsapp?intent=...`.

A rota preserva:

- intenção do lead;
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`;
- `gclid`, `gbraid`, `wbraid`, `msclkid`, quando presentes.

Isso permite entender a origem comercial sem adicionar UI ao site.

## Analytics

A telemetria registra origem, campanha, seções vistas, profundidade de scroll, tempo engajado, uso do consultor e ações de contato. O objetivo é medir o funil sem alterar o layout.

## Assistente

O backend do consultor responde somente a partir dos dados publicados e encaminha a intenção correta para contato. O visual do widget deve permanecer desacoplado da lógica de decisão.

## Health checks

`.github/workflows/ai-discovery-health.yml` verifica a produção de forma diária ou manual:

- canonical;
- robots e acesso de OAI-SearchBot, OAI-AdsBot, ChatGPT-User e GPTBot;
- sitemaps;
- `llms.txt`, `ai.txt`, `boat.json` e RSS;
- contrato de evidência e itens pendentes de validação.

## Qualidade

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```
