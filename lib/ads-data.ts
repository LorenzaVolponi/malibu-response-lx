import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

export const googleAdsKeywordGroups = {
  exactModel: [
    '[malibu response lx]',
    '"malibu response lx à venda"',
    '"malibu response lx usada"',
    '"malibu response lx brasil"',
    `"malibu response ${boat.year}"`,
    '"comprar malibu response lx"',
  ],
  technicalIntent: [
    '"lancha direct drive à venda"',
    '"barco de esqui aquático à venda"',
    '"lancha para esqui aquático"',
    '"barco zero off à venda"',
    '"lancha malibu usada"',
  ],
  buyerIntent: [
    '"lancha usada com carreta"',
    '"lancha v8 350 hp"',
    '"barco usado para wakeboard"',
    '"comprar lancha premium usada"',
  ],
} as const

export const googleAdsNegativeKeywords = [
  'grátis',
  'barato',
  'até 50 mil',
  'até 100 mil',
  'aluguel',
  'alugar',
  'consórcio',
  'financiamento',
  'miniatura',
  'brinquedo',
  'controle remoto',
  'lego',
  'planta',
  'projeto',
  'manual',
  'pdf',
  'emprego',
  'curso',
  'motor separado',
  'peças',
  'sucata',
] as const

export const googleAdsCopy = {
  headlines: [
    `${siteConfig.listingName} à Venda`,
    'V8 350 HP | Zero Off GPS',
    'Carreta Galvanizada Inclusa',
    'Fotos e Vídeos Reais',
    'Agende uma Avaliação',
    boat.priceLabel,
  ],
  descriptions: [
    `${siteConfig.listingName} com motor Indmar Monsoon V8 350 HP, Zero Off GPS, bimini e carreta inclusa. Veja fotos reais e fale pelo WhatsApp.`,
    `${boat.engineHours} horas informadas. Embarcação disponível para avaliação. Solicite vídeos, localização, documentação e condições de teste.`,
  ],
} as const

export const paidTrafficUtmDefaults = {
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'malibu_response_lx_sale',
  utm_content: 'whatsapp_lead',
  utm_term: '{keyword}',
} as const

export const googleAdsConversionPlan = [
  { event: 'page_intent_view', meaning: 'Usuário chegou à landing page.' },
  { event: 'pricing_section_view', meaning: 'Usuário visualizou preço/negociação.' },
  { event: 'gallery_section_view', meaning: 'Usuário analisou fotos reais.' },
  { event: 'buyer_guide_view', meaning: 'Usuário visualizou guia do comprador.' },
  { event: 'generate_lead', meaning: 'Clique em WhatsApp direto; usar como conversão primária no Google Ads.' },
] as const
