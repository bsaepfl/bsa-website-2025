"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Article {
  id?: number
  title: string
  pubDate?: string
  contentSnippet?: string
  categories?: string[]
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setArticles(data.articles || [])
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const displayed = articles.slice(0, 3)

  if (loading) {
    return (
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-48 flex items-center justify-center">
            <p className="text-zinc-500 text-sm font-mono">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (displayed.length === 0) return null

  return (
    <section id="articles" className="py-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-sm mb-xl">
          <div>
            <p className="text-eyebrow font-mono text-zinc-500 uppercase mb-sm">
              Articles
            </p>
            <h2 className="text-display-1 font-display text-zinc-50 title-shimmer">
              Read our latest research
            </h2>
            <p className="text-zinc-400 mt-xs max-w-lg">
              Blockchain technology, DeFi, privacy, and more from BSA members.
            </p>
          </div>
          <Link
            href="/articles"
            className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
          >
            All articles <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        <div className="space-y-0">
          {displayed.map((article, i) => (
            <Link
              key={article.id || i}
              href={`/articles/${article.id || i + 1}`}
              className={`group flex flex-col md:flex-row md:items-center gap-sm py-md ${
                i !== displayed.length - 1 ? 'border-b border-zinc-800' : ''
              } hover:pl-2 transition-all duration-200`}
            >
              <span className="text-eyebrow font-mono text-zinc-600 tabular-nums shrink-0 w-16">
                {article.pubDate
                  ? new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''
                }
              </span>

              <h3 className="text-display-3 font-display text-zinc-300 group-hover:text-zinc-50 transition-colors duration-200 flex-1">
                {article.title}
              </h3>

              {article.categories && article.categories.length > 0 && (
                <div className="flex gap-2xs shrink-0">
                  {article.categories.slice(0, 2).map((cat, ci) => (
                    <span
                      key={ci}
                      className="text-micro font-mono text-zinc-600 border border-zinc-800 rounded px-2xs py-0.5"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200 shrink-0">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
