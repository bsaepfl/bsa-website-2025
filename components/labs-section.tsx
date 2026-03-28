const labs = [
  {
    acronym: "DEDIS",
    fullName: "Laboratory for Decentralized and Distributed Systems",
    href: "https://dedis.epfl.ch",
    logo: null,
  },
  {
    acronym: "DCL",
    fullName: "Distributed Computing Laboratory",
    href: "https://dcl.epfl.ch",
    logo: null,
  },
  {
    acronym: "COMPSEC",
    fullName: "Laboratory for Computation Security",
    href: "https://compsec.epfl.ch",
    logo: "/labs/compsec.svg",
  },
]

export default function LabsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="mb-12 opacity-0">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Research
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-zinc-50 max-w-lg">
            Our members contributed to research in these labs
          </h2>
        </div>

        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0">
          {labs.map((lab) => (
            <a
              key={lab.acronym}
              href={lab.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-child
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 md:p-10 flex flex-col justify-between min-h-[180px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
            >
              <div>
                {lab.logo ? (
                  <div className="mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={lab.logo}
                      alt={lab.acronym}
                      className="h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200 brightness-110"
                    />
                  </div>
                ) : (
                  <h3 className="text-3xl md:text-4xl font-mono font-light text-zinc-200 group-hover:text-zinc-50 tracking-tight mb-3 transition-colors duration-200">
                    {lab.acronym}
                  </h3>
                )}
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {lab.fullName}
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
