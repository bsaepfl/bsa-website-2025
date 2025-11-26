"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"
import { useState, useEffect } from "react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  type: string
  registrationUrl?: string | null
  detailedDescription: string
  photos: string[]
  highlights: string[]
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const eventsData = await response.json()
          setEvents(eventsData)
        } else {
          console.error('Failed to fetch events')
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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
  }, [events])

  const openEventModal = (event: Event) => {
    setSelectedEvent(event)
    setCurrentPhotoIndex(0)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedEvent && selectedEvent.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevPhoto = () => {
    if (selectedEvent && selectedEvent.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6366f1] mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Join Our
              <span className="gradient-text block">Events</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Join us for workshops, hackathons, networking events, and more
            </p>
          </div>
        </div>
      </section>

      {/* Large Luma Embedding */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">

            <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
              <div className="flex justify-center w-full">
                <div className="w-full max-w-[1200px]">
                  <iframe
                    src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                    className="w-full h-[700px]"
                    style={{ border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#6366f1]/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] text-sm rounded-full border border-[#6366f1]/20">
                      {selectedEvent.type}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {selectedEvent.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {selectedEvent.location}
                    </span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {selectedEvent.attendees} attendees
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Photo Gallery */}
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={selectedEvent.photos[currentPhotoIndex]}
                      alt={`${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                    {selectedEvent.photos.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={prevPhoto}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 text-white"
                        >
                          <ChevronLeft size={20} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 text-white"
                        >
                          <ChevronRight size={20} />
                        </Button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {selectedEvent.photos.map((_: any, index: number) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-white">Event Details</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedEvent.detailedDescription}
                </p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-white">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={closeEventModal}
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}