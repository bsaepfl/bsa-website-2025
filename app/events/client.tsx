"use client"

const pastEvents = [
  {
    date: "March 2026",
    title: "Stablecoins & Payments Hackathon",
    type: "Hackathon",
    description: "36-hour coding competition focused on stablecoins, digital money, and payment infrastructure.",
    stats: "$16k+ prizes / 160 participants / 55 projects submitted",
    sponsors: "AlphaTON Capital, XRPL Commons, ENS, Ledger",
  },
  {
    date: "March 2026",
    title: "Stablecoins & Payments Conference",
    type: "Conference",
    description: "Expert talks and panels on stablecoins, CBDCs, regulation, and institutional DeFi. Speakers from Circle, Swiss National Bank, Aave, Franklin Templeton, Ledger, and UNHCR.",
    stats: "3 stages / 20+ speakers",
    sponsors: "AlphaTON Capital, Ledger, XRPL Commons, ENS, Hyli, Raiffeisen, Swissquote, Taurus, SYZ, Supernova, MiCA Crypto Alliance, CVA, WiW3CH, CMTA",
  },
  {
    date: "September 2025",
    title: "Sui x BSA Hackathon (3rd Edition)",
    type: "Hackathon",
    description: "Third edition of Europe's biggest student-run Sui hackathon, with pre-hackathon workshops on Move language and advanced Sui features.",
    stats: "$20k+ prizes / 200 participants / Teams of up to 4",
    sponsors: "Sui Foundation",
  },
  {
    date: "March 2025",
    title: "Privacy & Verifiability Hackathon",
    type: "Hackathon",
    description: "Building innovative solutions focusing on privacy and verifiability in blockchain. 23 projects submitted across ZKP, MPC, and TEE tracks.",
    stats: "$15k prizes / 36 hackers / 23 projects submitted",
    sponsors: "Mina Foundation, Hedera Hashgraph Association, Hyle",
  },
  {
    date: "March 2025",
    title: "Privacy & Verifiability Conference",
    type: "Conference",
    description: "Deep dive into blockchain privacy: ZKP, MPC, TEE, private DeFi, MEV, and AI & privacy. Co-organized with Privacy Guardians, CVA, and IEEE Blockchain.",
    stats: "363 attendees / 8 topic tracks",
    sponsors: "Hashgraph Association, Aleph Zero, Common Finance, Mina Foundation, Taurus",
  },
  {
    date: "October 2024",
    title: "Sui x BSA Hackathon (2nd Edition)",
    type: "Hackathon",
    description: "Second edition of the European Sui Hackathon. 22 projects submitted, including Fair.fun, Proximity, Suimons, and Imaigine.",
    stats: "$25k+ prizes / 70+ participants / 22 projects",
    sponsors: "Sui Foundation, Polygon, ETHIndia",
  },
  {
    date: "March 2024",
    title: "EPFL Blockchain Conference",
    type: "Conference",
    description: "BSA's inaugural conference exploring cryptocurrencies, blockchain, and digital assets. Five panels on Web3 jobs, tokenization, regulation, universities in Web3, and mass adoption.",
    stats: "5 panels / 10+ companies",
    sponsors: "Arbitrum, Syz Group, Swissborg, Avalanche, Casper Association, Blockchain Acceleration Foundation, Crypto Valley Association",
  },
  {
    date: "October 2023",
    title: "Sui x BSA Hackathon (1st Edition)",
    type: "Hackathon",
    description: "The first European Sui Hackathon. Students from 13+ universities built on Sui using the Move programming language. Winners from TUM, EPFL, ETH Zurich, and Imperial College.",
    stats: "$25k prizes / 100+ participants / 13+ universities",
    sponsors: "Sui Foundation, Polygon",
  },
]

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
                {pastEvents.map((event, i) => (
                  <div key={i} className="group relative pl-10 md:pl-14">
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
                      {event.stats}
                    </p>
                    <p className="text-micro text-zinc-600">
                      <span className="text-zinc-500">Sponsors:</span> {event.sponsors}
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
