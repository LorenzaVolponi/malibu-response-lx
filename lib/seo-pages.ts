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
  {
    slug: 'malibu-response-lx-2013-ficha-tecnica',
    title: 'Malibu Response LX 2013: ficha técnica e itens do anúncio',
    description: `Ficha técnica da Malibu Response LX 2013 anunciada com motor V8 350 HP, direct drive, Zero Off GPS, ${boat.engineHours} horas, bimini e carreta.`,
    h1: 'Ficha técnica da Malibu Response LX 2013 anunciada',
    intro: 'Resumo técnico indexável para compradores que pesquisam ano, motor, potência, transmissão, horas e equipamentos da embarcação.',
    keywords: ['Malibu Response LX 2013 ficha técnica', 'Malibu Response LX especificações', 'Malibu Response LX 350 HP', 'Malibu Response LX Zero Off'],
    sections: [
      { heading: 'Conjunto mecânico', text: 'Motor Indmar Monsoon 350 SS V8 5.7L de 350 HP com transmissão direct drive.' },
      { heading: 'Dados de uso publicados', text: `Ano ${boat.year} e ${boat.engineHours} horas informadas no anúncio, sujeitos à validação presencial e documental.` },
      { heading: 'Equipamentos apresentados', text: 'Controle Zero Off GPS, toldo bimini e carreta rodoviária galvanizada.' },
    ],
  },
  {
    slug: 'lancha-com-carreta-inclusa',
    title: 'Lancha com carreta inclusa: o que avaliar antes da compra',
    description: 'Veja o que avaliar em uma lancha usada com carreta inclusa, incluindo estrutura, pneus, rolamentos, documentação, elétrica e uso em rampa.',
    h1: 'Lancha usada com carreta inclusa: checklist essencial',
    intro: 'A carreta agrega praticidade e valor, mas precisa ser avaliada separadamente da embarcação para evitar custos inesperados.',
    keywords: ['lancha com carreta inclusa', 'lancha usada com carreta', 'carreta galvanizada para lancha', 'comprar barco com carreta'],
    sections: [
      { heading: 'Estrutura e corrosão', text: 'Verifique chassi, soldas, galvanização, pontos de corrosão, guincho, cintas e roletes.' },
      { heading: 'Rodagem e segurança', text: 'Avalie pneus, estepe, cubos, rolamentos, freios quando aplicáveis, iluminação e engate.' },
      { heading: 'Neste anúncio', text: 'A Malibu Response LX anunciada informa carreta rodoviária galvanizada inclusa, cuja condição deve ser confirmada presencialmente.' },
    ],
  },
  {
    slug: 'quantas-horas-motor-lancha-usada',
    title: 'Horas de motor em lancha usada: como interpretar o horímetro',
    description: 'Entenda como avaliar horas de motor em uma lancha usada e por que manutenção, tipo de uso e inspeção pesam mais que o número isolado.',
    h1: 'Como interpretar as horas de motor de uma lancha usada',
    intro: 'O horímetro é importante, mas não deve ser analisado sozinho. Histórico de manutenção, frequência de uso e conservação mudam completamente a leitura.',
    keywords: ['horas de motor lancha usada', 'quantas horas motor barco', 'horímetro lancha', '940 horas lancha'],
    sections: [
      { heading: 'Número não conta toda a história', text: 'Uso frequente com manutenção correta pode ser melhor que longos períodos parado sem cuidados preventivos.' },
      { heading: 'O que confirmar', text: 'Solicite registros de revisão, verifique partida a frio, ruídos, fumaça, vazamentos, temperatura e sistema de arrefecimento.' },
      { heading: 'Dado deste anúncio', text: `O anúncio informa ${boat.engineHours} horas de motor. A leitura deve ser validada no painel e em inspeção técnica.` },
    ],
  },
  {
    slug: 'checklist-documentacao-lancha-usada',
    title: 'Documentação de lancha usada: checklist antes de comprar',
    description: 'Checklist de documentação, titularidade, débitos, identificação e contrato para reduzir riscos na compra de uma lancha usada.',
    h1: 'Checklist documental para comprar uma lancha usada',
    intro: 'Antes de qualquer pagamento, confirme identidade do vendedor, titularidade da embarcação e documentação disponível com apoio profissional quando necessário.',
    keywords: ['documentação lancha usada', 'como comprar lancha usada', 'transferência embarcação usada', 'checklist compra barco usado'],
    sections: [
      { heading: 'Titularidade e identificação', text: 'Confirme dados do proprietário, identificação da embarcação e correspondência entre documentos e características físicas.' },
      { heading: 'Pendências e contrato', text: 'Verifique débitos, restrições, responsabilidades, forma de pagamento e condições de entrega em contrato.' },
      { heading: 'Transparência deste site', text: 'O anúncio não presume documentação validada. Esses dados devem ser solicitados e conferidos diretamente com o vendedor.' },
    ],
  },
  {
    slug: 'malibu-response-lx-preco',
    title: `Malibu Response LX preço: anúncio por ${boat.priceLabel}`,
    description: `Veja o preço anunciado da Malibu Response LX ${boat.year}, os itens inclusos e os fatores que devem ser comparados antes de negociar uma lancha esportiva usada.`,
    h1: `Preço da Malibu Response LX ${boat.year} anunciada`,
    intro: `A embarcação está anunciada por ${boat.priceLabel}. O valor deve ser analisado junto com ano, horas, motor, equipamentos, carreta, conservação e documentação.`,
    keywords: ['Malibu Response LX preço', 'preço Malibu Response LX usada', 'Malibu Response LX 2013 valor', 'lancha Malibu usada'],
    sections: [
      { heading: 'Preço publicado', text: `O valor anunciado é ${boat.priceLabel}, com negociação tratada diretamente com o vendedor.` },
      { heading: 'O que está informado', text: `Ano ${boat.year}, ${boat.engineHours} horas, V8 350 HP, Zero Off GPS, bimini e carreta inclusa.` },
      { heading: 'Como comparar', text: 'Compare estado, manutenção, acessórios, documentação, custo de transporte e eventual necessidade de revisão.' },
    ],
  },
  {
    slug: 'malibu-response-lx-vs-nautique-ski-200',
    title: 'Malibu Response LX vs Nautique Ski 200: qual escolher?',
    description: 'Compare Malibu Response LX e Nautique Ski 200 em proposta esportiva, transmissão, esteira, tecnologia e critérios de compra no mercado de usados.',
    h1: 'Malibu Response LX vs Nautique Ski 200',
    intro: 'Um comparativo para quem pesquisa lanchas premium de esqui aquático e precisa organizar diferenças de proposta, uso e diligência antes de comprar.',
    keywords: ['Malibu Response LX vs Nautique Ski 200', 'Malibu ou Nautique', 'lancha de esqui aquático premium', 'Nautique Ski 200 usada'],
    sections: [
      { heading: 'Proposta esportiva', text: 'Os dois modelos pertencem ao universo de lanchas especializadas para esportes rebocados. A escolha deve considerar prioridade entre slalom, recreação, conforto a bordo e disponibilidade de suporte.' },
      { heading: 'O que comparar na prática', text: 'Ano, motorização, horas, transmissão, controle de velocidade, histórico de manutenção, conservação do casco, estofamento e disponibilidade de peças devem ser avaliados barco a barco.' },
      { heading: 'Quando a Response LX faz sentido', text: 'A Response LX tende a interessar quem procura direct drive, proposta esportiva objetiva e um conjunto anunciado com Zero Off GPS, motor V8, bimini e carreta inclusa.' },
    ],
  },
  {
    slug: 'malibu-response-lx-vs-mastercraft-prostar',
    title: 'Malibu Response LX vs MasterCraft ProStar: comparação de compra',
    description: 'Veja como comparar Malibu Response LX e MasterCraft ProStar considerando uso no slalom, motorização, manutenção, equipamentos e condição do usado.',
    h1: 'Malibu Response LX vs MasterCraft ProStar',
    intro: 'Comparativo de intenção comercial para compradores que avaliam duas referências de lanchas de esqui aquático no mercado de usados.',
    keywords: ['Malibu Response LX vs MasterCraft ProStar', 'Malibu ou MasterCraft', 'ProStar usada', 'melhor lancha para slalom'],
    sections: [
      { heading: 'Sem vencedor universal', text: 'Não existe escolha correta apenas pela marca. O melhor negócio depende da unidade disponível, do histórico, do estado mecânico e da adequação ao esporte prioritário.' },
      { heading: 'Critérios decisivos', text: 'Compare qualidade da esteira na velocidade utilizada, resposta do motor, ergonomia, espaço, manutenção, peças, eletrônica, carreta e custo total de regularização e transporte.' },
      { heading: 'Dados objetivos desta Malibu', text: `A unidade anunciada informa ano ${boat.year}, ${boat.engineHours} horas, motor Indmar Monsoon 350 SS V8 de 350 HP, direct drive e Zero Off GPS.` },
    ],
  },
  {
    slug: 'malibu-response-lx-vale-a-pena',
    title: 'Malibu Response LX vale a pena? Análise para comprar usada',
    description: 'Entenda para quem a Malibu Response LX vale a pena, quais pontos validar e como analisar preço, horas, motor e equipamentos antes da compra.',
    h1: 'Malibu Response LX vale a pena?',
    intro: 'A resposta depende do perfil de uso e da condição real da unidade. Este guia organiza os fatores que transformam uma boa especificação em uma compra segura.',
    keywords: ['Malibu Response LX vale a pena', 'comprar Malibu Response LX usada', 'Malibu Response LX opinião', 'lancha de esqui aquático usada'],
    sections: [
      { heading: 'Para quem tende a valer a pena', text: 'Faz mais sentido para quem valoriza direct drive, prática de esqui aquático, controle de velocidade e comportamento esportivo previsível.' },
      { heading: 'O que pode mudar a decisão', text: 'Estado do motor, sistema de arrefecimento, transmissão, casco, estofamento, eletrônica, carreta, documentação e histórico de manutenção podem alterar totalmente o custo-benefício.' },
      { heading: 'Como decidir com menos risco', text: `Use os dados publicados — ${boat.year}, ${boat.engineHours} horas, V8 350 HP e itens inclusos — como ponto de partida, nunca como substituto de inspeção, teste e validação documental.` },
    ],
  },
  {
    slug: 'quanto-custa-manter-malibu-response-lx',
    title: 'Quanto custa manter uma Malibu Response LX?',
    description: 'Veja quais despesas compõem o custo de manutenção de uma Malibu Response LX usada: revisão, combustível, guarda, carreta, documentação e prevenção.',
    h1: 'Quanto custa manter uma Malibu Response LX usada',
    intro: 'O custo anual varia conforme uso, região, guarda e condição mecânica. Mais útil que prometer um número único é separar as despesas que precisam entrar no orçamento.',
    keywords: ['quanto custa manter Malibu Response LX', 'manutenção Malibu Response LX', 'custo lancha esportiva usada', 'custo anual lancha'],
    sections: [
      { heading: 'Custos recorrentes', text: 'Considere combustível, marina ou guarda, limpeza, bateria, lubrificantes, filtros, conservação do estofamento, seguro quando contratado e manutenção da carreta.' },
      { heading: 'Custos por uso e prevenção', text: 'Horas navegadas, qualidade da água, rotina de lavagem, invernagem, revisões preventivas e substituição de componentes de desgaste influenciam fortemente o orçamento.' },
      { heading: 'Reserva de segurança', text: 'Em uma embarcação usada, mantenha uma reserva específica para inspeção inicial, revisão pós-compra e correções não identificadas no anúncio.' },
    ],
  },
  {
    slug: 'perguntas-frequentes-malibu-response-lx',
    title: 'Perguntas frequentes sobre Malibu Response LX usada',
    description: 'Respostas objetivas sobre horas de motor, Zero Off, direct drive, wakeboard, manutenção, documentação e compra de uma Malibu Response LX usada.',
    h1: 'Perguntas frequentes sobre a Malibu Response LX',
    intro: 'Uma central de respostas rápidas para dúvidas comuns de compradores antes do contato, da inspeção e da negociação.',
    keywords: ['perguntas Malibu Response LX', 'FAQ Malibu Response LX', 'dúvidas lancha usada', 'comprar Malibu usada'],
    sections: [
      { heading: '900 horas de motor é muito?', text: 'O número isolado não decide a compra. Histórico de manutenção, tipo de uso, partida a frio, temperatura, ruídos, vazamentos e inspeção técnica pesam mais que uma referência genérica.' },
      { heading: 'Direct drive serve para wakeboard?', text: 'Pode atender uso recreativo, mas a configuração é tradicionalmente associada ao esqui aquático. Quem prioriza ondas maiores e mais espaço costuma também comparar opções V-drive.' },
      { heading: 'O Zero Off vale a pena?', text: 'Para quem pratica esportes rebocados e busca repetibilidade de velocidade, é um equipamento relevante. O funcionamento deve ser demonstrado e testado antes da compra.' },
      { heading: 'O que pedir ao vendedor?', text: 'Solicite vídeos atuais, partida a frio, painel ligado, motor em funcionamento, casco, interior, carreta, documentos disponíveis, histórico informado e condições para inspeção.' },
      { heading: 'Como saber se o preço está adequado?', text: 'Compare ano, horas, motorização, tecnologia, conservação, acessórios, carreta, documentação, localização e despesas imediatas após a compra.' },
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