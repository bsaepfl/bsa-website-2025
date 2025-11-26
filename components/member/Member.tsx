import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, User, Globe, Mail } from "lucide-react"
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
          <div className="relative w-full aspect-[1/1] mx-auto rounded-2xl overflow-hidden bg-[#1a1a1a]">
            {member.hasImage ? (
              <Image
                src={`/members/${member.tag}/image.jpg`}
                alt={member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Member Info */}
          <div className="min-h-[48px] flex flex-col justify-center">
            <h3 className="font-semibold text-lg text-white">{member.name}</h3>
            <p className="text-sm text-white font-medium min-h-[18px]">
              {member.title || ""}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-2 min-h-[40px]">
            {member.website && (
              <Button size="sm" asChild>
                <a
                  href={`https://${member.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </Button>
            )}

            {member.twitter && (
              <Button size="sm" asChild>
                <a
                  href={`https://x.com/${member.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
            )}

            {member.linkedin && (
              <Button size="sm" asChild>
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            )}

            {member.github && (
              <Button size="sm" asChild>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}

            {member.mail && (
              <Button size="sm" asChild>
                <a
                  href={`mailto:${member.mail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            )}

            {/* If no buttons → invisible placeholder keeps height */}
            {!member.website && !member.github && !member.linkedin && !member.twitter && (
              <div className="w-8 h-8 opacity-0" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { type MemberData }