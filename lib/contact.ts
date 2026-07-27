import { boat } from '@/lib/boat-data'

export const contactMessages = {
  primary: `Informações sobre ${boat.brand} ${boat.model} ${boat.year}.`,
  secondary: `Avaliação da ${boat.brand} ${boat.model}.`,
  technical: `Informações técnicas da ${boat.brand} ${boat.model} ${boat.year}.`,
  documents: `Documentação da ${boat.brand} ${boat.model} ${boat.year}.`,
  test: `Avaliação da ${boat.brand} ${boat.model} ${boat.year}.`,
  offer: `Proposta para a ${boat.brand} ${boat.model} ${boat.year}.`,
} as const

export type ContactIntent = keyof typeof contactMessages

/**
 * Contato removido por solicitação do proprietário.
 * Mantido apenas para compatibilidade com componentes antigos até a limpeza completa.
 */
export function whatsappUrl(_intent: ContactIntent = 'primary') {
  return '#'
}

export function whatsappLeadUrl(_intent: ContactIntent = 'primary') {
  return '#'
}
