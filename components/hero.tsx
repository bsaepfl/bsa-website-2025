import Link from "next/link"
import { BSA_LOGO_PATH } from "./bsa-logo-path"

const stats = [
  { value: "350+", label: "Conference attendees" },
  { value: "$55k+", label: "Hackathon prizes" },
  { value: "8", label: "Startups incubated" },
  { value: "2018", label: "Founded as a DAO" },
]

export default function Hero() {
  return (
    <section className="min-h-[80dvh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <svg
              viewBox="20 20 160 175"
              className="w-48 h-48 md:w-72 md:h-72"
              fill="none"
            >
              <path
                d={BSA_LOGO_PATH}
                fill="#d4d4d8"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6">
              Blockchain Student Association
            </p>
            <h1 className="text-5xl md:text-7xl font-display text-zinc-50 leading-[0.95] tracking-tight mb-8">
              Blockchain
              <br />
              at EPFL
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-[50ch] mb-10">
              Join us for workshops, conferences, hackathons, and more.
            </p>
            <div className="flex flex-wrap gap-3">
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
        <div className="mt-24 md:mt-32 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
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
