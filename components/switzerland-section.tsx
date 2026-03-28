"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"

// Swiss flag in ASCII - each char is a "pixel"
const FLAG_ROWS = [
  "                              ",
  "   ██████████████████████████ ",
  "   ██████████████████████████ ",
  "   ████████████  ████████████ ",
  "   ████████████  ████████████ ",
  "   ████████████  ████████████ ",
  "   ██████  ████  ████  ██████ ",
  "   ██████  ████  ████  ██████ ",
  "   ██████  ████  ████  ██████ ",
  "   ████████████  ████████████ ",
  "   ████████████  ████████████ ",
  "   ████████████  ████████████ ",
  "   ██████████████████████████ ",
  "   ██████████████████████████ ",
  "                              ",
]

export default function SwitzerlandSection() {
  const flagRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!flagRef.current || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Animate each character in the flag
            const chars = flagRef.current?.querySelectorAll('[data-flag-char]')
            if (chars) {
              animate(chars, {
                opacity: [0, 1],
                scale: [0, 1],
                duration: 400,
                delay: stagger(8, { from: 'center' }),
                easing: 'easeOutCubic',
              })
            }

            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(flagRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* ASCII Flag */}
          <div ref={flagRef} className="flex justify-center md:justify-start">
            <pre className="font-mono text-[8px] md:text-[10px] leading-[1.1] select-none" aria-hidden="true">
              {FLAG_ROWS.map((row, ri) => (
                <div key={ri} className="whitespace-pre">
                  {row.split('').map((char, ci) => (
                    <span
                      key={ci}
                      data-flag-char
                      className={`inline-block opacity-0 ${char === '\u2588' ? 'text-red-600' : 'text-transparent'}`}
                      style={{ width: '1ch' }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Made in Switzerland
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-zinc-50 leading-[1.0] mb-6 title-shimmer">
              Rooted at EPFL, Lausanne
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              We are based at the Swiss Federal Institute of Technology in Lausanne, one of the world's leading
              technical universities. Switzerland is home to Crypto Valley, a global hub for blockchain innovation,
              and EPFL sits at the heart of it.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Our members benefit from world-class research labs, a thriving startup ecosystem, and a regulatory
              environment that embraces decentralized technologies. From Zurich to Zug to Lausanne, Switzerland
              shapes the future of blockchain.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-zinc-600">
              <span>46.5197 N, 6.5657 E</span>
              <span>Crypto Valley</span>
              <span>Est. 2018</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
