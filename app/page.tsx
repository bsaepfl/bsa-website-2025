"use client"

import BlockchainIntro from "@/components/blockchain-intro"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"

import LabsSection from "@/components/labs-section"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import WinsSection from "@/components/wins/WinsSection"
import UniversitiesSection from "@/components/universities-section"
import PartnersSection from "@/components/partners-section"
import ArticlesSection from "@/components/articles/ArticlesSection"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect } from "react"

export default function Home() {
  useScrollReveal()
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('intro-played')
    if (!hasPlayed) {
      setShowIntro(true)
      sessionStorage.setItem('intro-played', '1')
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen">
      {showIntro && <BlockchainIntro onComplete={() => setShowIntro(false)} />}
      <Hero />
      <AboutSection />
      <EventsSection />
      <PartnersSection />
      <LabsSection />
      <UniversitiesSection />
      <StartupsSection />
      <ArticlesSection />
      <WinsSection />
    </main>
  )
}
