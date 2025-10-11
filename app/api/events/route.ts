import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const eventsDir = path.join(process.cwd(), 'public', 'events')
    const eventFolders = fs.readdirSync(eventsDir)
    
    const events = []
    
    for (const folder of eventFolders) {
      const eventPath = path.join(eventsDir, folder, 'index.json')
      
      if (fs.existsSync(eventPath)) {
        const eventData = fs.readFileSync(eventPath, 'utf8')
        const event = JSON.parse(eventData)
        events.push(event)
      }
    }
    
    // Sort events by date (most recent first)
    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}