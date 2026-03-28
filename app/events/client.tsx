"use client"

const pastEvents = [
  {
    date: "March 2026",
    title: "Stablecoins & Payments Hackathon",
    type: "Hackathon",
    description: "36-hour coding competition focused on stablecoins, digital money, and payment infrastructure.",
    stats: "$16k+ prizes / 127 participants / 55 projects submitted",
  },
  {
    date: "March 2026",
    title: "Stablecoins & Payments Conference",
    type: "Conference",
    description: "Expert talks and panels on stablecoins, CBDCs, regulation, and institutional DeFi. Speakers from Circle, Swiss National Bank, Aave, Franklin Templeton, Ledger, and UNHCR.",
    stats: "3 stages / 20+ speakers / Diamond sponsor: AlphaTON Capital",
  },
  {
    date: "September 2025",
    title: "Sui x BSA Hackathon (3rd Edition)",
    type: "Hackathon",
    description: "Third edition of Europe's biggest student-run Sui hackathon, with pre-hackathon workshops on Move language and advanced Sui features.",
    stats: "$20k+ prizes / 200 participants / Teams of up to 4",
  },
  {
    date: "March 2025",
    title: "Privacy & Verifiability Hackathon",
    type: "Hackathon",
    description: "Building innovative solutions focusing on privacy and verifiability in blockchain. Sponsored by Mina, Hedera Hashgraph Association, and Hyle.",
    stats: "$15k prizes / 36 hackers / 23 projects submitted",
  },
  {
    date: "March 2025",
    title: "Privacy & Verifiability Conference",
    type: "Conference",
    description: "Deep dive into blockchain privacy: ZKP, MPC, TEE, private DeFi, MEV, and AI & privacy. Co-organized with Privacy Guardians, CVA, and IEEE Blockchain.",
    stats: "363 attendees / 8 topic tracks / BC Building, EPFL",
  },
  {
    date: "October 2024",
    title: "Sui x BSA Hackathon (2nd Edition)",
    type: "Hackathon",
    description: "Second edition of the European Sui Hackathon. 22 projects submitted, including Fair.fun, Proximity, Suimons, and Imaigine.",
    stats: "$25k+ prizes / 70+ participants / 22 projects",
  },
  {
    date: "March 2024",
    title: "EPFL Blockchain Conference",
    type: "Conference",
    description: "BSA's inaugural conference exploring cryptocurrencies, blockchain, and digital assets. Five panels on Web3 jobs, tokenization, regulation, universities in Web3, and mass adoption.",
    stats: "5 panels / Sponsors: Arbitrum, Swissborg, Avalanche, Syz Group",
  },
  {
    date: "October 2023",
    title: "Sui x BSA Hackathon (1st Edition)",
    type: "Hackathon",
    description: "The first European Sui Hackathon. Students from 13+ universities built on Sui using the Move programming language. Winners included teams from TUM, EPFL, ETH Zurich, and Imperial College.",
    stats: "$25k prizes / 100+ participants / 13+ universities",
  },
]

export default function EventsClient() {
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

          {/* Upcoming */}
          <div className="mb-32">
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

          {/* Past events timeline */}
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              History
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-zinc-50 mb-16 title-shimmer">
              Previous events
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-zinc-800" />

              <div className="space-y-12">
                {pastEvents.map((event, i) => (
                  <div key={i} className="relative pl-10 md:pl-14">
                    {/* Dot */}
                    <div className={`absolute left-0 md:left-1 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 ${
                      event.type === 'Conference'
                        ? 'border-[#05dbe9] bg-[#05dbe9]/10'
                        : 'border-[#ffa828] bg-[#ffa828]/10'
                    }`} />

                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-zinc-500">{event.date}</span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        event.type === 'Conference'
                          ? 'text-[#05dbe9] border-[#05dbe9]/30'
                          : 'text-[#ffa828] border-[#ffa828]/30'
                      }`}>
                        {event.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display text-zinc-50 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-2 max-w-2xl">
                      {event.description}
                    </p>
                    <p className="text-xs font-mono text-zinc-600">
                      {event.stats}
                    </p>
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
