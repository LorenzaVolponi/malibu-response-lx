import { siteConfig } from '@/lib/site-config'

type KnowledgeEntity = {
  id: string
  type: string
  name: string
  description: string
  aliases: readonly string[]
  node?: Record<string, unknown>
}

export const knowledgeEntities = {
  malibuBoats: {
    id: `${siteConfig.url}/#malibu-boats`,
    type: 'Brand',
    name: 'Malibu Boats',
    description: 'Fabricante de embarcações esportivas, incluindo a linha Response LX.',
    aliases: ['malibu boats', 'malibu'],
  },
  responseLx: {
    id: `${siteConfig.url}/#response-lx`,
    type: 'ProductModel',
    name: 'Malibu Response LX',
    description: 'Modelo de lancha esportiva direct drive voltado a esportes rebocados, com forte associação ao esqui aquático.',
    aliases: ['malibu response lx', 'response lx'],
    node: {
      brand: { '@id': `${siteConfig.url}/#malibu-boats` },
      isRelatedTo: [
        { '@id': `${siteConfig.url}/#direct-drive` },
        { '@id': `${siteConfig.url}/#slalom` },
      ],
    },
  },
  indmar: {
    id: `${siteConfig.url}/#indmar`,
    type: 'Brand',
    name: 'Indmar',
    description: 'Fabricante de motores marítimos inboard para lanchas esportivas.',
    aliases: ['indmar'],
  },
  monsoon350: {
    id: `${siteConfig.url}/#indmar-monsoon-350-ss`,
    type: 'Product',
    name: 'Indmar Monsoon 350 SS',
    description: 'Motor V8 5.7L de 350 HP informado para a unidade anunciada da Malibu Response LX.',
    aliases: ['indmar monsoon 350 ss', 'monsoon 350', 'motor 350 hp', 'motor v8'],
    node: {
      brand: { '@id': `${siteConfig.url}/#indmar` },
      isRelatedTo: { '@id': `${siteConfig.url}/#response-lx` },
    },
  },
  zeroOff: {
    id: `${siteConfig.url}/#zero-off-gps`,
    type: 'Thing',
    name: 'Zero Off GPS',
    description: 'Sistema de controle de velocidade por GPS usado em esportes rebocados para aumentar consistência e repetibilidade.',
    aliases: ['zero off', 'zero off gps', 'controle de velocidade gps'],
    node: {
      isRelatedTo: [
        { '@id': `${siteConfig.url}/#slalom` },
        { '@id': `${siteConfig.url}/#perfectpass` },
      ],
    },
  },
  perfectPass: {
    id: `${siteConfig.url}/#perfectpass`,
    type: 'Thing',
    name: 'PerfectPass',
    description: 'Sistema de controle de velocidade usado em embarcações esportivas e frequentemente comparado ao Zero Off.',
    aliases: ['perfectpass', 'perfect pass'],
    node: {
      isRelatedTo: { '@id': `${siteConfig.url}/#zero-off-gps` },
    },
  },
  directDrive: {
    id: `${siteConfig.url}/#direct-drive`,
    type: 'DefinedTerm',
    name: 'Direct drive',
    description: 'Configuração inboard com motor central e transmissão em linha, tradicionalmente associada ao esqui aquático e a uma esteira mais limpa.',
    aliases: ['direct drive', 'tração direta', 'motor central'],
    node: {
      inDefinedTermSet: `${siteConfig.url}/guias`,
      isRelatedTo: [
        { '@id': `${siteConfig.url}/#response-lx` },
        { '@id': `${siteConfig.url}/#slalom` },
        { '@id': `${siteConfig.url}/#v-drive` },
      ],
    },
  },
  vDrive: {
    id: `${siteConfig.url}/#v-drive`,
    type: 'DefinedTerm',
    name: 'V-drive',
    description: 'Configuração inboard com conjunto mecânico deslocado para a popa, favorecendo espaço interno e aplicações de wakeboard e wakesurf.',
    aliases: ['v-drive', 'v drive'],
    node: {
      inDefinedTermSet: `${siteConfig.url}/guias`,
      isRelatedTo: [
        { '@id': `${siteConfig.url}/#direct-drive` },
        { '@id': `${siteConfig.url}/#wakeboard` },
        { '@id': `${siteConfig.url}/#wakesurf` },
      ],
    },
  },
  slalom: {
    id: `${siteConfig.url}/#slalom`,
    type: 'DefinedTerm',
    name: 'Esqui aquático slalom',
    description: 'Modalidade de esqui aquático em que o atleta contorna boias em velocidade controlada.',
    aliases: ['slalom', 'esqui aquático', 'esqui aquatico'],
    node: {
      inDefinedTermSet: `${siteConfig.url}/guias`,
      isRelatedTo: [
        { '@id': `${siteConfig.url}/#direct-drive` },
        { '@id': `${siteConfig.url}/#zero-off-gps` },
      ],
    },
  },
  wakeboard: {
    id: `${siteConfig.url}/#wakeboard`,
    type: 'DefinedTerm',
    name: 'Wakeboard',
    description: 'Esporte rebocado praticado com prancha, geralmente beneficiado por maior formação de onda.',
    aliases: ['wakeboard'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  wakesurf: {
    id: `${siteConfig.url}/#wakesurf`,
    type: 'DefinedTerm',
    name: 'Wakesurf',
    description: 'Modalidade praticada na onda gerada pela embarcação, com forte associação a plataformas V-drive.',
    aliases: ['wakesurf', 'wake surf'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  bimini: {
    id: `${siteConfig.url}/#bimini`,
    type: 'DefinedTerm',
    name: 'Bimini',
    description: 'Cobertura retrátil de tecido usada para proteção solar em embarcações.',
    aliases: ['bimini', 'cobertura retrátil', 'cobertura solar'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  trailer: {
    id: `${siteConfig.url}/#carreta-galvanizada`,
    type: 'DefinedTerm',
    name: 'Carreta galvanizada',
    description: 'Estrutura rodoviária para transporte da embarcação, com galvanização voltada à resistência à corrosão.',
    aliases: ['carreta galvanizada', 'carreta', 'reboque', 'transporte'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  hourMeter: {
    id: `${siteConfig.url}/#horimetro`,
    type: 'DefinedTerm',
    name: 'Horímetro',
    description: 'Instrumento que registra o tempo de funcionamento do motor e auxilia na leitura do histórico de uso.',
    aliases: ['horímetro', 'horimetro', 'horas do motor'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  impeller: {
    id: `${siteConfig.url}/#impeller`,
    type: 'DefinedTerm',
    name: 'Impeller',
    description: 'Rotor flexível do sistema de arrefecimento, item relevante de manutenção preventiva em motores marítimos.',
    aliases: ['impeller', 'rotor', 'arrefecimento'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
  gelcoat: {
    id: `${siteConfig.url}/#gelcoat`,
    type: 'DefinedTerm',
    name: 'Gelcoat',
    description: 'Camada externa de acabamento e proteção aplicada sobre o casco de fibra de vidro.',
    aliases: ['gelcoat', 'gel coat', 'casco de fibra', 'fibra de vidro'],
    node: { inDefinedTermSet: `${siteConfig.url}/guias` },
  },
} as const satisfies Record<string, KnowledgeEntity>

const toNode = (entity: KnowledgeEntity) => ({
  '@type': entity.type,
  '@id': entity.id,
  name: entity.name,
  description: entity.description,
  ...(entity.node ?? {}),
})

export const coreKnowledgeGraphNodes = [
  knowledgeEntities.malibuBoats,
  knowledgeEntities.responseLx,
  knowledgeEntities.indmar,
  knowledgeEntities.monsoon350,
  knowledgeEntities.directDrive,
  knowledgeEntities.zeroOff,
].map(toNode)

export const knowledgeGraphForText = (values: readonly string[]) => {
  const haystack = values.join(' ').toLocaleLowerCase('pt-BR')

  return Object.values(knowledgeEntities)
    .filter((entity) => entity.aliases.some((alias) => haystack.includes(alias)))
    .map(toNode)
}
