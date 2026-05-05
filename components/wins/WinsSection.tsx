import Link from "next/link"
import { wins } from "@/data/wins"

export default function WinsSection() {
  const featured = wins.slice(0, 3)

  return (
    <section id="wins" className="pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Wins
            </p>
            <h2 className="text-5xl md:text-7xl font-display text-zinc-50 title-shimmer">
              Built. Shipped. Won.
            </h2>
          </div>
          <Link
            href="/wins"
            className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
          >
            See all wins <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0">
          {featured.map((win, i) => (
            <div
              key={i}
              data-reveal-child
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 opacity-0 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 border border-zinc-700 rounded-full px-2.5 py-1">
                  {win.category}
                </span>
                <span className="text-xs font-mono text-zinc-500 tabular-nums">
                  {win.year}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display text-zinc-50 leading-tight mb-2">
                {win.event}
              </h3>
              <p className="text-zinc-300 text-base mb-4">{win.placement}</p>

              {win.description && (
                <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {win.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500">
                {win.team && <span>{win.team}</span>}
                {win.team && win.prize && <span className="text-zinc-700">/</span>}
                {win.prize && <span className="text-zinc-300">{win.prize}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
