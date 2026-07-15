import { lazy, Suspense, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import {
  ArrowRight, Wind, Zap, Shield, Award, Globe, Users,
  BookOpen, MapPin, Play, ChevronRight, Mail,
  Building2, MonitorPlay,
  Wifi, Thermometer, Cable, WrapText, Settings, SlidersHorizontal, MoreHorizontal,
  Leaf, TrendingUp,
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import PageTransition from '@/components/animations/PageTransition'
import WaveBackground from '@/components/animations/WaveBackground'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import SectionHeading from '@/components/sections/SectionHeading'
import ProductCard from '@/components/sections/ProductCard'
import NewsCard from '@/components/sections/NewsCard'
import StatCounter from '@/components/sections/StatCounter'
import PichonKunHelper from '@/components/sections/PichonKunHelper'
import PageMeta from '@/components/seo/PageMeta'
import Button from '@/components/ui/Button'
import { getFeaturedProducts } from '@/data/products'
import { getLatestNews } from '@/data/news'

const AirParticles = lazy(() => import('@/components/animations/AirParticles'))

// ─── Data ────────────────────────────────────────────────────────────

const heroSlides = [
  {
    id: 1,
    badge: 'Solusi Udara Terdepan di Indonesia',
    title: 'Perfecting',
    titleAccent: 'the Air',
    subtitle: 'Lebih dari sekadar pendingin ruangan - Daikin menghadirkan udara yang sehat, efisien, dan nyaman. Karena setiap napas yang Anda hirup di rumah, itu tanggung jawab kami.',
    ctaPrimary: { label: 'Lihat Produk', href: '#', disabled: true },
    ctaSecondary: { label: 'Kalkulator AC', href: '/solutions/ac-calculator' },
    stat1: { value: '60%', label: 'Hemat Energi' },
    stat2: { value: '5 Thn', label: 'Garansi Kompressor' },
    gradient: 'from-daikin-blue-dark via-daikin-blue to-daikin-blue-light',
    thumbGradient: 'from-daikin-blue-dark/30 to-daikin-blue/10',
    toneOverlay: 'from-daikin-blue-dark/55 via-daikin-blue/20 to-transparent',
    image: '/images/hero/slider-perfecting.jpg',
  },
  {
    id: 2,
    badge: 'Exclusive Daikin Technology',
    title: 'Streamer',
    titleAccent: 'Technology',
    subtitle: 'Ketika udara dalam ruangan bisa lebih berbahaya dari luar, Streamer Technology hadir sebagai penjaga. Aktif menghancurkan 99.9% virus - bukan sekadar menyaringnya.',
    ctaPrimary: { label: 'Pelajari Teknologi', href: '/profile/streamer' },
    ctaSecondary: { label: 'Lihat Produk', href: '#', disabled: true },
    stat1: { value: '99.9%', label: 'Virus Tereliminasi' },
    stat2: { value: 'PM2.5', label: 'Filter Aktif' },
    gradient: 'from-[#0a1628] via-daikin-blue-dark to-daikin-blue',
    thumbGradient: 'from-[#0a1628]/30 to-daikin-blue/10',
    toneOverlay: 'from-[#0a1628]/60 via-daikin-blue-dark/25 to-transparent',
    image: '/images/hero/slider-streamer.jpg',
  },
  {
    id: 3,
    badge: 'Red Dot Design Award Winner',
    title: 'Daikin',
    titleAccent: 'Emura Series',
    subtitle: 'Saat estetika dan performa menyatu tanpa kompromi - itulah Emura. Dirancang di Eropa, diperkuat teknologi Jepang, untuk mereka yang tidak berkompromi dengan kualitas maupun keindahan.',
    ctaPrimary: { label: 'Lihat Emura', href: '#', disabled: true },
    ctaSecondary: { label: 'Cari Dealer', href: '#', disabled: true },
    stat1: { value: 'Red Dot', label: 'Design Award' },
    stat2: { value: 'A++', label: 'Energy Rating' },
    gradient: 'from-charcoal via-[#1a2a4a] to-daikin-blue-dark',
    thumbGradient: 'from-charcoal/30 to-daikin-blue-dark/10',
    toneOverlay: 'from-charcoal/55 via-[#1a2a4a]/25 to-transparent',
    image: '/images/hero/slider-emura.jpeg',
  },
  {
    id: 4,
    badge: 'Mulai dari Keputusan yang Tepat',
    title: 'Pilih AC yang tepat untuk Anda',
    titleAccent: '',
    subtitle: 'Ukuran ruangan, kapasitas daya, dan tipe AC menentukan kenyamanan Anda seterusnya. Pelajari panduan lengkap kami sebelum membeli - gratis, cepat, dan akurat.',
    ctaPrimary: { label: 'Panduan Memilih AC', href: '/solutions/how-to-choose' },
    ctaSecondary: { label: 'Garansi & Layanan', href: '/services/warranty' },
    stat1: { value: '5 Thn', label: 'Garansi Kompressor' },
    stat2: { value: '1.500+', label: 'Service Center' },
    gradient: 'from-[#005a87] via-daikin-blue to-daikin-blue-light',
    thumbGradient: 'from-[#005a87]/30 to-daikin-blue-light/10',
    toneOverlay: 'from-[#005a87]/55 via-daikin-blue/20 to-transparent',
    image: '/images/hero/slider-perfecting.jpg',
  },
]

type ProductCat = {
  label: string; sublabel: string; href: string
  disabled?: boolean; featured?: boolean
  image?: string; overlay?: string
  gradient?: string; Icon?: React.FC<{ className?: string }>
  tags?: string[]
}

const productCategories: ProductCat[] = [
  // ── Row 1 - featured (2 wide cards) ───────────────────────────────
  {
    label: 'Residential Solutions', sublabel: 'AC Hunian & Hunian Premium',
    tags: ['1/2 PK – 2.5 PK', 'Inverter', 'Streamer'],
    href: '/products/residential', featured: true,
    image: '/images/category_ac/ac-hunian.webp',
    overlay: 'from-daikin-blue-dark/80 via-daikin-blue/35 to-transparent',
    gradient: 'from-daikin-blue-dark to-daikin-blue',
  },
  {
    label: 'Commercial Solutions', sublabel: 'AC Komersial & Industrial',
    tags: ['VRV / VRF', 'Chiller', 'Cassette'],
    href: '#', disabled: true, featured: true,
    image: '/images/category_ac/ac-komersial.webp',
    overlay: 'from-[#0a1628]/80 via-daikin-blue-dark/35 to-transparent',
    gradient: 'from-[#0a1628] to-daikin-blue-dark',
  },
  // ── Row 2 - compact (4 cards) ─────────────────────────────────────
  {
    label: 'Accessories', sublabel: 'Aksesori Pelengkap',
    href: '#', disabled: true,
    image: '/images/category_ac/acc.jpg',
    overlay: 'from-emerald-700/75 via-emerald-600/30 to-transparent',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    label: 'Spare Parts', sublabel: 'Suku Cadang Resmi',
    href: '#', disabled: true,
    image: '/images/category_ac/spareparts.jpg',
    overlay: 'from-orange-600/75 via-orange-500/30 to-transparent',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    label: 'E-Catalogue', sublabel: 'Unduh Katalog Digital',
    href: '/products/e-catalogue',
    image: '/images/category_ac/ac-industrial.webp',
    overlay: 'from-violet-700/75 via-violet-600/30 to-transparent',
    gradient: 'from-violet-600 to-purple-700',
  },
  {
    label: 'Virtual Tour', sublabel: 'Showroom Online',
    href: '/profile/technology',
    image: '/images/category_ac/virtual-tour.webp',
    overlay: 'from-daikin-blue/70 via-daikin-blue-light/25 to-transparent',
    gradient: 'from-daikin-blue to-daikin-blue-light',
  },
]

const whyItems = [
  { icon: Zap, title: 'Hemat Listrik, Bukan Hemat Performa', desc: 'Variable-speed compressor kami membuktikan bahwa hemat 60% energi tidak berarti kurang dingin - justru lebih konsisten dan stabil.' },
  { icon: Wind, title: 'Udara yang Aktif Dibersihkan', desc: 'Streamer Technology bukan sekadar filter pasif. Ia aktif menghancurkan patogen, PM2.5, dan alergen sebelum menyentuh Anda.' },
  { icon: Shield, title: 'Lima Tahun, Tanpa Pertanyaan', desc: 'Garansi kompressor 5 tahun dan 1.500+ service center resmi - karena kepercayaan Anda adalah kontrak yang kami jaga.' },
  { icon: Award, title: 'Terbaik di Dunia, Bukti dari Fakta', desc: '#1 AC brand global di 170+ negara. Bukan dari iklan - tapi dari jutaan keluarga yang setiap hari memilih Daikin.' },
]

const whyPhotos = [
  { label: 'Inovasi Teknologi', gradient: 'from-daikin-blue to-daikin-blue-dark', span: 'col-span-2', image: '/images/kenali/inovasi-technology.jpg' },
  { label: 'Kualitas Produk', gradient: 'from-daikin-blue-dark to-[#0a1628]', span: 'col-span-1', image: '/images/kenali/kualitas-produk.webp' },
  { label: 'Layanan Purna Jual', gradient: 'from-[#0a1628] to-charcoal', span: 'col-span-1', image: '/images/kenali/purna-jual.jpg' },
  { label: 'Mitra Terpercaya', gradient: 'from-charcoal to-daikin-blue-dark', span: 'col-span-2', image: '/images/kenali/mitra.jpg' },
]

// Innovation section
const innovationPoints = [
  { icon: Leaf, title: 'Net Zero 2050', desc: 'Komitmen Daikin menuju operasional karbon netral sepenuhnya.' },
  { icon: TrendingUp, title: 'Peningkatan COP & EER', desc: 'Setiap generasi produk menghadirkan efisiensi yang lebih tinggi.' },
  { icon: Zap, title: 'Refrigerant R-32', desc: 'GWP 66% lebih rendah dibanding R-410A - lebih ramah iklim.' },
  { icon: Globe, title: 'Manufaktur Hijau', desc: 'Fasilitas produksi bersertifikat ISO 14001 di seluruh dunia.' },
]

// Innovation image placeholders - replace src="" when images are ready
const innovationImages = [
  { label: 'R&D Laboratory', gradient: 'from-daikin-blue to-sky-500', image: '/images/inovasi/lab-daikin.jpg' },
  { label: 'Green Manufacturing', gradient: 'from-emerald-600 to-teal-700', image: '/images/inovasi/green-manufacturing.png' },
  { label: 'Low-GWP Refrigerant', gradient: 'from-daikin-blue-dark to-daikin-blue', image: '/images/inovasi/refrigerant.jpg' },
  { label: 'Renewable Energy Facility', gradient: 'from-green-600 to-emerald-700', image: '/images/inovasi/renewable.jpeg' },
]

const xperienceImages = [
  { label: 'Showroom Utama', gradient: 'from-charcoal to-daikin-blue-dark', image: '/images/zone/showroom.jpg' },
  { label: 'Demo Area', gradient: 'from-daikin-blue to-daikin-blue-light', image: '/images/zone/demo-area.jpg' },
  { label: 'Konsultasi Zone', gradient: 'from-daikin-blue-dark to-[#0a1628]', image: '/images/zone/konsultasi.jpeg' },
]

const accessoryCategories = [
  { label: 'Refrigerant', sublabel: 'R-32 & R-410A', gradient: 'from-blue-600 to-blue-800', Icon: Thermometer },
  { label: 'Pipa AC', sublabel: 'Copper & Flare', gradient: 'from-slate-600 to-slate-800', Icon: Cable },
  { label: 'Insulasi AC', sublabel: 'Armaflex & Foam', gradient: 'from-daikin-blue to-[#005a87]', Icon: WrapText },
  { label: 'Daikin Recommend Tools', sublabel: 'Toolkit Resmi', gradient: 'from-charcoal to-[#1a2a4a]', Icon: Settings },
  { label: 'Filter', sublabel: 'HEPA & PM2.5', gradient: 'from-teal-600 to-teal-800', Icon: SlidersHorizontal },
  { label: 'Smart Connection', sublabel: 'WiFi & BMS', gradient: 'from-sky-500 to-sky-700', Icon: Wifi },
  { label: 'Lainnya', sublabel: 'Produk Lainnya', gradient: 'from-gray-600 to-gray-800', Icon: MoreHorizontal },
]

// Campaign - original titles preserved
const campaigns = [
  {
    title: 'The Ideal Air',
    desc: 'Nyaman itu hak semua orang. Daikin percaya bahwa udara yang sehat adalah kebutuhan, bukan kemewahan.',
    href: '#', disabled: true,
    gradient: 'from-daikin-blue/70 to-daikin-blue-dark/80',
    image: '/images/campaign/the-ideal.webp',
  },
  {
    title: 'The Power to Create the Air of the Future',
    desc: 'AC canggih yang tidak mengkhianati lingkungan. Inovasi hijau untuk generasi yang mewarisi bumi ini.',
    href: '#', disabled: true,
    gradient: 'from-[#0a1628]/75 to-daikin-blue-dark/80',
    image: '/images/campaign/the-power.jpg',
  },
  {
    title: 'Perfecting The Air Stories',
    desc: 'Kisah nyata dari jutaan pelanggan yang kini tahu perbedaan antara sekadar dingin, dan udara yang benar-benar sempurna.',
    href: '#', disabled: true,
    gradient: 'from-daikin-blue-dark/75 to-charcoal/80',
    image: '/images/campaign/perfecting.webp',
  },
]

// Training - 3 categories
const trainingCategories = [
  {
    icon: Building2,
    title: 'Pusat Pelatihan',
    desc: 'Fasilitas modern di Jakarta, Surabaya & Medan - lengkap dengan lab praktik dan ruang kelas berstandar internasional Daikin.',
    gradient: 'from-daikin-blue-dark to-daikin-blue',
    href: '#', disabled: true,
    cta: 'Temukan Lokasi',
  },
  {
    icon: BookOpen,
    title: 'Kurikulum',
    desc: 'Materi dikembangkan langsung oleh Daikin Japan - dari instalasi dasar, diagnostik sistem, hingga integrasi VRV & BMS tingkat lanjut.',
    gradient: 'from-charcoal to-daikin-blue-dark',
    href: '#', disabled: true,
    cta: 'Lihat Kurikulum',
  },
  {
    icon: MonitorPlay,
    title: 'Sistem Pelatihan Online',
    desc: 'Platform e-learning Daikin dengan modul video, simulasi interaktif, dan ujian sertifikasi yang bisa diakses kapan saja dan di mana saja.',
    gradient: 'from-daikin-blue to-sky-600',
    href: '#', disabled: true,
    cta: 'Mulai Belajar',
  },
]

const dealerHighlights = [
  { city: 'Jakarta', count: '120+', type: 'iShop & ProShop' },
  { city: 'Surabaya', count: '85+', type: 'iShop & ProShop' },
  { city: 'Bandung', count: '60+', type: 'iShop' },
  { city: 'Medan', count: '45+', type: 'iShop' },
  { city: 'Makassar', count: '35+', type: 'iShop' },
  { city: 'Semarang', count: '40+', type: 'iShop' },
]

// ─── Component ───────────────────────────────────────────────────────

export default function Home() {
  useTranslation(['home', 'common'])
  const featuredProducts = getFeaturedProducts().slice(0, 3)
  const latestNews = getLatestNews(3)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setIsPlaying(true)
  }
  function handlePause() {
    videoRef.current?.pause()
    setIsPlaying(false)
  }

  return (
    <PageTransition>
      <PageMeta title="Perfecting the Air" canonical="/" />

      {/* ── 1. HERO SLIDER ──────────────────────────────────── */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
          loop
          className="w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative min-h-screen flex items-center bg-gradient-to-br ${slide.gradient} overflow-hidden`}>
                <Suspense fallback={null}><AirParticles /></Suspense>
                <div className="absolute inset-0 opacity-[0.05]" style={{
                  backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                  backgroundSize: '52px 52px',
                }} />
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-20 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="text-white relative z-10 lg:pr-4">
                    <motion.span
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                      className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white/20"
                    >
                      <Wind className="w-4 h-4" />{slide.badge}
                    </motion.span>
                    <motion.h1
                      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5 drop-shadow-sm"
                    >
                      {slide.title}{slide.titleAccent && <><br /><span className="text-white/90 drop-shadow-md">{slide.titleAccent}</span></>}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                      className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-8 max-w-xl drop-shadow-sm"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                      className="flex flex-wrap gap-3 md:gap-4"
                    >
                      {(slide.ctaPrimary as typeof slide.ctaPrimary & { disabled?: boolean }).disabled ? (
                        <span className="pointer-events-none cursor-default inline-flex items-center gap-2 px-7 py-3 text-[15px] font-bold rounded-full bg-white/80 text-daikin-blue/80">
                          {slide.ctaPrimary.label} <ArrowRight className="w-4 h-4" />
                        </span>
                      ) : (
                        <Link to={slide.ctaPrimary.href}>
                          <button className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-bold rounded-full bg-white text-daikin-blue hover:bg-daikin-blue-50 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)] active:scale-95">
                            {slide.ctaPrimary.label} <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                      {(slide.ctaSecondary as typeof slide.ctaSecondary & { disabled?: boolean }).disabled ? (
                        <span className="pointer-events-none cursor-default inline-flex items-center gap-2 px-7 py-3 text-[15px] font-bold rounded-full border-2 border-white/20 text-white/70">
                          {slide.ctaSecondary.label}
                        </span>
                      ) : (
                        <Link to={slide.ctaSecondary.href}>
                          <button className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-bold rounded-full border-2 border-white/35 text-white hover:bg-white/10 hover:border-white/60 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95">
                            {slide.ctaSecondary.label}
                          </button>
                        </Link>
                      )}
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 32, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.32, duration: 0.7, ease: 'easeOut' }}
                    className="flex justify-center lg:justify-end"
                  >
                    <div className="relative w-full max-w-md lg:max-w-[500px]">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/10 backdrop-blur-md border border-white/25 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]">
                        {/* Fallback bg */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${slide.thumbGradient}`} />
                        {/* Photo */}
                        <img src={slide.image} alt={slide.titleAccent} className="relative z-10 w-full h-full object-cover" loading="eager" width={480} height={360} />
                        {/* Branded tone overlay - blends slide colour into photo without crushing it */}
                        <div className={`absolute inset-0 z-[15] bg-gradient-to-br ${(slide as typeof slide & { toneOverlay: string }).toneOverlay} pointer-events-none`} />
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-5 py-4 z-20">
                          <div className="text-white/60 text-xs">Daikin Indonesia</div>
                          <div className="text-white font-bold text-sm">{slide.titleAccent}</div>
                        </div>
                        {/* Glass edge - top shine line simulates light hitting glass rim */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent z-30 pointer-events-none" />
                        {/* Glass edge - left rim */}
                        <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-white/35 via-white/10 to-transparent z-30 pointer-events-none" />
                      </div>
                      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                        className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-4 py-3 min-w-[100px]">
                        <div className="text-[11px] text-gray-400 font-medium">{slide.stat1.label}</div>
                        <div className="text-xl font-bold text-daikin-blue">{slide.stat1.value}</div>
                      </motion.div>
                      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.5 }}
                        className="absolute -top-5 -right-5 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-4 py-3 min-w-[100px]">
                        <div className="text-[11px] text-gray-400 font-medium">{slide.stat2.label}</div>
                        <div className="text-xl font-bold text-daikin-blue">{slide.stat2.value}</div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1 text-xs z-10">
                  <span>Scroll</span>
                  <div className="w-px h-5 bg-white/30 mx-auto" />
                </motion.div>
                <WaveBackground />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="hero-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all border border-white/20">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button className="hero-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all border border-white/20">
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* ── Cerita yang Kami Yakini (Campaign Cards) ────────── */}
      <section className="bg-white relative z-20 flow-root">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp stagger className="grid md:grid-cols-3 gap-5 -mt-16 md:-mt-28 pb-4">
            {campaigns.map((camp) => (
              <FadeInItem key={camp.href}>
                <div className="pointer-events-none cursor-default">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-xl text-white h-56 flex flex-col justify-end group shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <img src={(camp as typeof camp & { image: string }).image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${camp.gradient}`} />
                    <div className="relative z-10 p-6 border-t border-white/10">
                      <h3 className="text-sm font-bold mb-1.5 leading-snug drop-shadow">{camp.title}</h3>
                      <p className="text-white/75 text-xs mb-3 line-clamp-2">{camp.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:gap-2.5 transition-all duration-300">
                        Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── 2. PRODUCT CATEGORIES ───────────────────────────── */}
      <section className="pt-16 md:pt-20 pb-12 md:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Lengkapi Kebutuhan Tata Udara Anda"
            subtitle="Iovasi pendingin udara terdepan untuk setiap ruang. Mulai dari AC residensial hemat energi, sistem komersial tangguh untuk produktivitas bisnis, hingga solusi pendinginan presisi untuk skala industri."
            centered
            className="mb-8 md:mb-12"
            subtitleClassName="max-w-4xl mx-auto"
          />

          {/* ── Row 1: 2 featured cards (equal halves) ───────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {productCategories.filter((c) => c.featured).map((cat) => {
              const inner = (
                <motion.div
                  whileHover={cat.disabled ? undefined : 'hover'}
                  className="relative rounded-2xl overflow-hidden h-72 md:h-80 cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                  {cat.image && (
                    <motion.img
                      variants={cat.disabled ? undefined : { hover: { scale: 1.05 } }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      src={cat.image} alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.overlay ?? 'from-black/70 to-transparent'}`} />

                  {/* Tags - top left */}
                  {cat.tags && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {cat.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Arrow - top right */}
                  {!cat.disabled && (
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Label panel - bottom */}
                  <div className="absolute bottom-0 inset-x-0 bg-black/35 backdrop-blur-sm px-6 py-4 border-t border-white/10 group-hover:bg-black/50 transition-colors duration-300">
                    <p className="text-white font-bold text-xl leading-tight drop-shadow">{cat.label}</p>
                    <p className="text-white/65 text-[13px] mt-1 font-medium">{cat.sublabel}</p>
                  </div>
                </motion.div>
              )
              return cat.disabled ? (
                <div key={cat.label} className="pointer-events-none cursor-default">{inner}</div>
              ) : (
                <Link key={cat.label} to={cat.href}>{inner}</Link>
              )
            })}
          </div>

          {/* ── Row 2: 4 compact cards ───────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productCategories.filter((c) => !c.featured).map((cat) => {
              const Icon = cat.Icon
              const inner = (
                <motion.div
                  whileHover={cat.disabled ? undefined : 'hover'}
                  className={`relative rounded-2xl overflow-hidden h-52 cursor-pointer group shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${cat.gradient ?? 'from-slate-600 to-slate-800'}`}
                >
                  {/* Dot pattern watermark */}
                  <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />

                  {/* Photo (if available) */}
                  {cat.image && (
                    <motion.img
                      variants={cat.disabled ? undefined : { hover: { scale: 1.07 } }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      src={cat.image} alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {cat.overlay && <div className={`absolute inset-0 bg-gradient-to-t ${cat.overlay}`} />}

                  {/* Large icon watermark (icon-only cards) */}
                  {Icon && !cat.image && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                      <Icon className="w-24 h-24 text-white" />
                    </div>
                  )}

                  {/* Arrow */}
                  {!cat.disabled && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {/* Small icon badge + label panel */}
                  <div className="absolute bottom-0 inset-x-0 bg-black/30 backdrop-blur-sm px-4 py-3.5 border-t border-white/10 group-hover:bg-black/45 transition-colors duration-300">
                    {Icon && (
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center mb-2">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <p className="text-white font-bold text-[15px] leading-tight drop-shadow">{cat.label}</p>
                    <p className="text-white/60 text-[11px] mt-0.5 font-medium">{cat.sublabel}</p>
                  </div>
                </motion.div>
              )
              return cat.disabled ? (
                <div key={cat.label} className="pointer-events-none cursor-default">{inner}</div>
              ) : (
                <Link key={cat.label} to={cat.href}>{inner}</Link>
              )
            })}
          </div>

          {/* Quick access strip */}
          <FadeInUp className="mt-8 md:mt-12 bg-daikin-blue-50/70 rounded-2xl p-3 md:p-4 border border-daikin-blue-100/50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Panduan Memilih AC', desc: 'Panduan lengkap sebelum membeli', icon: BookOpen, href: '/solutions/how-to-choose' },
                { label: 'Jaminan & Garansi', desc: 'Garansi resmi & cara klaim', icon: Shield, href: '/services/warranty' },
                { label: 'Dealer & Service Center', desc: 'Temukan lokasi resmi terdekat', icon: MapPin, href: '/services/ishop' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-3 md:gap-4 bg-white rounded-xl border border-transparent hover:border-daikin-blue/20 px-4 md:px-5 py-3.5 md:py-4 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-daikin-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-daikin-blue group-hover:text-white transition-colors">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-daikin-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-charcoal text-sm md:text-[15px] leading-tight">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5 md:mt-1">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-daikin-blue transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </FadeInUp>

        </div>
      </section>

      {/* ── 3. WHY DAIKIN - with air particles ──────────────── */}
      <section className="py-16 md:py-24 bg-daikin-blue-50 relative overflow-hidden">
        <Suspense fallback={null}><AirParticles /></Suspense>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-14">
            <FadeInLeft className="lg:col-span-2 space-y-5">
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                Bukan Kebetulan<br /><span className="text-daikin-blue">Kami Jadi yang Pertama</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Setiap fitur Daikin lahir dari satu pertanyaan sederhana: bagaimana udara ini bisa lebih baik untuk Anda?
              </p>
              <Link to="/profile/about">
                <Button variant="primary">Kenali Lebih Lanjut <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <div className="hidden lg:flex flex-col items-start pt-4 gap-2">
                <div className="bg-white rounded-xl rounded-bl-none shadow-card px-4 py-2.5 text-xs font-semibold text-daikin-blue border border-daikin-blue-50 ml-8">
                  Daikin pilihan tepat!
                </div>
                <motion.img
                  src="/images/mascot/icon-daikin.png" alt="Pichon-kun"
                  className="h-24 w-auto drop-shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                />
              </div>
            </FadeInLeft>
            <FadeInUp stagger className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {whyItems.map(({ icon: Icon, title, desc }, i) => (
                <FadeInItem key={i}>
                  <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 h-full border border-gray-50">
                    <div className="w-11 h-11 rounded-lg bg-daikin-blue-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-daikin-blue" />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2 text-[15px]">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInUp>
          </div>
          <FadeInUp>
            <div className="grid grid-cols-3 gap-3 h-72 md:h-80">
              {whyPhotos.map((photo, i) => (
                <div key={i} className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${photo.gradient} ${photo.span}`}>
                  {/* Photo */}
                  <img src={photo.image} alt={photo.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  {/* Bottom vignette keeps label readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  {/* Label */}
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wide uppercase drop-shadow">{photo.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 4. DAIKIN DALAM ANGKA ───────────────────────────── */}
      <section className="wave-bg relative overflow-hidden py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeading
            title="Angka yang Berbicara"
            subtitle="Satu abad bukan waktu yang pendek - dan setiap tahunnya, standar kami terus diperbaiki."
            centered light
          />
          <StatCounter stats={[
            { value: 100, suffix: '+', label: 'Tahun Inovasi' },
            { value: 170, suffix: '+', label: 'Negara' },
            { value: 84000, suffix: '+', label: 'Unit / Tahun di Indonesia' },
            { value: 48, suffix: '+', label: 'Tahun di Indonesia' },
          ]} light />
        </div>
        <WaveBackground inverted />
      </section>

      {/* ── 5. VIDEO SECTION ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInLeft className="text-white order-2 lg:order-1">
              <div className="w-10 h-1 bg-daikin-blue rounded-full mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                Satu Misi yang Kami Emban<br />
                <span className="text-daikin-blue-light">Sejak 1924</span>
              </h2>
              <p className="text-white/65 leading-relaxed mb-4 text-lg">
                Bukan sekadar mesin pendingin - Daikin adalah janji kepada setiap orang yang menghirup udara di ruang yang kami sentuh.
              </p>
              <p className="text-white/50 leading-relaxed mb-8 text-sm">
                Dari laboratorium di Osaka hingga kamar tidur Anda di Indonesia. Saksikan bagaimana seratus tahun inovasi terwujud dalam satu perjalanan yang nyata.
              </p>
              <button onClick={handlePlay} className="inline-flex items-center gap-3 text-daikin-blue-light font-semibold hover:text-white transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-daikin-blue flex items-center justify-center group-hover:bg-daikin-blue-light transition-colors">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </span>
                Tonton Kisah Kami
              </button>
            </FadeInLeft>
            <FadeInRight className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-daikin-blue-dark via-daikin-blue to-daikin-blue-light shadow-[0_24px_64px_rgba(0,151,224,0.25)] group cursor-pointer">
                {/* Actual video */}
                <video
                  ref={videoRef}
                  src="/images/video/satu-misi.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                  onClick={handlePause}
                  playsInline
                />
                {/* Poster overlay - hidden when playing */}
                {!isPlaying && (
                  <>
                    <div className="absolute inset-0 opacity-[0.07]" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '22px 22px',
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        <Play className="w-7 h-7 md:w-9 md:h-9 text-white fill-white ml-1" />
                      </div>
                    </motion.div>
                    <div className="absolute bottom-5 left-5 z-10 text-white">
                      <div className="text-white/60 text-xs mb-1 uppercase tracking-widest font-medium">Daikin Indonesia</div>
                      <div className="text-white font-bold text-base md:text-lg">Satu Abad Menyempurnakan Udara</div>
                    </div>
                    <div className="absolute bottom-5 right-5 z-10">
                      <span className="text-xs font-semibold bg-daikin-blue/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">3:24</span>
                    </div>
                  </>
                )}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── 6. DAIKIN GROUP ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
                Lahir di Osaka,<br /><span className="text-daikin-blue">Dipercaya di Seluruh Dunia</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Berdiri di Osaka, Jepang pada 1924, Daikin Industries tumbuh menjadi produsen AC terbesar di dunia - bukan karena keberuntungan, melainkan karena inovasi yang tak pernah berhenti.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                Di Indonesia sejak 1976, kami telah membangun kepercayaan yang merentang di 34 provinsi, dengan ratusan dealer dan teknisi bersertifikat yang siap hadir untuk Anda.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/profile/daikin-group">
                  <Button variant="primary">Tentang Daikin Group <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/profile/history">
                  <Button variant="secondary">Sejarah Kami</Button>
                </Link>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-daikin-blue-dark shadow-card">
                <img src="/images/daikin-group.jpg" alt="Daikin Group" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-daikin-blue-dark/75 via-daikin-blue-dark/20 to-transparent" />
                <div className="absolute bottom-5 left-5 z-10 text-white">
                  <div className="text-xs text-white/60 mb-0.5">Hadir di seluruh dunia</div>
                  <div className="text-xl font-bold">170+ Negara</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[{ v: '100+', l: 'Tahun' }, { v: '170+', l: 'Negara' }, { v: '90K+', l: 'Karyawan' }, { v: '48+', l: 'Thn di Indonesia' }].map((s) => (
                  <div key={s.l} className="bg-daikin-blue-50 rounded-lg px-3 py-3 text-center border border-daikin-blue/10">
                    <div className="text-base font-bold text-daikin-blue">{s.v}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── 7. INOVASI UNTUK PENINGKATAN BERKELANJUTAN ──────── */}
      <section className="py-16 md:py-24 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
                Inovasi Untuk<br /><span className="text-daikin-blue">Peningkatan Berkelanjutan</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Setiap terobosan yang kami hadirkan bukan hanya untuk hari ini - melainkan untuk menjaga bumi dan kualitas hidup generasi yang akan datang.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {innovationPoints.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-daikin-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-daikin-blue" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal text-sm mb-0.5">{title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/profile/technology">
                <Button variant="primary">Selengkapnya <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </FadeInLeft>

            <FadeInRight>
              <div className="grid grid-cols-2 gap-3">
                {innovationImages.map((img, i) => (
                  <div
                    key={i}
                    className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${img.gradient} aspect-[4/3]`}
                  >
                    <img src={img.image} alt={img.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-white text-[11px] font-semibold leading-tight drop-shadow">{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── 8. XPERIENCE ZONE ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal">Xperience Zone</h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                Rasakan langsung kecanggihan teknologi Daikin di showroom eksklusif kami. Sentuh, rasakan, dan temukan perbedaan udara sempurna sebelum memutuskan.
              </p>
            </div>
            <span className="text-daikin-blue text-sm font-semibold flex items-center gap-1 flex-shrink-0 pointer-events-none cursor-default">
              Cari Lokasi <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <FadeInUp>
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Main large image */}
              <div className={`lg:col-span-3 relative rounded-2xl overflow-hidden bg-gradient-to-br ${xperienceImages[0].gradient} aspect-[4/3] lg:aspect-auto`}>
                <img src={xperienceImages[0].image} alt={xperienceImages[0].label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 z-10 text-white">
                  <div className="text-xs text-white/60 mb-1 uppercase tracking-widest font-medium">Daikin Xperience Zone</div>
                  <div className="text-2xl font-bold leading-tight">{xperienceImages[0].label}</div>
                  <p className="text-white/65 text-sm mt-2 max-w-xs">Ruang pameran seluas 500m² dengan lebih dari 30 unit AC yang bisa Anda coba langsung.</p>
                </div>
                <div className="absolute top-5 right-5 z-10">
                  <span className="text-xs font-semibold bg-daikin-blue text-white px-3 py-1.5 rounded-full">Jakarta & Surabaya</span>
                </div>
              </div>

              {/* Two stacked smaller images */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {xperienceImages.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className={`relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br ${img.gradient} min-h-[160px]`}
                  >
                    <img src={img.image} alt={img.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-white font-bold text-sm drop-shadow">{img.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Feature badges */}
          <FadeInUp className="mt-6 flex flex-wrap gap-3">
            {['Konsultasi Gratis', 'Demo Langsung', 'Teknisi Bersertifikat', 'Free Wifi', 'Parking Area'].map((tag) => (
              <span key={tag} className="text-xs font-semibold text-daikin-blue bg-daikin-blue-50 border border-daikin-blue/15 px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── 9. PRODUK UNGGULAN - 3 cards ────────────────────── */}
      <section className="pt-16 md:pt-24 pb-8 md:pb-10 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionHeading
              title="Dirancang untuk Kebutuhan Anda"
              subtitle="Dari kamar tidur hingga gedung bertingkat - ada satu Daikin yang tepat untuk setiap ruang."
              className="mb-0"
            />
            <span className="text-daikin-blue text-sm font-semibold flex items-center gap-1 flex-shrink-0 pointer-events-none cursor-default">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <FadeInItem key={product.id}><ProductCard product={product} /></FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── 10. AKSESORI - CATEGORIES ───────────────────────── */}
      <section className="pt-8 md:pt-10 pb-16 md:pb-20 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal">Sempurnakan Sistem Daikin Anda</h2>
              <p className="text-gray-500 mt-2 text-sm">Setiap komponen dirancang dan diuji untuk performa optimal pada unit Daikin.</p>
            </div>
            <span className="text-daikin-blue text-sm font-semibold flex items-center gap-1 flex-shrink-0 pointer-events-none cursor-default">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <FadeInUp stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {accessoryCategories.map((cat) => {
              const Icon = cat.Icon
              return (
                <FadeInItem key={cat.label}>
                  <div className="pointer-events-none cursor-default">
                    <motion.div
                      className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${cat.gradient} aspect-[3/4] flex flex-col justify-end group shadow-sm hover:shadow-lg transition-shadow`}
                    >
                      <div className="absolute inset-0 opacity-[0.1]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '14px 14px',
                      }} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="relative z-10 p-3 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center mb-2">
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="text-white font-bold text-xs leading-tight">{cat.label}</div>
                        <div className="text-white/60 text-[10px] mt-0.5">{cat.sublabel}</div>
                      </div>
                    </motion.div>
                  </div>
                </FadeInItem>
              )
            })}
          </FadeInUp>
        </div>
      </section>

      {/* ── 12. PELATIHAN - 3 CATEGORIES + KARIR ───────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="accent-line" />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">Jadilah Ahlinya. Kami yang Mendidik.</h2>
            <p className="text-gray-500 text-sm max-w-xl">Kurikulum pelatihan Daikin dirancang langsung dari Jepang - standar global, implementasi lokal.</p>
          </div>

          {/* 3 Training categories */}
          <FadeInUp stagger className="grid md:grid-cols-3 gap-5 mb-8">
            {trainingCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <FadeInItem key={cat.title}>
                  <div className="pointer-events-none cursor-default h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.gradient} p-7 text-white group shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col justify-between min-h-[220px]`}
                    >
                      <div className="absolute inset-0 opacity-[0.06]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }} />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                        <p className="text-white/65 text-sm leading-relaxed">{cat.desc}</p>
                      </div>
                      <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:gap-2.5 transition-all duration-300">
                        {cat.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  </div>
                </FadeInItem>
              )
            })}
          </FadeInUp>

          {/* Career card - full width */}
          <FadeInUp>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-charcoal via-[#1a2a4a] to-daikin-blue-dark">
              <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Karir yang Punya Dampak</h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                      Di Daikin, Anda tidak hanya bekerja - Anda ikut membangun kualitas udara untuk jutaan orang setiap harinya.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3">
                      {['Gaji Kompetitif', 'Pengembangan Karir', 'Rotasi Internasional', 'Lingkungan Inovatif'].map((it) => (
                        <span key={it} className="text-xs text-white/55 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-daikin-blue-light inline-block" />{it}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link to="/careers" className="flex-shrink-0">
                  <Button variant="white">Lihat Lowongan <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </div>
              <motion.img src="/images/mascot/icon-daikin-2.png" alt="Pichon-kun"
                className="absolute bottom-0 right-8 h-20 w-auto drop-shadow-xl hidden md:block"
                animate={{ rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 13. DEALER SPESIALIS ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-soft-gray hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="accent-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal">Daikin Ada di Dekat Anda</h2>
              <p className="text-gray-500 mt-2 text-sm">1.500+ titik layanan resmi di 34 provinsi - dari kota besar hingga kota kecil, kami selalu ada.</p>
            </div>
            <span className="text-daikin-blue text-sm font-semibold flex items-center gap-1 flex-shrink-0 pointer-events-none cursor-default">
              Cari Semua <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <FadeInUp stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
            {dealerHighlights.map((dealer) => (
              <FadeInItem key={dealer.city}>
                <div className="pointer-events-none cursor-default">
                  <motion.div
                    className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100"
                  >
                    <MapPin className="w-5 h-5 text-daikin-blue mx-auto mb-2" />
                    <div className="font-bold text-charcoal text-sm">{dealer.city}</div>
                    <div className="text-daikin-blue text-xs font-semibold mt-1">{dealer.count} Dealer</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">{dealer.type}</div>
                  </motion.div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
          <FadeInUp>
            <div className="bg-daikin-blue rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-white pointer-events-none cursor-default">
              <div className="flex items-center gap-4">
                <Globe className="w-7 h-7 opacity-80 flex-shrink-0" />
                <div>
                  <div className="font-bold">1.400+ Dealer Resmi di 34 Provinsi</div>
                  <div className="text-white/65 text-xs mt-0.5">Garansi suku cadang asli & servis resmi di setiap dealer</div>
                </div>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-daikin-blue font-semibold rounded-xl text-sm">
                Cari Dealer <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 14. ARTIKEL & BERITA ────────────────────────────── */}
      <section className="pt-2 md:pt-4 pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionHeading
              title="Tetap Terhubung dengan Daikin"
              subtitle="Inovasi terbaru, cerita di balik layar, dan informasi yang relevan untuk Anda."
              className="mb-0"
            />
            <span className="text-daikin-blue text-sm font-semibold flex items-center gap-1 flex-shrink-0 pointer-events-none cursor-default">
              Semua Artikel <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <FadeInUp stagger className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <FadeInItem key={article.id}><NewsCard article={article} /></FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── 15. NEWSLETTER ──────────────────────────────────── */}
      <section className="py-16 bg-daikin-blue-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-daikin-blue-dark via-daikin-blue to-daikin-blue-light p-10 md:p-14">
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-5">
                    <Mail className="w-3.5 h-3.5" />
                    Newsletter Daikin Indonesia
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    Dapatkan Update Terbaru,<br />Langsung di Inbox Anda
                  </h2>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Promo eksklusif, produk baru, tips perawatan AC, dan inspirasi udara sempurna - tanpa spam, berhenti kapan saja.
                  </p>
                </div>
                <div>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-3"
                  >
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="nama@email.com"
                        required
                        className="flex-1 px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all text-sm"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-daikin-blue font-semibold rounded-xl hover:bg-daikin-blue-50 active:scale-95 transition-all text-sm whitespace-nowrap"
                      >
                        Berlangganan <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white/40 text-xs">
                      Dengan berlangganan, Anda menyetujui <Link to="/privacy-policy" className="underline hover:text-white/70 transition-colors">Kebijakan Privasi</Link> kami.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 16. CTA - with air particles ────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
        <Suspense fallback={null}><AirParticles /></Suspense>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <FadeInUp>
            <motion.img src="/images/mascot/icon-daikin-4.png" alt="Pichon-kun"
              className="h-20 w-auto mx-auto mb-6 drop-shadow-xl"
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Mulai Perjalanan<br /><span className="text-daikin-blue-light">Udara Sempurna Anda</span>
            </h2>
            <p className="text-gray-400 mb-10 text-base max-w-xl mx-auto leading-relaxed">
              Ceritakan kebutuhan ruangan Anda kepada kami - dan kami akan pastikan setiap napas yang Anda hirup di sana, sempurna.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="pointer-events-none cursor-default">
                <Button variant="primary" size="lg"><MapPin className="w-5 h-5" /> Cari Dealer Terdekat</Button>
              </span>
              <Link to="/solutions/ac-calculator">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white/25 text-white/75 hover:text-white hover:border-white/50 hover:bg-white/10 active:scale-95 transition-all duration-200">
                  <Play className="w-5 h-5" /> Kalkulator AC
                </button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      <PichonKunHelper />
    </PageTransition>
  )
}
