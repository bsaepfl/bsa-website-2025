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
    <div className="group relative transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 mb-3 ring-1 ring-white/5 group-hover:ring-white/20 shadow-lg shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/40 transition-[box-shadow,ring] duration-500">
        {member.hasImage ? (
          member.image && /^https?:\/\//.test(member.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Image
              src={member.image || `/members/${member.tag}/image.jpg`}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-8 h-8 text-zinc-700" />
          </div>
        )}
        {/* Bottom gradient sheen on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <h3 className="text-zinc-50 text-lg md:text-xl font-medium leading-snug">{member.name}</h3>
      {member.title && (
        <p className="text-zinc-500 group-hover:text-zinc-300 text-sm md:text-base mt-1 transition-colors duration-300">{member.title}</p>
      )}

      {/* Social */}
      <div className="flex gap-2 mt-2">
        {socialLinks.map(({ key, icon: Icon, prefix }, idx) => {
          const value = member[key]
          if (!value) return null
          return (
            <a
              key={key}
              href={`${prefix}${value}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${idx * 40}ms` }}
              className="text-zinc-500 hover:text-zinc-50 hover:-translate-y-0.5 opacity-70 group-hover:opacity-100 transition-[color,opacity,transform] duration-300"
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
