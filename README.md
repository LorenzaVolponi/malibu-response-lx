# Malibu Response LX

Landing page em Next.js para venda da lancha **Malibu Response LX 2013**, com foco em SEO, dados reais do anúncio, CTAs para WhatsApp, galeria, ficha técnica, guia de compra e assistente virtual baseado em fatos.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel Analytics e integração opcional com Google Tag Manager

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Checks antes de publicar

```bash
npm run lint
npm run typecheck
npm run build
```

## Variáveis de ambiente

- `NEXT_PUBLIC_SITE_URL`: URL pública canônica do site. Se não for definida, o projeto usa `https://malibu-response-lx.vercel.app`.
- `NEXT_PUBLIC_GTM_ID`: ID opcional do Google Tag Manager.

## Onde editar dados do anúncio

- Dados principais do barco: `lib/boat-data.ts`
- Mensagens e links de WhatsApp: `lib/contact.ts`
- URL, nome público e data de atualização do site: `lib/site-config.ts`
- Termos e estratégia SEO: `lib/seo-data.ts`

## SEO e conteúdo estruturado

A home renderiza JSON-LD de produto, vídeo, FAQ, website, breadcrumb, organização e galeria. A página `/comprar-barco-malibu-response-lx` funciona como guia complementar de intenção transacional.

Evite repetir palavras-chave artificialmente. Prefira descrições naturais com preço, ano, motor, horas, fotos reais e contato direto.

## Analytics e conversão

- `NEXT_PUBLIC_GTM_ID` ativa Google Tag Manager.
- `NEXT_PUBLIC_SITE_URL` mantém canonical, sitemap, robots e JSON-LD alinhados ao domínio final.
- Cliques de WhatsApp são enviados para `window.dataLayer`.
- Eventos de seção e chat também são registrados no `dataLayer` para medir intenção de compra.

## Deploy

O projeto pode ser publicado na Vercel. Antes de abrir merge para produção, rode lint, typecheck e build localmente ou valide pelo workflow de CI.
