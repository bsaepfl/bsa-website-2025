"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export default function EventsSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Events
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-zinc-50">
              What's happening
            </h2>
          </div>
          <Link
            href="/events"
            className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
          >
            View all events <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        <div data-reveal className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden opacity-0">
          <iframe
            ref={iframeRef}
            src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
            className="w-full"
            style={{ height: '500px', border: 'none' }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  )
}
