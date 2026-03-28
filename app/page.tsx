"use client"

import Hero from "@/components/hero"
import ConferenceHackathonBanner from "@/components/ConferenceHackathonBanner"
import AboutSection from "@/components/about-section"
import LabsSection from "@/components/labs-section"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import UniversitiesSection from "@/components/universities-section"
import ArticlesSection from "@/components/articles/ArticlesSection"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Home() {
  useScrollReveal()

  return (
    <main className="flex flex-col min-h-screen">
      <ConferenceHackathonBanner />
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
