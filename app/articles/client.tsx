"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export default function ArticlesClient() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const sfxRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    sfxRef.current = new Audio('/sfx/victory.wav')
    sfxRef.current.volume = 0.6
  }, [])

  useEffect(() => {
    if (searchTerm.toLowerCase().trim() === 'ai team' && sfxRef.current) {
      sfxRef.current.currentTime = 0
      sfxRef.current.play().catch(() => {})
    }
  }, [searchTerm])

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

  const categoryCounts = articles.reduce((acc, article) => {
    if (article.categories) {
      article.categories.forEach((cat: string) => { acc[cat] = (acc[cat] || 0) + 1 })
    }
    return acc
  }, {} as Record<string, number>)

  const allCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([cat]) => cat)

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentSnippet?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" ||
      (article.categories && article.categories.includes(selectedCategory))
    return matchesSearch && matchesCategory
  })

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Articles
          </p>
          <h1 className="text-5xl md:text-8xl font-display text-zinc-50 leading-[0.9] mb-12 title-shimmer">
            Research & writing
          </h1>

          {/* Search + filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:max-w-sm px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === "all"
                  ? 'bg-zinc-50 text-zinc-950'
                  : 'text-zinc-400 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              All ({articles.length})
            </button>
            {allCategories.slice(0, 8).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-50 text-zinc-950'
                    : 'text-zinc-400 border border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat} ({categoryCounts[cat]})
              </button>
            ))}
          </div>

          {/* Articles list */}
          {loading ? (
            <p className="text-zinc-500 text-sm font-mono">Loading articles...</p>
          ) : displayArticles.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-zinc-500 mb-4">No articles found.</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all") }}
                className="text-zinc-300 text-sm border border-zinc-700 rounded-full px-4 py-2 hover:text-zinc-50 hover:border-zinc-500 transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {displayArticles.map((article, i) => (
                <Link
                  key={article.id || i}
                  href={`/articles/${article.id || i + 1}`}
                  className={`group flex flex-col md:flex-row md:items-center gap-3 py-5 ${
                    i !== displayArticles.length - 1 ? 'border-b border-zinc-800' : ''
                  } hover:pl-2 transition-all duration-200`}
                >
                  <span className="text-xs font-mono text-zinc-600 tabular-nums shrink-0 w-20">
                    {article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </span>
                  <h3 className="text-zinc-300 group-hover:text-zinc-50 transition-colors flex-1">
                    {article.title}
                  </h3>
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex gap-2 shrink-0">
                      {article.categories.slice(0, 2).map((cat: string, ci: number) => (
                        <span key={ci} className="text-xs font-mono text-zinc-600 border border-zinc-800 rounded px-2 py-0.5">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0">&rarr;</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
