"use client"

import { useEffect, useRef } from "react"

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const scrollTriggers = document.querySelectorAll('.scroll-trigger')
    scrollTriggers.forEach((el) => observer.observe(el))

    return () => {
      scrollTriggers.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              About the
              <span className="gradient-text block">BSA</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Empowering the next generation of blockchain innovators at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our
                <span className="gradient-text block">Mission</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-trigger space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  The Blockchain Student Association (BSA) at EPFL is dedicated to fostering 
                  blockchain education, innovation, and community among students passionate 
                  about decentralized technologies.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe in the transformative potential of blockchain technology to 
                  reshape industries, create new economic models, and build a more 
                  transparent and equitable digital future.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Through workshops, hackathons, networking events, and collaborative 
                  projects, we provide students with the knowledge, skills, and 
                  connections needed to become leaders in the blockchain space.
                </p>
              </div>
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">What We Do</h3>
                <div className="space-y-4">
                  {[
                    "Educational workshops and seminars",
                    "Blockchain hackathons and competitions", 
                    "Industry networking events",
                    "Research collaboration opportunities",
                    "Startup incubation support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 