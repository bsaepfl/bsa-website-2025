"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Users, Rocket, BookOpen, Globe, Zap } from "lucide-react"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import ArticlesSection from "@/components/articles/ArticlesSection"
import BSAHeroLogoParticles from "@/components/bsa-logo-particles-hero"
import { useEffect, useRef } from "react"

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const joinRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    const scrollTriggers = document.querySelectorAll('.scroll-trigger')
    scrollTriggers.forEach((trigger) => observer.observe(trigger))

    return () => {
      scrollTriggers.forEach((trigger) => observer.unobserve(trigger))
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen">
      
      <BSAHeroLogoParticles />

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-trigger">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Empowering the Next Generation of
                <span className="gradient-text block">Blockchain Innovators</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The Blockchain Student Association (BSA) at EPFL is a student-led organization dedicated to promoting
                blockchain technology and its applications. We organize workshops, hackathons, and networking events to
                connect students with industry professionals.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our mission is to educate, inspire, and empower the next generation of blockchain innovators and
                leaders through hands-on experience and real-world projects.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
            
            <div className="scroll-trigger" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 min-h-[400px]">
                <h3 className="text-2xl font-bold mb-8 text-white">What We Do</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Educational Workshops</h4>
                      <p className="text-gray-300 leading-relaxed">Regular workshops on blockchain technology, smart contract development, and DeFi protocols</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Networking Events</h4>
                      <p className="text-gray-300 leading-relaxed">Connect with industry professionals, researchers, and like-minded students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Hackathons & Projects</h4>
                      <p className="text-gray-300 leading-relaxed">Hands-on experience building blockchain applications and innovative solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <EventsSection />

      {/* Startups Section */}
      <StartupsSection />

      {/* Latest Articles Section */}
      <ArticlesSection />

    </main>
  )
}

