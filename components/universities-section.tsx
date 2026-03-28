const universities = [
  {
    name: "EPFL",
    fullName: "Ecole Polytechnique Federale de Lausanne",
    href: "https://epfl.ch",
  },
  {
    name: "ETH Zurich",
    fullName: "Swiss Federal Institute of Technology",
    href: "https://ethz.ch",
  },
  {
    name: "HEC Lausanne",
    fullName: "Faculty of Business and Economics, UNIL",
    href: "https://hec.unil.ch",
  },
  {
    name: "HEIG-VD",
    fullName: "School of Engineering and Management",
    href: "https://heig-vd.ch",
  },
  {
    name: "HSG",
    fullName: "University of St. Gallen",
    href: "https://unisg.ch",
  },
]

export default function UniversitiesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-zinc-50 max-w-md">
            Our members come from
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {universities.map((uni) => (
            <a
              key={uni.name}
              href={uni.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center min-h-[120px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
            >
              <p className="text-lg md:text-xl font-mono font-light text-zinc-400 group-hover:text-zinc-50 transition-colors duration-200 tracking-tight">
                {uni.name}
              </p>
              <p className="text-[10px] text-zinc-600 mt-2 leading-tight max-w-[140px]">
                {uni.fullName}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
