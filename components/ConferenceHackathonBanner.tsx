"use client"

import { ArrowRight } from "lucide-react"
import { HACKATHON_URL } from "@/lib/constants"

export default function ConferenceHackathonBanner() {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger">
          <a
            href={HACKATHON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-[#6366f1]/20 bg-[#6366f1]/[0.06] px-6 py-6 md:px-12 md:py-8 text-center transition-colors duration-300 hover:border-[#6366f1]/40 hover:bg-[#6366f1]/[0.10]"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-3">
              Upcoming Event
            </p>

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Conference & Hackathon
            </h2>

            <p className="text-base text-gray-400 max-w-xl mx-auto mb-6">
              Build, learn, and compete with blockchain builders at EPFL.
            </p>

            <span className="inline-flex items-center gap-2 text-base font-semibold text-white group-hover:gap-3 transition-all duration-300">
              Learn More & Register
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
