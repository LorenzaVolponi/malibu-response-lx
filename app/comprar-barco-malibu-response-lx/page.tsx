import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { boat, specs, gallery } from '@/lib/boat-data'
import { trustSignals } from '@/lib/seo-data'

const SITE_URL = 'https://malibu-response-lx.vercel.app'
const PAGE_PATH = '/comprar-barco-malibu-response-lx'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const wa = `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(
  `Olá! Acessei o guia de compra da Malibu Response LX ${boat.year} e quero avaliar a lancha anunciada por ${boat.priceLabel}.`,
)}`

export const metadata: Metadata = {
  title: 'Comprar Barco Malibu Response LX 2013 | Guia de Compra e Contato',
  description:
    'Guia para comprar barco Malibu Response LX 2013: preço R$ 175.000, 940 horas, motor Indmar Monsoon 350 SS V8 350 HP, Zero Off GPS, bimini, carreta e WhatsApp do vendedor.',
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: 'article',
    locale: 'pt_BR',
    url: PAGE_URL,
    title: 'Comprar Barco Malibu Response LX 2013 — Guia direto para avaliar',
    description:
      'Dados reais, fotos, ficha técnica, preço e contato para avaliar a Malibu Response LX 2013 à venda no Brasil.',
    images: ['/images/hero-side.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprar Malibu Response LX 2013',
    description: 'Preço, ano, horas, motor, fotos reais e WhatsApp do vendedor em um guia direto.',
    images: ['/images/hero-side.jpeg'],
  },
}

const guideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${PAGE_URL}/#article`,
  headline: 'Comprar Barco Malibu Response LX 2013',
  description: metadata.description,
  image: gallery.slice(0, 4).map((image) => `${SITE_URL}${image.src}`),
  inLanguage: 'pt-BR',
  mainEntityOfPage: PAGE_URL,
  about: {
    '@type': 'Product',
    name: `${boat.brand} ${boat.model} ${boat.year}`,
    brand: { '@type': 'Brand', name: boat.brand },
    offers: {
      '@type': 'Offer',
      price: boat.price,
      priceCurrency: boat.currency,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: SITE_URL,
    },
  },
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${PAGE_URL}/#how-to-buy`,
  name: 'Como avaliar a Malibu Response LX 2013 antes de comprar',
  step: [
    { '@type': 'HowToStep', name: 'Verifique os dados do anúncio', text: `Confirme preço ${boat.priceLabel}, ano ${boat.year}, ${boat.engineHours} horas, motor e itens inclusos.` },
    { '@type': 'HowToStep', name: 'Analise fotos reais e ficha técnica', text: 'Compare casco, estofamento, painel, motor, carreta, bimini e configuração direct drive.' },
    { '@type': 'HowToStep', name: 'Fale com o vendedor', text: 'Solicite documentação, histórico disponível, vídeo complementar, visita e condições de teste na água pelo WhatsApp.' },
  ],
}

export default function ComprarBarcoMalibuPage() {
  return (
    <main className="min-h-screen bg-background text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-side.jpeg" alt="" fetchPriority="high" decoding="async" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 to-background" />
        </div>
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-luxe text-gold uppercase">Guia de compra · Malibu Response LX</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-cream sm:text-7xl">
            Malibu Response LX 2013 com dados reais antes da visita
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            Um guia direto para avaliar preço, ano, horas, motor, itens inclusos, fotos reais e contato do vendedor antes de marcar uma visita.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-primary-foreground">
              <MessageCircle className="size-5" aria-hidden="true" />
              Chamar vendedor no WhatsApp
            </a>
            <a href="/#topo" className="inline-flex items-center justify-center rounded-full border border-cream/20 px-7 py-3 font-semibold text-cream">
              Ver página completa
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {trustSignals.map((signal) => (
            <div key={signal} className="rounded-3xl glass p-5 text-sm leading-relaxed text-cream/80">
              {signal}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Ficha para comparação</p>
            <h2 className="mt-3 font-serif text-4xl text-cream">O que conferir antes de comprar</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Compradores de barcos usados normalmente precisam comparar motor, ano, horas, transmissão, itens inclusos e facilidade de visita. Esta Malibu reúne esses pontos com CTA direto para validação com o vendedor.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <article key={spec.label} className="rounded-3xl border border-cream/10 bg-cream/[0.035] p-5">
                <p className="text-xs tracking-luxe text-gold uppercase">{spec.label}</p>
                <p className="mt-1 font-serif text-2xl text-cream">{spec.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{spec.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl rounded-4xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-9">
          <p className="text-xs tracking-luxe text-gold uppercase">Próximo passo</p>
          <h2 className="mt-3 font-serif text-4xl text-cream">Converse com o vendedor e valide os detalhes finais</h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Peça documentação disponível, vídeo complementar, local de visita, condições de teste na água e forma de pagamento diretamente pelo WhatsApp.
          </p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-primary-foreground">
            <MessageCircle className="size-5" aria-hidden="true" />
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
