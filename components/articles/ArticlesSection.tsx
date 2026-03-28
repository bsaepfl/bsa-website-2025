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
      <section className="py-24 md:py-32">
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
    <section id="articles" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 opacity-0">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-zinc-50">
              Recent writing
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-zinc-400 text-sm hover:text-zinc-50 transition-colors duration-200"
          >
            All articles <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        <div data-reveal className="space-y-0 opacity-0">
          {displayed.map((article, i) => (
            <Link
              key={article.id || i}
              href={`/articles/${article.id || i + 1}`}
              data-reveal-child
              className={`group flex flex-col md:flex-row md:items-center gap-4 py-6 ${
                i !== displayed.length - 1 ? 'border-b border-zinc-800' : ''
              } hover:pl-2 transition-all duration-200`}
            >
              <span className="text-xs font-mono text-zinc-600 tabular-nums shrink-0 w-16">
                {article.pubDate
                  ? new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''
                }
              </span>

              <h3 className="text-zinc-300 group-hover:text-zinc-50 transition-colors duration-200 flex-1">
                {article.title}
              </h3>

              {article.categories && article.categories.length > 0 && (
                <div className="flex gap-2 shrink-0">
                  {article.categories.slice(0, 2).map((cat, ci) => (
                    <span
                      key={ci}
                      className="text-xs font-mono text-zinc-600 border border-zinc-800 rounded px-2 py-0.5"
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
