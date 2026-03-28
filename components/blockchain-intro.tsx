"use client"

import { useEffect, useRef, useState } from "react"
import { animate, stagger, createTimeline, utils } from "animejs"

const BLOCK_COUNT = 7
const LINK_WIDTH = 48

export default function BlockchainIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const hasPlayed = useRef(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll-driven progress
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      if (sectionHeight <= 0) return
      const rawProgress = -rect.top / sectionHeight
      setScrollProgress(Math.max(0, Math.min(1, rawProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    if (hasPlayed.current || !canvasRef.current) return
    hasPlayed.current = true

    // Fade in the title text
    animate('[data-intro-text]', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: stagger(120),
      easing: 'easeOutCubic',
    })

    // Subtle pulse on the scroll indicator
    animate('[data-scroll-hint]', {
      opacity: [0, 0.6, 0],
      translateY: [0, 8, 0],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
      delay: 1200,
    })
  }, [])

  // Animate blocks based on scroll progress
  useEffect(() => {
    if (!canvasRef.current) return

    const blocks = canvasRef.current.querySelectorAll('[data-block]')
    const links = canvasRef.current.querySelectorAll('[data-link]')
    const hashes = canvasRef.current.querySelectorAll('[data-hash]')

    blocks.forEach((block, i) => {
      const el = block as HTMLElement
      const blockProgress = Math.max(0, Math.min(1,
        (scrollProgress - (i * 0.1)) / 0.12
      ))

      el.style.opacity = String(blockProgress)
      el.style.transform = `scale(${0.8 + blockProgress * 0.2}) translateY(${(1 - blockProgress) * 20}px)`
    })

    links.forEach((link, i) => {
      const el = link as HTMLElement
      const linkProgress = Math.max(0, Math.min(1,
        (scrollProgress - ((i + 1) * 0.1 + 0.05)) / 0.08
      ))

      el.style.opacity = String(linkProgress)
      el.style.transform = `scaleX(${linkProgress})`
    })

    hashes.forEach((hash, i) => {
      const el = hash as HTMLElement
      const hashProgress = Math.max(0, Math.min(1,
        (scrollProgress - (i * 0.1 + 0.06)) / 0.06
      ))
      el.style.opacity = String(hashProgress * 0.5)
    })
  }, [scrollProgress])

  // Generate pseudo-random hash strings
  const hashes = useRef(
    Array.from({ length: BLOCK_COUNT }, (_, i) => {
      const chars = '0123456789abcdef'
      let hash = '0x'
      for (let j = 0; j < 8; j++) {
        hash += chars[(i * 7 + j * 13) % chars.length]
      }
      return hash
    })
  ).current

  return (
    <section
      ref={sectionRef}
      className="relative -mt-20 md:-mt-24"
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title */}
        <div className="text-center mb-16 md:mb-20 px-6">
          <p
            data-intro-text
            className="text-xs font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4 opacity-0"
          >
            Block by block
          </p>
          <h2
            data-intro-text
            className="text-4xl md:text-6xl font-display text-zinc-50 opacity-0"
          >
            Building the chain
          </h2>
        </div>

        {/* Blockchain visualization */}
        <div
          ref={canvasRef}
          className="flex items-center justify-center px-6 w-full max-w-5xl"
        >
          <div className="flex items-center overflow-x-auto hide-scrollbar">
            {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {/* Block */}
                <div
                  data-block
                  className="relative w-20 h-20 md:w-28 md:h-28 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center opacity-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <span className="text-xs md:text-sm font-mono text-zinc-300 font-light">
                    #{i}
                  </span>
                  <span
                    data-hash
                    className="text-[8px] md:text-[10px] font-mono text-zinc-600 mt-1 opacity-0"
                  >
                    {hashes[i]}
                  </span>
                  {/* Nonce dot */}
                  <div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-500"
                    style={{
                      opacity: scrollProgress > (i * 0.1 + 0.08) ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}
                  />
                </div>

                {/* Chain link */}
                {i < BLOCK_COUNT - 1 && (
                  <div
                    data-link
                    className="w-6 md:w-12 h-px bg-zinc-600 opacity-0"
                    style={{ transformOrigin: 'left' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          data-scroll-hint
          className="absolute bottom-12 text-zinc-600 text-xs font-mono tracking-wider opacity-0"
        >
          scroll
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-900">
          <div
            className="h-full bg-zinc-600 transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
