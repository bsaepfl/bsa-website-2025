import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let id: string
  try {
    const resolvedParams = await params
    id = resolvedParams.id
    const articlesDir = path.join(process.cwd(), 'data', 'articles')
    const articlePath = path.join(articlesDir, id, 'index.md')
    const headerImagePath = path.join(process.cwd(), 'public', 'articles', id, 'header.jpg')
    
    // Check if article exists
    if (!fs.existsSync(articlePath)) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Read and parse the markdown file
    const fileContent = fs.readFileSync(articlePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)

    // Return raw markdown content instead of converting to HTML
    // This will be processed by react-markdown on the client side
    
    // Check if header image exists
    const thumbnail = fs.existsSync(headerImagePath) 
      ? `/articles/${id}/header.jpg` 
      : null
    
    const article = {
      title: frontmatter.title || `Article ${id}`,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString(),
      authors: frontmatter.authors || [],
      sponsor: frontmatter.sponsor || null,
      content: content, // Raw markdown content
      thumbnail,
      id
    }
    
    return NextResponse.json(article)
  } catch (error) {
    console.error(`Error reading article:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}