'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'

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
          if (response.status === 404) { notFound() }
          throw new Error('Failed to fetch article')
        }
        setArticle(await response.json())
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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-4">
          <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
          <div className="h-64 bg-zinc-800 rounded-lg animate-pulse mt-8" />
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-zinc-400 mb-4">{error || 'Article not found'}</p>
        <Link href="/articles" className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-5 py-2 hover:text-zinc-50 hover:border-zinc-500 transition-all">
          Back to articles
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <article>
        <Link href="/articles" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors mb-8 inline-block">
          &larr; All articles
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-4">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {article.authors.length > 0 && (
              <span>{article.authors.join(', ')}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-display text-zinc-50 leading-[1.05] mb-4">
            {article.title}
          </h1>

          {article.sponsor && (
            <span className="text-xs font-mono text-zinc-500 border border-zinc-800 rounded-full px-3 py-1">
              Sponsored by {article.sponsor}
            </span>
          )}
        </header>

        {article.thumbnail && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image src={article.thumbnail} alt={article.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-display prose-headings:text-zinc-50
          prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-16 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-12 prose-h3:mb-5
          prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-4
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-zinc-300 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-zinc-50
          prose-strong:text-zinc-200
          prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400
          prose-code:text-zinc-300 prose-code:bg-zinc-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg
          prose-hr:border-zinc-800
          prose-li:text-zinc-400
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children, ...props }) => {
                const childArray = React.Children.toArray(children)
                const hasBlockElements = childArray.some(child =>
                  React.isValidElement(child) && child.type === 'img'
                )
                if (hasBlockElements) return <div className="my-4" {...props}>{children}</div>
                return <p {...props}>{children}</p>
              },
              img: ({ src, alt }) => {
                if (!src) return null
                const imageSrc = src.startsWith('./')
                  ? `/articles/${article.id}/${src.replace('./', '')}`
                  : src.startsWith('/') ? src : `/articles/${article.id}/${src}`
                return (
                  <Image src={imageSrc} alt={alt || ''} width={800} height={400}
                    className="rounded-lg my-6 w-full h-auto" style={{ width: 'auto', height: 'auto' }} />
                )
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
