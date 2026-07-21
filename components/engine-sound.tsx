'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const REAL_ENGINE_AUDIO = '/audio/malibu-response-lx-v8.mp3'

type EngineMode = 'real' | 'simulado'

export function EngineSound() {
  const audioCtx = useRef<AudioContext | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const nodes = useRef<Array<{ stop: () => void }>>([])
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState<EngineMode>('simulado')

  const stop = () => {
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    nodes.current.forEach((node) => node.stop())
    nodes.current = []
    setPlaying(false)
  }

  const hasRealAudio = async () => {
    const response = await fetch(REAL_ENGINE_AUDIO, { method: 'HEAD', cache: 'no-store' })
    return response.ok
  }

  const startRealAudio = async () => {
    const audio = audioRef.current ?? new Audio(REAL_ENGINE_AUDIO)
    audioRef.current = audio
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.72
    await audio.play()
    setMode('real')
    setPlaying(true)
  }

  const startSynthAudio = async () => {
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = audioCtx.current ?? new Ctx()
    audioCtx.current = ctx
    await ctx.resume()

    const master = ctx.createGain()
    master.gain.value = 0.052
    master.connect(ctx.destination)

    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.value = -30
    compressor.knee.value = 18
    compressor.ratio.value = 5
    compressor.attack.value = 0.015
    compressor.release.value = 0.22
    compressor.connect(master)

    const idlePulse = ctx.createOscillator()
    const idleDepth = ctx.createGain()
    idlePulse.frequency.value = 7.5
    idleDepth.gain.value = 9
    idlePulse.connect(idleDepth)
    idlePulse.start()

    const created: Array<{ stop: () => void }> = [{ stop: () => idlePulse.stop() }]
    ;[
      { frequency: 46, gain: 0.9, type: 'sawtooth' as OscillatorType },
      { frequency: 92, gain: 0.48, type: 'sawtooth' as OscillatorType },
      { frequency: 138, gain: 0.26, type: 'square' as OscillatorType },
      { frequency: 184, gain: 0.14, type: 'triangle' as OscillatorType },
    ].forEach(({ frequency, gain, type }) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.value = frequency
      idleDepth.connect(osc.frequency)
      g.gain.value = gain
      osc.connect(g)
      g.connect(compressor)
      osc.start()
      created.push({ stop: () => osc.stop() })
    })

    nodes.current = created
    setMode('simulado')
    setPlaying(true)
  }

  const start = async () => {
    if (await hasRealAudio()) {
      await startRealAudio()
      return
    }

    await startSynthAudio()
  }

  useEffect(() => stop, [])

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      className="group fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-2 rounded-full border border-gold/30 bg-navy-deep/85 px-4 py-3 text-sm font-semibold text-cream shadow-2xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-gold sm:bottom-24"
      aria-pressed={playing}
      aria-label={playing ? 'Parar ronco do motor' : 'Ouvir ronco do motor'}
      title="Ouvir ronco do motor"
    >
      {playing ? <VolumeX className="size-4 text-gold" /> : <Volume2 className="size-4 text-gold" />}
      <span>{playing ? 'Parar ronco' : 'Ouvir ronco'}</span>
    </button>
  )
}
