"use client"

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Events
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-6 title-shimmer">
            Our events
          </h1>
          <p className="text-zinc-400 text-lg mb-16 max-w-xl">
            Join us for workshops, hackathons, networking events, and more.
          </p>

          {/* Upcoming events */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-display text-zinc-50 mb-8">
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

        </div>
      </section>
    </div>
  )
}
