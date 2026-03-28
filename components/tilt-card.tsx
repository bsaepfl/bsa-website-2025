"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export default function TiltCard({ children, className = "", href, target, rel }: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href, target, rel } : {}

  return (
    <Tag
      // @ts-ignore
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...linkProps}
    >
      {children}
    </Tag>
  )
}
