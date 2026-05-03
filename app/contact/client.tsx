"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", subject: "", message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Failed to send')
      setSubmitStatus("success")
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const faqGroups = [
    {
      title: "For students",
      items: [
        { question: "How can I join the BSA?", answer: "All EPFL students are welcome! Simply attend our events, follow us on social media, or reach out to us directly." },
        { question: "Do I need blockchain experience to participate?", answer: "Not at all! We welcome students of all experience levels. Our workshops are designed to accommodate beginners while also providing value to experienced participants." },
        { question: "Can non-EPFL students participate?", answer: "While our primary focus is EPFL students, we occasionally host events open to the broader blockchain community. Check our events page for public events." },
      ],
    },
    {
      title: "For companies & partners",
      items: [
        { question: "I'm a company interested in sponsoring", answer: "We partner with companies in a few different ways: hackathon sponsorships, conference partnerships, recruiting sessions, and longer-term ecosystem partnerships. The simplest first step is to reach out at bsa@epfl.ch and tell us a bit about your goals." },
        { question: "What do sponsors get in return?", answer: "Depending on the partnership, sponsors typically get on-stage and online visibility, branded presence at our events, direct access to EPFL blockchain talent for recruiting, the chance to run technical workshops or bounties, and inclusion in our community communications." },
        { question: "Can we co-host an event, workshop, or hackathon with the BSA?", answer: "Absolutely. We regularly co-organize technical workshops, panels, and hackathon tracks with partners. Get in touch with what you have in mind and we'll figure out the right format together." },
        { question: "Who do we contact to start a partnership?", answer: "Email us at bsa@epfl.ch with a short note about your company and what you're looking for. We aim to reply within a few working days." },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-section">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
            Contact
          </p>
          <h1 className="text-hero font-display text-zinc-50 mb-lg title-shimmer">
            Get in touch
          </h1>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info + form */}
            <div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Whether you&apos;re a student curious about our events, a company exploring
                a partnership, or a researcher looking to collaborate &mdash; we&apos;d love
                to hear from you.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-lg mb-2xl text-left">
                <a href="mailto:bsa@epfl.ch" className="flex items-center gap-xs text-zinc-300 hover:text-zinc-50 transition-colors">
                  <span className="text-eyebrow font-mono text-zinc-600">Email</span>
                  <span>bsa@epfl.ch</span>
                </a>
                <div className="flex items-center gap-xs text-zinc-400">
                  <span className="text-eyebrow font-mono text-zinc-600">Location</span>
                  <span>EPFL, Lausanne, Switzerland</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-sm text-left">
                <div className="grid grid-cols-2 gap-sm">
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required
                    className="w-full px-sm py-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required
                    className="w-full px-sm py-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                </div>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required
                  className="w-full px-sm py-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject"
                  className="w-full px-sm py-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" required rows={5}
                  className="w-full px-sm py-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm resize-none" />

                {submitStatus === "success" && (
                  <p className="text-emerald-400 text-sm">Message sent successfully.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
                )}

                <div className="pt-xs">
                  <button type="submit" disabled={isSubmitting}
                    className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-md py-2.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>

              {/* FAQ */}
              <div className="mt-2xl">
                <h2 className="text-3xl md:text-5xl font-display text-zinc-50 mb-8">
                  Frequently asked questions
                </h2>
                <div className="space-y-10">
                  {faqGroups.map((group, gi) => (
                    <div key={group.title}>
                      <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
                        {group.title}
                      </p>
                      <div className="space-y-3">
                        {group.items.map((faq, i) => (
                          <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50">
                            <Accordion type="single" collapsible>
                              <AccordionItem value={`item-${gi}-${i}`} className="border-0">
                                <AccordionTrigger className="text-zinc-200 hover:text-zinc-50 px-5 py-5 text-lg md:text-xl text-left font-medium">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-5 text-zinc-400 text-base leading-relaxed">
                                  {faq.answer}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
