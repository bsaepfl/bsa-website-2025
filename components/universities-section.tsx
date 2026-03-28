"use client"

import { useEffect, useRef } from "react"
import { animate } from "animejs"

const universities = [
  { name: "EPFL", fullName: "Ecole Polytechnique Federale de Lausanne", href: "https://epfl.ch", logo: "/universities/epfl.svg" },
  { name: "ETH Zurich", fullName: "Swiss Federal Institute of Technology", href: "https://ethz.ch", logo: "/universities/eth-zurich.png" },
  { name: "HEC Lausanne", fullName: "Faculty of Business and Economics, UNIL", href: "https://hec.unil.ch", logo: "/universities/hec-lausanne.png" },
  { name: "HEIG-VD", fullName: "School of Engineering and Management", href: "https://heig-vd.ch", logo: "/universities/heig-vd.png" },
  { name: "HSG", fullName: "University of St. Gallen", href: "https://unisg.ch", logo: "/universities/hsg.svg" },
]

// Double the array for seamless loop
const tickerItems = [...universities, ...universities]

export default function UniversitiesSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    const anim = animate(track, {
      translateX: [0, -totalWidth],
      duration: 25000,
      easing: 'linear',
      loop: true,
    })

    // Pause on hover
    const pause = () => anim.pause()
    const play = () => anim.play()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', play)

    return () => {
      anim.pause()
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', play)
    }
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="mb-12 opacity-0">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Community
          </p>
          <h2 className="text-4xl md:text-6xl font-display text-zinc-50 max-w-md leading-[1.05]">
            Our members come from
          </h2>
        </div>
      </div>

      {/* Full-width ticker */}
      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {tickerItems.map((uni, i) => (
            <a
              key={`${uni.name}-${i}`}
              href={uni.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/50 px-10 py-6 flex items-center justify-center min-w-[180px] md:min-w-[220px] h-[100px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uni.logo}
                alt={uni.fullName}
                className="h-10 md:h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200 brightness-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
