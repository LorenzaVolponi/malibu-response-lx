import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'
import { whatsappLeadUrl } from '@/lib/contact'

export const seoIntentPages = [
  {
    slug: 'malibu-response-lx-a-venda',
    title: `${siteConfig.listingName} à venda: preço, motor e fotos reais`,
    description: `${siteConfig.listingName} à venda por ${boat.priceLabel}. Veja motor Indmar Monsoon 350 SS V8, ${boat.engineHours} h, Zero Off GPS, bimini, carreta e como validar a compra.`,
    h1: `${siteConfig.listingName} à venda com dados reais do anúncio`,
    intro: 'Página de apoio para quem busca exatamente o modelo Malibu Response LX e precisa confirmar se o anúncio tem dados suficientes antes de falar com o vendedor.',
    keywords: ['Malibu Response LX à venda', 'Malibu Response LX usada', 'comprar Malibu Response LX', 'Malibu Response LX 2013'],
    sections: [
      { heading: 'Por que esta página existe?', text: 'Compradores que pesquisam pelo modelo exato normalmente querem preço, ano, horas, motor, fotos reais e contato confiável em poucos segundos.' },
      { heading: 'Dados principais para comparar', text: `O anúncio informa ${boat.year}, ${boat.engineHours} horas de motor, motor Indmar Monsoon 350 SS V8 350 HP, direct drive, Zero Off GPS, bimini e carreta galvanizada.` },
      { heading: 'Próximo passo seguro', text: 'Use o WhatsApp da página para pedir documentação disponível, vídeos complementares, local de visita e condição de teste na água.' },
    ],
  },
  {
    slug: 'lancha-direct-drive-esqui-aquatico',
    title: 'Lancha direct drive para esqui aquático: Malibu Response LX',
    description: `Entenda por que a ${siteConfig.listingName} direct drive com Zero Off GPS atende buscas por lancha para esqui aquático e wakeboard.`,
    h1: 'Lancha direct drive para esqui aquático e wakeboard',
    intro: 'Conteúdo para capturar a intenção técnica de quem procura uma lancha esportiva usada com eixo direto, controle de velocidade e motor V8.',
    keywords: ['lancha direct drive à venda', 'lancha para esqui aquático', 'barco de wakeboard', 'Zero Off GPS lancha'],
    sections: [
      { heading: 'Direct drive e previsibilidade', text: 'A configuração direct drive é procurada por esportistas porque entrega resposta direta e comportamento previsível para esqui aquático.' },
      { heading: 'Zero Off GPS', text: 'O controle Zero Off GPS ajuda a manter velocidade consistente, um atributo relevante para quem compara barcos de esporte náutico.' },
      { heading: 'Ficha que reduz dúvidas', text: `O conjunto anunciado combina V8 350 HP, ${boat.engineHours} horas informadas, bimini e carreta inclusa para facilitar análise antes da visita.` },
    ],
  },
  {
    slug: 'comprar-lancha-usada-premium',
    title: 'Comprar lancha usada premium: checklist com preço e motor',
    description: `Checklist para comprar lancha usada premium com foco em preço, horas, motor, fotos reais e itens inclusos usando a ${siteConfig.listingName} como referência.`,
    h1: 'Comprar lancha usada premium com menos risco e mais dados',
    intro: 'Página educativa para compradores que ainda não decidiram o modelo, mas pesquisam por uma lancha usada premium com ficha técnica clara.',
    keywords: ['comprar lancha usada', 'lancha usada premium', 'barco usado premium', 'lancha V8 350 HP usada'],
    sections: [
      { heading: 'Comece por dados objetivos', text: `Preço publicado (${boat.priceLabel}), ano (${boat.year}), horas (${boat.engineHours} h), motor e itens inclusos devem estar fáceis de encontrar.` },
      { heading: 'Compare imagem com descrição', text: 'Fotos de casco, painel, estofamento, motor e carreta reduzem atrito e ajudam o comprador a preparar perguntas melhores.' },
      { heading: 'Valide antes de deslocar', text: 'Antes de visitar, peça confirmação de documentação, histórico disponível, vídeo atual e possibilidade de teste na água.' },
    ],
  },
] as const

export type SeoIntentPage = (typeof seoIntentPages)[number]

export function getSeoIntentPage(slug: string) {
  return seoIntentPages.find((page) => page.slug === slug)
}

export function seoIntentPageUrl(slug: string) {
  return `${siteConfig.url}/guias/${slug}`
}

export const seoLeadHref = whatsappLeadUrl('primary')
