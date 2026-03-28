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

  const faqs = [
    { question: "How can I join the BSA?", answer: "All EPFL students are welcome! Simply attend our events, follow us on social media, or reach out to us directly." },
    { question: "Do I need blockchain experience to participate?", answer: "Not at all! We welcome students of all experience levels. Our workshops are designed to accommodate beginners while also providing value to experienced participants." },
    { question: "How can I collaborate with the BSA?", answer: "We are open to collaborations with other student organizations, companies, and academic institutions. Contact us to discuss potential partnerships, sponsorships, or joint events." },
    { question: "Can non-EPFL students participate?", answer: "While our primary focus is EPFL students, we occasionally host events open to the broader blockchain community. Check our events page for public events." },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Contact
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-16 title-shimmer">
            Get in touch
          </h1>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info + form */}
            <div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Have questions about our events, want to collaborate, or just want to say hello?
                We would love to hear from you.
              </p>

              <div className="space-y-4 mb-12">
                <a href="mailto:bsa@epfl.ch" className="flex items-center gap-3 text-zinc-300 hover:text-zinc-50 transition-colors">
                  <span className="text-xs font-mono text-zinc-600">Email</span>
                  <span>bsa@epfl.ch</span>
                </a>
                <div className="flex items-center gap-3 text-zinc-400">
                  <span className="text-xs font-mono text-zinc-600">Location</span>
                  <span>EPFL, Lausanne, Switzerland</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                </div>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" required rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm resize-none" />

                {submitStatus === "success" && (
                  <p className="text-emerald-400 text-sm">Message sent successfully.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="text-zinc-950 bg-zinc-50 text-sm font-medium rounded-full px-6 py-2.5 hover:bg-zinc-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl md:text-5xl font-display text-zinc-50 mb-8">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${i}`} className="border-0">
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
          </div>
        </div>
      </section>
    </div>
  )
}
