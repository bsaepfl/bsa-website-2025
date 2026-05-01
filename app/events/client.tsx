"use client"

import Link from "next/link"
import { pastEvents } from "@/data/events"

export default function EventsClient() {
  return (
    <div className="min-h-screen">
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
            Events
          </p>
          <h1 className="text-hero font-display text-zinc-50 mb-md title-shimmer">
            Our events
          </h1>
          <p className="text-zinc-400 text-lead mb-2xl max-w-xl">
            Join us for workshops, hackathons, networking events, and more.
          </p>

          {/* Upcoming */}
          <div className="mb-4xl">
            <h2 className="text-display-2 font-display text-zinc-50 mb-lg">
              Upcoming
            </h2>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <iframe
                src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events?lt=upcoming"
                className="w-full"
                style={{ height: '600px', border: 'none' }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
          </div>

          {/* Past events timeline */}
          <div>
            <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
              History
            </p>
            <h2 className="text-display-1 font-display text-zinc-50 mb-4xl title-shimmer">
              Previous events
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-zinc-800" />

              <div className="space-y-2xl">
                {pastEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="group relative pl-10 md:pl-14 block"
                  >
                    {/* Dot with subtle glow on hover */}
                    <div
                      className="absolute left-0 md:left-1 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 border-zinc-600 bg-zinc-800 transition-all duration-300 group-hover:border-zinc-400 group-hover:bg-zinc-700 group-hover:shadow-[0_0_12px_rgba(250,250,250,0.15)]"
                    />

                    <div className="flex flex-wrap items-center gap-xs mb-xs">
                      <span className="text-eyebrow font-mono text-zinc-500">{event.date}</span>
                      <span className="text-micro font-mono uppercase px-2 py-0.5 rounded-full border text-zinc-500 border-zinc-700 group-hover:text-zinc-300 group-hover:border-zinc-500 transition-colors duration-300">
                        {event.type}
                      </span>
                    </div>

                    <h3 className="text-display-3 font-display text-zinc-200 mb-2xs group-hover:text-zinc-50 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-xs max-w-2xl">
                      {event.description}
                    </p>
                    <p className="text-eyebrow font-mono text-zinc-600 mb-2xs">
                      {event.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" / ")}
                    </p>
                    <p className="text-micro text-zinc-600">
                      <span className="text-zinc-500">Sponsors:</span> {event.sponsors.join(", ")}
                    </p>
                    <span className="inline-block text-eyebrow font-mono text-zinc-600 mt-xs group-hover:text-zinc-300 transition-colors duration-300">
                      View event &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
