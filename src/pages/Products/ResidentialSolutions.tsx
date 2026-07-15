import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpDown, BookOpen, Calculator } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/sections/ProductCard'
import SearchBar from '@/components/ui/SearchBar'
import ProductFilterPanel, { ActiveFilters, DEFAULT_FILTERS } from '@/components/sections/ProductFilterPanel'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { getProductsByCategory } from '@/data/products'
import type { Product } from '@/types/product'

type SortKey = 'newest' | 'popular' | 'capacity-asc'

function sortProducts(list: Product[], key: SortKey): Product[] {
  const clone = [...list]
  if (key === 'newest') return clone.sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0))
  if (key === 'popular') return clone.sort((a, b) => (a.badge === 'bestseller' ? -1 : b.badge === 'bestseller' ? 1 : 0))
  if (key === 'capacity-asc') return clone.sort((a, b) => a.specs.pk - b.specs.pk)
  return clone
}

function countActiveFilters(filters: ActiveFilters): number {
  return (
    filters.pk.length +
    filters.unitTypes.length +
    (filters.inverter !== 'all' ? 1 : 0) +
    filters.features.length
  )
}

export default function ResidentialSolutions() {
  const [filters, setFilters] = useState<ActiveFilters>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState<SortKey>('popular')
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const allProducts = getProductsByCategory('residential')

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let list = allProducts
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.id.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q),
      )
    }
    if (filters.pk.length) list = list.filter((p) => filters.pk.includes(p.specs.pk))
    if (filters.unitTypes.length) list = list.filter((p) => filters.unitTypes.includes(p.unitType ?? ''))
    if (filters.inverter === 'inverter') list = list.filter((p) => p.isInverter)
    if (filters.inverter === 'non-inverter') list = list.filter((p) => !p.isInverter)
    if (filters.features.includes('streamer'))
      list = list.filter((p) => p.features.some((f) => f.toLowerCase().includes('streamer')))
    if (filters.features.includes('wifi'))
      list = list.filter((p) => p.features.some((f) => f.toLowerCase().includes('wifi')))
    if (filters.features.includes('fastcooling'))
      list = list.filter((p) =>
        p.features.some((f) => f.toLowerCase().includes('powerful') || f.toLowerCase().includes('fast')),
      )
    if (filters.features.includes('premium'))
      list = list.filter((p) =>
        p.features.some((f) => f.toLowerCase().includes('italian') || f.toLowerCase().includes('premium')),
      )
    return sortProducts(list, sortBy)
  }, [allProducts, query, filters, sortBy])

  const activeCount = countActiveFilters(filters)

  return (
    <PageTransition>
      <PageMeta title="Produk Residential" canonical="/products/residential" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[{ label: 'Produk', path: '/products' }, { label: 'Residential Solutions' }]}
            className="text-white/60 mb-6"
          />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Residential Solutions</h1>
            <p className="text-white/80 text-xl max-w-2xl">
              AC inverter dan standar untuk hunian - hemat energi, udara bersih, dan kontrol cerdas.
            </p>
          </FadeInUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Search bar */}
        <SearchBar
          products={allProducts}
          value={query}
          onChange={setQuery}
          placeholder="Cari produk residential…"
          className="mb-6"
        />

        <div className="flex gap-8 items-start">
          {/* Filter panel (desktop sidebar + mobile drawer) */}
          <ProductFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            showPkFilter
            activeCount={activeCount}
          />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {isLoading ? '…' : `${filtered.length} produk ditemukan`}
              </span>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="text-sm border border-soft-gray-2 rounded-btn px-3 py-1.5 bg-white text-charcoal
                    focus:outline-none focus:border-daikin-blue transition-colors cursor-pointer"
                >
                  <option value="popular">Terpopuler</option>
                  <option value="newest">Terbaru</option>
                  <option value="capacity-asc">Kapasitas (Rendah–Tinggi)</option>
                </select>
              </div>
            </div>

            {/* Skeleton loading */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              /* Pichon-kun empty state */
              <div className="flex flex-col items-center text-center py-20 gap-4">
                <img
                  src="/images/mascot/pichon-kun-think.svg"
                  alt="Pichon-kun"
                  className="h-32 drop-shadow-md"
                />
                <p className="text-gray-600 font-medium text-lg">
                  Oops, Pichon-kun belum menemukan produk dengan kombinasi tersebut.
                </p>
                <p className="text-sm text-gray-400">Coba kurangi filtermu!</p>
                <button
                  onClick={() => { setFilters(DEFAULT_FILTERS); setQuery('') }}
                  className="btn-secondary text-sm mt-2"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <FadeInUp stagger className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <FadeInItem key={product.id}>
                    <ProductCard product={product} />
                  </FadeInItem>
                ))}
              </FadeInUp>
            )}
          </div>
        </div>
      </div>

      {/* ── Butuh Bantuan? ───────────────────────────────── */}
      <section className="bg-daikin-blue-50 border-t border-daikin-blue/10 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <div className="rounded-2xl bg-white border border-daikin-blue/10 shadow-sm px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-daikin-blue inline-block" />
                  <p className="text-xs font-bold text-daikin-blue uppercase tracking-widest">Butuh Bantuan?</p>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-1.5">Belum yakin produk yang tepat?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Gunakan panduan kami untuk memilih AC sesuai luas ruangan dan kebutuhan Anda, atau hitung langsung lewat kalkulator AC kami.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  to="/solutions/how-to-choose"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-daikin-blue/25 bg-white hover:bg-daikin-blue-50 hover:border-daikin-blue/50 text-daikin-blue text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  Panduan Memilih AC
                </Link>
                <Link
                  to="/solutions/ac-calculator"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-daikin-blue hover:bg-daikin-blue-dark text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                >
                  <Calculator className="w-4 h-4" />
                  Kalkulator AC
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
