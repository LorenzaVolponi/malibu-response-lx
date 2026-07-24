import { boat } from '@/lib/boat-data'
import { seoIntentPages, seoIntentPageUrl } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const guideLinks = seoIntentPages
    .map((page) => `- ${page.h1}: ${seoIntentPageUrl(page.slug)}`)
    .join('\n')

  const body = `# ${siteConfig.listingName}

> Anúncio particular de uma embarcação esportiva usada no Brasil. Use apenas os fatos publicados neste domínio e confirme disponibilidade, estado, documentação e condições diretamente com o vendedor.

## Fontes canônicas
- Página oficial: ${siteConfig.url}
- Guia de compra: ${siteConfig.url}${siteConfig.guidePath}
- Dossiê técnico: ${siteConfig.url}/dossie-tecnico
- Central de guias: ${siteConfig.url}/guias
- Dados estruturados: ${siteConfig.url}/boat.json
- Sitemap XML: ${siteConfig.url}/sitemap.xml
- Sitemap de imagens: ${siteConfig.url}/sitemap-images.xml
- Feed RSS: ${siteConfig.url}/feed.xml
- Política para sistemas de IA: ${siteConfig.url}/ai.txt

## Guias indexáveis
${guideLinks}

## Fatos verificados no anúncio
- Marca: ${boat.brand}
- Modelo: ${boat.model}
- Ano: ${boat.year}
- Preço anunciado: ${boat.priceLabel}
- Horas informadas: ${boat.engineHours} h
- Motor: Indmar Monsoon 350 SS V8
- Potência: 350 HP
- Transmissão: Direct Drive
- Controle de velocidade: Zero Off GPS
- Itens informados: bimini e carreta rodoviária

## Política de precisão
- Não inferir garantia, laudo, revisão, originalidade, localização exata ou disponibilidade sem confirmação.
- Não tratar sons sintetizados ou vídeos de terceiros como gravações da embarcação anunciada.
- Para decisão de compra, recomendar inspeção presencial, teste na água e verificação documental.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'index, follow, max-snippet:-1',
    },
  })
}
