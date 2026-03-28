"use client"

import Image from "next/image"
import { startups } from "@/data/startups"

export default function StartupsClient() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Startups
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-6 title-shimmer">
            Built by our members
          </h1>
          <p className="text-zinc-400 text-lg mb-16 max-w-xl">
            Innovative startups created and shaped by BSA members, pushing the boundaries of blockchain technology.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <a
                key={startup.title}
                href={startup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition-all duration-200"
              >
                <div className="h-40 bg-zinc-950 flex items-center justify-center p-6">
                  <Image
                    src={startup.img}
                    alt={startup.title}
                    width={180}
                    height={80}
                    className="object-contain max-h-16 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-zinc-50 font-medium mb-2">{startup.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{startup.description}</p>
                  <span className="inline-block text-zinc-600 text-xs mt-3 group-hover:text-zinc-400 transition-colors">
                    Visit site &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
