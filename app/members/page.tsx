import type { Metadata } from "next"
import MembersClient from "./client"

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the team behind the Blockchain Student Association at EPFL.",
}

export default function MembersPage() {
  return <MembersClient />
}
