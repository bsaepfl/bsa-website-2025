const universities = [
  {
    name: "EPFL",
    fullName: "Ecole Polytechnique Federale de Lausanne",
    href: "https://epfl.ch",
    logo: "/universities/epfl.svg",
  },
  {
    name: "ETH Zurich",
    fullName: "Swiss Federal Institute of Technology",
    href: "https://ethz.ch",
    logo: "/universities/eth-zurich.png",
  },
  {
    name: "HEC Lausanne",
    fullName: "Faculty of Business and Economics, UNIL",
    href: "https://hec.unil.ch",
    logo: "/universities/hec-lausanne.png",
  },
  {
    name: "HEIG-VD",
    fullName: "School of Engineering and Management",
    href: "https://heig-vd.ch",
    logo: "/universities/heig-vd.png",
  },
  {
    name: "HSG",
    fullName: "University of St. Gallen",
    href: "https://unisg.ch",
    logo: "/universities/hsg.svg",
  },
]

export default function UniversitiesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="mb-12 opacity-0">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-zinc-50 max-w-md">
            Our members come from
          </h2>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-0">
          {universities.map((uni) => (
            <a
              key={uni.name}
              href={uni.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-child
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 flex items-center justify-center min-h-[120px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uni.logo}
                alt={uni.fullName}
                className="h-12 md:h-14 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200 brightness-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
