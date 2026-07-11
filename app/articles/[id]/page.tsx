'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'

interface Article {
  title: string
  date: string
  authors: string[]
  sponsor?: string
  sponsorLabel?: string
  image?: string
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
      <div className="max-w-3xl mx-auto px-6 py-2xl">
        <div className="space-y-sm">
          <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
          <div className="h-64 bg-zinc-800 rounded-lg animate-pulse mt-lg" />
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-2xl text-center">
        <p className="text-zinc-400 mb-sm">{error || 'Article not found'}</p>
        <Link href="/articles" className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-sm py-2xs hover:text-zinc-50 hover:border-zinc-500 transition-all">
          Back to articles
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-section">
      <article>
        <Link href="/articles" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors mb-lg inline-block">
          &larr; All articles
        </Link>

        <header className="mb-xl">
          <div className="flex items-center gap-sm text-eyebrow font-mono text-zinc-500 mb-sm">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {article.authors.length > 0 && (
              <span>{article.authors.join(', ')}</span>
            )}
          </div>

          <h1 className="text-display-1 font-display text-zinc-50 mb-sm">
            {article.title}
          </h1>

          {article.sponsor && (
            <span className="text-eyebrow font-mono text-zinc-500 border border-zinc-800 rounded-full px-xs py-1">
              {article.sponsorLabel || 'Sponsored by'} {article.sponsor}
            </span>
          )}
        </header>

        {(article.image || article.thumbnail) && (
          article.image ? (
            <div className="relative w-full h-72 md:h-[28rem] lg:h-[32rem] mb-xl rounded-lg overflow-hidden bg-zinc-950 flex items-center justify-center md:-mx-12 lg:-mx-32 xl:-mx-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="max-h-full max-w-full object-contain" />
            </div>
          ) : (
            <div className="relative w-full h-72 md:h-[28rem] lg:h-[32rem] mb-xl rounded-lg overflow-hidden md:-mx-12 lg:-mx-32 xl:-mx-48">
              <Image src={article.thumbnail!} alt={article.title} fill className="object-cover" priority />
            </div>
          )
        )}

        <div className="max-w-none text-zinc-300 [&>*:first-child]:mt-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children, ...props }) => (
                <h1 className="font-display text-zinc-50 tracking-tight text-4xl md:text-5xl leading-[1.05] mt-20 mb-8 pb-4 border-b border-zinc-800 scroll-mt-24" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="font-display text-zinc-50 tracking-tight text-3xl md:text-4xl leading-tight mt-16 mb-6 scroll-mt-24" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="font-display text-zinc-50 tracking-tight text-2xl md:text-3xl leading-tight mt-12 mb-5 scroll-mt-24" {...props}>
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 className="font-display text-zinc-50 tracking-tight text-xl md:text-2xl mt-10 mb-4 scroll-mt-24" {...props}>
                  {children}
                </h4>
              ),
              p: ({ children, ...props }) => {
                const childArray = React.Children.toArray(children)
                const hasBlockElements = childArray.some(child =>
                  React.isValidElement(child) && child.type === 'img'
                )
                if (hasBlockElements) return <div className="my-4" {...props}>{children}</div>
                return <p className="text-zinc-400 text-lg leading-relaxed mb-6" {...props}>{children}</p>
              },
              a: ({ children, href, ...props }) => {
                if (href && href.toLowerCase().endsWith('.pdf')) {
                  return (
                    <a
                      href={href}
                      download
                      className="not-prose inline-flex items-center gap-2 mt-2 mb-4 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 no-underline hover:text-zinc-50 hover:border-zinc-500 hover:bg-zinc-900 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      {children}
                    </a>
                  )
                }
                return (
                  <a href={href} className="text-zinc-300 underline underline-offset-4 hover:text-zinc-50 transition-colors" {...props}>
                    {children}
                  </a>
                )
              },
              strong: ({ children, ...props }) => (
                <strong className="text-zinc-200 font-semibold" {...props}>{children}</strong>
              ),
              em: ({ children, ...props }) => (
                <em className="italic text-zinc-300" {...props}>{children}</em>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc pl-6 my-6 space-y-2 text-zinc-400 text-lg leading-relaxed marker:text-zinc-600" {...props}>{children}</ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal pl-6 my-6 space-y-2 text-zinc-400 text-lg leading-relaxed marker:text-zinc-600" {...props}>{children}</ol>
              ),
              li: ({ children, ...props }) => (
                <li className="pl-1" {...props}>{children}</li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-2 border-zinc-700 pl-5 my-6 italic text-zinc-400" {...props}>{children}</blockquote>
              ),
              code: ({ children, className, ...props }) => {
                const isBlock = className?.includes('language-')
                if (isBlock) {
                  return <code className={`${className} text-zinc-200 text-sm font-mono`} {...props}>{children}</code>
                }
                return <code className="text-zinc-200 bg-zinc-800/60 px-1.5 py-0.5 rounded text-[0.9em] font-mono" {...props}>{children}</code>
              },
              pre: ({ children, ...props }) => (
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-6 overflow-x-auto" {...props}>{children}</pre>
              ),
              hr: (props) => <hr className="border-zinc-800 my-12" {...props} />,
              img: ({ src, alt }) => {
                if (!src) return null
                const imageSrc = src.startsWith('./')
                  ? `/articles/${article.id}/${src.replace('./', '')}`
                  : src.startsWith('/') ? src : `/articles/${article.id}/${src}`
                return (
                  <span className="block my-8 md:-mx-12 lg:-mx-32 xl:-mx-48 rounded-lg overflow-hidden">
                    <Image src={imageSrc} alt={alt || ''} width={1600} height={900}
                      className="w-full h-auto" />
                  </span>
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
