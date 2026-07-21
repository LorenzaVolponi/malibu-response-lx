'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function EngineSound() {
  const audioCtx = useRef<AudioContext | null>(null)
  const nodes = useRef<Array<{ stop: () => void }>>([])
  const [playing, setPlaying] = useState(false)

  const stop = () => {
    nodes.current.forEach((node) => node.stop())
    nodes.current = []
    setPlaying(false)
  }

  const start = async () => {
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = audioCtx.current ?? new Ctx()
    audioCtx.current = ctx
    await ctx.resume()

    const master = ctx.createGain()
    master.gain.value = 0.045
    master.connect(ctx.destination)

    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.value = -30
    compressor.knee.value = 18
    compressor.ratio.value = 5
    compressor.attack.value = 0.015
    compressor.release.value = 0.22
    compressor.connect(master)

    const created: Array<{ stop: () => void }> = []
    ;[
      { frequency: 46, gain: 0.9 },
      { frequency: 92, gain: 0.46 },
      { frequency: 138, gain: 0.24 },
      { frequency: 184, gain: 0.14 },
    ].forEach(({ frequency, gain }) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.value = frequency
      g.gain.value = gain
      osc.connect(g)
      g.connect(compressor)
      osc.start()
      created.push({ stop: () => osc.stop() })
    })

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 7.5
    lfoGain.gain.value = 12
    lfo.connect(lfoGain)
    lfo.start()
    created.push({ stop: () => lfo.stop() })

    nodes.current = created
    setPlaying(true)
  }

  useEffect(() => stop, [])

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      className="group fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-2 rounded-full border border-gold/30 bg-navy-deep/85 px-4 py-3 text-sm font-semibold text-cream shadow-2xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-gold sm:bottom-24"
      aria-pressed={playing}
      aria-label={playing ? 'Desligar ronco do motor V8' : 'Ligar ronco do motor V8'}
    >
      {playing ? <VolumeX className="size-4 text-gold" /> : <Volume2 className="size-4 text-gold" />}
      <span>{playing ? 'Motor ligado' : 'Ouvir V8'}</span>
    </button>
  )
}
