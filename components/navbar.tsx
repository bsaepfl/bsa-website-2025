"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/startups", label: "Startups" },
  { href: "/members", label: "Members" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [introActive, setIntroActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      setIntroActive(document.documentElement.classList.contains('intro-active'))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navHidden = introActive && !isMenuOpen

  return (
    <>
      {/* Nav bar - visual only, fades but never loses pointer-events */}
      <header className="fixed top-0 left-0 right-0 z-[55] flex justify-center px-4 pt-4">
        <nav
          className={`
            w-full max-w-3xl rounded-full border border-zinc-800
            px-6 py-3 flex items-center justify-between
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${navHidden ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}
            ${isScrolled
              ? 'bg-[#152237]/90 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
              : 'bg-[#152237]/80'
            }
          `}
        >
          <Link href="/" className={`text-zinc-50 font-sans text-sm font-medium tracking-wide transition-opacity duration-300 ${navHidden ? 'pointer-events-none' : ''}`}>
            BSA
            <span className="text-zinc-500 ml-1">EPFL</span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden md:flex items-center gap-6 transition-opacity duration-300 ${navHidden ? 'pointer-events-none' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-4 py-1.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger - ALWAYS interactive */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center z-[70]"
            aria-label="Toggle menu"
          >
            <span className={`absolute h-px w-5 bg-zinc-300 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-px w-5 bg-zinc-300 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`absolute h-px w-5 bg-zinc-300 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 z-[60] bg-[#0d1a2b]/98 backdrop-blur-sm
          flex flex-col items-center justify-center
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center z-[70]"
          aria-label="Close menu"
        >
          <span className="block h-px w-6 bg-zinc-300 rotate-45 absolute" />
          <span className="block h-px w-6 bg-zinc-300 -rotate-45 absolute" />
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                text-3xl font-display text-zinc-300 hover:text-zinc-50
                transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: isMenuOpen ? `${(i + 1) * 80}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`
              text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-6 py-2.5
              hover:bg-zinc-300 active:scale-[0.98] mt-4
              transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: isMenuOpen ? `${(navLinks.length + 1) * 80}ms` : '0ms' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  )
}
