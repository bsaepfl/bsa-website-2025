import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { pastEvents, getPastEventById } from "@/data/events"
import EventDetailClient from "./client"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return pastEvents.map((event) => ({ id: event.id }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const event = getPastEventById(id)
  if (!event) {
    return { title: "Event not found" }
  }
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = getPastEventById(id)
  if (!event) notFound()
  return <EventDetailClient event={event} />
}
