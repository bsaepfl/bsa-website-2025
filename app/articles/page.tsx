import type { Metadata } from "next"
import ArticlesClient from "./client"

export const metadata: Metadata = {
  title: "Articles",
  description: "Research and writing on blockchain technology, DeFi, privacy, and more from BSA members.",
}

export default function ArticlesPage() {
  return <ArticlesClient />
}
