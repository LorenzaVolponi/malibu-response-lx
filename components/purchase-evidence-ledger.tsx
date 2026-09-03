import { ArrowRight, BadgeCheck, Camera, CircleAlert, FileSearch, Gauge, ShieldCheck, Target, Waves, Wrench } from 'lucide-react'
import { whatsappLeadUrl } from '@/lib/contact'
import { boat } from '@/lib/boat-data'

const fitProfile = [
  {
    label: 'Vocação principal',
    value: 'Esqui aquático · Slalom',
    detail: 'A proposta desta Response LX direct drive é de ski boat, com foco em controle e uso esportivo rebocado.',
    icon: Target,
    status: 'Principal',
  },
  {
    label: 'Uso secundário',
    value: 'Wakeboard recreativo',
    detail: 'O anúncio contempla wakeboard recreativo sem apresentar a embarcação como wakeboat dedicado.',
    icon: Waves,
    status: 'Recreativo',
  },
  {
    label: 'Fora da promessa',
    value: 'Wakesurf dedicado',
    detail: 'O anúncio não promete onda, lastro ou desempenho de wakesurf. O comprador deve escolher pelo esporte principal.',
    icon: CircleAlert,
    status: 'Não prometido',
  },
] as const

const publishedEvidence = [
  {
    label: 'Fotos reais da unidade',
    detail: 'Casco, cockpit, motor, painel, proa, popa e acessórios aparecem nas fotografias publicadas.',
    icon: Camera,
    status: 'Publicado',
  },
  {
    label: 'Ano e horímetro informados',
    detail: `${boat.year} e ${boat.engineHours} horas são dados declarados no anúncio e devem ser conferidos na diligência de compra.`,
    icon: Gauge,
    status: 'Declarado',
  },
  {
    label: 'Conjunto técnico identificado',
    detail: 'Indmar Monsoon 350 SS V8 350 HP, transmissão Direct Drive e Zero Off GPS compõem a ficha publicada.',
    icon: BadgeCheck,
    status: 'Identificado',
  },
  {
    label: 'Itens do anúncio',
    detail: 'Toldo bimini incluído. Carreta não incluída. Confirme acessórios e entrega diretamente com o vendedor.',
    icon: ShieldCheck,
    status: 'Informado',
  },
] as const

const validationItems = [
  {
    label: 'Documentação e titularidade',
    detail: 'Confirmar identificação da embarcação, titularidade, eventuais pendências e condições de transferência antes do pagamento.',
    icon: FileSearch,
  },
  {
    label: 'Histórico de manutenção',
    detail: 'Solicitar registros disponíveis de revisões, fluidos, arrefecimento e intervenções anteriores.',
    icon: Wrench,
  },
  {
    label: 'Inspeção técnica independente',
    detail: 'Avaliar presencialmente casco, motor, eixo, hélice, elétrica, estofamento e acessórios com profissional de confiança.',
    icon: ShieldCheck,
  },
  {
    label: 'Teste na água',
    detail: 'Combinar condições para validar partida, funcionamento, navegação e Zero Off antes de concluir a compra.',
    icon: Waves,
  },
] as const

export function PurchaseEvidenceLedger() {
  return (
    <section id="evidencias" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[0.56fr_0.44fr] lg:items-end">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Decisão com evidência</p>
            <h2 className="mt-3 text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Para quem ela faz sentido — e o que validar antes de pagar
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-cream/65">
              Uma venda particular fica mais simples quando o comprador sabe rapidamente o uso principal da embarcação, o que já está publicado e o que ainda depende de diligência própria.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={whatsappLeadUrl('documents')}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-intent="evidence_ledger_documents"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02]"
            >
              Perguntar sobre documentos <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappLeadUrl('test')}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-intent="evidence_ledger_test"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/15 bg-navy-deep/35 px-5 py-3 text-sm font-semibold text-cream transition hover:border-gold/40 hover:text-gold"
            >
              Combinar avaliação / teste
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {fitProfile.map(({ label, value, detail, icon: Icon, status }) => (
            <article key={label} className="rounded-3xl border border-cream/10 bg-navy-deep/35 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-cream/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">{status}</span>
              </div>
              <p className="mt-6 text-[10px] tracking-[0.2em] text-cream/45 uppercase">{label}</p>
              <h3 className="mt-2 font-serif text-2xl text-cream">{value}</h3>
              <p className="mt-3 text-sm leading-6 text-cream/60">{detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/35">
            <div className="border-b border-cream/10 p-6">
              <p className="text-xs tracking-luxe text-gold uppercase">Já publicado / identificado</p>
              <p className="mt-2 text-sm leading-6 text-cream/55">Fatos e elementos presentes no anúncio, sem transformar fotografia em laudo.</p>
            </div>
            {publishedEvidence.map(({ label, detail, icon: Icon, status }, index) => (
              <div key={label} className={`grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6 ${index !== publishedEvidence.length - 1 ? 'border-b border-cream/10' : ''}`}>
                <div className="grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-cream/60">{detail}</p>
                </div>
                <span className="w-fit rounded-full border border-cream/10 bg-background/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">{status}</span>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-gold/20 bg-gold/[0.035]">
            <div className="border-b border-gold/15 p-6">
              <p className="text-xs tracking-luxe text-gold uppercase">Validar antes de fechar</p>
              <p className="mt-2 text-sm leading-6 text-cream/55">Pontos que continuam sob responsabilidade de conferência do comprador.</p>
            </div>
            {validationItems.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className={`grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6 ${index !== validationItems.length - 1 ? 'border-b border-gold/15' : ''}`}>
                <div className="grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-cream/60">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-cream/45">
          O anúncio organiza evidências e limites de informação; não substitui inspeção técnica, consulta documental ou validação independente do comprador.
        </p>
      </div>
    </section>
  )
}
