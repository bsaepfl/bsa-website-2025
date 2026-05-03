"use client"

import { useEffect } from "react"

export default function ClickPop() {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      const el = document.createElement("span")
      el.className = "click-pop"
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      document.body.appendChild(el)
      el.addEventListener("animationend", () => el.remove(), { once: true })
    }
    window.addEventListener("pointerdown", handler)
    return () => window.removeEventListener("pointerdown", handler)
  }, [])
  return null
}
