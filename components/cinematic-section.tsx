'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useDeferredGsap } from '@/lib/use-deferred-gsap'

type Props = {
  id: string
  image: string
  alt: string
  words: readonly string[]
  caption: string
  priority?: boolean
}

export function CinematicSection({ id, image, alt, words, caption, priority }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useDeferredGsap(root, (gsap) => {
    gsap.fromTo(
      '.cine-img',
      { scale: 1.18, yPercent: -4 },
      {
        scale: 1,
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    gsap.fromTo(
      '.cine-word',
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 62%',
          end: 'top 18%',
          scrub: 0.6,
        },
      },
    )

    gsap.fromTo(
      '.cine-caption',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 42%',
          end: 'top 22%',
          scrub: 0.6,
        },
      },
    )
  })

  return (
    <section
      ref={root}
      id={id}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={image || '/placeholder.svg'}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="cine-img object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/85" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <h2 className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-serif text-4xl leading-[1.05] text-cream text-balance sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
              <span className="cine-word inline-block">{w}</span>
            </span>
          ))}
        </h2>
        <p className="cine-caption mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg">
          {caption}
        </p>
      </div>
    </section>
  )
}
