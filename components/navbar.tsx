"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BSA_LOGO_PATH } from "./bsa-logo-path"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/startups", label: "Startups" },
  { href: "/members", label: "Members" },
  { href: "/wins", label: "Wins" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [introActive, setIntroActive] = useState(false)
  const pathname = usePathname()

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
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4">
        <nav
          className={`
            group/nav relative w-full max-w-3xl rounded-full
            flex items-center justify-between
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${navHidden ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}
            ${isScrolled
              ? 'px-2.5 py-2 md:pl-3 md:pr-2 bg-[#152237]/85 backdrop-blur-md border border-zinc-700/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
              : 'px-3 py-2.5 md:pl-4 md:pr-2.5 bg-[#152237]/70 backdrop-blur-sm border border-zinc-800/80'
            }
          `}
        >
          {/* Subtle gradient hairline that fades in on scroll */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%)',
              maskImage: 'linear-gradient(180deg, black 0%, transparent 60%)',
              WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 60%)',
            }}
          />

          {/* LEFT: logo + wordmark */}
          <Link
            href="/"
            aria-label="BSA EPFL - home"
            className={`
              group/logo relative flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full
              text-zinc-50 text-base font-medium tracking-wide
              transition-opacity duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#152237]
              ${navHidden ? 'pointer-events-none' : ''}
            `}
          >
            <span className="relative inline-flex items-center justify-center">
              {/* Soft glow that appears on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover/logo:opacity-60 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle, rgba(0,255,170,0.5) 0%, rgba(77,156,255,0.3) 50%, transparent 70%)' }}
              />
              <svg
                viewBox="20 20 160 175"
                className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/logo:rotate-[8deg]"
                fill="none"
                aria-hidden="true"
              >
                <path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
              </svg>
            </span>
          </Link>

          {/* RIGHT (desktop): nav links + CTA */}
          <div
            className={`
              hidden md:flex items-center gap-0.5 transition-opacity duration-300
              ${navHidden ? 'pointer-events-none' : ''}
            `}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    relative px-3 py-1.5 rounded-full text-[13px] tracking-wide
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/60
                    ${isActive
                      ? 'text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-50 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  <span className="relative inline-block">
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full bg-zinc-50"
                      />
                    )}
                  </span>
                </Link>
              )
            })}

            <a
              href="mailto:bsa@epfl.ch"
              className="
                ml-2 inline-flex items-center gap-1.5
                text-zinc-950 bg-zinc-50 text-[13px] font-medium tracking-wide
                rounded-full px-4 py-1.5
                shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_-1px_0_0_rgba(0,0,0,0.08)_inset]
                hover:bg-white hover:shadow-[0_4px_16px_-4px_rgba(255,255,255,0.3)]
                active:scale-[0.97]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#152237]
              "
            >
              Contact
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/[0.04] active:scale-[0.96] transition-all duration-200 z-[70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/60 cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={`absolute h-px w-5 bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-px w-5 bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`absolute h-px w-5 bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 z-[60] bg-[#0d1a2b]/98 backdrop-blur-md
          flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Subtle ambient glow */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,170,0.04) 0%, rgba(77,156,255,0.03) 40%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }}
        />

        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/[0.04] z-[70] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/60"
          aria-label="Close menu"
        >
          <span className="block h-px w-6 bg-zinc-300 rotate-45 absolute" />
          <span className="block h-px w-6 bg-zinc-300 -rotate-45 absolute" />
        </button>

        {/* Top wordmark in mobile menu */}
        <div className={`absolute top-7 left-7 flex items-center gap-2.5 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <svg viewBox="20 20 160 175" className="w-7 h-7" fill="none" aria-hidden="true">
            <path d={BSA_LOGO_PATH} fill="#fafafa" fillRule="evenodd" />
          </svg>
        </div>

        <nav className="flex-1 flex flex-col items-start justify-center gap-1 px-8 relative">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  group/mlink flex items-center gap-4 py-2
                  text-5xl font-display
                  transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                  ${isActive ? 'text-zinc-50' : 'text-zinc-500 hover:text-zinc-50'}
                  ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{ transitionDelay: isMenuOpen ? `${(i + 1) * 60}ms` : '0ms' }}
              >
                <span className="font-mono text-xs text-zinc-700 tabular-nums w-6">
                  0{i + 1}
                </span>
                <span className="relative">
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-zinc-50"
                    />
                  )}
                </span>
              </Link>
            )
          })}

          <a
            href="mailto:bsa@epfl.ch"
            onClick={() => setIsMenuOpen(false)}
            className={`
              mt-12 ml-10 inline-flex items-center gap-2
              text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-6 py-3
              hover:bg-zinc-200 active:scale-[0.97]
              transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: isMenuOpen ? `${(navLinks.length + 1) * 60}ms` : '0ms' }}
          >
            Contact
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </nav>

        {/* Footer hint */}
        <p className={`relative px-8 pb-8 text-eyebrow font-mono text-zinc-700 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: isMenuOpen ? `${(navLinks.length + 2) * 60}ms` : '0ms' }}
        >
          BLOCKCHAIN STUDENT ASSOCIATION - EPFL
        </p>
      </div>
    </>
  )
}
