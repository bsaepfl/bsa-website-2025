"use client"

import Link from "next/link"
import { BSA_LOGO_PATH } from "./bsa-logo-path"
import { useEffect, useRef } from "react"
import { animate, createTimeline, stagger, svg } from "animejs"

const stats = [
  { value: "350+", label: "Conference attendees" },
  { value: "$90k+", label: "Hackathon prizes" },
  { value: "8", label: "Startups incubated" },
  { value: "2018", label: "Founded as a DAO" },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<SVGPathElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return
    hasAnimated.current = true

    const tl = createTimeline({
      defaults: {
        easing: 'easeOutCubic',
      }
    })

    // 1. Draw the BSA logo with SVG stroke
    if (logoRef.current) {
      const drawable = svg.createDrawable(logoRef.current)
      tl.add(drawable, {
        draw: ['0 0', '0 1'],
        duration: 1200,
        easing: 'easeInOutQuad',
      }, 0)
      // Fade in fill after stroke draws
      tl.add(logoRef.current, {
        fillOpacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
      }, 800)
    }

    // 2. Cascade text elements
    tl.add('[data-hero-text]', {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      delay: stagger(100),
    }, 600)

    // 3. Stats bar slides up
    tl.add('[data-hero-stats]', {
      opacity: [0, 1],
      duration: 500,
    }, 1200)

    tl.add('[data-stat-item]', {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
      delay: stagger(80),
    }, 1300)

  }, [])

  return (
    <section ref={sectionRef} className="flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <svg
              viewBox="20 20 160 175"
              className="w-48 h-48 md:w-72 md:h-72"
              fill="none"
            >
              <path
                ref={logoRef}
                d={BSA_LOGO_PATH}
                fill="#d4d4d8"
                fillOpacity={0}
                stroke="#d4d4d8"
                strokeWidth="0.5"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <p data-hero-text className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6 opacity-0">
              Blockchain Student Association
            </p>
            <h1 data-hero-text className="text-6xl md:text-8xl font-display text-zinc-50 leading-[0.9] tracking-tight mb-8 opacity-0">
              Blockchain
              <br />
              at EPFL
            </h1>
            <p data-hero-text className="text-zinc-400 text-lg leading-relaxed max-w-[50ch] mb-10 opacity-0">
              Join us for workshops, conferences, hackathons, and more.
            </p>
            <div data-hero-text className="flex flex-wrap gap-3 opacity-0">
              <Link
                href="/about"
                className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-6 py-2.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200"
              >
                Learn more
              </Link>
              <Link
                href="/events"
                className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-6 py-2.5 hover:text-zinc-50 hover:border-zinc-500 active:scale-[0.98] transition-all duration-200"
              >
                See events
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div data-hero-stats className="mt-24 md:mt-32 pt-8 border-t border-zinc-800 opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} data-stat-item className="opacity-0">
                <p className="text-2xl md:text-3xl font-mono text-zinc-50 font-light tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
