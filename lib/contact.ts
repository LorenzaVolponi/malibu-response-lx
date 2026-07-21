import { boat } from '@/lib/boat-data'

export const contactMessages = {
  primary:
    'Olá! Vi a Malibu Response LX 2013 anunciada por R$ 175.000. Tenho interesse real e gostaria de receber os vídeos, informações de manutenção, documentação e localização para visita.',
  secondary: 'Olá! Gostaria de verificar disponibilidade para visitar e avaliar a Malibu Response LX.',
  technical: 'Olá! Quero falar sobre motor e manutenção da Malibu Response LX 2013.',
} as const

export type ContactIntent = keyof typeof contactMessages

export function whatsappUrl(intent: ContactIntent = 'primary') {
  return `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(contactMessages[intent])}`
}
