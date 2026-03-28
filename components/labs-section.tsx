const labs = [
  {
    acronym: "DEDIS",
    name: "Decentralized and Distributed Systems",
    href: "https://dedis.epfl.ch",
  },
  {
    acronym: "DCL",
    name: "Distributed Computing Lab",
    href: "https://dcl.epfl.ch",
  },
  {
    acronym: "COMPSEC",
    name: "Computer Security Lab",
    href: "https://compsec.epfl.ch",
  },
]

export default function LabsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Research
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-zinc-50 max-w-lg">
            Our members contributed to research in these labs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labs.map((lab) => (
            <a
              key={lab.acronym}
              href={lab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 md:p-10 flex flex-col justify-between min-h-[160px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-mono font-light text-zinc-50 tracking-tight mb-3">
                  {lab.acronym}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {lab.name}
                </p>
              </div>
              <p className="text-xs text-zinc-700 font-mono mt-6 group-hover:text-zinc-500 transition-colors duration-200">
                EPFL
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
