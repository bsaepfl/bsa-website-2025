import type { Metadata } from "next"
import EventsClient from "./client"

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops, hackathons, conferences, and networking events organized by BSA at EPFL.",
}

export default function EventsPage() {
  return <EventsClient />
}
