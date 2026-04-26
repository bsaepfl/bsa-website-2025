"use client"

import { useState } from "react"

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
          <p className="text-zinc-400 text-lead mb-xl max-w-[50ch] mx-auto">
            Questions about our events, interested in collaborating, or just want to say hello?
            We'd love to hear from you.
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
        </div>
      </section>
    </div>
  )
}
