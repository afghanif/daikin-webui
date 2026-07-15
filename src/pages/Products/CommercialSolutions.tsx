import { useState, useMemo, useEffect } from 'react'
import { ArrowUpDown } from 'lucide-react'
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
    filters.unitTypes.length + (filters.inverter !== 'all' ? 1 : 0) + filters.features.length
  )
}

export default function CommercialSolutions() {
  const [filters, setFilters] = useState<ActiveFilters>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState<SortKey>('popular')
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const allProducts = getProductsByCategory('commercial')

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
    if (filters.unitTypes.length) list = list.filter((p) => filters.unitTypes.includes(p.unitType ?? ''))
    if (filters.inverter === 'inverter') list = list.filter((p) => p.isInverter)
    if (filters.inverter === 'non-inverter') list = list.filter((p) => !p.isInverter)
    return sortProducts(list, sortBy)
  }, [allProducts, query, filters, sortBy])

  const activeCount = countActiveFilters(filters)

  return (
    <PageTransition>
      <PageMeta title="Commercial Solutions" canonical="/products/commercial" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb
            items={[{ label: 'Produk', path: '/products' }, { label: 'Commercial Solutions' }]}
            className="text-white mb-6"
          />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Commercial Solutions</h1>
            <p className="text-white/80 text-xl max-w-2xl">
              Sistem VRV, Sky Air, dan solusi HVAC-R untuk gedung perkantoran, hotel, mall, dan fasilitas industri.
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
          placeholder="Cari produk commercial…"
          className="mb-6"
        />

        <div className="flex gap-8 items-start">
          {/* Filter panel - no PK filter for commercial */}
          <ProductFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            showPkFilter={false}
            unitTypeOptions={['Ducted', 'Cassette', 'Floor Standing']}
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
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
              <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <FadeInItem key={product.id}>
                    <ProductCard product={product} />
                  </FadeInItem>
                ))}
              </FadeInUp>
            )}
          </div>
        </div>

        {/* Consultation CTA */}
        <div className="mt-16 bg-daikin-blue-50 rounded-card p-8">
          <h3 className="text-xl font-bold text-charcoal mb-3">Butuh Konsultasi Proyek?</h3>
          <p className="text-gray-600 mb-4">
            Tim ahli Daikin siap membantu merancang solusi HVAC-R terbaik untuk proyek Anda.
          </p>
          <a href="/services/proshop" className="btn-primary inline-flex items-center gap-2">
            Hubungi ProShop
          </a>
        </div>
      </div>
    </PageTransition>
  )
}
