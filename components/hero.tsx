"use client"

import Link from "next/link"
import { BSA_LOGO_PATH } from "./bsa-logo-path"
import { useEffect, useRef, useCallback } from "react"
import { animate, createTimeline, stagger, svg } from "animejs"

const stats = [
  { value: 350, suffix: "+", label: "Conference attendees" },
  { value: 90, prefix: "$", suffix: "k+", label: "Hackathon prizes" },
  { value: 8, suffix: "", label: "Startups incubated" },
  { value: 2018, suffix: "", label: "Active since" },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<SVGPathElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const statsAnimated = useRef(false)

  // Parallax: mouse on desktop, gyroscope on mobile
  useEffect(() => {
    const wrap = logoWrapRef.current
    if (!wrap) return
    const maxMove = 12

    // Desktop: mouse tracking
    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height
      wrap.style.transform = `translate(${dx * maxMove}px, ${dy * maxMove}px)`
    }

    // Mobile: device orientation (gyroscope)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma || 0) / 45 // left-right tilt, normalized
      const y = (e.beta || 0) / 45  // front-back tilt, normalized
      wrap.style.transform = `translate(${x * maxMove}px, ${(y - 0.5) * maxMove}px)`
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    // Request permission on iOS 13+
    const doe = DeviceOrientationEvent as any
    if (typeof doe.requestPermission === 'function') {
      // Permission will be requested on first user tap
      const requestOnTap = () => {
        doe.requestPermission().then((state: string) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true })
          }
        }).catch(() => {})
        window.removeEventListener('touchstart', requestOnTap)
      }
      window.addEventListener('touchstart', requestOnTap, { once: true })
    } else {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    }

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  // Entrance animation
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return
    hasAnimated.current = true

    const tl = createTimeline({ defaults: { easing: 'easeOutCubic' } })

    if (logoRef.current) {
      const drawable = svg.createDrawable(logoRef.current)
      tl.add(drawable, { draw: ['0 0', '0 1'], duration: 1200, easing: 'easeInOutQuad' }, 0)
    }

    tl.add('[data-hero-text]', {
      opacity: [0, 1], translateY: [24, 0], duration: 700, delay: stagger(100),
    }, 600)

    tl.add('[data-hero-stats]', { opacity: [0, 1], duration: 500 }, 1200)
    tl.add('[data-stat-item]', {
      opacity: [0, 1], translateY: [16, 0], duration: 500, delay: stagger(80),
    }, 1300)

    // Typewriter effect on subtitle
    const typeText = "Join us for workshops, conferences, hackathons, and more."
    const target = document.querySelector<HTMLElement>('[data-typewriter-text]')
    if (target) {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i <= typeText.length) {
          target.textContent = typeText.slice(0, i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 35)
    }
  }, [])

  // Counting stats when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated.current) {
            statsAnimated.current = true
            document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
              const target = parseInt(el.dataset.count || '0')
              const prefix = el.dataset.prefix || ''
              const suffix = el.dataset.suffix || ''
              const obj = { val: 0 }
              animate(obj, {
                val: target,
                duration: target > 100 ? 1500 : 800,
                easing: 'easeOutCubic',
                onUpdate: () => {
                  el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
                },
              })
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    const statsEl = document.querySelector('[data-hero-stats]')
    if (statsEl) observer.observe(statsEl)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full py-lg md:py-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl md:gap-3xl items-center">

          {/* Logo with parallax */}
          <div className="flex justify-center md:justify-start">
            <div ref={logoWrapRef} className="transition-transform duration-200 ease-out">
              <svg
                viewBox="20 20 160 175"
                className="w-60 h-60 md:w-96 md:h-96"
                fill="none"
              >
                <path
                  ref={logoRef}
                  d={BSA_LOGO_PATH}
                  fill="#fafafa"
                  fillOpacity={1}
                  stroke="#fafafa"
                  strokeWidth="0.5"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div>
            <p data-hero-text className="text-eyebrow font-mono text-zinc-500 uppercase mb-md opacity-0">
              Blockchain Student Association
            </p>
            <h1 data-hero-text className="text-hero font-display text-zinc-50 mb-lg opacity-0">
              Blockchain
              <br />
              at EPFL
            </h1>
            <p data-hero-text data-typewriter className="text-zinc-400 text-lead max-w-[50ch] mb-xl opacity-0">
              <span data-typewriter-text></span>
              <span className="inline-block w-[2px] h-[1.1em] bg-zinc-400 ml-0.5 align-middle animate-pulse" />
            </p>
            <div data-hero-text className="flex flex-wrap gap-xs opacity-0">
              <Link
                href="/about"
                className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-md py-2.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200"
              >
                Learn more
              </Link>
              <Link
                href="/events"
                className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-md py-2.5 hover:text-zinc-50 hover:border-zinc-500 active:scale-[0.98] transition-all duration-200"
              >
                See events
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar with counting */}
        <div data-hero-stats className="mt-3xl md:mt-4xl pt-lg border-t border-zinc-800 opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            {stats.map((stat) => (
              <div key={stat.label} data-stat-item className="opacity-0">
                <p
                  data-count={stat.value}
                  data-prefix={stat.prefix || ''}
                  data-suffix={stat.suffix}
                  className="text-display-3 font-mono text-zinc-50 font-light tabular-nums"
                >
                  {stat.prefix || ''}{stat.value}{stat.suffix}
                </p>
                <p className="text-eyebrow text-zinc-500 mt-2xs uppercase">
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
