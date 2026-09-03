import { CalendarDays, FileCheck, Handshake, Waves } from 'lucide-react'
import { SectionMotionEnhancer } from '@/components/section-motion-enhancer'

const steps = [
  {
    title: 'Visita presencial',
    copy: 'Agende uma avaliação com tempo para conhecer a embarcação com calma.',
    icon: CalendarDays,
  },
  {
    title: 'Documentação',
    copy: 'Dados documentais e informações pendentes devem ser confirmados diretamente com o vendedor.',
    icon: FileCheck,
  },
  {
    title: 'Teste na água',
    copy: 'Local, data e condições de teste são combinados caso a caso.',
    icon: Waves,
  },
  {
    title: 'Negociação direta',
    copy: 'Preço, proposta, troca e forma de pagamento são tratados pelo WhatsApp.',
    icon: Handshake,
  },
] as const

export function BuyerConfidenceSection() {
  return (
    <section id="compra-clara" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div data-confidence-reveal className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Compra com clareza</p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
            O caminho para avaliar sem pressão
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, copy, icon: Icon }) => (
            <article key={title} data-confidence-reveal className="group rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/35">
              <div className="mb-7 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
      <SectionMotionEnhancer sectionId="compra-clara" kind="buyer-confidence" />
    </section>
  )
}
