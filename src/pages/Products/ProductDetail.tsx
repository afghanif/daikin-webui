import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Zap, Wind, Wifi, Star, Sparkles, VolumeX, Battery, Clock, Filter,
  ZoomIn, X, Download, MapPin, MessageCircle, ChevronLeft, ChevronRight,
  PlayCircle, Play, BookOpen, Calculator, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import FadeInUp from '@/components/animations/FadeInUp'
import ProductCard from '@/components/sections/ProductCard'
import { getProductBySlug, products } from '@/data/products'

interface IconMatch {
  keywords: string[]
  icon: LucideIcon
}

const ICON_MAP: IconMatch[] = [
  { keywords: ['streamer'], icon: Wind },
  { keywords: ['wifi', 'wi-fi', 'smart', 'iot'], icon: Wifi },
  { keywords: ['powerful', 'fast'], icon: Zap },
  { keywords: ['italian', 'premium', 'award'], icon: Star },
  { keywords: ['clean', 'cleaning'], icon: Sparkles },
  { keywords: ['quiet', 'silent', 'db'], icon: VolumeX },
  { keywords: ['energy', 'econo', 'saving', 'cop'], icon: Battery },
  { keywords: ['timer', 'schedule', 'weekly'], icon: Clock },
  { keywords: ['filter', 'pm2', 'purif'], icon: Filter },
  { keywords: ['inverter'], icon: Zap },
]

function getFeatureIcon(feature: string): LucideIcon {
  const lower = feature.toLowerCase()
  const match = ICON_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))
  return match?.icon ?? Zap
}

function getYouTubeThumb(embedUrl: string): string {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}

export default function ProductDetail() {
  const { productSlug } = useParams<{ productSlug: string }>()
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)

  const product = getProductBySlug(productSlug ?? '')

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Produk tidak ditemukan</h2>
          <Link to="/products" className="btn-primary inline-flex">Kembali ke Produk</Link>
        </div>
      </div>
    )
  }

  const images = (product.images && product.images.length > 0 ? product.images : [product.imageUrl]).slice(0, 3)
  const related = (
    product.relatedIds?.length
      ? products.filter((p) => product.relatedIds!.includes(p.id))
      : products.filter((p) => p.category === product.category && p.id !== product.id)
  ).slice(0, 3)

  const specRows = [
    { label: 'Kapasitas', value: product.specs.pk > 0 ? `${product.specs.pk} PK (${product.specs.btu.toLocaleString('id-ID')} BTU/h)` : '-' },
    { label: 'Voltase', value: `${product.specs.voltage}V` },
    { label: 'Cakupan Ruangan', value: product.specs.coverage_m2 > 0 ? `~${product.specs.coverage_m2} m²` : '-' },
    ...(product.specs.powerInput ? [{ label: 'Daya Input', value: `${product.specs.powerInput} Watt` }] : []),
    ...(product.specs.cop ? [{ label: 'COP', value: String(product.specs.cop) }] : []),
    ...(product.specs.refrigerant ? [{ label: 'Refrigerant', value: product.specs.refrigerant }] : []),
  ]

  function goTo(index: number) {
    setActiveIndex(Math.max(0, Math.min(images.length - 1, index)))
  }

  return (
    <PageTransition>
      <PageMeta
        title={product.name[lang]}
        description={product.tagline[lang]}
        canonical={`/products/${product.slug}`}
      />

      {/* Image zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="relative bg-white rounded-card p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Tutup zoom"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={images[activeIndex]}
                alt={`${product.name[lang]} - foto ${activeIndex + 1}`}
                className="w-full max-h-[70vh] object-contain"
              />
              {images.length > 1 && (
                <p className="text-center text-sm text-gray-400 mt-3">
                  {activeIndex + 1} / {images.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video popup modal */}
      <AnimatePresence>
        {videoOpen && product.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" /> Tutup
              </button>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)]" style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={`${product.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Video ${product.name[lang]}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Produk', path: '/products' },
            { label: product.subcategory, path: `/products/${product.category}` },
            { label: product.name[lang] },
          ]}
          className="mb-6"
        />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product image slider */}
          <FadeInLeft>
            <div>
              {/* Main image */}
              <div className="relative group bg-soft-gray rounded-card overflow-hidden h-96 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt={`${product.name[lang]} - foto ${activeIndex + 1}`}
                    className="w-full h-full object-contain p-8"
                    loading="eager"
                    width={500}
                    height={384}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => goTo(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      className={cn(
                        'absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card rounded-full p-2',
                        'text-gray-500 hover:text-daikin-blue transition-all duration-200',
                        activeIndex === 0 && 'opacity-30 cursor-not-allowed',
                      )}
                      aria-label="Foto sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => goTo(activeIndex + 1)}
                      disabled={activeIndex === images.length - 1}
                      className={cn(
                        'absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-card rounded-full p-2',
                        'text-gray-500 hover:text-daikin-blue transition-all duration-200',
                        activeIndex === images.length - 1 && 'opacity-30 cursor-not-allowed',
                      )}
                      aria-label="Foto berikutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter badge */}
                {images.length > 1 && (
                  <span className="absolute top-3 right-3 bg-black/40 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                    {activeIndex + 1} / {images.length}
                  </span>
                )}

                {/* Zoom button */}
                <button
                  onClick={() => setIsZoomed(true)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-card rounded-full p-2.5
                    text-gray-500 hover:text-daikin-blue transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Perbesar gambar"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        'w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200',
                        i === activeIndex
                          ? 'border-daikin-blue shadow-sm'
                          : 'border-soft-gray-2 hover:border-daikin-blue/50',
                      )}
                      aria-label={`Lihat foto ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-contain p-1.5 bg-soft-gray"
                      />
                    </button>
                  ))}
                </div>
              )}

              {product.videoUrl && (
                <button
                  onClick={() => setVideoOpen(true)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-daikin-blue-50 hover:bg-daikin-blue border-2 border-daikin-blue/20 hover:border-daikin-blue text-daikin-blue hover:text-white font-semibold text-sm transition-all duration-200 group"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Tonton Video Fitur
                </button>
              )}
              {product.eCatalogueUrl && (
                <a
                  href={product.eCatalogueUrl}
                  download
                  className="btn-secondary w-full mt-3 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Unduh E-Catalogue (PDF)
                </a>
              )}
            </div>
          </FadeInLeft>

          {/* Product info */}
          <FadeInRight>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-semibold text-daikin-blue uppercase tracking-wide">
                {product.subcategory}
              </span>
              {product.badge && (
                <Badge
                  variant={
                    product.badge === 'new'
                      ? 'new'
                      : product.badge === 'bestseller'
                      ? 'bestseller'
                      : 'promo'
                  }
                >
                  {product.badge === 'new' ? 'Baru' : product.badge === 'bestseller' ? 'Terlaris' : 'Promo'}
                </Badge>
              )}
              {product.isInverter && (
                <div className="flex items-center gap-1 bg-daikin-blue text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3" />
                  Inverter
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">{product.name[lang]}</h1>
            <p className="text-xl text-daikin-blue font-semibold mb-4">{product.tagline[lang]}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description[lang]}</p>

            {/* Specs table */}
            <div className="bg-soft-gray rounded-card overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-soft-gray-2">
                <h3 className="font-bold text-charcoal text-sm">Spesifikasi Teknis</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {specRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-soft-gray'}>
                      <td className="px-5 py-2.5 text-gray-500 w-2/5">{row.label}</td>
                      <td className="px-5 py-2.5 font-semibold text-charcoal">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Feature badges */}
            <div className="mb-6">
              <h3 className="font-bold text-charcoal mb-3 text-sm">Fitur Unggulan</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => {
                  const Icon = getFeatureIcon(feature)
                  return (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                        bg-daikin-blue-50 text-daikin-blue border border-daikin-blue/20"
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {feature}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/services/proshop">
                <Button size="lg">
                  <MapPin className="w-5 h-5" />
                  Cari ProShop Terdekat
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Konsultasi Kebutuhan
                </Button>
              </Link>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* Helper nudge - guide & calculator */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <FadeInUp>
          <div className="rounded-2xl bg-gradient-to-br from-daikin-blue-50 to-white border border-daikin-blue/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-daikin-blue uppercase tracking-widest mb-0.5">Butuh bantuan?</p>
              <p className="text-sm text-gray-600 leading-snug">
                Belum yakin soal kapasitas atau model yang tepat? Pelajari panduan memilih AC atau hitung langsung dari kalkulator.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
              <Link
                to="/solutions/how-to-choose"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-daikin-blue/25 bg-white hover:bg-daikin-blue-50 hover:border-daikin-blue/50 text-daikin-blue text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                Panduan Memilih AC
              </Link>
              <Link
                to="/solutions/ac-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-daikin-blue hover:bg-daikin-blue-dark text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 flex-shrink-0" />
                Kalkulator AC
              </Link>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* Video feature section */}
      {product.videoUrl && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
          <FadeInUp>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                <PlayCircle className="w-5 h-5 text-daikin-blue" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">Video Fitur Produk</h2>
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => setVideoOpen(true)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-card"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src={getYouTubeThumb(product.videoUrl)}
                alt={`Preview ${product.name[lang]}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-white/65 text-xs uppercase tracking-widest mb-1">Video Produk</p>
                <p className="font-bold text-base drop-shadow">Fitur Unggulan {product.name[lang]}</p>
              </div>
              <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Tonton Sekarang
              </span>
            </motion.div>
          </FadeInUp>
        </section>
      )}

      {/* Rekomendasi Produk Lainnya */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-soft-gray">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeInUp>
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <div className="w-10 h-1 bg-daikin-blue rounded-full mb-3" />
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Rekomendasi Produk Lainnya</h2>
                  <p className="text-gray-500 text-sm mt-1">Produk lain yang mungkin cocok untuk Anda</p>
                </div>
                <Link
                  to={`/products/${product.category}`}
                  className="text-daikin-blue text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
                >
                  Lihat Semua <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
