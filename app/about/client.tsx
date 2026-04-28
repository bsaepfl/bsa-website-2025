"use client"

import RoleFAQ from "@/components/about/RoleFAQ"

export default function AboutClient() {
  return (
    <div className="min-h-screen">
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
            About
          </p>
          <h1 className="text-hero font-display text-zinc-50 mb-xl title-shimmer">
            About the BSA
          </h1>

          <div className="grid lg:grid-cols-2 gap-2xl items-start">
            <div className="space-y-md">
              <p className="text-zinc-400 text-lead font-serif">
                The Blockchain Student Association at EPFL is dedicated to fostering
                blockchain education, innovation, and community among students passionate
                about decentralized technologies.
              </p>
              <p className="text-zinc-400 text-lead font-serif">
                We believe in the transformative potential of blockchain technology to
                reshape industries, create new economic models, and build a more
                transparent and equitable digital future.
              </p>
              <p className="text-zinc-400 text-lead font-serif">
                Through workshops, hackathons, networking events, and collaborative
                projects, we provide students with the knowledge, skills, and
                connections needed to become leaders in the blockchain space.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-lg">
              <h3 className="text-display-3 font-display text-zinc-50 mb-md">What we do</h3>
              <div className="space-y-sm">
                {[
                  "Educational workshops and seminars",
                  "Blockchain hackathons and competitions",
                  "Industry networking events",
                  "Research collaboration opportunities",
                  "Startup incubation support"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-xs">
                    <span className="text-eyebrow font-mono text-zinc-600 tabular-nums mt-1 shrink-0 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="max-w-6xl mx-auto px-6">
          <RoleFAQ />
        </div>
      </section>
    </div>
  )
}
