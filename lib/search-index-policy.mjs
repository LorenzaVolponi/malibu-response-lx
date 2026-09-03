export const INDEXABLE_GUIDE_SLUGS = Object.freeze([
  'lancha-direct-drive-esqui-aquatico',
  'indmar-monsoon-350-ss-v8',
  'zero-off-gps-como-funciona',
  'malibu-response-lx-2013-ficha-tecnica',
  'quantas-horas-motor-lancha-usada',
  'checklist-documentacao-lancha-usada',
  'malibu-response-lx-preco',
  'malibu-response-lx-vale-a-pena',
  'checklist-inspecao-pre-compra-lancha',
])

export const SUPPORT_ONLY_GUIDE_SLUGS = Object.freeze([
  'malibu-response-lx-a-venda',
  'comprar-lancha-usada-premium',
  'direct-drive-vs-v-drive',
  'malibu-response-lx-vs-nautique-ski-200',
  'malibu-response-lx-vs-mastercraft-prostar',
  'quanto-custa-manter-malibu-response-lx',
  'perguntas-frequentes-malibu-response-lx',
  'impeller-lancha-o-que-e-quando-trocar',
  'gelcoat-casco-lancha-como-avaliar',
  'partida-a-frio-lancha-usada',
  'zero-off-vs-perfectpass',
  'consumo-motor-v8-lancha-esportiva',
  'helice-lancha-esportiva-como-avaliar',
  'arrefecimento-motor-maritimio-checklist',
  'bimini-lancha-cuidados-e-avaliacao',
  'lancha-esqui-aquatico-vs-wakeboard',
  'vida-util-motor-lancha-usada',
  'custos-pos-compra-lancha-usada',
])

export const ALL_CLASSIFIED_GUIDE_SLUGS = Object.freeze([
  ...INDEXABLE_GUIDE_SLUGS,
  ...SUPPORT_ONLY_GUIDE_SLUGS,
])

export function isIndexableGuideSlug(slug) {
  return INDEXABLE_GUIDE_SLUGS.includes(slug)
}

export function isSupportOnlyGuideSlug(slug) {
  return SUPPORT_ONLY_GUIDE_SLUGS.includes(slug)
}
