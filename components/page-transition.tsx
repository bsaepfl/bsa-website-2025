"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { animate } from "animejs"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const wrapRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (!wrapRef.current) return
    // Skip animation on first render
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    animate(wrapRef.current, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 350,
      easing: 'easeOutCubic',
    })
  }, [pathname])

  return (
    <div ref={wrapRef}>
      {children}
    </div>
  )
}
