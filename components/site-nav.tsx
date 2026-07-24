'use client'

import { useEffect, useState } from 'react'
import { whatsappLeadUrl } from '@/lib/contact'
import { MessageCircle, Menu, X } from 'lucide-react'

const links = [
  { href: '#experiencia', label: 'Experiência' },
  { href: '#ficha', label: 'Performance' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#comparar-malibu-response-lx', label: 'Comparar' },
  { href: '#negociar', label: 'Contato' },
]


export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-[env(safe-area-inset-top)] z-40 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <nav
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-500 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
            scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'border border-cream/10 bg-navy-deep/35 backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-0'
          }`}
          aria-label="Navegação principal"
        >
          <a href="#topo" className="flex min-w-0 items-center gap-3 pl-1">
            <span className="h-px w-6 shrink-0 bg-gold sm:w-8" aria-hidden="true" />
            <span className="truncate text-xs font-semibold tracking-[0.16em] text-cream uppercase sm:tracking-[0.24em] lg:tracking-[0.28em]">
              Malibu Response LX
            </span>
          </a>

          <ul className="hidden items-center justify-center gap-5 lg:flex xl:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <a
              href={whatsappLeadUrl('secondary')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] lg:flex"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Agendar avaliação
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full glass text-cream lg:hidden"
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-deep/55 backdrop-blur-sm lg:hidden"
            />
            <div id="mobile-menu" className="fixed inset-x-4 top-[calc(env(safe-area-inset-top)+4.75rem)] z-50 max-h-[calc(100dvh-6rem-env(safe-area-inset-top))] overscroll-contain overflow-y-auto rounded-3xl glass-strong p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black/40 lg:hidden">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-cream/90 transition-colors hover:bg-white/5"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappLeadUrl('secondary')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp do vendedor
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
