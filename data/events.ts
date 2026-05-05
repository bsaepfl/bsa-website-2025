export type EventType = "Hackathon" | "Conference" | "Workshop"

export interface EventStat {
  label: string
  value: string
}

export interface EventLink {
  label: string
  href: string
}

export interface EventHighlight {
  title: string
  description: string
}

export interface PastEvent {
  id: string
  date: string
  title: string
  type: EventType
  tagline: string
  description: string
  longDescription?: string
  stats: EventStat[]
  sponsors: string[]
  highlights?: EventHighlight[]
  cohosts?: string[]
  location?: string
  links?: EventLink[]
  photos?: string[]
}

export const pastEvents: PastEvent[] = [
  {
    id: "stablecoin-payments-hackathon-2026",
    date: "March 2026",
    title: "Stablecoins & Payments Hackathon",
    type: "Hackathon",
    tagline: "36 hours of building the future of money",
    description:
      "36-hour coding competition focused on stablecoins, digital money, and payment infrastructure.",
    longDescription:
      "BSA's flagship spring hackathon brought together over 160 builders from across Europe to ship working products at the intersection of stablecoins, programmable money, and payment rails. Teams shipped 55 projects in 36 hours, judged by partners from across the stablecoin ecosystem.",
    stats: [
      { label: "Prize pool", value: "$16k+" },
      { label: "Participants", value: "160" },
      { label: "Projects", value: "55" },
      { label: "Duration", value: "36h" },
    ],
    sponsors: ["AlphaTON Capital", "XRPL Commons", "ENS", "Ledger"],
    highlights: [
      {
        title: "Stablecoin tracks",
        description:
          "Dedicated tracks for issuance, on/off-ramps, payments UX, and on-chain compliance.",
      },
      {
        title: "Mentorship from issuers",
        description:
          "Live office hours with engineers from partner protocols throughout the build window.",
      },
      {
        title: "Demo day",
        description:
          "Final-round teams pitched on the conference main stage to a panel of investors and operators.",
      },
    ],
    location: "EPFL - BC Building, Lausanne",
  },
  {
    id: "stablecoin-payments-conference-2026",
    date: "March 2026",
    title: "Stablecoins & Payments Conference",
    type: "Conference",
    tagline: "The state of stablecoins, on-chain - live from EPFL",
    description:
      "Expert talks and panels on stablecoins, CBDCs, regulation, and institutional DeFi. Speakers from Circle, Swiss National Bank, Aave, Franklin Templeton, Ledger, and UNHCR.",
    longDescription:
      "Across three stages, 20+ speakers from issuers, banks, regulators, and humanitarian organizations debated the future of programmable money. The conference covered everything from CBDC design and MiCA implementation to on-chain settlement, RWA tokenization, and stablecoin-rails for aid distribution.",
    stats: [
      { label: "Stages", value: "3" },
      { label: "Speakers", value: "20+" },
      { label: "Tracks", value: "Policy / Tech / Markets" },
    ],
    sponsors: [
      "AlphaTON Capital",
      "Ledger",
      "XRPL Commons",
      "ENS",
      "Hyli",
      "Raiffeisen",
      "Swissquote",
      "Taurus",
      "SYZ",
      "Supernova",
      "MiCA Crypto Alliance",
      "CVA",
      "WiW3CH",
      "CMTA",
    ],
    highlights: [
      {
        title: "Institutional DeFi",
        description:
          "Franklin Templeton, Aave and Taurus on bringing regulated capital on-chain.",
      },
      {
        title: "Regulators on stage",
        description:
          "Swiss National Bank and MiCA Crypto Alliance on the European regulatory landscape.",
      },
      {
        title: "Humanitarian rails",
        description:
          "UNHCR shared real-world deployments of stablecoin payouts for aid distribution.",
      },
    ],
    location: "EPFL - BC Building, Lausanne",
  },
  {
    id: "sui-bsa-hackathon-2025",
    date: "September 2025",
    title: "Sui x BSA Hackathon (3rd Edition)",
    type: "Hackathon",
    tagline: "Europe's biggest student-run Sui hackathon, third edition",
    description:
      "Third edition of Europe's biggest student-run Sui hackathon, with pre-hackathon workshops on Move language and advanced Sui features.",
    longDescription:
      "The third edition of the Sui x BSA Hackathon doubled down on technical depth. Pre-hackathon workshops walked teams through Move, Sui object model, and advanced features such as zkLogin and sponsored transactions. 200 participants competed in teams of up to 4 across DeFi, gaming, and consumer tracks.",
    stats: [
      { label: "Prize pool", value: "$20k+" },
      { label: "Participants", value: "200" },
      { label: "Team size", value: "Up to 4" },
    ],
    sponsors: ["Sui Foundation"],
    highlights: [
      {
        title: "Pre-hackathon bootcamp",
        description:
          "Three workshops covering Move fundamentals, Sui object model, and advanced patterns.",
      },
      {
        title: "Sui Foundation mentors",
        description:
          "Engineers from the Sui Foundation on-site for the full duration of the hackathon.",
      },
    ],
    cohosts: ["Sui Foundation"],
    location: "EPFL - BC Building, Lausanne",
  },
  {
    id: "privacy-verifiability-hackathon-2025",
    date: "March 2025",
    title: "Privacy & Verifiability Hackathon",
    type: "Hackathon",
    tagline: "ZKP, MPC, and TEE - built in 36 hours",
    description:
      "Building innovative solutions focusing on privacy and verifiability in blockchain. 23 projects submitted across ZKP, MPC, and TEE tracks.",
    longDescription:
      "36 hackers shipped 23 projects spanning zero-knowledge proofs, multi-party computation, and trusted execution environments. Judges from Mina, Hedera, and Hyli evaluated submissions on technical depth and applicability to real-world privacy problems.",
    stats: [
      { label: "Prize pool", value: "$15k" },
      { label: "Hackers", value: "36" },
      { label: "Projects", value: "23" },
    ],
    sponsors: ["Mina Foundation", "Hedera Hashgraph Association", "Hyli"],
    highlights: [
      {
        title: "Three privacy primitives",
        description:
          "Dedicated tracks for ZKP, MPC, and TEE - hackers picked their primitive and shipped.",
      },
      {
        title: "Co-located with conference",
        description:
          "Hackers had access to all conference talks and panels happening in parallel.",
      },
    ],
    location: "EPFL - BC Building, Lausanne",
    photos: [
      "/events/2/IMG_0492.JPG",
      "/events/2/IMG_0578.JPG",
      "/events/2/IMG_3494.JPG",
    ],
  },
  {
    id: "privacy-verifiability-conference-2025",
    date: "March 2025",
    title: "Privacy & Verifiability Conference",
    type: "Conference",
    tagline: "A deep dive into private DeFi, ZK, MPC, and MEV",
    description:
      "Deep dive into blockchain privacy: ZKP, MPC, TEE, private DeFi, MEV, and AI & privacy. Co-organized with Privacy Guardians, CVA, and IEEE Blockchain.",
    longDescription:
      "363 attendees gathered for a full day across 8 topic tracks dedicated to privacy and verifiability. The conference brought together researchers, builders, and operators working on zero-knowledge proofs, multi-party computation, trusted execution, private DeFi, MEV, and the intersection of AI and privacy.",
    stats: [
      { label: "Attendees", value: "363" },
      { label: "Topic tracks", value: "8" },
    ],
    sponsors: [
      "Hashgraph Association",
      "Aleph Zero",
      "Common Finance",
      "Mina Foundation",
      "Taurus",
    ],
    highlights: [
      {
        title: "8 dedicated tracks",
        description:
          "ZKP, MPC, TEE, private DeFi, MEV, AI & privacy, identity, and applied cryptography.",
      },
      {
        title: "Cross-org collaboration",
        description:
          "Co-organized with Privacy Guardians, CVA, and IEEE Blockchain Switzerland chapter.",
      },
    ],
    cohosts: ["Privacy Guardians", "CVA", "IEEE Blockchain"],
    location: "EPFL - BC Building, Lausanne",
    photos: [
      "/events/1/IMG_0492.JPG",
      "/events/1/IMG_0578.JPG",
      "/events/1/IMG_3494.JPG",
    ],
  },
  {
    id: "sui-bsa-hackathon-2024",
    date: "October 2024",
    title: "Sui x BSA Hackathon (2nd Edition)",
    type: "Hackathon",
    tagline: "22 projects, $25k+ in prizes, one weekend",
    description:
      "Second edition of the European Sui Hackathon. 22 projects submitted, including Fair.fun, Proximity, Suimons, and Imaigine.",
    longDescription:
      "The second edition of the Sui x BSA Hackathon gathered 70+ participants for a weekend of building on Move and Sui. Standout projects included Fair.fun, Proximity, Suimons, and Imaigine - several of which went on to graduate into independent products.",
    stats: [
      { label: "Prize pool", value: "$25k+" },
      { label: "Participants", value: "70+" },
      { label: "Projects", value: "22" },
    ],
    sponsors: ["Sui Foundation", "Polygon", "ETHIndia"],
    highlights: [
      {
        title: "Notable submissions",
        description:
          "Fair.fun, Proximity, Suimons, and Imaigine - projects that went on to ship beyond the hackathon.",
      },
    ],
    cohosts: ["Sui Foundation"],
    location: "EPFL, Lausanne",
  },
  {
    id: "epfl-blockchain-conference-2024",
    date: "March 2024",
    title: "EPFL Blockchain Conference",
    type: "Conference",
    tagline: "BSA's inaugural conference",
    description:
      "BSA's inaugural conference exploring cryptocurrencies, blockchain, and digital assets. Five panels on Web3 jobs, tokenization, regulation, universities in Web3, and mass adoption.",
    longDescription:
      "BSA's first conference set the template for what was to follow. Five panels brought speakers from across the industry to discuss careers in Web3, tokenization of real-world assets, the regulatory landscape, the role of universities in Web3, and the long path to mass adoption.",
    stats: [
      { label: "Panels", value: "5" },
      { label: "Companies", value: "10+" },
    ],
    sponsors: [
      "Arbitrum",
      "Syz Group",
      "Swissborg",
      "Avalanche",
      "Casper Association",
      "Blockchain Acceleration Foundation",
      "Crypto Valley Association",
    ],
    highlights: [
      {
        title: "Five themed panels",
        description:
          "Web3 jobs, tokenization, regulation, universities in Web3, and mass adoption.",
      },
      {
        title: "First of a series",
        description:
          "The inaugural BSA Conference that has since grown into an annual flagship event.",
      },
    ],
    location: "EPFL, Lausanne",
  },
  {
    id: "sui-bsa-hackathon-2023",
    date: "October 2023",
    title: "Sui x BSA Hackathon (1st Edition)",
    type: "Hackathon",
    tagline: "The first European Sui Hackathon",
    description:
      "The first European Sui Hackathon. Students from 13+ universities built on Sui using the Move programming language. Winners from TUM, EPFL, ETH Zurich, and Imperial College.",
    longDescription:
      "The very first European Sui Hackathon. 100+ students from 13+ universities - including TUM, EPFL, ETH Zurich, and Imperial College - built on Sui using the Move programming language. The event laid the foundation for what would become a recurring partnership between BSA and the Sui Foundation.",
    stats: [
      { label: "Prize pool", value: "$25k" },
      { label: "Participants", value: "100+" },
      { label: "Universities", value: "13+" },
    ],
    sponsors: ["Sui Foundation", "Polygon"],
    highlights: [
      {
        title: "Pan-European turnout",
        description:
          "Students travelled from 13+ universities across Europe, including TUM, ETH Zurich, and Imperial College.",
      },
      {
        title: "First Move hackathon at EPFL",
        description:
          "A first taste of the Move programming language for many participants - and the start of a series.",
      },
    ],
    cohosts: ["Sui Foundation"],
    location: "EPFL, Lausanne",
  },
]

export function getPastEventById(id: string): PastEvent | undefined {
  return pastEvents.find((event) => event.id === id)
}
