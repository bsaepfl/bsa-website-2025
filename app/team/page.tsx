"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, Briefcase, GraduationCap, UserPlus, Heart, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import Member, { MemberData } from "@/components/team/Member"

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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
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
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
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
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        {section} {section !== "Executive Committee" && section !== "Alumnis" && "Team"}
                      </h2>
                      <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {sectionMembers.map((member, idx) => (
                        <Member 
                          key={member.tag}
                          member={member} 
                          animationDelay={0.2 + idx * 0.1} 
                        />
                      ))}
                    </div>
                  </div>
                ));
              })()
            )}
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Join Our
                <span className="gradient-text block">Team</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Open Positions</h3>
                <div className="space-y-4">
                  {[
                    "Technical Lead - Smart Contracts",
                    "Events Coordinator", 
                    "Marketing & Communications",
                    "Research Assistant",
                    "Community Manager"
                  ].map((position, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{position}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/contact">
                    Apply Now <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
              </div>
              
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Benefits</h3>
                <div className="space-y-4">
                  {[
                    { icon: Heart, text: "Passionate community" },
                    { icon: Zap, text: "Hands-on experience" },
                    { icon: Award, text: "Leadership opportunities" },
                    { icon: Briefcase, text: "Industry connections" },
                    { icon: GraduationCap, text: "Learning & growth" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center">
                        <benefit.icon size={16} className="text-white" />
                      </div>
                      <span className="text-gray-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Ready to
                <span className="gradient-text block">Join Us?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Be part of a team that's shaping the future of blockchain technology. 
                We're always looking for passionate individuals to join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/join">
                    <UserPlus size={16} className="mr-2" />
                    Join the Team
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}