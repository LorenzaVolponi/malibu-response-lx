'use client'

import { useEffect, useState } from 'react'
import { boat } from '@/lib/boat-data'
import { MessageCircle, Menu, X } from 'lucide-react'

const links = [
  { href: '#experiencia', label: 'Experiência' },
  { href: '#ficha', label: 'Performance' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#negociar', label: 'Contato' },
]

const wa = (msg: string) =>
  `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(msg)}`

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
          }`}
          aria-label="Navegação principal"
        >
          <a href="#topo" className="flex items-center gap-3 pl-1">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.28em] text-cream uppercase">
              Malibu Response LX
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={wa(
                'Olá! Tenho interesse na Malibu Response LX anunciada por R$ 175.000. Podemos conversar?',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:flex"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Agendar visita
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full glass text-cream md:hidden"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 rounded-3xl glass-strong p-4 md:hidden">
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
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
