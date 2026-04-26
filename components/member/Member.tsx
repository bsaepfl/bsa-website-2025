import { Github, Linkedin, Twitter, User, Globe, Mail } from "lucide-react"
import Image from "next/image"
import { MemberData } from "@/lib/members"

interface MemberProps {
  member: MemberData
  animationDelay?: number
}

const socialLinks = [
  { key: 'website' as const, icon: Globe, prefix: 'https://' },
  { key: 'twitter' as const, icon: Twitter, prefix: 'https://x.com/' },
  { key: 'linkedin' as const, icon: Linkedin, prefix: 'https://linkedin.com/in/' },
  { key: 'github' as const, icon: Github, prefix: 'https://github.com/' },
  { key: 'mail' as const, icon: Mail, prefix: 'mailto:' },
]

export default function Member({ member }: MemberProps) {
  return (
    <div className="group hover:-translate-y-1.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
      {/* Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 mb-3">
        {member.hasImage ? (
          member.image && /^https?:\/\//.test(member.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Image
              src={member.image || `/members/${member.tag}/image.jpg`}
              alt={member.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-8 h-8 text-zinc-700" />
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-zinc-50 text-base md:text-lg font-medium leading-snug">{member.name}</h3>
      {member.title && (
        <p className="text-zinc-500 text-sm mt-1">{member.title}</p>
      )}

      {/* Social */}
      <div className="flex gap-2 mt-2">
        {socialLinks.map(({ key, icon: Icon, prefix }) => {
          const value = member[key]
          if (!value) return null
          return (
            <a
              key={key}
              href={`${prefix}${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export { type MemberData }
