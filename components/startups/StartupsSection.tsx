import Image from "next/image"
import Link from "next/link"
import { startups } from "@/data/startups"

export default function StartupsSection() {
  return (
    <section id="startups" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Startups
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-zinc-50">
              Built by our members
            </h2>
          </div>
          <Link
            href="/startups"
            className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
          >
            See all startups <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0">
          {startups.map((startup, i) => (
            <a
              key={i}
              href={startup.link}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-child
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 flex items-center justify-center h-28 md:h-32 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 opacity-0"
            >
              <Image
                src={startup.img}
                alt={startup.title}
                width={140}
                height={60}
                className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200 max-h-12"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
