import type { Metadata } from "next"
import WinsClient from "./client"

export const metadata: Metadata = {
  title: "Wins",
  description: "Hackathon wins, awards, and recognitions earned by BSA members at EPFL.",
}

export default function WinsPage() {
  return <WinsClient />
}
