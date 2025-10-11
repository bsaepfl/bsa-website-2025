import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventPath = path.join(process.cwd(), 'public', 'events', id, 'index.json')
    
    if (!fs.existsSync(eventPath)) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    
    const eventData = fs.readFileSync(eventPath, 'utf8')
    const event = JSON.parse(eventData)
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}