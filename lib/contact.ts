import { boat } from '@/lib/boat-data'

export const contactMessages = {
  primary:
    `Olá! Vi a ${boat.brand} ${boat.model} ${boat.year} anunciada por ${boat.priceLabel}. Tenho interesse real e gostaria de receber vídeos, informações de manutenção e documentação para avançar na avaliação.`,
  secondary: `Olá! Gostaria de verificar disponibilidade para visitar e avaliar a ${boat.brand} ${boat.model}.`,
  technical: `Olá! Quero falar sobre motor, horas e manutenção da ${boat.brand} ${boat.model} ${boat.year}.`,
  documents: `Olá! Tenho interesse real na ${boat.brand} ${boat.model} ${boat.year}. Gostaria de receber vídeos complementares, documentação disponível e informações de manutenção antes de avançar.`,
  test: `Olá! Tenho interesse na ${boat.brand} ${boat.model} ${boat.year} e gostaria de entender as condições para visita e teste na água.`,
  offer: `Olá! Analisei a ${boat.brand} ${boat.model} ${boat.year}, anunciada por ${boat.priceLabel}, e gostaria de conversar sobre uma proposta.`,
} as const

export type ContactIntent = keyof typeof contactMessages

export function whatsappUrl(intent: ContactIntent = 'primary') {
  return `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(contactMessages[intent])}`
}

export function whatsappLeadUrl(intent: ContactIntent = 'primary') {
  return `/api/whatsapp?intent=${intent}`
}
