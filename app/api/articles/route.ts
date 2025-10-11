import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'data', 'articles')
    
    // Check if articles directory exists
    if (!fs.existsSync(articlesDir)) {
      return NextResponse.json({ articles: [] })
    }
    
    // Read all article directories
    const articleDirs = fs.readdirSync(articlesDir).filter(dir => {
      const dirPath = path.join(articlesDir, dir)
      return fs.statSync(dirPath).isDirectory()
    })
    
    const articles = articleDirs.map(dir => {
      try {
        const articlePath = path.join(articlesDir, dir, 'index.md')
        const headerImagePath = path.join(process.cwd(), 'public', 'articles', dir, 'header.jpg')
        
        // Check if index.md exists
        if (!fs.existsSync(articlePath)) {
          return null
        }
        
        // Read and parse the markdown file
        const fileContent = fs.readFileSync(articlePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContent)
        
        // Extract content snippet (first 200 characters of content without markdown)
        const contentSnippet = content
          .replace(/#{1,6}\s+/g, '') // Remove headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
          .replace(/\*(.*?)\*/g, '$1') // Remove italic
          .replace(/`(.*?)`/g, '$1') // Remove inline code
          .replace(/\n+/g, ' ') // Replace newlines with spaces
          .trim()
          .substring(0, 200) + '...'
        
        // Check if header image exists
        const thumbnail = fs.existsSync(headerImagePath) 
          ? `/articles/${dir}/header.jpg` 
          : null
        
        // Extract categories from frontmatter or default to blockchain-related categories
        const categories = frontmatter.categories || ['Blockchain', 'Web3']
        
        return {
          title: frontmatter.title || `Article ${dir}`,
          link: `/articles/${dir}`, // Link to local article
          pubDate: frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString(),
          contentSnippet,
          thumbnail,
          categories: Array.isArray(categories) ? categories : [categories],
          authors: frontmatter.authors || [],
          sponsor: frontmatter.sponsor || null,
          id: dir
        }
      } catch (error) {
        console.error(`Error processing article ${dir}:`, error)
        return null
      }
    }).filter(article => article !== null) // Remove failed articles
    
    // Sort articles by date (newest first)
    articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    
    // console.log('Processed local articles:', articles) // Debug log
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error reading local articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}