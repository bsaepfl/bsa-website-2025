const socialLinks = [
  { href: "https://instagram.com/bsaepfl", label: "Instagram" },
  { href: "https://x.com/bsaepfl", label: "X" },
  { href: "https://t.me/+1VsSQpBLMkI5ZGM0", label: "Telegram" },
  { href: "https://linkedin.com/company/bsaepfl", label: "LinkedIn" },
  { href: "https://www.youtube.com/@bsaepfl", label: "YouTube" },
  { href: "https://github.com/bsaepfl", label: "GitHub" },
]

export default function Footer() {
  return (
    <footer className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-zinc-800 pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            {/* Left: wordmark */}
            <div>
              <p className="text-zinc-50 font-sans text-sm font-medium tracking-wide">
                BSA
                <span className="text-zinc-500 ml-1">EPFL</span>
              </p>
              <p className="text-zinc-600 text-xs mt-1">
                Blockchain Student Association
              </p>
            </div>

            {/* Center: social links */}
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 text-xs hover:text-zinc-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: EPFL reference */}
            <p className="text-zinc-700 text-xs">
              EPFL, Lausanne, Switzerland
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
