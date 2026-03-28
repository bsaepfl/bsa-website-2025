import Link from "next/link"

const activities = [
  {
    label: "Conferences",
    description: "Expert talks and panels on privacy, DeFi, stablecoins, and regulation. Our last event brought 350+ people to EPFL.",
  },
  {
    label: "Hackathons",
    description: "48-hour building sprints with $15k-$20k prize pools. Students from 13+ European universities compete and ship.",
  },
  {
    label: "Research",
    description: "Published work on decentralized RPC infrastructure, privacy architectures, and ZK proofs. Academic rigor, real-world applications.",
  },
]

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Left column */}
          <div data-reveal className="md:col-span-5 opacity-0">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              About BSA
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-zinc-50 leading-[1.05] mb-6">
              A student-led DAO for blockchain at EPFL
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Founded in 2018 and officially recognized by EPFL in 2021, we are one of the few student associations
              globally structured as a Decentralized Autonomous Organization. Every member can vote on the
              association's direction.
            </p>
            <Link
              href="/about"
              className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-5 py-2 hover:text-zinc-50 hover:border-zinc-500 active:scale-[0.98] transition-all duration-200 inline-block"
            >
              Read more about us
            </Link>
          </div>

          {/* Right column - activities */}
          <div data-reveal className="md:col-span-7 md:col-start-6 opacity-0">
            <div className="space-y-0">
              {activities.map((activity, i) => (
                <div
                  key={activity.label}
                  data-reveal-child
                  className={`py-8 opacity-0 ${i !== activities.length - 1 ? 'border-b border-zinc-800' : ''}`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-sm font-mono text-zinc-600 tabular-nums mt-2 shrink-0 w-7">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display text-zinc-50 mb-3">{activity.label}</h3>
                      <p className="text-zinc-400 leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
