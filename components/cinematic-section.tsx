import Image from 'next/image'
import { SectionMotionEnhancer } from '@/components/section-motion-enhancer'

type Props = {
  id: string
  image: string
  alt: string
  words: readonly string[]
  caption: string
  priority?: boolean
}

export function CinematicSection({ id, image, alt, words, caption, priority }: Props) {
  return (
    <section
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
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden pb-[0.12em]">
              <span className="cine-word inline-block">{word}</span>
            </span>
          ))}
        </h2>
        <p className="cine-caption mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg">
          {caption}
        </p>
      </div>
      <SectionMotionEnhancer sectionId={id} kind="cinematic" />
    </section>
  )
}
