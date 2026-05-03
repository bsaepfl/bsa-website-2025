export type WinCategory = "Hackathon" | "Competition" | "Award" | "Recognition"

export type Win = {
  date: string // human-readable, e.g. "October 2025"
  year: string // for grouping
  event: string
  placement: string
  category: WinCategory
  team?: string
  prize?: string
  link?: string
  description?: string
}

// Order: most recent first.
// Skipped from source CSV (insufficient data — placement/prize TBA):
//   - XRPL Rome (Stan Stelcher / Alexandre Huou / Alexandre Mourot)
//   - ETHRome Oct 2025 (Alex Huou / Jeanne Louise Bassier / Elyes Ben Abid)
export const wins: Win[] = [
  {
    date: "April 2026",
    year: "2026",
    event: "ETHGlobal Cannes",
    placement: "1st place — Unlink track",
    category: "Hackathon",
    team: "Guillaume Lepin",
    prize: "3,000 USDC",
    link: "https://github.com/GuillaumeLepin/ghostbet",
  },
  {
    date: "April 2026",
    year: "2026",
    event: "ETHGlobal Cannes",
    placement: "3rd place — 0G track",
    category: "Hackathon",
    team: "Youssef Jeddi, Hassene Ezzeddine, Sylane Jawadi",
    prize: "1,000 USDC",
    link: "https://github.com/youssef-jeddi/Orchestra",
  },
  {
    date: "March 2026",
    year: "2026",
    event: "Stablecoins & Payments Hackathon",
    placement: "1st place — AlphaTON track",
    category: "Hackathon",
    team: "Antoine Bastide, Hedi Kharouf, Ahmed Chaouachi",
    prize: "1,500 USD + 1,000 TON",
    link: "https://github.com/AntoineBastide47/motivaton",
  },
  {
    date: "March 2026",
    year: "2026",
    event: "Stablecoins & Payments Hackathon",
    placement: "3rd place — TON track",
    category: "Hackathon",
    team: "Balthazar Golovtchiner, Charles Dupouy, Augustin Monpays, Antoine Lepin",
    prize: "500 USD + 500 TON",
    link: "https://github.com/CharlesDupouy/SUI_hackaton_2025",
  },
  {
    date: "March 2026",
    year: "2026",
    event: "Stablecoins & Payments Hackathon",
    placement: "3rd place — ENS track",
    category: "Hackathon",
    team: "Antoine Heurtier",
    prize: "150 USD",
    link: "https://github.com/Antoinehrtr/ensend",
  },
  {
    date: "March 2026",
    year: "2026",
    event: "Uniswap Hook Incubator 8",
    placement: "Uniswap Foundation Award",
    category: "Hackathon",
    team: "Hassene Ezzeddine",
    prize: "750 USD",
    link: "https://github.com/Hassene26/VolVantage",
  },
  {
    date: "October 2025",
    year: "2025",
    event: "ETHRome",
    placement: "1st place — iExec track",
    category: "Hackathon",
    team: "Youssef Jeddi, Hassene Ezzeddine",
    prize: "3,000 USD",
    link: "https://github.com/youssef-jeddi/TradeVault",
  },
  {
    date: "September 2025",
    year: "2025",
    event: "Sui x BSA Hackathon (3rd Edition)",
    placement: "Honorable Mention — Main Track",
    category: "Hackathon",
    team: "Balthazar Golovtchiner, Charles Dupouy, Elio le Dortz, Antoine Lepin",
    prize: "1,000 USDC",
    link: "https://github.com/CharlesDupouy/SUI_hackaton_2025",
  },
  {
    date: "October 2024",
    year: "2024",
    event: "Sui x BSA Hackathon (2nd Edition)",
    placement: "Honorary Prize",
    category: "Hackathon",
    team: "Jules Delforge, Guillaume Lepin, Jakub Kliment, Andrea Hazan, Louis Bernard",
    prize: "1,000 USD",
    link: "https://github.com/GuillaumeLepin/BetForDummies",
  },
]
