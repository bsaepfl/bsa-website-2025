"use client"

import { useState, useEffect } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-40 border border-zinc-700 bg-[#152237]/90 backdrop-blur-sm
        rounded-full px-4 py-2.5 flex items-center gap-2
        hover:border-zinc-500 hover:bg-[#1a2a40] active:scale-[0.97]
        transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-zinc-400">
        <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-zinc-400 text-xs font-mono">Top</span>
    </button>
  )
}
