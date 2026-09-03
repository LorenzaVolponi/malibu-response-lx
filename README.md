# Malibu Response LX — sales experience

Site de venda da Malibu Response LX com experiência premium, SEO/GEO, dados estruturados e arquitetura de conversão orientada a evidência.

## Arquitetura de venda

A experiência foi desenhada para reduzir fricção entre descoberta e contato:

**Pesquisa / IA → desejo → evidência → contato → teste → proposta.**

### Camadas principais

- Hero comercial com preço e ação imediata.
- Buyer Intent Hub para compra, validação, teste e proposta.
- Evidence Ledger separando fatos publicados de itens que ainda precisam ser validados.
- Galeria, 360°, ficha técnica, condição e conteúdo de comparação.
- CTAs persistentes no mobile e desktop.
- Consultor virtual limitado aos dados publicados, com roteamento para o próximo passo correto.
- Compartilhamento nativo e via WhatsApp.
- Tracking de origem, UTMs, profundidade, tempo engajado, seções e intenção de lead.
- Cluster SEO/GEO com páginas de intenção, JSON-LD, sitemap, RSS, `boat.json`, `llms.txt` e `ai.txt`.

## Conversão

Os links de contato passam por `/api/whatsapp?intent=...`, permitindo mensagens específicas para:

- interesse geral;
- validação de documentação e vídeos;
- visita e teste;
- dúvidas técnicas;
- proposta.

Quando UTMs ou identificadores de mídia estão presentes, a rota preserva a atribuição na mensagem enviada ao vendedor.

## Confiança e claims

O site não deve transformar informação não verificada em afirmação. Documentação, histórico de manutenção, laudos, localização de visita e condição operacional atual devem ser confirmados diretamente com o vendedor e, quando aplicável, por inspeção independente.

## Performance

- Next.js com otimização de imagens AVIF/WebP e cache.
- `lucide-react` com package import optimization.
- assistente carregado de forma dinâmica e adiada até idle/primeira intenção do usuário.
- animações condicionadas a `prefers-reduced-motion` quando aplicável.

## Qualidade

CI executa:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

## Fonte canônica

A URL canônica e os metadados centrais são definidos em `lib/site-config.ts` e não devem ser substituídos por URLs temporárias de preview.
