"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import type { PastEvent } from "@/data/events"

const heroGradient = "linear-gradient(180deg, #fafafa 0%, #d4d4d8 100%)"
const accentGradient = "linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 100%)"

type Sponsor = {
  name: string
  logo?: string
  url?: string
  logoClass?: string
  tier?: SponsorTierName
}

type SponsorTierName =
  | "Diamond"
  | "Gold"
  | "Silver"
  | "Bronze"
  | "Community Partners"
  | "Partners"

type SponsorTier = {
  label: SponsorTierName
  color: string
  borderColor: string
  bgColor: string
  logoSize: string
  gridCols: string
  useFlexLayout?: boolean
}

const sponsorTiers: SponsorTier[] = [
  {
    label: "Diamond",
    color: "text-zinc-50",
    borderColor: "border-zinc-500/40",
    bgColor: "bg-[#152237]/80",
    logoSize: "w-56 sm:w-72 lg:w-80",
    gridCols: "grid-cols-1",
  },
  {
    label: "Gold",
    color: "text-zinc-200",
    borderColor: "border-zinc-600/50",
    bgColor: "bg-zinc-900/45",
    logoSize: "w-44 sm:w-56 lg:w-64",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  {
    label: "Silver",
    color: "text-zinc-300",
    borderColor: "border-zinc-700",
    bgColor: "bg-zinc-900/35",
    logoSize: "w-32 sm:w-40 lg:w-44",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  {
    label: "Bronze",
    color: "text-zinc-400",
    borderColor: "border-zinc-700",
    bgColor: "bg-[#152237]/55",
    logoSize: "w-28 sm:w-36 lg:w-44",
    gridCols: "grid-cols-2 sm:grid-cols-4",
    useFlexLayout: true,
  },
  {
    label: "Community Partners",
    color: "text-zinc-300",
    borderColor: "border-zinc-700",
    bgColor: "bg-zinc-900/35",
    logoSize: "w-28 sm:w-36 lg:w-44",
    gridCols: "grid-cols-2 sm:grid-cols-4",
  },
  {
    label: "Partners",
    color: "text-zinc-300",
    borderColor: "border-zinc-700",
    bgColor: "bg-zinc-900/35",
    logoSize: "w-28 sm:w-36 lg:w-44",
    gridCols: "grid-cols-2 sm:grid-cols-4",
    useFlexLayout: true,
  },
]

const sponsorCatalog: Record<string, Sponsor> = {
  "alphaton capital": {
    name: "AlphaTON Capital",
    logo: "/partners/alphaton.png",
    url: "https://alphatoncapital.com",
    tier: "Diamond",
  },
  ledger: {
    name: "Ledger",
    logo: "/partners/ledger.png",
    url: "https://www.ledger.com",
    tier: "Gold",
  },
  "xrpl commons": {
    name: "XRPL Commons",
    logo: "/partners/xrpl.png",
    url: "https://xrplcommons.org",
    tier: "Gold",
  },
  hyli: {
    name: "Hyli",
    logo: "/partners/hyli.png",
    url: "https://www.hyli.org/",
    tier: "Silver",
  },
  hyle: {
    name: "Hyle",
    logo: "/partners/hyle.png",
    url: "https://www.hyli.org/",
    tier: "Silver",
  },
  ens: {
    name: "ENS",
    logo: "/partners/ens.png",
    url: "https://ens.domains",
    tier: "Silver",
  },
  raiffeisen: {
    name: "Raiffeisen",
    logo: "/partners/raiffeisen.png",
    url: "https://www.raiffeisen.ch",
    tier: "Bronze",
  },
  swissquote: {
    name: "Swissquote",
    logo: "/partners/swissquote.png",
    url: "https://www.swissquote.com",
    tier: "Bronze",
  },
  taurus: {
    name: "Taurus",
    logo: "/partners/taurus2.png",
    url: "https://www.taurushq.com",
    tier: "Bronze",
  },
  "syz group": {
    name: "Syz Bank",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zhwc5walgccxtdcufweh?ik-sanitizeSvg=true",
    logoClass: "w-12 sm:w-14 lg:w-16 max-w-[64px] h-auto",
    url: "https://www.syzgroup.com/",
    tier: "Bronze",
  },
  syz: {
    name: "Syz Bank",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zhwc5walgccxtdcufweh?ik-sanitizeSvg=true",
    logoClass: "w-12 sm:w-14 lg:w-16 max-w-[64px] h-auto",
    url: "https://www.syzgroup.com/",
    tier: "Bronze",
  },
  supernova: {
    name: "Supernova",
    logo: "https://thesupernovaexperience.com/_nuxt/img/supernova_logo.f821ca6.svg",
    url: "https://thesupernovaexperience.com/",
    tier: "Bronze",
  },
  "mica crypto alliance": {
    name: "MiCA Crypto Alliance",
    logo: "https://cdn.prod.website-files.com/660a94378d5efa3a1040a72d/678ef42b2512530c092f9425_MiCA_Logo_White%20(1).png",
    url: "https://www.micacryptoalliance.com/",
    tier: "Community Partners",
  },
  cva: {
    name: "Crypto Valley Association",
    logo: "https://wp.logos-download.com/wp-content/uploads/2021/02/Crypto_Valley_Association_Logo.png?dl",
    logoClass: "w-36 sm:w-44 lg:w-52",
    url: "https://cryptovalley.swiss/",
    tier: "Community Partners",
  },
  "crypto valley association": {
    name: "Crypto Valley Association",
    logo: "https://wp.logos-download.com/wp-content/uploads/2021/02/Crypto_Valley_Association_Logo.png?dl",
    logoClass: "w-36 sm:w-44 lg:w-52",
    url: "https://cryptovalley.swiss/",
    tier: "Community Partners",
  },
  wiw3ch: {
    name: "WiW3ch",
    logo: "/partners/wiw3ch.png",
    url: "https://www.wiw3ch.com/",
    tier: "Community Partners",
  },
  "hedera hashgraph association": {
    name: "The Hashgraph Association",
    logo: "/partners/hedera.png",
    url: "https://www.hashgraph.swiss/",
    tier: "Gold",
  },
  "hashgraph association": {
    name: "The Hashgraph Association",
    logo: "/partners/hedera.png",
    url: "https://www.hashgraph.swiss/",
    tier: "Gold",
  },
  "aleph zero": {
    name: "Aleph Zero",
    logo: "/partners/aleph.png",
    url: "https://alephzero.org/",
    tier: "Silver",
  },
  "mina foundation": {
    name: "Mina Foundation",
    logo: "/partners/mina.png",
    url: "https://minaprotocol.com/",
    tier: "Gold",
  },
}

interface EventDetailClientProps {
  event: PastEvent
}

function titleParts(title: string) {
  const editionMatch = title.match(/^(.*?)\s*\((.*?)\)\s*$/)
  const baseTitle = editionMatch?.[1] ?? title
  const edition = editionMatch?.[2]
  const typeMatch = baseTitle.match(/\b(Hackathon|Conference|Workshop)\b/i)

  if (typeMatch?.index !== undefined) {
    const lineOne = baseTitle.slice(0, typeMatch.index).trim()
    const lineTwo = baseTitle.slice(typeMatch.index).trim()

    if (lineOne && lineTwo) {
      return { lineOne, lineTwo, edition }
    }
  }

  const words = baseTitle.split(" ")
  const midpoint = Math.ceil(words.length / 2)

  return {
    lineOne: words.slice(0, midpoint).join(" "),
    lineTwo: words.slice(midpoint).join(" "),
    edition,
  }
}

function PageSection({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`w-full flex justify-center bg-transparent ${className}`}>
      <div className="w-full max-w-[1100px] px-4 py-10 sm:px-10 sm:py-12">
        {children}
      </div>
    </section>
  )
}

function SectionTitle({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow?: string
  title: string
  centered?: boolean
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  )
}

function normalizeSponsor(name: string) {
  return name.trim().toLowerCase()
}

function eventSponsorTiers(sponsors: string[]) {
  const resolvedSponsors = sponsors.map((name) => {
    const sponsor = sponsorCatalog[normalizeSponsor(name)]

    return {
      name,
      tier: "Partners" as SponsorTierName,
      ...sponsor,
    }
  })

  return sponsorTiers
    .map((tier) => ({
      ...tier,
      sponsors: resolvedSponsors.filter((sponsor) => sponsor.tier === tier.label),
    }))
    .filter((tier) => tier.sponsors.length > 0)
}

function SponsorThanks({ sponsors }: { sponsors: string[] }) {
  const tiers = eventSponsorTiers(sponsors)

  return (
    <div className="w-full flex flex-col justify-center items-center bg-transparent relative pb-10">
      <div
        id="Sponsors"
        className="h-[52px] sm:h-[70px] w-full absolute -top-[52px] sm:-top-[70px] pointer-events-none"
      />

      <div className="w-full max-w-[1100px] flex flex-col py-10 px-4 sm:px-10 gap-8 text-sm sm:text-base">
        <h2 className="flex flex-col items-center justify-center gap-2 text-center">
          <span className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-200 select-none">
            Our Sponsors
          </span>
          <span className="text-zinc-300 text-lg sm:text-xl lg:text-2xl font-medium">
            Making BSA events possible
          </span>
        </h2>

        {tiers.map((tier) => (
          <div
            key={tier.label}
            className={`${tier.bgColor} ${tier.borderColor} border backdrop-blur-md rounded-lg shadow-md p-5 sm:p-6 flex flex-col items-center justify-center gap-4`}
          >
            <span className={`${tier.color} text-lg sm:text-xl font-semibold uppercase tracking-widest`}>
              {tier.label}
            </span>
            <div
              className={
                tier.sponsors.length === 1 || tier.useFlexLayout
                  ? "flex flex-wrap justify-center gap-6 w-full"
                  : `grid ${tier.gridCols} gap-6 place-items-center w-full`
              }
            >
              {tier.sponsors.map((sponsor) => {
                const content = (
                  <>
                    {sponsor.logo ? (
                      // conf-website uses img here because several logos are remote SVG/PNG URLs.
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className={`${sponsor.logoClass ?? tier.logoSize} object-contain opacity-60`}
                      />
                    ) : (
                      <span className="min-h-12 flex items-center text-center text-xl sm:text-2xl font-bold text-zinc-400">
                        {sponsor.name}
                      </span>
                    )}
                    <span className="text-zinc-500 font-medium text-sm sm:text-base text-center">
                      {sponsor.name}
                    </span>
                  </>
                )

                return (
                  <div
                    key={sponsor.name}
                    className="flex flex-col items-center justify-center gap-3"
                  >
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-3 hover:opacity-90"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const statsGridColumns: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  const { lineOne, lineTwo, edition } = titleParts(event.title)
  const statsColumns =
    statsGridColumns[Math.min(event.stats.length, 4)] ?? "md:grid-cols-4"

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-[#1d2e4a]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="fixed inset-0 -z-10 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.42), transparent), radial-gradient(1px 1px at 60px 90px, rgba(255,255,255,0.28), transparent), radial-gradient(1px 1px at 130px 50px, rgba(255,255,255,0.34), transparent), radial-gradient(1.5px 1.5px at 200px 160px, rgba(255,255,255,0.22), transparent), radial-gradient(1px 1px at 270px 100px, rgba(255,255,255,0.28), transparent), radial-gradient(1px 1px at 340px 220px, rgba(255,255,255,0.34), transparent), radial-gradient(1.5px 1.5px at 90px 220px, rgba(255,255,255,0.22), transparent), radial-gradient(1px 1px at 380px 60px, rgba(255,255,255,0.28), transparent)",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 280px",
        }}
      />

      <article className="-mt-20 flex w-full flex-col overflow-x-hidden bg-transparent text-zinc-50 md:-mt-24">
        <section className="relative flex min-h-[56vh] w-full flex-col items-center justify-center px-4 py-14 text-center sm:py-16">
          <div className="absolute left-5 top-24 sm:left-10 md:top-28">
            <Link
              href="/events"
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-zinc-50 sm:text-sm"
            >
              &larr; All events
            </Link>
          </div>

          <p className="mb-5 mt-8 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
            {event.date}
            <span className="mx-3 text-zinc-700">/</span>
            {event.type}
          </p>

          <h1 className="w-full max-w-[1180px] select-none text-balance font-sans font-black uppercase leading-none tracking-normal">
            <span
              className="block break-words text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                background: heroGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {lineOne}
            </span>
            {lineTwo && (
              <span
                className="mt-2 block break-words text-5xl sm:mt-3 sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  background: accentGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {lineTwo}
              </span>
            )}
          </h1>

          {edition && (
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
              {edition}
            </p>
          )}

          <p className="mt-6 max-w-[560px] px-4 text-base font-normal leading-relaxed text-zinc-400 md:text-lg">
            {event.tagline}
          </p>

          <p className="mt-7 text-xs font-light uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
            {event.location ?? "EPFL Campus"}
          </p>
        </section>

        {event.stats.length > 0 && (
          <section className="w-full flex justify-center bg-transparent">
            <div className="w-full max-w-[1100px] px-4 pb-8 sm:px-10 sm:pb-10">
              <div className={`mx-auto grid max-w-[1100px] grid-cols-2 ${statsColumns} gap-x-6 gap-y-6 border-y border-zinc-800 py-6 sm:py-7`}>
              {event.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-extrabold leading-none text-zinc-50 sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </section>
        )}

        {event.longDescription && (
          <PageSection>
            <div className="mx-auto max-w-[760px] text-center">
              <SectionTitle eyebrow="Overview" title="What happened" centered />
              <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {event.longDescription}
              </p>
            </div>
          </PageSection>
        )}

        {event.highlights && event.highlights.length > 0 && (
          <PageSection>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <SectionTitle eyebrow="Highlights" title="Event notes" />
              <div className="divide-y divide-zinc-800 border-y border-zinc-800">
                {event.highlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:py-6"
                  >
                    <p className="text-sm font-medium tabular-nums tracking-[0.18em] text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-50">
                        {highlight.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-zinc-400">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PageSection>
        )}

        {event.photos && event.photos.length > 0 && (
          <PageSection>
            <SectionTitle eyebrow="Gallery" title="Scenes from the event" />
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {event.photos.map((photo, index) => (
                <div
                  key={photo}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70"
                >
                  <Image
                    src={photo}
                    alt={`${event.title} photo ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-85 transition duration-500 hover:scale-[1.03] hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </PageSection>
        )}

        {event.sponsors.length > 0 && (
          <SponsorThanks sponsors={event.sponsors} />
        )}

        {event.cohosts && event.cohosts.length > 0 && (
          <PageSection className="pt-0">
            <div className="mx-auto max-w-[760px] border-y border-zinc-800 py-5 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                Co-hosted with
              </p>
              <p className="mt-3 text-xl font-semibold text-zinc-50 sm:text-2xl">
                {event.cohosts.join(" / ")}
              </p>
            </div>
          </PageSection>
        )}

        {event.location && (
          <section className="w-full flex flex-col justify-start items-center bg-transparent text-zinc-50">
            <div className="w-full max-w-[1100px] flex flex-col py-10 px-4 sm:px-10 gap-5">
              <h2 className="w-full font-bold text-3xl sm:text-4xl text-zinc-50 indent-2 pb-2">
                Location
              </h2>

            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/50">
              <div className="aspect-[16/9] w-full sm:aspect-[2/1]">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${event.title} location`}
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-[#152237]/80">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-zinc-50 truncate">
                    {event.location}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Lausanne, Switzerland
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit relative rounded-md uppercase bg-[#152237] hover:bg-[#1a2a40] border border-zinc-700 text-zinc-50 font-medium hover:border-zinc-500 duration-100 px-6 sm:px-10 py-2"
                >
                  Directions
                </a>
              </div>
            </div>
            </div>
          </section>
        )}

        {event.links && event.links.length > 0 && (
          <PageSection>
            <SectionTitle eyebrow="Resources" title="Follow up" />
            <div className="mt-5 flex flex-wrap gap-5">
              {event.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-50"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          </PageSection>
        )}

        <section className="flex w-full justify-center">
          <div className="w-full max-w-[1100px] border-t border-zinc-800 px-4 py-8 sm:px-10">
            <Link
              href="/events"
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-zinc-50 sm:text-sm"
            >
              &larr; Back to all events
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
