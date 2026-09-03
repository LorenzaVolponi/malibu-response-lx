import { ArrowRight, BadgeCheck, Camera, FileSearch, Gauge, Wrench } from 'lucide-react'
import { whatsappLeadUrl } from '@/lib/contact'
import { boat } from '@/lib/boat-data'

const evidence = [
  {
    label: 'Fotos reais publicadas',
    detail: 'Casco, cockpit, motor, painel, proa e popa aparecem no anúncio.',
    icon: Camera,
    status: 'Publicado',
  },
  {
    label: 'Ficha técnica do anúncio',
    detail: `${boat.year} · ${boat.engineHours} h · Indmar V8 350 HP · Direct Drive · Zero Off GPS.`,
    icon: Gauge,
    status: 'Publicado',
  },
  {
    label: 'Vídeos complementares',
    detail: 'Partida, funcionamento, navegação e detalhes adicionais podem ser solicitados antes da visita.',
    icon: BadgeCheck,
    status: 'Solicitar',
  },
  {
    label: 'Manutenção e inspeção',
    detail: 'Histórico disponível, inspeção mecânica e validações devem ser confirmados diretamente na negociação.',
    icon: Wrench,
    status: 'Validar',
  },
  {
    label: 'Documentação',
    detail: 'Titularidade, identificação da embarcação, eventuais pendências e transferência devem ser validadas antes do pagamento.',
    icon: FileSearch,
    status: 'Validar',
  },
] as const

export function PurchaseEvidenceLedger() {
  return (
    <section id="evidencias" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Evidence ledger</p>
            <h2 className="mt-3 text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              O que já está publicado. O que você ainda deve validar.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-cream/65">
              Transparência reduz fricção. O anúncio separa fato publicado de item que precisa ser confirmado antes da compra.
            </p>
          </div>
          <a
            href={whatsappLeadUrl('documents')}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp-intent="evidence_ledger_documents"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] lg:justify-self-end"
          >
            Solicitar vídeos e documentação <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/35">
          {evidence.map(({ label, detail, icon: Icon, status }, index) => (
            <div
              key={label}
              className={`grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6 ${index !== evidence.length - 1 ? 'border-b border-cream/10' : ''}`}
            >
              <div className="grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-cream">{label}</h3>
                <p className="mt-1 text-sm leading-6 text-cream/60">{detail}</p>
              </div>
              <span className="w-fit rounded-full border border-cream/10 bg-background/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                {status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-cream/45">
          Este bloco não substitui inspeção técnica, análise documental ou validação independente do comprador.
        </p>
      </div>
    </section>
  )
}
