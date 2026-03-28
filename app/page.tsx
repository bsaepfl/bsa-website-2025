"use client"

import Hero from "@/components/hero"
import ConferenceHackathonBanner from "@/components/ConferenceHackathonBanner"
import AboutSection from "@/components/about-section"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import ArticlesSection from "@/components/articles/ArticlesSection"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const reveals = document.querySelectorAll('.scroll-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => reveals.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <main className="flex flex-col min-h-screen">
      <ConferenceHackathonBanner />
      <Hero />
      <AboutSection />
      <EventsSection />
      <StartupsSection />
      <ArticlesSection />
    </main>
  )
}
