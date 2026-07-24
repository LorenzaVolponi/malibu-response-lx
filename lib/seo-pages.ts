import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'
import { whatsappLeadUrl } from '@/lib/contact'

type SeoSupportPage = {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  keywords: string[]
  sections: Array<{ heading: string; text: string }>
  faqs: Array<{ question: string; answer: string }>
  priority: number
}

const sharedFaqs = [
  { question: 'Como falar com o vendedor?', answer: 'Use o botão de WhatsApp da página para solicitar vídeos, documentação disponível, localização de visita e condições de teste.' },
  { question: 'O telefone aparece publicamente no site?', answer: 'Não. Os botões usam uma rota interna de lead para preservar atribuição e abrir o WhatsApp sem expor o número na página.' },
]

export const seoIntentPages: SeoSupportPage[] = [
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
    faqs: [
      { question: 'Qual o preço da Malibu Response LX anunciada?', answer: `O preço publicado é ${boat.priceLabel}, com negociação e condições finais diretamente pelo WhatsApp do vendedor.` },
      { question: 'Quantas horas de motor foram informadas?', answer: `O anúncio informa ${boat.engineHours} horas de motor.` },
      ...sharedFaqs,
    ],
    priority: 0.88,
  },
  {
    slug: 'malibu-response-lx-preco',
    title: `Preço da ${siteConfig.listingName}: valor anunciado e itens inclusos`,
    description: `Veja o preço ${boat.priceLabel} da ${siteConfig.listingName}, itens inclusos, horas de motor e o que confirmar antes de negociar pelo WhatsApp.`,
    h1: `Preço da ${siteConfig.listingName} e pontos de negociação`,
    intro: 'Página focada em quem pesquisa preço, valor de mercado e itens inclusos antes de fazer uma proposta.',
    keywords: ['Malibu Response LX preço', 'preço Malibu Response LX 2013', 'valor lancha Malibu usada', 'lancha usada preço'],
    sections: [
      { heading: 'Valor publicado', text: `O valor anunciado é ${boat.priceLabel}. A proposta final, forma de pagamento e condições devem ser combinadas diretamente com o vendedor.` },
      { heading: 'O que entra na avaliação do preço', text: `Ano ${boat.year}, ${boat.engineHours} h, motor V8 350 HP, Zero Off GPS, bimini, carreta galvanizada e estado geral são fatores que influenciam a decisão.` },
      { heading: 'Como negociar com segurança', text: 'Peça vídeos atuais, documentação disponível, histórico conhecido e confirme local/condição de visita antes de deslocar.' },
    ],
    faqs: [
      { question: 'O preço é negociável?', answer: 'Propostas podem ser tratadas diretamente pelo WhatsApp do vendedor.' },
      { question: 'A carreta está inclusa no valor?', answer: 'O anúncio informa carreta rodoviária galvanizada inclusa.' },
      ...sharedFaqs,
    ],
    priority: 0.86,
  },
  {
    slug: 'malibu-response-lx-ficha-tecnica',
    title: `Ficha técnica da ${siteConfig.listingName}: motor V8, Zero Off e direct drive`,
    description: `Ficha técnica da ${siteConfig.listingName}: motor Indmar Monsoon 350 SS, 350 HP, direct drive, Zero Off GPS, ${boat.engineHours} h e itens inclusos.`,
    h1: `Ficha técnica da ${siteConfig.listingName}`,
    intro: 'Conteúdo técnico para quem compara motor, transmissão, controle de velocidade e configuração esportiva.',
    keywords: ['Malibu Response LX ficha técnica', 'Indmar Monsoon 350 SS', 'motor V8 350 HP lancha', 'Zero Off GPS Malibu'],
    sections: [
      { heading: 'Motor e potência', text: 'O anúncio destaca motor Indmar Monsoon 350 SS V8 5.7L de 350 HP, conjunto desejado para uso esportivo.' },
      { heading: 'Transmissão e uso', text: 'A configuração direct drive/eixo direto é associada a previsibilidade e resposta para esqui aquático.' },
      { heading: 'Controle de velocidade', text: 'O Zero Off GPS é um diferencial técnico para manter ritmo constante em prática esportiva.' },
    ],
    faqs: [
      { question: 'Qual é o motor informado?', answer: 'Motor Indmar Monsoon 350 SS V8 5.7L de 350 HP.' },
      { question: 'Tem Zero Off GPS?', answer: 'Sim, o anúncio informa controle Zero Off GPS integrado ao painel.' },
      ...sharedFaqs,
    ],
    priority: 0.84,
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
    faqs: [
      { question: 'Direct drive é bom para esqui aquático?', answer: 'É uma configuração tradicionalmente procurada por quem busca resposta previsível e controle em esportes náuticos.' },
      { question: 'Zero Off GPS ajuda no esporte?', answer: 'Sim. O controle de velocidade por GPS ajuda a manter ritmo consistente.' },
      ...sharedFaqs,
    ],
    priority: 0.84,
  },
  {
    slug: 'lancha-v8-350hp',
    title: 'Lancha V8 350 HP usada: Malibu Response LX com motor Indmar',
    description: `Busca por lancha V8 350 HP? Veja a ${siteConfig.listingName} com motor Indmar Monsoon 350 SS, direct drive e ${boat.engineHours} h informadas.`,
    h1: 'Lancha V8 350 HP usada com foco em performance',
    intro: 'Página criada para quem pesquisa potência, motor V8 e conjunto mecânico antes de avaliar uma lancha usada premium.',
    keywords: ['lancha V8 350 HP', 'lancha motor V8 usada', 'Indmar Monsoon 350', 'lancha premium usada'],
    sections: [
      { heading: 'Potência informada', text: 'O conjunto anunciado informa motor V8 350 HP, uma especificação relevante para compradores de embarcações esportivas.' },
      { heading: 'Horas e validação', text: `As ${boat.engineHours} horas informadas ajudam na triagem inicial, mas histórico e manutenção devem ser confirmados com o vendedor.` },
      { heading: 'Fotos e vídeo antes da visita', text: 'Solicitar vídeo do funcionamento, painel e motor ajuda a qualificar o lead antes do deslocamento.' },
    ],
    faqs: [
      { question: 'Qual potência do motor?', answer: 'O anúncio informa 350 HP.' },
      { question: 'Qual marca/modelo do motor?', answer: 'Indmar Monsoon 350 SS V8.' },
      ...sharedFaqs,
    ],
    priority: 0.82,
  },
  {
    slug: 'zero-off-gps-lancha',
    title: 'Zero Off GPS em lancha: controle de velocidade na Malibu Response LX',
    description: `Entenda o diferencial do Zero Off GPS na ${siteConfig.listingName}, uma lancha direct drive com motor V8 para esportes náuticos.`,
    h1: 'Zero Off GPS em lancha esportiva usada',
    intro: 'Página para capturar buscas de compradores que já conhecem controle de velocidade e querem validar esse diferencial no anúncio.',
    keywords: ['Zero Off GPS lancha', 'barco Zero Off à venda', 'controle de velocidade lancha', 'Malibu Zero Off'],
    sections: [
      { heading: 'O que o comprador procura', text: 'Quem pesquisa Zero Off geralmente quer consistência de velocidade para esqui aquático, wakeboard e uso esportivo.' },
      { heading: 'Como aparece no anúncio', text: 'A Malibu Response LX anunciada informa Zero Off GPS integrado ao painel.' },
      { heading: 'O que confirmar', text: 'Antes de comprar, confirme funcionamento, configuração e teste do sistema diretamente com o vendedor.' },
    ],
    faqs: [
      { question: 'A lancha tem Zero Off?', answer: 'Sim, o anúncio informa Zero Off GPS.' },
      { question: 'Preciso testar o Zero Off?', answer: 'Sim. Funcionamento e calibração devem ser confirmados na visita/teste.' },
      ...sharedFaqs,
    ],
    priority: 0.8,
  },
  {
    slug: 'lancha-com-carreta-galvanizada',
    title: 'Lancha com carreta galvanizada inclusa: Malibu Response LX',
    description: `A ${siteConfig.listingName} acompanha carreta rodoviária galvanizada. Veja por que isso importa ao comprar uma lancha usada premium.`,
    h1: 'Lancha usada com carreta galvanizada inclusa',
    intro: 'Conteúdo para quem filtra anúncios por facilidade de transporte, rampa, logística e itens inclusos.',
    keywords: ['lancha com carreta galvanizada', 'lancha usada com carreta', 'barco com carreta rodoviária', 'comprar lancha com carreta'],
    sections: [
      { heading: 'Transporte facilita a compra', text: 'Carreta inclusa reduz atrito logístico e pode acelerar visita, retirada e uso em diferentes represas/marinas.' },
      { heading: 'O que conferir na carreta', text: 'Valide estado estrutural, pneus, documentação aplicável, iluminação, engate e compatibilidade com o uso pretendido.' },
      { heading: 'No anúncio atual', text: 'A embarcação informa carreta rodoviária galvanizada inclusa, além de bimini e conjunto esportivo.' },
    ],
    faqs: [
      { question: 'A lancha acompanha carreta?', answer: 'Sim, o anúncio informa carreta rodoviária galvanizada inclusa.' },
      { question: 'Preciso conferir a carreta?', answer: 'Sim. Estado, documentação aplicável e condições de rodagem devem ser confirmados.' },
      ...sharedFaqs,
    ],
    priority: 0.78,
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
    faqs: [
      { question: 'O que verificar antes de comprar lancha usada?', answer: 'Preço, ano, horas, motor, documentação disponível, estado de casco/estofamento/painel, carreta e possibilidade de teste.' },
      { question: 'Fotos reais ajudam na decisão?', answer: 'Sim. Elas reduzem dúvidas iniciais e ajudam o comprador a preparar perguntas objetivas.' },
      ...sharedFaqs,
    ],
    priority: 0.82,
  },
  {
    slug: 'barco-de-wakeboard-usado',
    title: 'Barco de wakeboard usado: Malibu Response LX para esportes náuticos',
    description: `Veja pontos para avaliar um barco de wakeboard usado usando a ${siteConfig.listingName} como referência: motor V8, Zero Off, fotos e itens inclusos.`,
    h1: 'Barco de wakeboard usado com motor V8 e dados reais',
    intro: 'Página para compradores que pesquisam uso esportivo, wakeboard, esqui e querem comparar especificações antes do contato.',
    keywords: ['barco de wakeboard usado', 'barco para wakeboard', 'lancha wakeboard usada', 'Malibu wakeboard usada'],
    sections: [
      { heading: 'Intenção esportiva', text: 'Quem busca wakeboard usado geralmente avalia potência, controle de velocidade, casco, estado interno e facilidade de teste.' },
      { heading: 'Configuração anunciada', text: 'A Malibu Response LX combina motor V8 350 HP, direct drive, Zero Off GPS, bimini e carreta inclusa.' },
      { heading: 'Perguntas para o vendedor', text: 'Peça vídeos em funcionamento, fotos detalhadas e confirmação de documentação antes de agendar visita.' },
    ],
    faqs: [
      { question: 'Serve para wakeboard?', answer: 'O anúncio posiciona a embarcação para esportes náuticos; condições específicas de uso devem ser confirmadas em visita/teste.' },
      { question: 'O que pedir antes de visitar?', answer: 'Vídeo atual, documentação disponível, local de visita e detalhes de manutenção conhecidos.' },
      ...sharedFaqs,
    ],
    priority: 0.8,
  },
] as const

export const adsLandingPages = [
  {
    slug: 'malibu-response-lx',
    title: `${siteConfig.listingName} à venda | Fotos reais e WhatsApp direto`,
    description: `${siteConfig.listingName} por ${boat.priceLabel}. Motor V8 350 HP, ${boat.engineHours} h, Zero Off GPS, bimini e carreta inclusa.`,
    h1: `${siteConfig.listingName} pronta para avaliação`,
    bullets: ['Preço publicado e dados objetivos', 'Fotos reais e ficha técnica', 'WhatsApp com vídeos e documentação', 'CTA rápido para campanha Google Ads'],
  },
  {
    slug: 'lancha-v8-zero-off',
    title: 'Lancha V8 com Zero Off GPS | Malibu Response LX',
    description: `Landing rápida para quem procura lancha V8 350 HP com Zero Off GPS, direct drive e carreta inclusa. ${siteConfig.listingName}.`,
    h1: 'Lancha V8 350 HP com Zero Off GPS',
    bullets: ['Motor Indmar Monsoon 350 SS', 'Direct drive para esporte náutico', 'Carreta galvanizada inclusa', 'Fale com vendedor sem fricção'],
  },
] as const

export type SeoIntentPage = (typeof seoIntentPages)[number]
export type AdsLandingPage = (typeof adsLandingPages)[number]

export function getSeoIntentPage(slug: string) {
  return seoIntentPages.find((page) => page.slug === slug)
}

export function getAdsLandingPage(slug: string) {
  return adsLandingPages.find((page) => page.slug === slug)
}

export function seoIntentPageUrl(slug: string) {
  return `${siteConfig.url}/guias/${slug}`
}

export function adsLandingPageUrl(slug: string) {
  return `${siteConfig.url}/ads/${slug}`
}

export const seoLeadHref = whatsappLeadUrl('primary')
