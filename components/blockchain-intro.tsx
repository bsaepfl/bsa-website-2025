"use client"

import { useEffect, useRef, useCallback } from "react"
import { animate, createTimeline, stagger } from "animejs"
import { BSA_LOGO_PATH } from "./bsa-logo-path"

const COLORS = [
  '#ff4b4b', '#ff7d36', '#ffa828', '#ffcc2a', '#b7ff54',
  '#00ffaa', '#05dbe9', '#4d9cff', '#7c85ff', '#a369ff',
]

const BLOCK_COUNT = 10

function genHash(i: number): string {
  const c = '0123456789abcdef'
  let h = ''
  for (let j = 0; j < 6; j++) h += c[(i * 11 + j * 7 + 5) % c.length]
  return h
}

// Position blocks in a semicircle arc (top half, opening downward)
function getArcPosition(index: number, total: number, radius: number) {
  const startAngle = Math.PI * 1.15
  const endAngle = Math.PI * -0.15
  const angle = startAngle + ((endAngle - startAngle) * index) / (total - 1)
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

export default function BlockchainIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasInit = useRef(false)
  const rafId = useRef<number>(0)

  const getProgress = useCallback(() => {
    if (!sectionRef.current) return 0
    const rect = sectionRef.current.getBoundingClientRect()
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight
    if (scrollable <= 0) return 0
    return Math.max(0, Math.min(1, -rect.top / scrollable))
  }, [])

  // Entrance animation
  useEffect(() => {
    if (hasInit.current) return
    hasInit.current = true
    document.documentElement.classList.add('intro-active')

    const tl = createTimeline({ defaults: { easing: 'easeOutCubic' } })

    tl.add('[data-intro-word]', {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.85, 1],
      duration: 800,
      delay: stagger(120),
    }, 200)

    tl.add('[data-intro-sub]', {
      opacity: [0, 0.4],
      translateY: [10, 0],
      duration: 1000,
    }, 700)

    animate('[data-scroll-cue]', {
      opacity: [0.3, 1, 0.3],
      translateY: [0, 6, 0],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
      delay: 1200,
    })
  }, [])

  // Scroll-driven updates
  useEffect(() => {
    const update = () => {
      const p = getProgress()

      if (p >= 0.8) {
        document.documentElement.classList.remove('intro-active')
      } else {
        document.documentElement.classList.add('intro-active')
      }

      // Phases (shorter, snappier)
      const blockPhase = Math.min(1, p / 0.5)
      const logoPhase = Math.max(0, Math.min(1, (p - 0.52) / 0.15))
      const fadePhase = Math.max(0, Math.min(1, (p - 0.75) / 0.15))

      // Blocks
      document.querySelectorAll<HTMLElement>('[data-block-i]').forEach((el) => {
        const i = parseInt(el.dataset.blockI || '0')
        const start = (i / BLOCK_COUNT) * 0.7
        const bp = Math.max(0, Math.min(1, (blockPhase - start) / 0.18))
        const ease = bp * bp * (3 - 2 * bp) // smoothstep

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

      // Connection lines (more visible)
      document.querySelectorAll<HTMLElement>('[data-conn-i]').forEach((el) => {
        const i = parseInt(el.dataset.connI || '0')
        const start = ((i + 0.8) / BLOCK_COUNT) * 0.7
        const cp = Math.max(0, Math.min(1, (blockPhase - start) / 0.12))
        el.style.opacity = String(cp * 0.9)
      })

      // Hashes
      document.querySelectorAll<HTMLElement>('[data-hash-i]').forEach((el) => {
        const i = parseInt(el.dataset.hashI || '0')
        const start = (i / BLOCK_COUNT) * 0.7 + 0.06
        const hp = Math.max(0, Math.min(1, (blockPhase - start) / 0.1))
        el.style.opacity = String(hp)
      })

      // Nonce dots
      document.querySelectorAll<HTMLElement>('[data-dot-i]').forEach((el) => {
        const i = parseInt(el.dataset.dotI || '0')
        const start = (i / BLOCK_COUNT) * 0.7 + 0.1
        const dp = Math.max(0, Math.min(1, (blockPhase - start) / 0.08))
        el.style.opacity = String(dp)
        el.style.transform = `scale(${dp * dp})`
      })

      // BSA Logo (animate ALL instances for desktop/mobile)
      document.querySelectorAll<HTMLElement>('[data-bsa-logo]').forEach((logoEl) => {
        const ease = logoPhase * logoPhase * (3 - 2 * logoPhase)
        logoEl.style.opacity = String(logoPhase)
        logoEl.style.transform = `translate(-50%, -50%) scale(${0.1 + ease * 0.9})`
      })

      document.querySelectorAll<SVGPathElement>('[data-bsa-path]').forEach((logoPath) => {
        if (logoPhase > 0) {
          logoPath.style.filter = `drop-shadow(0 0 ${logoPhase * 25}px rgba(0,255,170,0.3)) drop-shadow(0 0 ${logoPhase * 50}px rgba(77,156,255,0.15))`
        }
      })

      // Title fade
      const titleEl = document.querySelector<HTMLElement>('[data-intro-title]')
      if (titleEl) {
        const fade = Math.max(0, 1 - p * 3)
        titleEl.style.opacity = String(fade)
        titleEl.style.transform = `translateY(${-p * 120}px) scale(${1 - p * 0.15})`
      }

      // Overall fade
      const sticky = document.querySelector<HTMLElement>('[data-intro-sticky]')
      if (sticky) {
        sticky.style.opacity = String(1 - fadePhase)
      }

      rafId.current = requestAnimationFrame(update)
    }

    rafId.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId.current)
  }, [getProgress])

  useEffect(() => {
    return () => { document.documentElement.classList.remove('intro-active') }
  }, [])

  const titleWords = ["Building", "the", "chain"]
  // Use a safe default, actual sizing handled by CSS
  const arcRadius = 240
  const blockSize = 80
  const mobileArcRadius = 130
  const mobileBlockSize = 48

  return (
    <section
      ref={sectionRef}
      className="relative -mt-20 md:-mt-24"
      style={{ height: '220vh' }}
    >
      <div
        data-intro-sticky
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#0d1a2b]"
        style={{ zIndex: 45 }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,170,0.03) 0%, rgba(77,156,255,0.02) 40%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }} />

        {/* Title - positioned above the arc */}
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

        {/* Central container for arc + logo */}
        <div className="relative flex items-center justify-center">
          {/* Desktop arc */}
          <div className="hidden md:block relative" style={{ width: `${arcRadius * 2 + blockSize + 40}px`, height: `${arcRadius * 2 + blockSize + 40}px` }}>
            {/* BSA Logo center */}
            <div data-bsa-logo className="absolute opacity-0 overflow-visible" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0.1)', transformOrigin: 'center' }}>
              <svg viewBox="0 0 200 215" className="w-48 h-48 overflow-visible" fill="none">
                <path data-bsa-path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
              </svg>
            </div>

            {/* Desktop blocks */}
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

          {/* Mobile arc */}
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

        {/* Scroll cue */}
        <button
          data-scroll-cue
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          className="absolute bottom-10 border border-zinc-600 rounded-full px-5 py-2.5 flex items-center gap-2 hover:border-zinc-400 hover:bg-white/5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
        >
          <span className="text-zinc-300 text-xs font-mono uppercase tracking-[0.2em]">Scroll down</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-zinc-400">
            <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
