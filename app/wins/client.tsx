"use client"

import { wins } from "@/data/wins"

export default function WinsClient() {
  // Group wins by year, preserving original (most-recent-first) order within each group.
  const years = Array.from(new Set(wins.map((w) => w.year)))
  const winsByYear = years.map((y) => ({
    year: y,
    items: wins.filter((w) => w.year === y),
  }))

  const totalPrize = wins
    .map((w) => w.prize?.match(/\$?([\d,]+)/)?.[1]?.replace(/,/g, ""))
    .filter(Boolean)
    .reduce((acc, n) => acc + Number(n), 0)

  const stats = [
    { value: String(wins.length), label: "Wins recorded" },
    { value: String(years.length), label: "Years competing" },
    { value: `$${(totalPrize / 1000).toFixed(0)}k+`, label: "In prize money" },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Wins
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-6 title-shimmer">
            Built. Shipped. Won.
          </h1>
          <p className="text-zinc-400 text-lg mb-16 max-w-xl">
            BSA members compete, and win, at hackathons
            across Europe and beyond. A running record of what our members shipped.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pb-12 mb-20 border-b border-zinc-800">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-mono text-zinc-50 font-light tabular-nums">
                  {s.value}
                </p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline grouped by year */}
          <div className="space-y-24">
            {winsByYear.map((group) => (
              <div key={group.year}>
                <div className="flex items-baseline gap-6 mb-12">
                  <h2 className="text-4xl md:text-6xl font-display text-zinc-50 tabular-nums">
                    {group.year}
                  </h2>
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-[0.2em]">
                    {group.items.length} {group.items.length === 1 ? "win" : "wins"}
                  </span>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-zinc-800" />

                  <div className="space-y-12">
                    {group.items.map((win, i) => (
                      <div key={i} className="group relative pl-10 md:pl-14">
                        {/* Dot */}
                        <div className="absolute left-0 md:left-1 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 border-zinc-600 bg-zinc-800 transition-all duration-300 group-hover:border-zinc-400 group-hover:bg-zinc-700 group-hover:shadow-[0_0_12px_rgba(250,250,250,0.15)]" />

                        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
                          {/* Main content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="text-xs font-mono text-zinc-500">
                                {win.date}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-zinc-500 border-zinc-700 group-hover:text-zinc-300 group-hover:border-zinc-500 transition-colors duration-300">
                                {win.category}
                              </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-display text-zinc-200 mb-1 group-hover:text-zinc-50 transition-colors duration-300">
                              {win.event}
                            </h3>
                            <p className="text-zinc-300 text-base mb-3">{win.placement}</p>

                            {win.description && (
                              <p className="text-zinc-400 leading-relaxed mb-3 max-w-2xl">
                                {win.description}
                              </p>
                            )}

                            {win.team && (
                              <p className="text-xs font-mono text-zinc-600">
                                <span className="text-zinc-500">Team:</span> {win.team}
                              </p>
                            )}

                            {win.link && (
                              <a
                                href={win.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors duration-200 mt-2"
                              >
                                Read more &rarr;
                              </a>
                            )}
                          </div>

                          {/* Prize, right column */}
                          {win.prize && (
                            <div className="shrink-0 md:w-48 md:text-right mt-4 md:mt-0 order-first md:order-last">
                              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                                Prize
                              </p>
                              <div className="space-y-0.5">
                                {win.prize.split(" + ").map((part, pi) => (
                                  <p
                                    key={pi}
                                    className="text-2xl md:text-3xl font-mono text-emerald-300/90 tabular-nums leading-tight"
                                  >
                                    {part}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
