import Image from 'next/image'
import { SectionMotionEnhancer } from '@/components/section-motion-enhancer'

const pillars = [
  ['Precisão', 'Resposta direta no comando e condução estável para quem conhece a água.'],
  ['Presença', 'Casco branco perolado, assinatura azul-marinho e proporção clássica Malibu.'],
  ['Pronta', 'Bimini, Zero Off GPS e conjunto preparado para esqui aquático e wakeboard.'],
] as const

export function BrandStorySection() {
  return (
    <section id="essencia" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p data-story-reveal className="mb-4 text-xs tracking-luxe text-gold uppercase">
            A essência
          </p>
          <h2 data-story-reveal className="text-balance font-serif text-4xl leading-tight text-cream sm:text-6xl">
            Uma Malibu feita para quem entende a água
          </h2>
          <p data-story-reveal className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Response LX combina proporção clássica, comando preciso e um conjunto mecânico reconhecido por entregar uma condução limpa, previsível e envolvente.
          </p>
          <div data-story-reveal className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map(([title, copy]) => (
              <div key={title} className="rounded-3xl glass p-5">
                <p className="font-serif text-xl text-cream">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-story-reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl lg:aspect-[5/6]">
            <Image
              data-story-img
              src="/images/top-water.jpeg"
              alt="Vista superior da Malibu Response LX na água"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/65 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-cream/10" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-3xl glass-strong p-5 sm:left-auto sm:w-72">
            <p className="text-xs tracking-luxe text-gold uppercase">Catálogo privado</p>
            <p className="mt-2 font-serif text-2xl text-cream">Response LX</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">Um convite para visitar, avaliar e negociar com calma.</p>
          </div>
        </div>
      </div>
      <SectionMotionEnhancer sectionId="essencia" kind="brand-story" />
    </section>
  )
}
