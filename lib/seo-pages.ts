import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'
import { whatsappLeadUrl } from '@/lib/contact'

export const seoIntentPages = [
  {
    slug: 'malibu-response-lx-a-venda',
    title: `${siteConfig.listingName} à venda: preço, motor e fotos reais`,
    description: `${siteConfig.listingName} à venda por ${boat.priceLabel}. Veja motor Indmar Monsoon 350 SS V8, ${boat.engineHours} h, Zero Off GPS, bimini, carreta e dados para validar a compra.`,
    h1: `${siteConfig.listingName} à venda com dados reais do anúncio`,
    intro: 'Uma página objetiva para quem busca exatamente o modelo Malibu Response LX e quer confirmar preço, ano, horas, motor, equipamentos e fotos antes de falar com o vendedor.',
    keywords: ['Malibu Response LX à venda', 'Malibu Response LX usada', 'comprar Malibu Response LX', 'Malibu Response LX 2013'],
    sections: [
      { heading: 'O que comparar primeiro', text: 'Preço, ano, horas de motor, motorização, transmissão, equipamentos e itens inclusos devem estar claros antes de qualquer avanço.' },
      { heading: 'Dados deste anúncio', text: `O anúncio informa ${boat.year}, ${boat.engineHours} horas, motor Indmar Monsoon 350 SS V8 350 HP, direct drive, Zero Off GPS, bimini e carreta galvanizada.` },
      { heading: 'Próximo passo seguro', text: 'Use o WhatsApp para solicitar vídeos complementares, documentação disponível, informações de manutenção e condições para avaliação.' },
    ],
  },
  {
    slug: 'lancha-direct-drive-esqui-aquatico',
    title: 'Lancha direct drive para esqui aquático: Malibu Response LX',
    description: `Entenda por que a ${siteConfig.listingName} direct drive com Zero Off GPS atende quem busca uma lancha esportiva para esqui aquático e wakeboard.`,
    h1: 'Lancha direct drive para esqui aquático e wakeboard',
    intro: 'Conteúdo técnico para quem procura uma lancha esportiva usada com eixo direto, controle de velocidade e motor V8.',
    keywords: ['lancha direct drive à venda', 'lancha para esqui aquático', 'barco de wakeboard', 'Zero Off GPS lancha'],
    sections: [
      { heading: 'Direct drive e resposta previsível', text: 'A configuração direct drive é procurada por esportistas por entregar resposta direta, distribuição equilibrada e comportamento previsível.' },
      { heading: 'Zero Off GPS', text: 'O Zero Off utiliza referência de GPS para ajudar a manter velocidade consistente, atributo importante em treinos e prática esportiva.' },
      { heading: 'Conjunto anunciado', text: `A embarcação combina V8 350 HP, ${boat.engineHours} horas informadas, bimini e carreta inclusa para facilitar a comparação técnica.` },
    ],
  },
  {
    slug: 'comprar-lancha-usada-premium',
    title: 'Comprar lancha usada premium: checklist de avaliação',
    description: `Checklist para comprar lancha usada premium com foco em preço, horas, motor, casco, fotos reais e itens inclusos usando a ${siteConfig.listingName} como referência.`,
    h1: 'Comprar lancha usada premium com menos risco e mais dados',
    intro: 'Guia para compradores que ainda estão comparando modelos, mas procuram uma lancha usada premium com ficha técnica clara e contato direto.',
    keywords: ['comprar lancha usada', 'lancha usada premium', 'barco usado premium', 'lancha V8 350 HP usada'],
    sections: [
      { heading: 'Comece por dados objetivos', text: `Preço publicado (${boat.priceLabel}), ano (${boat.year}), horas (${boat.engineHours} h), motor, transmissão e itens inclusos devem estar fáceis de encontrar.` },
      { heading: 'Compare imagem e descrição', text: 'Fotos de casco, painel, estofamento, motor e carreta ajudam a preparar perguntas melhores antes do contato.' },
      { heading: 'Valide antes de avançar', text: 'Peça documentação disponível, histórico de manutenção, vídeos atuais e condições para inspeção e teste.' },
    ],
  },
  {
    slug: 'indmar-monsoon-350-ss-v8',
    title: 'Indmar Monsoon 350 SS V8: motor da Malibu Response LX',
    description: 'Conheça os principais pontos do motor Indmar Monsoon 350 SS V8 de 350 HP presente na Malibu Response LX anunciada.',
    h1: 'Indmar Monsoon 350 SS V8 na Malibu Response LX',
    intro: 'Uma visão prática do conjunto mecânico para quem pesquisa motor, potência, aplicação e perguntas essenciais antes da compra.',
    keywords: ['Indmar Monsoon 350 SS', 'motor Malibu Response LX', 'lancha V8 350 HP', 'motor Indmar Malibu'],
    sections: [
      { heading: 'Potência e aplicação', text: 'O Monsoon 350 SS é um V8 de 350 HP aplicado a embarcações esportivas, com foco em força, resposta e uso recreativo de alto desempenho.' },
      { heading: 'O que perguntar', text: 'Horas, revisões, fluidos, sistema de arrefecimento, partida a frio, ruídos, vazamentos e registros de manutenção são pontos centrais.' },
      { heading: 'Dados deste anúncio', text: `A embarcação anuncia ${boat.engineHours} horas de motor e transmissão direct drive. Informações complementares podem ser solicitadas pelo WhatsApp.` },
    ],
  },
  {
    slug: 'zero-off-gps-como-funciona',
    title: 'Zero Off GPS: como funciona em uma lancha esportiva',
    description: 'Entenda o que é o Zero Off GPS, por que ele importa no esqui aquático e como avaliar esse recurso em uma lancha usada.',
    h1: 'Zero Off GPS em lanchas de esqui aquático',
    intro: 'Explicação objetiva para compradores que encontraram o termo Zero Off e querem entender seu valor em uma embarcação esportiva.',
    keywords: ['Zero Off GPS', 'controle de velocidade lancha', 'Zero Off esqui aquático', 'lancha com Zero Off'],
    sections: [
      { heading: 'Consistência de velocidade', text: 'O sistema usa GPS para auxiliar o controle de velocidade, reduzindo variações durante a condução esportiva.' },
      { heading: 'Por que isso importa', text: 'Para o esqui aquático, consistência melhora repetibilidade, conforto e qualidade do treino.' },
      { heading: 'Como validar', text: 'Solicite vídeo de funcionamento, teste dos comandos, leitura do painel e confirmação de que o sistema está operacional.' },
    ],
  },
  {
    slug: 'direct-drive-vs-v-drive',
    title: 'Direct drive vs V-drive: diferenças para esqui e wakeboard',
    description: 'Compare direct drive e V-drive em lanchas esportivas e entenda qual configuração tende a atender melhor esqui aquático ou wakeboard.',
    h1: 'Direct drive vs V-drive em lanchas esportivas',
    intro: 'Comparativo simples para quem está escolhendo uma embarcação esportiva e precisa entender como a transmissão influencia uso, espaço e comportamento.',
    keywords: ['direct drive vs V-drive', 'lancha direct drive', 'lancha V-drive', 'barco esqui aquático wakeboard'],
    sections: [
      { heading: 'Direct drive', text: 'O motor fica mais centralizado e a transmissão segue em linha, configuração tradicionalmente associada ao esqui aquático e a uma esteira mais limpa.' },
      { heading: 'V-drive', text: 'O conjunto mecânico fica mais à popa, liberando espaço interno e favorecendo distribuição de peso usada em muitas aplicações de wakeboard.' },
      { heading: 'Qual faz sentido', text: 'A escolha depende do esporte prioritário, perfil de uso, número de ocupantes, armazenamento e comportamento desejado na água.' },
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
