import fs from 'fs'
import path from 'path'

export interface MemberData {
  tag: string
  name: string
  section: string
  title?: string
  website?: string
  twitter?: string
  linkedin?: string
  github?: string
  hasImage: boolean
}

function getTitleRank(title?: string): number {
  if (!title) return 4 // no title or unknown → last

  const t = title.toLowerCase()

  // order matters here
  if (t.includes('vice') && t.includes('president')) return 1
  if (t.includes('president')) return 0
  if (t.includes('treasurer')) return 2
  if (t.includes('head')) return 3

  return 4 // everything else
}


export async function getAllMembers(): Promise<MemberData[]> {
  const membersDir = path.join(process.cwd(), 'public', 'members')
  
  try {
    const memberFolders = fs.readdirSync(membersDir)
    const members: MemberData[] = []

    for (const folder of memberFolders) {
      const memberPath = path.join(membersDir, folder)
      const infoPath = path.join(memberPath, 'info.json')
      const imagePath = path.join(memberPath, 'image.jpg')

      if (fs.existsSync(infoPath)) {
        try {
          const infoContent = fs.readFileSync(infoPath, 'utf-8')
          const memberInfo = JSON.parse(infoContent)
          const hasImage = fs.existsSync(imagePath)

          members.push({
            tag: folder,
            name: memberInfo.name,
            section: memberInfo.section,
            title: memberInfo.title,
            website: memberInfo.website,
            twitter: memberInfo.twitter,
            linkedin: memberInfo.linkedin,
            github: memberInfo.github,
            hasImage
          })
        } catch (error) {
          console.error(`Error reading member info for ${folder}:`, error)
        }
      }
    }

    return members
      .filter(m => m.name && m.section) // safety against bad JSON
      .sort((a, b) => {
        const sectionA = a.section || ""
        const sectionB = b.section || ""
        if (sectionA !== sectionB) {
          return sectionA.localeCompare(sectionB)
        }

        const rankA = getTitleRank(a.title)
        const rankB = getTitleRank(b.title)
        if (rankA !== rankB) {
          return rankA - rankB
        }

        const nameA = a.name || ""
        const nameB = b.name || ""
        return nameA.localeCompare(nameB)
      })

  } catch (error) {
    console.error('Error reading members directory:', error)
    return []
  }
}