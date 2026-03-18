"use client"

import { ArrowRight } from "lucide-react"
import { HACKATHON_URL } from "@/lib/constants"

export default function ConferenceHackathonBanner() {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger">
          <a
            href={HACKATHON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-[#6366f1]/30 bg-gradient-to-b from-[#6366f1]/15 to-[#6366f1]/[0.03] px-6 py-10 md:px-16 md:py-14 text-center transition-all duration-300 hover:border-[#6366f1]/50 hover:from-[#6366f1]/20 hover:to-[#6366f1]/[0.06]"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#818cf8] mb-4">
              March 20 – 22 | EPFL Campus
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Stablecoin & Payments
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-400 mb-8">
              Conference & Hackathon
            </p>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-base font-semibold text-white group-hover:bg-white/15 transition-all duration-300">
              Visit Event Website
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
