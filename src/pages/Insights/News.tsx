import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Calendar, Clock, TrendingUp } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { newsArticles, estimateReadTime } from '@/data/news'
import { formatShortDate } from '@/utils/formatters'
import { cn } from '@/utils/cn'

// ─── Category config ─────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all',      label: 'Semua' },
  { key: 'news',     label: 'Berita' },
  { key: 'event',    label: 'Event' },
  { key: 'training', label: 'Training' },
  { key: 'csr',      label: 'CSR' },
]

const categoryMeta: Record<string, { color: string; dot: string; badge: string }> = {
  news:      { color: 'text-daikin-blue',   dot: 'bg-daikin-blue',   badge: 'bg-daikin-blue-50 text-daikin-blue border-daikin-blue/20'   },
  event:     { color: 'text-emerald-600',   dot: 'bg-emerald-500',   badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'          },
  training:  { color: 'text-violet-600',    dot: 'bg-violet-500',    badge: 'bg-violet-50 text-violet-700 border-violet-200'             },
  csr:       { color: 'text-green-700',     dot: 'bg-green-600',     badge: 'bg-green-50 text-green-700 border-green-200'               },
}

const coverGradient: Record<string, string> = {
  news:      'from-daikin-blue-dark to-daikin-blue',
  event:     'from-emerald-600 to-teal-700',
  training:  'from-violet-600 to-purple-700',
  csr:       'from-green-700 to-emerald-900',
}

function CategoryBadge({ category }: { category: string }) {
  const meta = categoryMeta[category]
  const label = CATEGORIES.find((c) => c.key === category)?.label ?? category
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border', meta?.badge ?? 'bg-gray-100 text-gray-600 border-gray-200')}>
      <span className={cn('w-1.5 h-1.5 rounded-full', meta?.dot ?? 'bg-gray-400')} />
      {label}
    </span>
  )
}

// ─── Component ───────────────────────────────────────────────────────

export default function News() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'

  const [search, setSearch]     = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const sorted = useMemo(
    () => [...newsArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    []
  )

  const featured = sorted[0]

  const filtered = useMemo(() => {
    let list = sorted.slice(1)
    if (activeTab !== 'all') list = list.filter((a) => a.category === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) => a.title[lang].toLowerCase().includes(q) || a.excerpt[lang].toLowerCase().includes(q) || a.tags.some((t) => t.includes(q))
      )
    }
    return list
  }, [sorted, activeTab, search, lang])

  const countByCategory = useMemo(
    () =>
      CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        acc[cat.key] = cat.key === 'all' ? newsArticles.length : newsArticles.filter((a) => a.category === cat.key).length
        return acc
      }, {}),
    []
  )

  return (
    <PageTransition>
      <PageMeta title="Berita & Update" canonical="/insights/news" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-daikin-blue-dark via-daikin-blue to-[#0097E0] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-36 pb-16">
          <Breadcrumb
            items={[{ label: 'Insights', path: '/insights' }, { label: 'Berita & Update' }]}
            className="text-white/70 mb-6"
          />
          <FadeInUp>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm font-medium">{newsArticles.length} Artikel Tersedia</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Berita & Update
            </h1>
            <p className="text-white/75 text-lg max-w-xl mb-8">
              Ikuti berita, inovasi, dan perkembangan terbaru dari Daikin Indonesia.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Cari berita, topik, atau kata kunci..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/45 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ── Featured Article ─────────────────────────────────── */}
      {!search && activeTab === 'all' && featured && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Artikel Terbaru</div>
            <Link to={`/insights/news/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">
                {/* Image */}
                <div className={`lg:col-span-3 relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br ${coverGradient[featured.category] ?? 'from-slate-600 to-slate-800'} shadow-lg`}>
                  <img src={featured.coverImage} alt={featured.title[lang]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <CategoryBadge category={featured.category} />
                  </div>
                </div>
                {/* Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatShortDate(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{estimateReadTime(featured.content[lang])} menit baca</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal leading-snug group-hover:text-daikin-blue transition-colors">
                    {featured.title[lang]}
                  </h2>
                  <p className="text-gray-500 leading-relaxed">{featured.excerpt[lang]}</p>
                  {featured.author && <p className="text-xs text-gray-400">Oleh <span className="text-charcoal font-semibold">{featured.author}</span></p>}
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-daikin-blue font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ── Filter & Grid ─────────────────────────────────────── */}
      <div className="bg-soft-gray min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

          {/* Category tabs + result count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => { setActiveTab(cat.key); setSearch('') }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200',
                    activeTab === cat.key
                      ? 'bg-daikin-blue text-white border-daikin-blue shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-daikin-blue hover:text-daikin-blue'
                  )}
                >
                  {cat.label}
                  <span className={cn(
                    'text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center',
                    activeTab === cat.key ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                  )}>
                    {countByCategory[cat.key]}
                  </span>
                </button>
              ))}
            </div>

            {(search || activeTab !== 'all') && (
              <p className="text-sm text-gray-500 flex-shrink-0">
                {filtered.length === 0 ? 'Tidak ada hasil' : `${filtered.length} artikel ditemukan`}
                {search && <span> untuk "<span className="font-semibold text-charcoal">{search}</span>"</span>}
              </p>
            )}
          </div>

          {/* Articles grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-500 font-semibold mb-1">Tidak ada artikel ditemukan</p>
                <p className="text-gray-400 text-sm mb-5">Coba kata kunci atau kategori lain</p>
                <button
                  onClick={() => { setSearch(''); setActiveTab('all') }}
                  className="text-sm font-semibold text-daikin-blue hover:underline"
                >
                  Tampilkan semua artikel
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((article) => {
                    const gradient = coverGradient[article.category] ?? 'from-slate-600 to-slate-800'
                    return (
                      <FadeInItem key={article.id}>
                        <Link
                          to={`/insights/news/${article.slug}`}
                          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Cover */}
                          <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden flex-shrink-0`}>
                            <img
                              src={article.coverImage}
                              alt={article.title[lang]}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute top-3 left-3">
                              <CategoryBadge category={article.category} />
                            </div>
                          </div>

                          {/* Body */}
                          <div className="flex flex-col flex-1 p-5">
                            <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatShortDate(article.publishedAt)}</span>
                              <span className="text-gray-200">·</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{estimateReadTime(article.content[lang])} mnt</span>
                            </div>

                            <h3 className="font-bold text-charcoal text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-daikin-blue transition-colors flex-1">
                              {article.title[lang]}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                              {article.excerpt[lang]}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                              {article.author
                                ? <span className="text-[11px] text-gray-400 truncate max-w-[60%]">{article.author}</span>
                                : <span />
                              }
                              <span className="inline-flex items-center gap-1 text-daikin-blue text-xs font-semibold group-hover:gap-1.5 transition-all">
                                Baca <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </FadeInItem>
                    )
                  })}
                </FadeInUp>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
