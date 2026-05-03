import type { Metadata } from "next"
import AboutClient from "./client"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Blockchain Student Association at EPFL, a student-led association founded in 2018.",
}

export default function AboutPage() {
  return <AboutClient />
}
