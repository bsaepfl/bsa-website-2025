import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-display",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "BSA - EPFL",
  description: "Blockchain Student Association at EPFL. Conferences, hackathons, research, and a DAO-governed community.",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased noise`}>
        <Navbar />
        <main className="pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
