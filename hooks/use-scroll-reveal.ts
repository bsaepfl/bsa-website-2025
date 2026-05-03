"use client"

import { useEffect } from "react"
import { animate, stagger } from "animejs"

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const children = el.querySelectorAll('[data-reveal-child]')

            if (children.length > 0) {
              // Make container visible immediately, animate children
              el.style.opacity = '1'
              el.style.transform = 'none'
              animate(children, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: stagger(60),
                easing: 'easeOutCubic',
              })
            } else {
              animate(el, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutCubic',
              })
            }

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    const reveals = document.querySelectorAll('[data-reveal]')
    reveals.forEach((el) => observer.observe(el))

    return () => {
      reveals.forEach((el) => observer.unobserve(el))
    }
  }, [])
}
