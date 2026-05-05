"use client"

import type { CSSProperties } from "react"
import { pastEvents } from "@/data/events"

type Partner = {
  name: string
  href?: string
  logo?: string
  logoClass?: string
}

const partnerCatalog: Record<string, Partner> = {
  "alphaton capital": {
    name: "AlphaTON Capital",
    href: "https://alphatoncapital.com",
    logo: "/partners/alphaton.png",
  },
  ledger: {
    name: "Ledger",
    href: "https://www.ledger.com",
    logo: "/partners/ledger.png",
    logoClass: "h-16 md:h-20",
  },
  "xrpl commons": {
    name: "XRPL Commons",
    href: "https://xrplcommons.org",
    logo: "/partners/xrpl.png",
    logoClass: "h-16 md:h-20",
  },
  ens: {
    name: "ENS",
    href: "https://ens.domains",
    logo: "/partners/ens.png",
  },
  hyli: {
    name: "Hyli",
    href: "https://www.hyli.org/",
    logo: "/partners/hyli.png",
  },
  raiffeisen: {
    name: "Raiffeisen",
    href: "https://www.raiffeisen.ch",
    logo: "/partners/raiffeisen.png",
  },
  swissquote: {
    name: "Swissquote",
    href: "https://www.swissquote.com",
    logo: "/partners/swissquote.png",
  },
  taurus: {
    name: "Taurus",
    href: "https://www.taurushq.com",
    logo: "/partners/taurus2.png",
  },
  "sui foundation": {
    name: "Sui Foundation",
    href: "https://sui.io",
    logo: "/partners/sui-logo-sea.png",
  },
  "mina foundation": {
    name: "Mina Foundation",
    href: "https://minaprotocol.com",
    logo: "/partners/mina.png",
    logoClass: "h-12 md:h-14",
  },
  arbitrum: {
    name: "Arbitrum",
    href: "https://arbitrum.io",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  },
  starknet: {
    name: "Starknet",
    href: "https://www.starknet.io",
    logo: "https://cryptologos.cc/logos/starknet-token-strk-logo.png",
  },
  "hedera hashgraph association": {
    name: "The Hashgraph Association",
    href: "https://www.hashgraph.swiss/",
    logo: "/partners/hedera.png",
  },
  "hashgraph association": {
    name: "The Hashgraph Association",
    href: "https://www.hashgraph.swiss/",
    logo: "/partners/hedera.png",
  },
  "aleph zero": {
    name: "Aleph Zero",
    href: "https://alephzero.org/",
    logo: "/partners/aleph.png",
  },
  syz: {
    name: "Syz Bank",
    href: "https://www.syzgroup.com/",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zhwc5walgccxtdcufweh?ik-sanitizeSvg=true",
    logoClass: "h-12 md:h-14",
  },
  "syz group": {
    name: "Syz Bank",
    href: "https://www.syzgroup.com/",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zhwc5walgccxtdcufweh?ik-sanitizeSvg=true",
    logoClass: "h-12 md:h-14",
  },
  supernova: {
    name: "Supernova",
    href: "https://thesupernovaexperience.com/",
  },
  "mica crypto alliance": {
    name: "MiCA Crypto Alliance",
    href: "https://www.micacryptoalliance.com/",
    logo: "https://cdn.prod.website-files.com/660a94378d5efa3a1040a72d/678ef42b2512530c092f9425_MiCA_Logo_White%20(1).png",
  },
  cva: {
    name: "Crypto Valley Association",
    href: "https://cryptovalley.swiss/",
    logo: "https://wp.logos-download.com/wp-content/uploads/2021/02/Crypto_Valley_Association_Logo.png?dl",
  },
  "crypto valley association": {
    name: "Crypto Valley Association",
    href: "https://cryptovalley.swiss/",
    logo: "https://wp.logos-download.com/wp-content/uploads/2021/02/Crypto_Valley_Association_Logo.png?dl",
  },
  wiw3ch: {
    name: "WiW3ch",
    href: "https://www.wiw3ch.com/",
    logo: "/partners/wiw3ch.png",
  },
}

const extraPartnerKeys = ["arbitrum", "starknet"]

const partners = Array.from(
  new Map(
    [
      ...pastEvents.flatMap((event) => event.sponsors),
      ...extraPartnerKeys,
    ]
      .map((name) => partnerCatalog[name.trim().toLowerCase()])
      .filter(Boolean)
      .map((partner) => [partner.name, partner])
  ).values()
)

const rows = [0, 1, 2].map((rowIndex) => {
  const rowPartners = partners.filter((_, index) => index % 3 === rowIndex)
  return rowPartners.length >= 4 ? rowPartners : [...rowPartners, ...partners].slice(0, 6)
})

export default function PartnersSection() {
  return (
    <section className="pb-section">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="mb-xl opacity-0">
          <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
            Partners
          </p>
          <h2 className="text-display-1 font-display text-zinc-50 max-w-md title-shimmer">
            We partnered with them
          </h2>
        </div>
      </div>

      <div className="overflow-hidden relative space-y-sm">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#1d2e4a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#1d2e4a] to-transparent z-10 pointer-events-none" />

        {rows.map((row, rowIndex) => {
          const tickerItems = [...row, ...row]

          return (
            <div
              key={rowIndex}
              className={`${rowIndex === 1 ? "marquee-right" : "marquee-left"} marquee-pause-on-hover flex gap-sm md:gap-lg w-max will-change-transform`}
              style={{ "--marquee-duration": `${28 + rowIndex * 3.5}s` } as CSSProperties}
            >
              {tickerItems.map((partner, index) => (
                <a
                  key={`${partner.name}-${rowIndex}-${index}`}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/50 px-8 py-5 flex items-center justify-center min-w-[190px] md:min-w-[230px] h-[92px] md:h-[108px] hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`${partner.logoClass ?? "h-8 md:h-10"} max-w-[150px] md:max-w-[180px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200 brightness-110`}
                    />
                  ) : (
                    <span className="text-zinc-300 text-lg md:text-xl font-semibold tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                      {partner.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
