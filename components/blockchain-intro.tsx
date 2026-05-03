"use client"

import { useEffect, useRef, useState } from "react"
import { BSA_LOGO_PATH } from "./bsa-logo-path"

const COLORS = [
  '#ff4b4b', '#ff7d36', '#ffa828', '#ffcc2a', '#b7ff54',
  '#00ffaa', '#05dbe9', '#4d9cff', '#7c85ff', '#a369ff',
]

const BLOCK_COUNT = 10
const TOTAL_DURATION = 3500

function genHash(i: number): string {
  const c = '0123456789abcdef'
  let h = ''
  for (let j = 0; j < 6; j++) h += c[(i * 11 + j * 7 + 5) % c.length]
  return h
}

function getArcPosition(index: number, total: number, radius: number) {
  const startAngle = Math.PI * 1.15
  const endAngle = Math.PI * -0.15
  const angle = startAngle + ((endAngle - startAngle) * index) / (total - 1)
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

const smoothstep = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

export default function BlockchainIntro({ onComplete }: { onComplete?: () => void }) {
  const rafId = useRef(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const start = performance.now()

    const update = () => {
      const elapsed = performance.now() - start
      const p = Math.min(1, elapsed / TOTAL_DURATION)

      // Title words: 0 -> 0.18 with stagger
      document.querySelectorAll<HTMLElement>('[data-intro-word]').forEach((el, i) => {
        const start = i * 0.04
        const wp = clamp01((p - start) / 0.14)
        const ease = smoothstep(wp)
        el.style.opacity = String(ease)
        el.style.transform = `translateY(${(1 - ease) * 50}px) scale(${0.85 + ease * 0.15})`
      })

      const subPhase = clamp01((p - 0.1) / 0.18)
      document.querySelectorAll<HTMLElement>('[data-intro-sub]').forEach((el) => {
        el.style.opacity = String(subPhase * 0.4)
        el.style.transform = `translateY(${(1 - subPhase) * 8}px)`
      })

      // Blocks: 0.08 -> 0.55
      document.querySelectorAll<HTMLElement>('[data-block-i]').forEach((el) => {
        const i = parseInt(el.dataset.blockI || '0')
        const bStart = 0.08 + (i / BLOCK_COUNT) * 0.42
        const bp = clamp01((p - bStart) / 0.18)
        const ease = smoothstep(bp)
        el.style.opacity = String(Math.min(1, bp * 2))
        el.style.transform = `scale(${0.2 + ease * 0.8}) rotate(${(1 - ease) * (i % 2 === 0 ? -20 : 20)}deg)`

        if (bp > 0.3) {
          const glow = (bp - 0.3) / 0.7
          const color = COLORS[i % COLORS.length]
          el.style.borderColor = color
          el.style.boxShadow = `0 0 ${glow * 25}px ${color}44, 0 0 ${glow * 50}px ${color}18, inset 0 0 ${glow * 12}px ${color}08`
        } else {
          el.style.borderColor = '#333'
          el.style.boxShadow = 'none'
        }
      })

      document.querySelectorAll<HTMLElement>('[data-conn-i]').forEach((el) => {
        const i = parseInt(el.dataset.connI || '0')
        const cStart = 0.08 + ((i + 0.8) / BLOCK_COUNT) * 0.42
        const cp = clamp01((p - cStart) / 0.12)
        el.style.opacity = String(cp * 0.9)
      })

      document.querySelectorAll<HTMLElement>('[data-hash-i]').forEach((el) => {
        const i = parseInt(el.dataset.hashI || '0')
        const hStart = 0.08 + (i / BLOCK_COUNT) * 0.42 + 0.04
        const hp = clamp01((p - hStart) / 0.1)
        el.style.opacity = String(hp)
      })

      document.querySelectorAll<HTMLElement>('[data-dot-i]').forEach((el) => {
        const i = parseInt(el.dataset.dotI || '0')
        const dStart = 0.08 + (i / BLOCK_COUNT) * 0.42 + 0.06
        const dp = clamp01((p - dStart) / 0.08)
        el.style.opacity = String(dp)
        el.style.transform = `scale(${dp * dp})`
      })

      // Logo: 0.5 -> 0.78
      const logoPhase = clamp01((p - 0.5) / 0.28)
      const logoEase = smoothstep(logoPhase)
      document.querySelectorAll<HTMLElement>('[data-bsa-logo]').forEach((el) => {
        el.style.opacity = String(logoPhase)
        el.style.transform = `translate(-50%, -50%) scale(${0.1 + logoEase * 0.9})`
      })
      document.querySelectorAll<SVGPathElement>('[data-bsa-path]').forEach((el) => {
        el.style.filter = `drop-shadow(0 0 ${logoPhase * 25}px rgba(0,255,170,0.3)) drop-shadow(0 0 ${logoPhase * 50}px rgba(77,156,255,0.15))`
      })

      // Title fade out: starts at 0.65
      const titleFade = clamp01((p - 0.65) / 0.2)
      const titleEl = document.querySelector<HTMLElement>('[data-intro-title]')
      if (titleEl) {
        titleEl.style.opacity = String(1 - titleFade)
        titleEl.style.transform = `translateY(${-titleFade * 40}px)`
      }

      // Whole overlay fade: 0.82 -> 1.0
      const fadePhase = clamp01((p - 0.82) / 0.18)
      const sticky = document.querySelector<HTMLElement>('[data-intro-sticky]')
      if (sticky) {
        sticky.style.opacity = String(1 - fadePhase)
      }

      if (p >= 1) {
        document.body.style.overflow = prevOverflow
        setDone(true)
        onComplete?.()
        return
      }

      rafId.current = requestAnimationFrame(update)
    }

    rafId.current = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.body.style.overflow = prevOverflow
    }
  }, [onComplete])

  const skip = () => {
    cancelAnimationFrame(rafId.current)
    document.body.style.overflow = ''
    setDone(true)
    onComplete?.()
  }

  if (done) return null

  const titleWords = ["Building", "the", "chain"]
  const arcRadius = 240
  const blockSize = 80
  const mobileArcRadius = 130
  const mobileBlockSize = 48

  return (
    <div
      data-intro-sticky
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[#0d1a2b]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute pointer-events-none" style={{
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,170,0.03) 0%, rgba(77,156,255,0.02) 40%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      <div data-intro-title className="absolute top-[10%] md:top-[8%] text-center px-6 z-10 w-full">
        <p data-intro-sub className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-5 opacity-0">
          Block by block
        </p>
        <h2 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] tracking-tight flex flex-wrap justify-center gap-x-[0.3em]">
          {titleWords.map((word, i) => (
            <span key={i} data-intro-word className="inline-block opacity-0">
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="hidden md:block relative" style={{ width: `${arcRadius * 2 + blockSize + 40}px`, height: `${arcRadius * 2 + blockSize + 40}px` }}>
          <div data-bsa-logo className="absolute opacity-0 overflow-visible" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0.1)', transformOrigin: 'center' }}>
            <svg viewBox="0 0 200 215" className="w-48 h-48 overflow-visible" fill="none">
              <path data-bsa-path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
            </svg>
          </div>

          {Array.from({ length: BLOCK_COUNT }).map((_, i) => {
            const pos = getArcPosition(i, BLOCK_COUNT, arcRadius)
            const color = COLORS[i % COLORS.length]
            const nextPos = i < BLOCK_COUNT - 1 ? getArcPosition(i + 1, BLOCK_COUNT, arcRadius) : null
            const half = blockSize / 2
            const cx = arcRadius + half + 20
            const cy = arcRadius + half + 20

            return (
              <div key={i}>
                <div
                  data-block-i={i}
                  className="absolute opacity-0 flex flex-col items-center justify-center"
                  style={{
                    width: blockSize, height: blockSize,
                    left: cx + pos.x - half, top: cy + pos.y - half,
                    borderRadius: 14, border: '1.5px solid #333', background: '#0f1c2e',
                    transformOrigin: 'center',
                  }}
                >
                  <span data-hash-i={i} className="font-mono text-[11px] opacity-0" style={{ color }}>
                    {genHash(i)}
                  </span>
                  <div data-dot-i={i} className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full opacity-0"
                    style={{ backgroundColor: color, transformOrigin: 'center' }}
                  />
                </div>
                {nextPos && (
                  <svg data-conn-i={i} className="absolute inset-0 pointer-events-none opacity-0" style={{ overflow: 'visible' }}>
                    <line
                      x1={cx + pos.x} y1={cy + pos.y}
                      x2={cx + nextPos.x} y2={cy + nextPos.y}
                      stroke={color} strokeWidth="1.5" strokeOpacity="0.7"
                      strokeDasharray="6 4"
                    />
                  </svg>
                )}
              </div>
            )
          })}
        </div>

        <div className="md:hidden relative" style={{ width: `${mobileArcRadius * 2 + mobileBlockSize + 24}px`, height: `${mobileArcRadius * 2 + mobileBlockSize + 24}px` }}>
          <div data-bsa-logo className="absolute opacity-0 md:hidden overflow-visible" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0.1)', transformOrigin: 'center' }}>
            <svg viewBox="0 0 200 215" className="w-24 h-24 overflow-visible" fill="none">
              <path data-bsa-path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
            </svg>
          </div>

          {Array.from({ length: BLOCK_COUNT }).map((_, i) => {
            const pos = getArcPosition(i, BLOCK_COUNT, mobileArcRadius)
            const color = COLORS[i % COLORS.length]
            const nextPos = i < BLOCK_COUNT - 1 ? getArcPosition(i + 1, BLOCK_COUNT, mobileArcRadius) : null
            const half = mobileBlockSize / 2
            const cx = mobileArcRadius + half + 12
            const cy = mobileArcRadius + half + 12

            return (
              <div key={i}>
                <div
                  data-block-i={i}
                  className="absolute opacity-0 flex flex-col items-center justify-center"
                  style={{
                    width: mobileBlockSize, height: mobileBlockSize,
                    left: cx + pos.x - half, top: cy + pos.y - half,
                    borderRadius: 10, border: '1.5px solid #333', background: '#0f1c2e',
                    transformOrigin: 'center',
                  }}
                >
                  <span data-hash-i={i} className="font-mono text-[8px] opacity-0" style={{ color }}>
                    {genHash(i)}
                  </span>
                  <div data-dot-i={i} className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0"
                    style={{ backgroundColor: color, transformOrigin: 'center' }}
                  />
                </div>
                {nextPos && (
                  <svg data-conn-i={i} className="absolute inset-0 pointer-events-none opacity-0" style={{ overflow: 'visible' }}>
                    <line
                      x1={cx + pos.x} y1={cy + pos.y}
                      x2={cx + nextPos.x} y2={cy + nextPos.y}
                      stroke={color} strokeWidth="1.5" strokeOpacity="0.7"
                      strokeDasharray="5 3"
                    />
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={skip}
        className="absolute bottom-8 right-8 text-zinc-500 hover:text-zinc-200 text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer"
      >
        Skip
      </button>
    </div>
  )
}
