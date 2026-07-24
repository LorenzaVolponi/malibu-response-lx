import { boat } from '@/lib/boat-data'

export const contactMessages = {
  primary:
    `Olá! Vi a ${boat.brand} ${boat.model} ${boat.year} anunciada por ${boat.priceLabel}. Tenho interesse real e gostaria de receber os vídeos, informações de manutenção, documentação e localização para visita.`,
  secondary: `Olá! Gostaria de verificar disponibilidade para visitar e avaliar a ${boat.brand} ${boat.model}.`,
  technical: `Olá! Quero falar sobre motor e manutenção da ${boat.brand} ${boat.model} ${boat.year}.`,
} as const

export type ContactIntent = keyof typeof contactMessages

export function whatsappUrl(intent: ContactIntent = 'primary') {
  return `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(contactMessages[intent])}`
}

export function whatsappLeadUrl(intent: ContactIntent = 'primary') {
  return `/api/whatsapp?intent=${intent}`
}
