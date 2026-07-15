import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, User, ArrowLeft, ArrowRight,
  Tag, Share2, Copy, Check,
  Facebook, Twitter, ChevronLeft, ChevronRight,
} from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import FadeInUp from '@/components/animations/FadeInUp'
import { formatDate, formatShortDate } from '@/utils/formatters'
import { getNewsBySlug, getAdjacentArticles, getRelatedArticles, estimateReadTime } from '@/data/news'
import { cn } from '@/utils/cn'

// ─── Category config ─────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  news: 'Berita', event: 'Event', training: 'Training', csr: 'CSR', promotion: 'Promo',
}

const CATEGORY_COLORS: Record<string, string> = {
  news:      'bg-daikin-blue text-white',
  event:     'bg-emerald-600 text-white',
  training:  'bg-violet-600 text-white',
  csr:       'bg-green-700 text-white',
  promotion: 'bg-amber-500 text-white',
}

const COVER_GRADIENT: Record<string, string> = {
  news:      'from-daikin-blue-dark to-daikin-blue',
  event:     'from-emerald-600 to-teal-700',
  training:  'from-violet-600 to-purple-700',
  csr:       'from-green-700 to-emerald-900',
}

// ─── Markdown renderer ────────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (line === '') { i++; continue }

    if (line.startsWith('### ')) {
      nodes.push(<h3 key={i} className="text-lg font-bold text-charcoal mt-8 mb-3 leading-snug">{line.slice(4)}</h3>)
    } else if (line.startsWith('## ')) {
      nodes.push(<h2 key={i} className="text-xl md:text-2xl font-bold text-charcoal mt-10 mb-4 leading-snug pb-2 border-b border-gray-100">{line.slice(3)}</h2>)
    } else if (line.startsWith('# ')) {
      nodes.push(<h1 key={i} className="text-2xl md:text-3xl font-bold text-charcoal mt-6 mb-5 leading-tight">{line.slice(2)}</h1>)
    } else if (line.startsWith('> ')) {
      nodes.push(
        <blockquote key={i} className="my-6 pl-5 border-l-4 border-daikin-blue bg-daikin-blue-50 rounded-r-xl py-4 pr-5">
          <p className="text-gray-700 italic leading-relaxed text-[15px]">{line.slice(2)}</p>
        </blockquote>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = [line.slice(2)]
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++
        items.push(lines[i].trim().slice(2))
      }
      nodes.push(
        <ul key={i} className="my-4 space-y-2 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-700 text-[15px] leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-daikin-blue flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    } else {
      nodes.push(
        <p key={i} className="text-gray-700 leading-relaxed text-[15px] my-4">{line}</p>
      )
    }

    i++
  }
  return nodes
}

// ─── Share button ─────────────────────────────────────────────────────

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select the URL manually
    }
  }

  const encodedUrl   = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]',
    },
    {
      label: 'Twitter / X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-charcoal hover:text-white hover:border-charcoal',
    },
    {
      label: 'WhatsApp',
      icon: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25d366] hover:text-white hover:border-[#25d366]',
    },
  ]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
        <Share2 className="w-4 h-4" /> Bagikan:
      </span>
      {shareLinks.map(({ label, icon: Icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Bagikan ke ${label}`}
          className={cn(
            'w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-200',
            color
          )}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Salin tautan"
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200',
          copied
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
            : 'border-gray-200 text-gray-500 hover:bg-daikin-blue hover:text-white hover:border-daikin-blue'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied
            ? <motion.span key="check" initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />Tersalin!</motion.span>
            : <motion.span key="copy" initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" />Salin Tautan</motion.span>
          }
        </AnimatePresence>
      </button>
    </div>
  )
}

// ─── Read progress bar ────────────────────────────────────────────────

function ReadProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setPct(total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* sits above navbar (z-50) at top of viewport */
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-200/60">
      <motion.div
        className="h-full bg-gradient-to-r from-daikin-blue via-[#0097E0] to-daikin-blue-light rounded-r-full"
        style={{ width: `${pct}%` }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
      />
    </div>
  )
}



export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { i18n } = useTranslation()
  const lang: 'id' | 'en' = i18n.language?.startsWith('en') ? 'en' : 'id'
  const articleRef = useRef<HTMLDivElement>(null)

  const article  = getNewsBySlug(slug ?? '')
  const adjacent = slug ? getAdjacentArticles(slug) : { prev: null, next: null }
  const related  = slug ? getRelatedArticles(slug, 4) : []

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-daikin-blue-50 flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-7 h-7 text-daikin-blue" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-2">Artikel tidak ditemukan</h2>
          <p className="text-gray-500 mb-6 text-sm">Artikel yang Anda cari mungkin sudah dipindahkan atau dihapus.</p>
          <Link to="/insights/news" className="inline-flex items-center gap-2 bg-daikin-blue text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-daikin-blue-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </Link>
        </div>
      </div>
    )
  }

  const gradient   = COVER_GRADIENT[article.category] ?? 'from-slate-600 to-slate-800'
  const readTime   = estimateReadTime(article.content[lang])
  const shareUrl   = typeof window !== 'undefined' ? window.location.href : ''
  const catLabel   = CATEGORY_LABELS[article.category] ?? article.category
  const catColor   = CATEGORY_COLORS[article.category] ?? 'bg-gray-600 text-white'

  return (
    <PageTransition>
      <ReadProgress />
      <PageMeta
        title={article.title[lang]}
        description={article.excerpt[lang]}
        canonical={`/insights/news/${article.slug}`}
        ogImage={article.coverImage}
      />

      {/* ── Header strip ─────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-daikin-blue-dark via-daikin-blue to-[#0097E0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-8">
          {/* Back link */}
          <Link
            to="/insights/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Berita & Update
          </Link>

          <FadeInUp>
            <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4', catColor)}>
              {catLabel}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl mb-4">
              {article.title[lang]}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/65 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.publishedAt)}</span>
              {article.author && <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>}
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} menit baca</span>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

          {/* ── Cover image - contained, not full-bleed ──────── */}
          <FadeInUp className="mb-8">
            <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} shadow-[0_8px_40px_rgba(0,0,0,0.12)]`} style={{ maxHeight: '460px' }}>
              <img
                src={article.coverImage}
                alt={article.title[lang]}
                className="w-full object-cover"
                style={{ maxHeight: '460px' }}
                loading="eager"
              />
              {/* Subtle tint so gradient identity shows */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 pointer-events-none`} />
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 xl:gap-12">

            {/* ── Article content ──────────────────────────── */}
            <article ref={articleRef} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
              {/* Excerpt lead */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100 font-medium">
                {article.excerpt[lang]}
              </p>

              {/* Rendered body */}
              <div className="mb-10">
                {renderMarkdown(article.content[lang])}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-gray-100 mb-8">
                <Tag className="w-4 h-4 text-gray-400" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 hover:bg-daikin-blue-50 hover:text-daikin-blue text-gray-600 text-xs font-medium rounded-full cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
                <ShareButtons url={shareUrl} title={article.title[lang]} />
              </div>

              {/* Author card */}
              {article.author && (
                <div className="flex items-center gap-4 p-5 bg-daikin-blue-50 rounded-2xl border border-daikin-blue/10 mb-10">
                  <div className="w-12 h-12 rounded-xl bg-daikin-blue flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-daikin-blue font-semibold uppercase tracking-wide mb-0.5">Ditulis oleh</p>
                    <p className="font-bold text-charcoal">{article.author}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Daikin Indonesia - {formatDate(article.publishedAt)}</p>
                  </div>
                </div>
              )}

              {/* Prev / Next */}
              {(adjacent.prev || adjacent.next) && (
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  {adjacent.prev ? (
                    <Link
                      to={`/insights/news/${adjacent.prev.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-daikin-blue/30 hover:bg-daikin-blue-50/50 transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-daikin-blue group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors text-gray-400">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400 font-medium mb-1">Artikel Sebelumnya</p>
                        <p className="text-sm font-semibold text-charcoal group-hover:text-daikin-blue transition-colors leading-snug line-clamp-2">
                          {adjacent.prev.title[lang]}
                        </p>
                      </div>
                    </Link>
                  ) : <div />}

                  {adjacent.next && (
                    <Link
                      to={`/insights/news/${adjacent.next.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-daikin-blue/30 hover:bg-daikin-blue-50/50 transition-all duration-200 text-right sm:flex-row-reverse"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-daikin-blue group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors text-gray-400">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400 font-medium mb-1">Artikel Berikutnya</p>
                        <p className="text-sm font-semibold text-charcoal group-hover:text-daikin-blue transition-colors leading-snug line-clamp-2">
                          {adjacent.next.title[lang]}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </article>

            {/* ── Sidebar - sticky ─────────────────────────── */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

              {/* Article info card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Info Artikel</h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Kategori</span>
                    <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-full', catColor)}>{catLabel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tanggal</span>
                    <span className="font-semibold text-charcoal text-[13px]">{formatShortDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Waktu baca</span>
                    <span className="font-semibold text-charcoal text-[13px]">{readTime} menit</span>
                  </div>
                  {article.author && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Penulis</span>
                      <span className="font-semibold text-charcoal text-[13px] text-right max-w-[55%] leading-tight">{article.author}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Share sidebar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Bagikan Artikel</h4>
                <ShareButtons url={shareUrl} title={article.title[lang]} />
              </div>

              {/* Tags sidebar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Topik</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Back button */}
              <Link
                to="/insights/news"
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-daikin-blue transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Semua Berita
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* ── More articles ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-white py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-charcoal">Baca Juga</h3>
              <Link
                to="/insights/news"
                className="text-sm font-semibold text-daikin-blue hover:text-daikin-blue-dark flex items-center gap-1 transition-colors"
              >
                Semua Berita <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rel) => {
                const relGradient = COVER_GRADIENT[rel.category] ?? 'from-slate-600 to-slate-800'
                return (
                  <Link
                    key={rel.id}
                    to={`/insights/news/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className={`relative h-36 bg-gradient-to-br ${relGradient} overflow-hidden`}>
                      <img src={rel.coverImage} alt={rel.title[lang]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-gray-400 mb-1.5">{formatShortDate(rel.publishedAt)}</p>
                      <p className="text-sm font-bold text-charcoal line-clamp-2 group-hover:text-daikin-blue transition-colors leading-snug">
                        {rel.title[lang]}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
