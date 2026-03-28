import type { Metadata } from "next"
import StartupsClient from "./client"

export const metadata: Metadata = {
  title: "Startups",
  description: "Innovative blockchain startups created and shaped by BSA members at EPFL.",
}

export default function StartupsPage() {
  return <StartupsClient />
}
