import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, User } from "lucide-react"
import Image from "next/image"
import { MemberData } from "@/lib/members"

interface MemberProps {
  member: MemberData
  animationDelay?: number
}

export default function Member({ member, animationDelay }: MemberProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 glass border border-[#6366f1]/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Member Image */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#1a1a1a]">
            {member.hasImage ? (
              <Image
                src={`/members/${member.id}/image.jpg`}
                alt={member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Member Info */}
          <div>
            <h3 className="font-semibold text-lg text-white">{member.name}</h3>
            <p className="text-sm text-[#6366f1] font-medium">{member.section}</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-2">
            {member.github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {member.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            )}
            {member.twitter && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://twitter.com/${member.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { type MemberData }