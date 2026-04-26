import { Instagram, Twitter, Linkedin, Youtube, Github } from "lucide-react"
import type { ComponentType, SVGProps } from "react"

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
  </svg>
)

const socialLinks: { href: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { href: "https://instagram.com/bsaepfl", label: "Instagram", Icon: Instagram },
  { href: "https://x.com/bsaepfl", label: "X", Icon: Twitter },
  { href: "https://t.me/+1VsSQpBLMkI5ZGM0", label: "Telegram", Icon: TelegramIcon },
  { href: "https://linkedin.com/company/bsaepfl", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.youtube.com/@bsaepfl", label: "YouTube", Icon: Youtube },
  { href: "https://github.com/bsaepfl", label: "GitHub", Icon: Github },
]

export default function Footer() {
  return (
    <footer className="py-2xl md:py-3xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-zinc-800 pt-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-lg">

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
            <div className="flex flex-wrap gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
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
