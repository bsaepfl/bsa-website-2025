"use client"

import BlockchainIntro from "@/components/blockchain-intro"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import LabsSection from "@/components/labs-section"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import UniversitiesSection from "@/components/universities-section"
import ArticlesSection from "@/components/articles/ArticlesSection"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect } from "react"

export default function Home() {
  useScrollReveal()
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    // Only show intro on first visit per session
    const hasPlayed = sessionStorage.getItem('intro-played')
    if (!hasPlayed) {
      setShowIntro(true)
      sessionStorage.setItem('intro-played', '1')
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen">
      {showIntro && <BlockchainIntro />}
      <Hero />
      <AboutSection />
      <LabsSection />
      <EventsSection />
      <StartupsSection />
      <UniversitiesSection />
      <ArticlesSection />
    </main>
  )
}
