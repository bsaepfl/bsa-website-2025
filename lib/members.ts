import fs from 'fs'
import path from 'path'

export interface MemberData {
  id: string
  name: string
  section: string
  twitter?: string
  linkedin?: string
  github?: string
  hasImage: boolean
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
            id: folder,
            name: memberInfo.name,
            section: memberInfo.section,
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

    // Sort members by section and then by name
    return members.sort((a, b) => {
      if (a.section !== b.section) {
        return a.section.localeCompare(b.section)
      }
      return a.name.localeCompare(b.name)
    })
  } catch (error) {
    console.error('Error reading members directory:', error)
    return []
  }
}