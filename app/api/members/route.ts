import { getAllMembers } from '@/lib/members'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const members = await getAllMembers()
    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}