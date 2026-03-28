"use client"

import { HACKATHON_URL } from "@/lib/constants"

export default function ConferenceHackathonBanner() {
  return (
    <section className="py-6 md:py-10">
      <div data-reveal className="max-w-6xl mx-auto px-6 opacity-0">
        <a
          href={HACKATHON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-8 md:px-12 md:py-10 transition-all duration-300 hover:border-zinc-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">
                March 20-22 / EPFL Campus
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-zinc-50">
                Stablecoin & Payments
              </h2>
              <p className="text-zinc-400 mt-1">
                Conference & Hackathon
              </p>
            </div>
            <span className="text-sm text-zinc-400 border border-zinc-700 rounded-full px-4 py-2 w-fit group-hover:text-zinc-50 group-hover:border-zinc-500 transition-colors duration-200">
              Visit event site
              <span className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
