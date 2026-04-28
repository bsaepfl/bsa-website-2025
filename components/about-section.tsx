import Link from "next/link"

const activities = [
  {
    label: "Conferences",
    description: "Expert talks and panels on privacy, DeFi, stablecoins, and regulation. Our last event brought 350+ people to EPFL.",
  },
  {
    label: "Hackathons",
    description: "36-hour building sprints with $15k-$20k prize pools. We invite people from all around the world, with 20+ different universities represented on average.",
  },
  {
    label: "Research",
    description: "Published work on decentralized RPC infrastructure, privacy architectures, and ZK proofs. Academic rigor, real-world applications.",
  },
]

export default function AboutSection() {
  return (
    <section className="py-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2xl">

          {/* Left column */}
          <div data-reveal className="md:col-span-5 opacity-0">
            <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
              About BSA
            </p>
            <h2 className="text-display-1 font-display text-zinc-50 mb-md title-shimmer">
              A student-run community for blockchain at EPFL
            </h2>
            <p className="text-zinc-400 text-lead font-serif mb-lg">
              Founded in 2018 and officially recognized by EPFL in 2021. Every member
              can vote on the association's direction.
            </p>
            <Link
              href="/about"
              className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-sm py-2xs hover:text-zinc-50 hover:border-zinc-500 active:scale-[0.98] transition-all duration-200 inline-block"
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
                  className={`py-lg opacity-0 ${i !== activities.length - 1 ? 'border-b border-zinc-800' : ''}`}
                >
                  <div className="flex items-start gap-sm">
                    <span className="text-sm font-mono text-zinc-600 tabular-nums mt-2 shrink-0 w-7">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-display-2 font-display text-zinc-50 mb-xs">{activity.label}</h3>
                      <p className="text-zinc-400 leading-relaxed font-serif">{activity.description}</p>
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
