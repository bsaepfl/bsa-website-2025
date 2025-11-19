"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LUMA_URL } from "@/lib/constants"

export default function EventsSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [iframeHeight, setIframeHeight] = useState(450)

  useEffect(() => {
    const updateIframeHeight = () => {
      if (sidebarRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight
        // Subtract the padding (p-8 = 32px top + 32px bottom = 64px total)
        const contentHeight = sidebarHeight - 64
        setIframeHeight(Math.max(contentHeight, 450)) // Minimum height of 450px
      }
    }

    // Update height on mount and window resize
    updateIframeHeight()
    window.addEventListener('resize', updateIframeHeight)
    
    // Also update after a short delay to ensure content is rendered
    const timeoutId = setTimeout(updateIframeHeight, 100)

    return () => {
      window.removeEventListener('resize', updateIframeHeight)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://lu.ma') return

      try {
        const data = JSON.parse(event.data)
        if (data.type === 'setHeight' || data.type === 'resize') {
          // Don't override our calculated height
          // setIframeHeight(450)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <section id="events" className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Join Our
            <span className="gradient-text block">Community Events</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover workshops, hackathons, and networking events designed to accelerate your blockchain journey
          </p>
        </div>

        <div className="flex gap-8 items-start">
          <div className="flex justify-center w-full">
            <div className="w-full max-w-[900px] scroll-trigger" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 hover-lift">
                <div className="flex justify-center w-full">
                  <div className="w-full max-w-[1200px]">
                    <iframe
                      ref={iframeRef}
                      src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                      className="w-full rounded-xl"
                      style={{ 
                        height: `${iframeHeight}px`,
                        border: '1px solid rgba(99, 102, 241, 0.2)', 
                        borderRadius: '8px' 
                      }}
                      allowFullScreen
                      aria-hidden="false"
                      tabIndex={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 