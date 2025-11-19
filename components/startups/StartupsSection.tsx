"use client"

import Image from "next/image"
import { startups } from "@/data/startups"
import InfiniteAutoSlider from "@/components/ui/InfiniteAutoSlider"
import ContinuousDriftSlider from "@/components/ui/ContinuousDriftSlider"
import Link from "next/link"
import { Rocket, ExternalLink, Users } from "lucide-react"

export default function StartupsSection() {
  return (
    <section id="startups" className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            BSA
            <span className="gradient-text block">Startups Incubator</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover innovative startups created and shaped by BSA members, pushing the boundaries of blockchain technology
          </p>
        </div>

        {/* Mobile View: Auto-scrolling slider */}
        <div className="md:hidden scroll-trigger" style={{ animationDelay: '0.2s' }}>
          <InfiniteAutoSlider content={startups} />
        </div>

        {/* Desktop View: Continuous drift slider */}
        <div className="hidden md:block scroll-trigger" style={{ animationDelay: '0.2s' }}>
          <ContinuousDriftSlider content={startups} baseSpeed={0.5} maxSpeed={3} acceleration={0.03} />
        </div>
      </div>
    </section>
  )
} 