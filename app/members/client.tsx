"use client"

import { useEffect, useState } from "react"
import Member, { MemberData } from "@/components/member/Member"

function groupMembersBySection(members: MemberData[]): { [section: string]: MemberData[] } {
  return members.reduce((groups, member) => {
    const section = member.section
    if (!groups[section]) groups[section] = []
    groups[section].push(member)
    return groups
  }, {} as { [section: string]: MemberData[] })
}

const sectionOrder = [
  'Executive Committee', 'Research', 'Education', 'Communication',
  'Logistics', 'Technology', 'Sponsorship', 'Alumnis'
]

export default function MembersClient() {
  const [membersBySection, setMembersBySection] = useState<{ [section: string]: MemberData[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch('/api/members')
        if (response.ok) {
          const data = await response.json()
          setMembersBySection(groupMembersBySection(data))
        }
      } catch (error) {
        console.error('Error loading members:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMembers()
  }, [])

  const sortedSections = Object.entries(membersBySection).sort(([a], [b]) => {
    const ia = sectionOrder.indexOf(a)
    const ib = sectionOrder.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Team
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-16 title-shimmer">
            Our members
          </h1>

          {loading ? (
            <p className="text-zinc-500 text-sm font-mono">Loading members...</p>
          ) : (
            sortedSections.map(([section, sectionMembers]) => (
              <div key={section} className="mb-20">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-display text-zinc-50">
                    {section}
                  </h2>
                  <div className="w-12 h-px bg-zinc-700 mt-3" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sectionMembers.map((member) => (
                    <Member key={member.tag} member={member} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
