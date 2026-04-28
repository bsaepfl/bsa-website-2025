import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import BackToTop from "@/components/back-to-top"
import ClickPop from "@/components/click-pop"

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-display",
})

const switzer = localFont({
  src: [
    { path: "../public/fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
})

const monaspace = localFont({
  src: [
    { path: "../public/fonts/MonaspaceNeon-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/MonaspaceNeon-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BSA - Blockchain Student Association at EPFL",
    template: "%s | BSA EPFL",
  },
  description: "Blockchain Student Association at EPFL. Conferences, hackathons, research, and a student community in Lausanne, Switzerland.",
  metadataBase: new URL("https://www.bsaepfl.ch"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BSA EPFL",
    title: "BSA - Blockchain Student Association at EPFL",
    description: "Conferences, hackathons, research, and a student community at EPFL.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bsaepfl",
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blockchain Student Association",
    alternateName: "BSA EPFL",
    url: "https://www.bsaepfl.ch",
    logo: "https://www.bsaepfl.ch/big-logo.png",
    foundingDate: "2018",
    description: "Student-led community for blockchain at EPFL. Conferences, hackathons, research, and startup incubation.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lausanne",
      addressCountry: "CH",
    },
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "EPFL",
      url: "https://epfl.ch",
    },
    sameAs: [
      "https://x.com/bsaepfl",
      "https://instagram.com/bsaepfl",
      "https://linkedin.com/company/bsaepfl",
      "https://github.com/bsaepfl",
      "https://www.youtube.com/@bsaepfl",
    ],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${switzer.variable} ${monaspace.variable} font-sans antialiased noise`}>
        <Navbar />
        <main className="pt-20 md:pt-24">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <BackToTop />
        <ClickPop />
      </body>
    </html>
  )
}
