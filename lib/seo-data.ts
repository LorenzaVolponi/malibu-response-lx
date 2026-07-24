import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

export const seoKeywordClusters = [
  {
    title: 'Comprar barco Malibu',
    terms: ['comprar barco Malibu', 'comprar lancha Malibu', 'Malibu Response LX à venda', 'Malibu Response LX 2013'],
    intent: 'Busca transacional de quem já está comparando uma Malibu usada e quer falar com o vendedor.',
  },
  {
    title: 'Lancha esportiva usada',
    terms: ['lancha usada à venda', 'barco usado premium', 'lancha de esqui aquático', 'barco de wakeboard'],
    intent: 'Busca de comprador que quer fotos reais, ficha técnica, preço e dados de confiança em uma única página.',
  },
  {
    title: 'Performance direct drive',
    terms: ['lancha direct drive', 'Indmar Monsoon 350 SS', 'lancha V8 350 HP', 'Zero Off GPS'],
    intent: 'Busca técnica de quem entende esportes náuticos e procura controle de velocidade, eixo direto e motor V8.',
  },
] as const

export const offPagePlaybook = [
  'Publicar a URL canônica em marketplaces náuticos, marinas, clubes, grupos de esqui/wake e comunidades regionais com a mesma descrição factual do anúncio.',
  'Usar vídeos curtos reais do motor, painel, casco, estofamento, carreta e saída na água em YouTube Shorts, Reels e grupos de compradores, sempre apontando para a página canônica.',
  'Criar posts com linguagem natural como “Malibu Response LX 2013 à venda” e “lancha direct drive com Zero Off GPS”, sem listas artificiais de palavras-chave.',
  'Padronizar nome do anúncio, preço, ano, horas e link em todas as fontes externas para reduzir inconsistência de NAP/dados comerciais.',
  'Usar UTMs diferentes por origem externa para separar tráfego orgânico social, marketplace, grupos de WhatsApp e mídia paga nos relatórios.',
  'Priorizar links e citações em sites/contextos náuticos reais; evitar compra de links, diretórios irrelevantes ou automações de spam.',
] as const

export const offPageChannels = [
  { channel: 'Marketplaces náuticos', utm_source: 'marketplace', utm_medium: 'referral', action: 'Cadastrar com fotos reais, preço e link canônico.' },
  { channel: 'YouTube Shorts', utm_source: 'youtube', utm_medium: 'organic_video', action: 'Publicar ronco do motor, painel e volta na água com link na descrição.' },
  { channel: 'Instagram/Reels', utm_source: 'instagram', utm_medium: 'organic_social', action: 'Criar cortes verticais com CTA para guia e WhatsApp.' },
  { channel: 'Grupos de wake/esqui', utm_source: 'whatsapp_groups', utm_medium: 'community', action: 'Compartilhar o guia com contexto e dados confirmados.' },
  { channel: 'Marinas e clubes', utm_source: 'marina', utm_medium: 'partner_referral', action: 'Pedir indicação com texto curto e URL com UTM.' },
] as const

export const trustSignals = [
  `Preço publicado: ${boat.priceLabel}`,
  `Ano de fabricação: ${boat.year}`,
  `Horas de motor informadas: ${boat.engineHours} h`,
  'Motor Indmar Monsoon 350 SS V8 350 HP',
  'Zero Off GPS, bimini e carreta galvanizada inclusos',
] as const


export const mobileSeoChecklist = [
  'CTA fixo aparece só após rolagem para não disputar atenção com o hero.',
  'Menu mobile usa área segura do iOS, overlay de fechamento e rolagem interna.',
  'Botões principais têm área de toque confortável e texto curto para conversão.',
  'Imagens críticas usam sizes/priority para melhorar percepção de carregamento.',
] as const

export const trendResearchTopics = [
  { topic: 'barco à venda', angle: 'capturar busca ampla e educar o comprador com ficha, preço e fotos reais' },
  { topic: 'lancha usada', angle: 'comparar custo-benefício, horas de motor, estado e itens inclusos' },
  { topic: 'wakeboard e esqui aquático', angle: 'conectar o modelo direct drive e Zero Off GPS à intenção esportiva' },
  { topic: 'Malibu Response LX', angle: 'dominar a busca exata de modelo com conteúdo canônico e dados estruturados' },
] as const

export const backendSearchTerms = [
  'malibu response lx',
  'malibu response lx à venda',
  'malibu response lx usada',
  'malibu response lx brasil',
  'malibu response 2013',
  'comprar malibu response lx',
  'lancha direct drive à venda',
  'barco de esqui aquático à venda',
  'lancha para esqui aquático',
  'barco zero off à venda',
  'lancha malibu usada',
  'Indmar Monsoon 350 SS',
  'motor V8 350 HP lancha',
  'Zero Off GPS lancha',
  'lancha com carreta galvanizada',
  'lancha com bimini',
  `${siteConfig.listingName} ${boat.priceLabel}`,
] as const
