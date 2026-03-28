"use client"

import { useEffect, useRef, useCallback } from "react"
import { animate, createTimeline, stagger } from "animejs"

// Rainbow palette inspired by animejs.com
const COLORS = [
  '#ff4b4b', // red
  '#ff7d36', // corail
  '#ffa828', // orange
  '#ffcc2a', // yellow
  '#b7ff54', // lime
  '#00ffaa', // turquoise
  '#05dbe9', // cyan
  '#4d9cff', // king blue
  '#7c85ff', // indigo
  '#a369ff', // lavender
]

const BLOCK_COUNT = 8

function generateHash(seed: number): string {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let j = 0; j < 6; j++) {
    hash += chars[(seed * 7 + j * 13 + 3) % chars.length]
  }
  return hash
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

  useEffect(() => {
    if (hasInit.current) return
    hasInit.current = true

    // Mark intro as active (hides navbar)
    document.documentElement.classList.add('intro-active')

    // Entrance timeline
    const tl = createTimeline({ defaults: { easing: 'easeOutCubic' } })

    // Title chars animate in
    tl.add('[data-intro-char]', {
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.8, 1],
      duration: 600,
      delay: stagger(30),
    }, 200)

    // Subtitle
    tl.add('[data-intro-sub]', {
      opacity: [0, 0.5],
      duration: 800,
    }, 800)

    // Scroll hint pulse
    animate('[data-scroll-cue]', {
      opacity: [0, 0.4, 0],
      translateY: [0, 6, 0],
      duration: 2400,
      loop: true,
      easing: 'easeInOutSine',
      delay: 1500,
    })
  }, [])

  // Scroll-driven animation loop
  useEffect(() => {
    const update = () => {
      const p = getProgress()

      // Toggle intro-active class
      if (p >= 0.95) {
        document.documentElement.classList.remove('intro-active')
      } else {
        document.documentElement.classList.add('intro-active')
      }

      // Animate each block
      document.querySelectorAll<HTMLElement>('[data-block-idx]').forEach((el) => {
        const i = parseInt(el.dataset.blockIdx || '0')
        const blockStart = i * 0.08
        const blockProgress = Math.max(0, Math.min(1, (p - blockStart) / 0.1))

        // Scale in with bounce feel
        const scale = blockProgress < 1
          ? 0.3 + blockProgress * 0.7
          : 1
        const yOffset = (1 - blockProgress) * 60
        const rotation = (1 - blockProgress) * (i % 2 === 0 ? -15 : 15)

        el.style.opacity = String(blockProgress)
        el.style.transform = `translateY(${yOffset}px) scale(${scale}) rotate(${rotation}deg)`

        // Color the border when fully visible
        if (blockProgress > 0.8) {
          const color = COLORS[i % COLORS.length]
          el.style.borderColor = color
          el.style.boxShadow = `0 0 ${20 + blockProgress * 15}px ${color}22, inset 0 0 ${10 + blockProgress * 10}px ${color}08`
        }
      })

      // Animate chain links
      document.querySelectorAll<HTMLElement>('[data-chain-idx]').forEach((el) => {
        const i = parseInt(el.dataset.chainIdx || '0')
        const linkStart = (i + 1) * 0.08 + 0.03
        const linkProgress = Math.max(0, Math.min(1, (p - linkStart) / 0.06))
        const color = COLORS[i % COLORS.length]

        el.style.opacity = String(linkProgress)
        el.style.transform = `scaleX(${linkProgress})`
        el.style.background = `linear-gradient(90deg, ${color}, ${COLORS[(i + 1) % COLORS.length]})`
      })

      // Hash text reveal
      document.querySelectorAll<HTMLElement>('[data-hash-idx]').forEach((el) => {
        const i = parseInt(el.dataset.hashIdx || '0')
        const hashStart = i * 0.08 + 0.07
        const hashProgress = Math.max(0, Math.min(1, (p - hashStart) / 0.05))
        el.style.opacity = String(hashProgress * 0.7)
      })

      // Nonce dots
      document.querySelectorAll<HTMLElement>('[data-nonce-idx]').forEach((el) => {
        const i = parseInt(el.dataset.nonceIdx || '0')
        const nonceStart = i * 0.08 + 0.09
        const nonceProgress = Math.max(0, Math.min(1, (p - nonceStart) / 0.04))
        const color = COLORS[i % COLORS.length]
        el.style.opacity = String(nonceProgress)
        el.style.transform = `scale(${nonceProgress})`
        el.style.backgroundColor = color
      })

      // Title fades out
      const titleEl = document.querySelector<HTMLElement>('[data-intro-title]')
      if (titleEl) {
        const fadeOut = Math.max(0, 1 - p * 3)
        titleEl.style.opacity = String(fadeOut)
        titleEl.style.transform = `translateY(${-p * 80}px)`
      }

      // Overall section fade-out at end
      const stickyEl = document.querySelector<HTMLElement>('[data-intro-sticky]')
      if (stickyEl) {
        const fadeStart = 0.85
        const fadeProgress = Math.max(0, Math.min(1, (p - fadeStart) / 0.15))
        stickyEl.style.opacity = String(1 - fadeProgress)
      }

      rafId.current = requestAnimationFrame(update)
    }

    rafId.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId.current)
  }, [getProgress])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('intro-active')
    }
  }, [])

  const titleText = "Building the chain"
  const chars = titleText.split('')

  return (
    <section
      ref={sectionRef}
      className="relative -mt-20 md:-mt-24"
      style={{ height: '300vh' }}
    >
      <div
        data-intro-sticky
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0b]"
        style={{ zIndex: 45 }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Title */}
        <div data-intro-title className="text-center mb-16 md:mb-24 px-6 relative z-10">
          <p
            data-intro-sub
            className="text-xs font-mono text-zinc-600 uppercase tracking-[0.3em] mb-6 opacity-0"
          >
            Block by block
          </p>
          <h2 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] tracking-tight">
            {chars.map((char, i) => (
              <span
                key={i}
                data-intro-char
                className="inline-block opacity-0"
                style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Blockchain visualization */}
        <div className="relative z-10 w-full max-w-6xl px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar">
              {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  {/* Block */}
                  <div
                    data-block-idx={i}
                    className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg border-2 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center opacity-0"
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {/* Block number */}
                    <span
                      className="text-sm md:text-lg font-mono font-light"
                      style={{ color: COLORS[i % COLORS.length] }}
                    >
                      {i}
                    </span>
                    {/* Hash */}
                    <span
                      data-hash-idx={i}
                      className="text-[7px] md:text-[9px] font-mono text-zinc-600 mt-0.5 opacity-0"
                    >
                      {generateHash(i)}
                    </span>
                    {/* Nonce dot */}
                    <div
                      data-nonce-idx={i}
                      className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full opacity-0"
                      style={{ transformOrigin: 'center' }}
                    />
                  </div>

                  {/* Chain link */}
                  {i < BLOCK_COUNT - 1 && (
                    <div
                      data-chain-idx={i}
                      className="w-4 md:w-8 h-0.5 rounded-full opacity-0"
                      style={{ transformOrigin: 'left center' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          data-scroll-cue
          className="absolute bottom-16 flex flex-col items-center gap-2 opacity-0"
        >
          <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.3em]">
            scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </div>
    </section>
  )
}
