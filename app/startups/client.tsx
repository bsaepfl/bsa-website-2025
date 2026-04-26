"use client"

import Image from "next/image"
import { startups } from "@/data/startups"
import TiltCard from "@/components/tilt-card"

export default function StartupsClient() {
  return (
    <div className="min-h-screen">
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
            Startups
          </p>
          <h1 className="text-hero font-display text-zinc-50 mb-md title-shimmer">
            Built by our members
          </h1>
          <p className="text-zinc-400 text-lead mb-2xl max-w-xl">
            Innovative startups created and shaped by BSA members, pushing the boundaries of blockchain technology.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
            {startups.map((startup) => (
              <TiltCard
                key={startup.title}
                href={startup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700"
              >
                <div className="h-40 bg-zinc-950 flex items-center justify-center p-md">
                  <Image
                    src={startup.img}
                    alt={startup.title}
                    width={180}
                    height={80}
                    className="object-contain max-h-16 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <div className="p-sm">
                  <h3 className="text-display-3 font-display text-zinc-50 mb-2xs">{startup.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{startup.description}</p>
                  <span className="inline-block text-zinc-600 text-eyebrow mt-xs group-hover:text-zinc-400 transition-colors">
                    Visit site &rarr;
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
