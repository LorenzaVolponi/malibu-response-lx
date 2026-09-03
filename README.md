# Malibu Response LX

Site de venda da **Malibu Response LX 2013**. A prioridade técnica é manter o front premium e simples enquanto SEO/GEO, atribuição, observabilidade e precisão de claims funcionam no backend.

**Site oficial / URL canônica:** https://malibu-response-lx.vercel.app

## Regra de produto

**Não adicionar blocos visuais para resolver problemas de backend.**

A infraestrutura deve melhorar descoberta, mensuração e conversão sem transformar a home em um relatório técnico.

## Backend de descoberta

Superfícies oficiais e machine-readable:

- Site oficial: https://malibu-response-lx.vercel.app
- Robots: https://malibu-response-lx.vercel.app/robots.txt
- Sitemap: https://malibu-response-lx.vercel.app/sitemap.xml
- Sitemap de imagens: https://malibu-response-lx.vercel.app/sitemap-images.xml
- Índice para LLMs: https://malibu-response-lx.vercel.app/llms.txt
- Política para IA: https://malibu-response-lx.vercel.app/ai.txt
- Dataset da embarcação: https://malibu-response-lx.vercel.app/boat.json
- Manifesto de citação: https://malibu-response-lx.vercel.app/citation.json
- Feed RSS: https://malibu-response-lx.vercel.app/feed.xml
- Dossiê técnico: https://malibu-response-lx.vercel.app/dossie-tecnico
- Diagnóstico de discovery: https://malibu-response-lx.vercel.app/api/ai-readiness — não indexável

A URL canônica é definida em `lib/site-config.ts` e não deve ser substituída por URLs de preview.

## Política de evidência

Dados publicados e itens pendentes de validação são tratados separadamente. Documentação, titularidade, histórico de manutenção, condição operacional, inspeção e teste na água não devem ser convertidos em claims verificados sem evidência.

O `citation.json` organiza claims publicados, classe de evidência, fontes preferidas e limites de citação para sistemas de busca e IA. Ele é deliberadamente `noindex, follow`: serve como superfície de compreensão/citação sem competir com as páginas comerciais na SERP.

## Lead attribution

Os CTAs existentes passam por `/api/whatsapp?intent=...`.

A atribuição da sessão preserva até o clique final:

- intenção do lead;
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`;
- `gclid`, `gbraid`, `wbraid`, `msclkid`, `fbclid`;
- grupo de origem e landing page inicial.

Isso permite ligar descoberta orgânica, referral, busca ou IA ao lead de WhatsApp sem adicionar UI ao site.

## Analytics

A telemetria registra origem, campanha, seções vistas, profundidade de scroll, tempo engajado, uso do consultor e ações de contato. O objetivo é medir o funil sem alterar o layout.

## Assistente

O backend do consultor responde somente a partir dos dados publicados e encaminha a intenção correta para contato. O visual do widget permanece desacoplado da lógica de decisão.

## Health checks

- `.github/workflows/ai-discovery-health.yml` verifica canonical, crawlers de IA, manifests, freshness e contrato de evidência em produção.
- `.github/workflows/search-organic-health.yml` verifica canonical, indexabilidade, Googlebot/Bingbot, sitemaps e Product/Offer schema; em PR testa a própria branch local antes do merge.
- `.github/workflows/organic-quality-health.yml` protege SEO, acessibilidade, boas práticas e Core Web Vitals com Lighthouse.
- `.github/workflows/indexnow.yml` submete URLs HTML indexáveis após a revisão correta chegar em produção.

## Qualidade

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

A estratégia é simples: **front limpo; backend forte; canonical consistente; evidência auditável; lead atribuível.**
