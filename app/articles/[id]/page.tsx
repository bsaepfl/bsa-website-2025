'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

interface Article {
  title: string
  date: string
  authors: string[]
  sponsor?: string
  content: string
  thumbnail?: string
  id: string
}

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/articles/${resolvedParams.id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch article')
        }
        
        const articleData = await response.json()
        setArticle(articleData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-8"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        {/* Header Image */}
        {article.thumbnail && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            
            {article.authors.length > 0 && (
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="font-medium">{article.authors.join(', ')}</span>
              </div>
            )}
          </div>

          {article.sponsor && (
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Sponsored by {article.sponsor}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Override paragraph component to prevent invalid nesting
              p: ({ children, ...props }) => {
                // Convert children to array and check for block elements
                const childArray = React.Children.toArray(children)
                const hasBlockElements = childArray.some(child => {
                  if (React.isValidElement(child)) {
                    // Check if child is an image (which we render as div)
                    if (child.type === 'img') return true
                    // Check if child has block-level elements
                    if (typeof child.type === 'string') {
                      const blockElements = ['div', 'section', 'article', 'header', 'footer', 'nav', 'aside', 'main']
                      return blockElements.includes(child.type)
                    }
                  }
                  return false
                })
                
                // If paragraph contains block elements, render as div instead
                if (hasBlockElements) {
                  return <div className="my-4" {...props}>{children}</div>
                }
                
                return <p {...props}>{children}</p>
              },
              // Handle images without wrapping div to prevent nesting issues
              img: ({ src, alt, ...props }) => {
                if (!src) return null
                
                // Handle relative image paths
                const imageSrc = src.startsWith('./') 
                  ? `/articles/${article.id}/${src.replace('./', '')}`
                  : src.startsWith('/') 
                    ? src 
                    : `/articles/${article.id}/${src}`
                
                return (
                  <Image
                    src={imageSrc}
                    alt={alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg my-6 w-full h-auto"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                )
              },
              a: ({ href, children, ...props }) => {
                if (!href) return <span>{children}</span>
                
                // Handle external links
                if (href.startsWith('http')) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                      {...props}
                    >
                      {children}
                    </a>
                  )
                }
                
                // Handle internal links
                return (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline"
                    {...props}
                  >
                    {children}
                  </a>
                )
              }
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}