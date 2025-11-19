"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, Briefcase, GraduationCap, UserPlus, Heart, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import Member, { MemberData } from "@/components/member/Member"

function groupMembersBySection(members: MemberData[]): { [section: string]: MemberData[] } {
  return members.reduce((groups, member) => {
    const section = member.section
    if (!groups[section]) {
      groups[section] = []
    }
    groups[section].push(member)
    return groups
  }, {} as { [section: string]: MemberData[] })
}

export default function TeamPage() {
  const [members, setMembers] = useState<MemberData[]>([])
  const [membersBySection, setMembersBySection] = useState<{ [section: string]: MemberData[] }>({})
  const [loading, setLoading] = useState(true)

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
  }, [])

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch('/api/members')
        if (response.ok) {
          const membersData = await response.json()
          setMembers(membersData)
          setMembersBySection(groupMembersBySection(membersData))
        }
      } catch (error) {
        console.error('Error loading members:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Meet our
              <span className="gradient-text block">Members</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              The passionate individuals driving innovation in blockchain at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Team Members by Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366f1]"></div>
                <p className="text-gray-300 mt-4">Loading team members...</p>
              </div>
            ) : (
              
              (() => {
                const sectionOrder = [
                  'Executive Committee',
                  'Research',
                  'Education',
                  'Communication',
                  'Logistics',
                  'Technology',
                  'Sponsoring',
                  'Alumnis'
                ];
                const sortedSections = Object.entries(membersBySection).sort(([a], [b]) => {
                  const indexA = sectionOrder.indexOf(a);
                  const indexB = sectionOrder.indexOf(b);
                  
                  // If section not in order array, put it before Alumnis (position 3.5)
                  const posA = indexA === -1 ? 3.5 : indexA;
                  const posB = indexB === -1 ? 3.5 : indexB;
                  
                  return posA - posB;
                });
                
                return sortedSections.map(([section, sectionMembers]) => (
                  <div key={section} className="mb-16">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                        {section} {section !== "Executive Committee" && section !== "Alumnis" && "Team"}
                      </h2>
                      <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                      {sectionMembers.map((member, idx) => (
                        <div
                          key={member.tag}
                          className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 max-w-xs"
                        >
                          <Member
                            member={member}
                            animationDelay={0.2 + idx * 0.1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()
            )}
          </div>
        </div>
      </section>
    </div>
  )
}