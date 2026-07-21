"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Role = "student" | "sponsor"

const faqs: Record<Role, { q: string; a: string }[]> = {
  student: [
    {
      q: "How do I join the BSA?",
      a: "Any EPFL student can join. Show up at an event, follow us on social, or write to bsa@epfl.ch. We'll take it from there.",
    },
    {
      q: "Do I need blockchain experience?",
      a: "No. Our workshops welcome beginners and still add depth for members who already ship. Curiosity is the only prerequisite.",
    },
    {
      q: "Can non-EPFL students participate?",
      a: "Yes. Any student enrolled at a Swiss university or school can join the association even if our community is EPFL-first. Our conferences and hackathons go further and welcome students from any university.",
    },
    {
      q: "What teams exist inside BSA?",
      a: "Research, Education, Communication, Logistics, IT, Sponsorship, and Industry, plus a rotating executive committee. Come meet a team lead at the next event.",
    },
    {
      q: "Does joining cost anything?",
      a: "Nothing. Membership is free, most events are free, and hackathons usually come with prizes, not fees.",
    },
  ],
  sponsor: [
    {
      q: "How can we collaborate with BSA?",
      a: "We partner with protocols, VCs, research labs, and companies on hackathons, conferences, research, and talent. Start a conversation at bsa@epfl.ch.",
    },
    {
      q: "What sponsorship options are available?",
      a: "Event-specific packages or multi-event partnerships, tailored to your goals. Ask and we'll send over our current one-pager.",
    },
    {
      q: "What reach do sponsors get?",
      a: "Recent events drew 350+ conference attendees and 200+ hackathon participants from 20+ universities, alongside direct exposure to EPFL research faculty and the Zürich–Lausanne corridor.",
    },
    {
      q: "Can we recruit through BSA?",
      a: "Yes. Talks, workshops, direct intros. Many members have gone on to work at partner protocols and research groups. We can structure it to fit your hiring timeline.",
    },
    {
      q: "Do you co-organize with other student associations?",
      a: "Often. BSA regularly runs joint events with peer associations across Europe and the Zürich–Lausanne corridor.",
    },
  ],
}

const roles = [
  { id: "student" as const, number: "01", label: "Student", context: "EPFL, visiting, or just curious." },
  { id: "sponsor" as const, number: "02", label: "Sponsor", context: "Protocol, VC, research lab, or partner org." },
]

export default function RoleFAQ() {
  const [role, setRole] = useState<Role | null>(null)

  return (
    <div>
      {/* Section heading */}
      <div className="mb-xl">
        <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
          FAQ
        </p>
        <h2 className="text-display-1 font-display text-zinc-50 mb-sm title-shimmer">
          Depends on who's asking.
        </h2>
        <p className="text-zinc-400 text-lead font-serif max-w-[50ch]">
          Identify yourself. The answers split two ways.
        </p>
      </div>

      {/* Chooser → FAQ reveal */}
      {role === null ? (
        <div
          key="chooser"
          className="grid grid-cols-1 md:grid-cols-2 gap-md"
          style={{ animation: "faq-in 500ms cubic-bezier(0.32, 0.72, 0, 1) backwards" }}
        >
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="
                group relative text-left overflow-hidden
                rounded-lg border border-zinc-800 bg-zinc-900/30
                p-lg md:p-xl
                min-h-[220px] md:min-h-[260px]
                transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:border-zinc-500 hover:bg-zinc-900/60
                cursor-pointer
                focus-visible:outline-none focus-visible:border-zinc-300
              "
            >
              {/* Top row: number + cursor-blink SELECT affordance */}
              <div className="flex items-start justify-between mb-md">
                <span className="font-mono text-eyebrow text-zinc-500 tabular-nums">
                  [{r.number}]
                </span>
                <span className="font-mono text-eyebrow text-zinc-500 flex items-center">
                  SELECT
                  <span
                    className="inline-block w-[6px] h-[0.9em] bg-zinc-500 ml-1 align-middle animate-pulse"
                    aria-hidden="true"
                  />
                </span>
              </div>

              {/* Role label */}
              <p className="font-display text-display-2 text-zinc-50 leading-[1] mb-xs">
                I'm a {r.label.toLowerCase()}
              </p>

              <p className="text-sm text-zinc-500 max-w-[36ch]">
                {r.context}
              </p>

              {/* Bottom-right chevron */}
              <span
                className="
                  absolute bottom-md right-lg md:right-xl
                  font-mono text-eyebrow text-zinc-500
                  transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                  group-hover:translate-x-1 group-hover:text-zinc-200
                "
                aria-hidden="true"
              >
                →
              </span>

              {/* Subtle scan line that sweeps on hover (cypherpunk accent) */}
              <span
                className="
                  pointer-events-none absolute inset-x-0 top-0 h-px
                  bg-gradient-to-r from-transparent via-zinc-400/60 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      ) : (
        <div key={role}>
          {/* Persistent role indicator */}
          <div
            className="flex items-baseline justify-between mb-lg pb-sm border-b border-zinc-800"
            style={{ animation: "faq-in 500ms cubic-bezier(0.32, 0.72, 0, 1) backwards" }}
          >
            <p className="font-mono text-eyebrow text-zinc-400 flex items-center">
              ROLE <span className="text-zinc-600 mx-2">::</span> {role.toUpperCase()}
              <span
                className="inline-block w-[6px] h-[0.9em] bg-zinc-300 ml-2 align-middle animate-pulse"
                aria-hidden="true"
              />
            </p>
            <button
              onClick={() => setRole(null)}
              className="font-mono text-eyebrow text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              ← change
            </button>
          </div>

          {/* FAQ list with staggered reveal */}
          <Accordion type="single" collapsible className="w-full">
            {faqs[role].map((faq, i) => (
              <AccordionItem
                key={`${role}-${i}`}
                value={`item-${i}`}
                className="border-b border-zinc-800 last:border-0"
                style={{
                  animation: `faq-item-in 400ms cubic-bezier(0.32, 0.72, 0, 1) ${200 + i * 80}ms backwards`,
                }}
              >
                <AccordionTrigger className="text-zinc-200 hover:text-zinc-50 py-lg text-display-3 text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 pb-lg text-lead font-serif leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
