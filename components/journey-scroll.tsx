import Image from 'next/image'
import { journey } from '@/lib/boat-data'
import { SectionMotionEnhancer } from '@/components/section-motion-enhancer'

export function JourneyScroll() {
  return (
    <section id="experiencia" className="relative">
      <div className="bg-navy-deep px-5 py-16 md:hidden">
        <div className="mx-auto max-w-md">
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
            Experiência a bordo
          </p>
          <h2 className="font-serif text-4xl leading-tight text-cream">
            Veja a lancha por dentro em leitura leve no celular
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {journey.map((step) => (
              <article key={step.id} className="overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.035]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={step.image || '/placeholder.svg'}
                    alt={step.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) calc(100vw - 2.5rem), 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs tracking-luxe text-gold uppercase">{step.kicker}</p>
                  <h3 className="mt-2 font-serif text-2xl text-cream">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        data-journey-pin
        className="relative hidden h-[100svh] w-full overflow-hidden bg-navy-deep md:block"
      >
        {journey.map((step, i) => (
          <article
            key={step.id}
            data-slide
            className="absolute inset-0 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }}
            aria-hidden={i === 0 ? undefined : 'true'}
          >
            <Image
              src={step.image || '/placeholder.svg'}
              alt={step.alt}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:pb-24">
                <div className="max-w-xl">
                  <p data-slide-text className="mb-3 inline-flex rounded-full glass px-3 py-1 text-xs tracking-luxe text-gold uppercase">
                    {step.kicker}
                  </p>
                  <h2 data-slide-text className="text-balance font-serif text-4xl leading-tight text-cream sm:text-6xl">
                    {step.title}
                  </h2>
                  <p data-slide-text className="mt-4 max-w-md text-pretty text-base leading-relaxed text-cream/75 sm:text-lg">
                    {step.copy}
                  </p>
                </div>
              </div>
            </div>

            <div data-slide-text className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
              {journey.map((_, j) => (
                <span key={j} className={`h-8 w-0.5 rounded-full transition-colors ${j === i ? 'bg-gold' : 'bg-cream/20'}`} />
              ))}
            </div>
          </article>
        ))}
      </div>
      <SectionMotionEnhancer sectionId="experiencia" kind="journey" />
    </section>
  )
}
