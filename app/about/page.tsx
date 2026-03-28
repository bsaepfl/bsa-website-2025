"use client"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            About
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-12 title-shimmer">
            About the BSA
          </h1>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-zinc-400 text-lg leading-relaxed">
                The Blockchain Student Association at EPFL is dedicated to fostering
                blockchain education, innovation, and community among students passionate
                about decentralized technologies.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                We believe in the transformative potential of blockchain technology to
                reshape industries, create new economic models, and build a more
                transparent and equitable digital future.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Through workshops, hackathons, networking events, and collaborative
                projects, we provide students with the knowledge, skills, and
                connections needed to become leaders in the blockchain space.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
              <h3 className="text-xl font-medium text-zinc-50 mb-6">What we do</h3>
              <div className="space-y-4">
                {[
                  "Educational workshops and seminars",
                  "Blockchain hackathons and competitions",
                  "Industry networking events",
                  "Research collaboration opportunities",
                  "Startup incubation support"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-mono text-zinc-600 tabular-nums mt-1 shrink-0 w-5">
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
    </div>
  )
}
