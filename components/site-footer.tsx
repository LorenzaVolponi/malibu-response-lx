import { boat } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'
import { Anchor, MessageCircle } from 'lucide-react'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-cream/10 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Anchor className="size-5 text-gold" aria-hidden="true" />
              <span className="font-serif text-lg text-cream">
                Malibu <span className="text-gold">Response LX</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Lancha Malibu Response LX à venda no Brasil. Barco de esqui
              aquático e wakeboard com motor V8 Indmar Monsoon 350 SS,
              transmissão direct drive e carreta inclusa.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-cream">Navegação</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="#experiencia" className="transition-colors hover:text-cream">Experiência</a></li>
              <li><a href="#ficha" className="transition-colors hover:text-cream">Performance</a></li>
              <li><a href="#destaques" className="transition-colors hover:text-cream">Destaques</a></li>
              <li><a href="#galeria" className="transition-colors hover:text-cream">Galeria</a></li>
              <li><a href="#negociar" className="transition-colors hover:text-cream">Contato</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-cream">Contato</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Interessado? Fale direto com o vendedor.
            </p>
            <a
              href={whatsappLeadUrl('primary')}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-intent="video_documentacao"
              className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span className="truncate">Receber vídeos e documentação</span>
            </a>
            <p className="mt-4 font-serif text-2xl text-cream">
              {boat.priceLabel}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Anúncio particular de uma Malibu Response LX conservada, voltada
            para navegação esportiva, lazer em família e dias memoráveis em
            represas e lagos.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {year} Malibu Response LX. Anúncio de venda particular. Marcas
            citadas pertencem aos respectivos proprietários.
          </p>
        </div>
      </div>
    </footer>
  )
}
