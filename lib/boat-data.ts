export const boat = {
  brand: 'Malibu',
  model: 'Response LX',
  name: 'Wonder Women',
  price: 150000,
  priceLabel: 'R$ 150.000',
  currency: 'BRL',
  // Contato — ajuste o número do WhatsApp aqui
  whatsapp: '5511999999999',
  whatsappLabel: '(11) 99999-9999',
  location: 'Brasil',
  tagline: 'Direct Drive. V8 Monsoon 350. Feita para a esteira perfeita.',
} as const

// Especificações confirmadas pelas fotos e ficha do modelo.
export const specs = [
  { label: 'Motor', value: 'Indmar Monsoon 350 SS', note: 'Identificado na tampa do motor' },
  { label: 'Potência', value: '350 HP', note: 'V8' },
  { label: 'Motorização', value: 'V8 5.7L', note: '350 pol³ a gasolina' },
  { label: 'Transmissão', value: 'Direct Drive', note: 'Eixo direto — padrão de esqui' },
  { label: 'Comprimento', value: '≈ 6,1 m', note: 'Aprox. 20 pés' },
  { label: 'Controle de velocidade', value: 'Zero Off GPS', note: 'Cruise para tow sports' },
] as const

export const features = [
  {
    title: 'Motor Indmar Monsoon 350 SS',
    description:
      'V8 5.7L de 350 HP com resposta imediata. O coração da Malibu para tracionar esquiador ou wakeboarder com sobra de torque.',
    image: '/images/engine.jpeg',
    alt: 'Motor Indmar Monsoon 350 SS V8 dentro do compartimento da lancha',
  },
  {
    title: 'Controle Zero Off GPS',
    description:
      'Sistema de velocidade por GPS integrado ao painel, mantendo a velocidade exata para treinos consistentes de esqui e wake.',
    image: '/images/cockpit-dash.jpeg',
    alt: 'Painel da Malibu Response LX com instrumentos e controle Zero Off',
  },
  {
    title: 'Estofamento creme com acabamento azul',
    description:
      'Interior em couro náutico creme com faixas azul-marinho, conservado e sem rasgos. Bancos de proa e popa amplos.',
    image: '/images/cockpit-lake.jpeg',
    alt: 'Interior em couro creme com faixas azuis da Malibu Response LX',
  },
  {
    title: 'Toldo bimini + carreta inclusa',
    description:
      'Acompanha toldo bimini para proteção solar e carreta rodoviária galvanizada, pronta para transporte e rampa.',
    image: '/images/profile-trailer.jpeg',
    alt: 'Malibu Response LX sobre carreta galvanizada com toldo bimini',
  },
] as const

// Sequência do scroll imersivo "por dentro do barco"
export const journey = [
  {
    id: 'proa',
    kicker: 'A partida',
    title: 'Sente-se na proa',
    copy: 'Bancos de proa abertos, acabamento creme e vista livre para a água. O convés dianteiro convida a relaxar antes do primeiro giro.',
    image: '/images/bow-pov.jpeg',
    alt: 'Vista a partir da proa da Malibu Response LX olhando para o lago e o píer',
  },
  {
    id: 'comando',
    kicker: 'O comando',
    title: 'Assuma o volante',
    copy: 'Volante esportivo, painel Malibu completo e controle Zero Off ao alcance da mão. Tudo pensado para o piloto no controle total.',
    image: '/images/cockpit-wheel.jpeg',
    alt: 'Volante esportivo e painel de comando da Malibu Response LX',
  },
  {
    id: 'cockpit',
    kicker: 'O convés',
    title: 'Espaço para a tripulação',
    copy: 'Cockpit generoso com bancos envolventes e piso em carpete náutico. Circulação livre da popa à proa.',
    image: '/images/cockpit-top.jpeg',
    alt: 'Vista de cima do cockpit da Malibu Response LX com bancos creme',
  },
  {
    id: 'popa',
    kicker: 'A plataforma',
    title: 'Malibu na popa',
    copy: 'Plataforma de popa integrada, ideal para embarque, esqui e wakeboard. A assinatura Malibu na traseira.',
    image: '/images/stern-platform.jpeg',
    alt: 'Plataforma de popa com a marca Malibu na Response LX',
  },
] as const

export const gallery = [
  { src: '/images/hero-side.jpeg', alt: 'Malibu Response LX de perfil na água', span: 'wide' },
  { src: '/images/exterior-front.jpeg', alt: 'Malibu Response LX vista de três quartos frontal na água', span: 'tall' },
  { src: '/images/cockpit-lake.jpeg', alt: 'Interior creme da Malibu Response LX com vista do lago', span: 'normal' },
  { src: '/images/interior-rear.jpeg', alt: 'Bancos traseiros e cobertura do motor da Malibu Response LX', span: 'normal' },
  { src: '/images/bow-seats.jpeg', alt: 'Detalhe dos bancos de proa da Malibu Response LX', span: 'tall' },
  { src: '/images/detail-decal.jpeg', alt: 'Detalhe do casco com faixa azul e adesivo Wonder Women', span: 'wide' },
  { src: '/images/exterior-rear.jpeg', alt: 'Malibu Response LX de três quartos traseira na represa', span: 'normal' },
  { src: '/images/top-water.jpeg', alt: 'Vista superior da Malibu Response LX atracada', span: 'normal' },
] as const
