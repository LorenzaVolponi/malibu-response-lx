import { boat } from '@/lib/boat-data'

export const contactMessages = {
  primary:
    `Olá! Vi a ${boat.brand} ${boat.model} ${boat.year} anunciada por ${boat.priceLabel}. Tenho interesse real e gostaria de avançar na avaliação. Pode me enviar os próximos passos?`,
  secondary: `Olá! Gostaria de verificar disponibilidade para visitar e avaliar a ${boat.brand} ${boat.model} ${boat.year}.`,
  technical: `Olá! Tenho interesse na ${boat.brand} ${boat.model} ${boat.year} e quero validar motor, ${boat.engineHours} horas informadas, manutenção e condição operacional antes de avançar.`,
  documents: `Olá! Tenho interesse real na ${boat.brand} ${boat.model} ${boat.year}. Gostaria de receber vídeos atuais, documentação disponível e informações de manutenção para fazer minha diligência antes da visita.`,
  test: `Olá! Tenho interesse na ${boat.brand} ${boat.model} ${boat.year} e gostaria de combinar uma avaliação presencial e entender as condições para teste na água.`,
  offer: `Olá! Analisei a ${boat.brand} ${boat.model} ${boat.year}, anunciada por ${boat.priceLabel}, e quero conversar objetivamente sobre uma proposta de compra.`,
} as const

export type ContactIntent = keyof typeof contactMessages

export function whatsappUrl(intent: ContactIntent = 'primary') {
  return `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(contactMessages[intent])}`
}

export function whatsappLeadUrl(intent: ContactIntent = 'primary') {
  return `/api/whatsapp?intent=${intent}`
}
