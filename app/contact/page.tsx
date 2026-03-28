import type { Metadata } from "next"
import ContactClient from "./client"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Blockchain Student Association at EPFL. Questions, collaborations, and partnerships.",
}

export default function ContactPage() {
  return <ContactClient />
}
