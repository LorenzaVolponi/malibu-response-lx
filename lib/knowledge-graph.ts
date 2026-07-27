import { siteConfig } from '@/lib/site-config'

export const knowledgeEntities = {
  malibuBoats: {
    id: `${siteConfig.url}/#malibu-boats`,
    type: 'Brand',
    name: 'Malibu Boats',
    description: 'Fabricante de embarcações esportivas, incluindo a linha Response LX.',
  },
  responseLx: {
    id: `${siteConfig.url}/#response-lx`,
    type: 'ProductModel',
    name: 'Malibu Response LX',
    description: 'Modelo de lancha esportiva direct drive voltado a esportes rebocados, com forte associação ao esqui aquático.',
  },
  indmar: {
    id: `${siteConfig.url}/#indmar`,
    type: 'Brand',
    name: 'Indmar',
    description: 'Fabricante de motores marítimos de centro-rabeta e aplicações inboard para lanchas esportivas.',
  },
  monsoon350: {
    id: `${siteConfig.url}/#indmar-monsoon-350-ss`,
    type: 'Product',
    name: 'Indmar Monsoon 350 SS',
    description: 'Motor V8 5.7L de 350 HP aplicado à unidade anunciada da Malibu Response LX.',
  },
  zeroOff: {
    id: `${siteConfig.url}/#zero-off-gps`,
    type: 'Thing',
    name: 'Zero Off GPS',
    description: 'Sistema de controle de velocidade por GPS utilizado em esportes rebocados para aumentar consistência e repetibilidade.',
  },
  perfectPass: {
    id: `${siteConfig.url}/#perfectpass`,
    type: 'Thing',
    name: 'PerfectPass',
    description: 'Sistema de controle de velocidade usado em embarcações esportivas e frequentemente comparado ao Zero Off.',
  },
  directDrive: {
    id: `${siteConfig.url}/#direct-drive`,
    type: 'DefinedTerm',
    name: 'Direct drive',
    description: 'Configuração inboard com motor central e transmissão em linha, tradicionalmente associada a esqui aquático e esteira mais limpa.',
  },
  vDrive: {
    id: `${siteConfig.url}/#v-drive`,
    type: 'DefinedTerm',
    name: 'V-drive',
    description: 'Configuração inboard com conjunto mecânico deslocado para a popa, favorecendo espaço interno e aplicações de wakeboard e wakesurf.',
  },
  slalom: {
    id: `${siteConfig.url}/#slalom`,
    type: 'SportsEvent',
    name: 'Esqui aquático slalom',
    description: 'Modalidade de esqui aquático em que o atleta contorna boias em velocidade controlada.',
  },
  wakeboard: {
    id: `${siteConfig.url}/#wakeboard`,
    type: 'SportsEvent',
    name: 'Wakeboard',
    description: 'Esporte rebocado praticado com prancha, geralmente beneficiado por maior formação de onda.',
  },
  wakesurf: {
    id: `${siteConfig.url}/#wakesurf`,
    type: 'SportsEvent',
    name: 'Wakesurf',
    description: 'Modalidade praticada na onda gerada pela embarcação, com forte associação a plataformas V-drive.',
  },
  bimini: {
    id: `${siteConfig.url}/#bimini`,
    type: 'DefinedTerm',
    name: 'Bimini',
    description: 'Cobertura retrátil de tecido usada para proteção solar em embarcações.',
  },
  trailer: {
    id: `${siteConfig.url}/#carreta-galvanizada`,
    type: 'DefinedTerm',
    name: 'Carreta galvanizada',
    description: 'Estrutura rodoviária para transporte da embarcação, com galvanização voltada à resistência à corrosão.',
  },
  hourMeter: {
    id: `${siteConfig.url}/#horimetro`,
    type: 'DefinedTerm',
    name: 'Horímetro',
    description: 'Instrumento que registra o tempo de funcionamento do motor e auxilia na leitura do histórico de uso.',
  },
  impeller: {
    id: `${siteConfig.url}/#impeller`,
    type: 'DefinedTerm',
    name: 'Impeller',
    description: 'Rotor flexível do sistema de arrefecimento, item de manutenção preventiva relevante em motores marítimos.',
  },
  gelcoat: {
    id: `${siteConfig.url}/#gelcoat`,
    type: 'DefinedTerm',
    name: 'Gelcoat',
    description: 'Camada externa de acabamento e proteção aplicada sobre o casco de fibra de vidro.',
  },
} as const

export const knowledgeGraphNodes = Object.values(knowledgeEntities).map((entity) => ({
  '@type': entity.type,
  '@id': entity.id,
  name: entity.name,
  description: entity.description,
}))
