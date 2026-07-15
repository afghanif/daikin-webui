import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Phone, Building2, Wrench, ShoppingBag, Sparkles,
  Search, X, ChevronDown, CheckCircle2, Award, Globe, Users, TrendingUp,
} from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import SectionHeading from '@/components/sections/SectionHeading'
import StatCounter from '@/components/sections/StatCounter'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import { cn } from '@/utils/cn'

// ─── Network cards ─────────────────────────────────────────────────────────
const networkCards = [
  { id: 'cabang',  icon: Building2,   title: 'Kantor Cabang',        value: '14',     unit: 'Kota',          bg: 'bg-daikin-blue-50', color: 'text-daikin-blue'  },
  { id: 'proshop', icon: ShoppingBag, title: 'Daikin Proshop Dealer', value: '1.200+', unit: 'Dealer Resmi',  bg: 'bg-emerald-50',     color: 'text-emerald-600'  },
  { id: 'zone',    icon: Sparkles,    title: 'Xperience Zone',        value: '6',      unit: 'Showroom',      bg: 'bg-violet-50',      color: 'text-violet-600'   },
  { id: 'service', icon: Wrench,      title: 'Service Station',       value: '500+',   unit: 'Titik Service', bg: 'bg-orange-50',      color: 'text-orange-600'   },
]

type CardDetail = { label: string; headers: string[]; rows: string[][] }

const cardDetails: Record<string, CardDetail> = {
  cabang: {
    label: 'Daftar Kantor Cabang',
    headers: ['No', 'Kota', 'Alamat', 'Telepon'],
    rows: [
      ['1',  'Jakarta (HQ)',  'Menara Astra, Jl. Jend. Sudirman Kav. 5-6, Tanah Abang, Jakarta Pusat', '+62 21 8665 6886'],
      ['2',  'Tangerang',     'Jl. Daan Mogot Km. 19, Tangerang Barat',                                '+62 21 5591 8800'],
      ['3',  'Bekasi',        'Jl. Ahmad Yani No. 88, Bekasi Selatan',                                  '+62 21 8846 0088'],
      ['4',  'Bandung',       'Jl. Soekarno-Hatta No. 123, Margacinta, Bandung',                       '+62 22 7512 0100'],
      ['5',  'Semarang',      'Jl. Pemuda No. 45, Semarang Tengah',                                    '+62 24 8419 0200'],
      ['6',  'Yogyakarta',    'Jl. Solo Km. 8, Maguwoharjo, Sleman',                                   '+62 274 4321 300'],
      ['7',  'Surabaya',      'Jl. Ahmad Yani No. 56, Surabaya Selatan',                               '+62 31 8291 0400'],
      ['8',  'Denpasar',      'Jl. Bypass Ngurah Rai No. 77, Sanur, Bali',                             '+62 361 8888 500'],
      ['9',  'Makassar',      'Jl. A.P. Pettarani No. 18, Panakkukang, Makassar',                      '+62 411 8811 600'],
      ['10', 'Palembang',     'Jl. Jend. Sudirman No. 99, Bukit Besar, Palembang',                     '+62 711 8810 700'],
      ['11', 'Pekanbaru',     'Jl. HR. Soebrantas No. 33, Tampan, Pekanbaru',                          '+62 761 8809 800'],
      ['12', 'Medan',         'Jl. Gatot Subroto No. 150, Sei Sikambing, Medan',                       '+62 61 8808 900'],
      ['13', 'Manado',        'Jl. Sam Ratulangi No. 22, Tikala, Manado',                              '+62 431 8807 010'],
      ['14', 'Batam',         'Jl. Engku Putri No. 11, Batam Center',                                  '+62 778 8806 011'],
    ],
  },
  proshop: {
    label: 'Daftar Daikin Proshop Dealer',
    headers: ['No', 'Nama Dealer', 'Kota', 'Lokasi'],
    rows: [
      ['1',  'Daikin ProShop Senayan City',         'Jakarta',    'Senayan City LG Floor, Jl. Asia Afrika, Jakarta Pusat'],
      ['2',  'Daikin iShop Grand Indonesia',         'Jakarta',    'Grand Indonesia West Mall Lt. 5, Jakarta Pusat'],
      ['3',  'Daikin ProShop Summarecon Serpong',    'Tangerang',  'Summarecon Mall Serpong Lt. 2, Serpong, Tangerang'],
      ['4',  'Daikin iShop Aeon Mall BSD',           'Bekasi',     'Aeon Mall BSD City Lt. 1, Tangerang Selatan'],
      ['5',  'Daikin ProShop Bandung Indah Plaza',   'Bandung',    'Bandung Indah Plaza Lt. 3, Jl. Merdeka, Bandung'],
      ['6',  'Daikin ProShop Paragon Mall',          'Semarang',   'Paragon Mall Lt. 2, Jl. Pemuda No. 118, Semarang'],
      ['7',  'Daikin ProShop Hartono Mall',          'Yogyakarta', 'Hartono Mall Lt. 1, Jl. Ring Road Utara, Yogyakarta'],
      ['8',  'Daikin ProShop Tunjungan Plaza',       'Surabaya',   'Tunjungan Plaza 6 Lt. 4, Jl. Basuki Rahmat, Surabaya'],
      ['9',  'Daikin iShop Discovery Mall Bali',     'Denpasar',   'Discovery Shopping Mall Lt. 2, Jl. Kartika Plaza, Kuta'],
      ['10', 'Daikin ProShop Lippo Plaza Medan',     'Medan',      'Lippo Plaza Medan Lt. 3, Jl. Gatot Subroto, Medan'],
      ['11', 'Daikin ProShop Trans Studio Makassar', 'Makassar',   'Trans Studio Mall Lt. 1, Jl. A.P. Pettarani, Makassar'],
      ['12', 'Daikin ProShop Mega Mall Batam',       'Batam',      'Mega Mall Batam Center Lt. 1, Jl. Engku Putri, Batam'],
    ],
  },
  zone: {
    label: 'Daftar Xperience Zone',
    headers: ['No', 'Nama Showroom', 'Kota', 'Lokasi'],
    rows: [
      ['1', 'Daikin Xperience Zone Jakarta',  'Jakarta',  'Menara Astra Lt. GF, Jl. Jend. Sudirman Kav. 5-6, Jakarta Pusat'],
      ['2', 'Daikin Xperience Zone Surabaya', 'Surabaya', 'Pakuwon Mall Lt. 2, Jl. Puncak Indah Lontar, Surabaya Barat'],
      ['3', 'Daikin Xperience Zone Bandung',  'Bandung',  'Paris Van Java Mall Lt. 1, Jl. Sukajadi No. 137–139, Bandung'],
      ['4', 'Daikin Xperience Zone Medan',    'Medan',    'Sun Plaza Lt. 3, Jl. Zainul Arifin, Medan Petisah'],
      ['5', 'Daikin Xperience Zone Makassar', 'Makassar', 'Trans Studio Mall Lt. 1, Jl. Metro Tanjung Bunga, Makassar'],
      ['6', 'Daikin Xperience Zone Bali',     'Denpasar', 'Beachwalk Shopping Center Lt. 1, Jl. Pantai Kuta, Badung, Bali'],
    ],
  },
  service: {
    label: 'Daftar Service Station',
    headers: ['No', 'Nama Station', 'Kota', 'Jam Operasional', 'Status'],
    rows: [
      ['1',  'Daikin Service Center Jakarta Pusat',    'Jakarta',    '08:00 – 17:00', 'Aktif'],
      ['2',  'Daikin Service Center Jakarta Selatan',  'Jakarta',    '08:00 – 17:00', 'Aktif'],
      ['3',  'Daikin Service Center Jakarta Barat',    'Jakarta',    '08:00 – 17:00', 'Aktif'],
      ['4',  'Daikin Service Center Tangerang',        'Tangerang',  '08:00 – 17:00', 'Aktif'],
      ['5',  'Daikin Service Center Bekasi',           'Bekasi',     '08:00 – 17:00', 'Aktif'],
      ['6',  'Daikin Service Center Bandung',          'Bandung',    '08:00 – 17:00', 'Aktif'],
      ['7',  'Daikin Service Center Semarang',         'Semarang',   '08:00 – 17:00', 'Aktif'],
      ['8',  'Daikin Service Center Yogyakarta',       'Yogyakarta', '08:00 – 17:00', 'Aktif'],
      ['9',  'Daikin Service Center Surabaya Utara',   'Surabaya',   '08:00 – 17:00', 'Aktif'],
      ['10', 'Daikin Service Center Surabaya Selatan', 'Surabaya',   '08:00 – 17:00', 'Aktif'],
      ['11', 'Daikin Service Center Denpasar',         'Denpasar',   '08:00 – 17:00', 'Aktif'],
      ['12', 'Daikin Service Center Makassar',         'Makassar',   '08:00 – 17:00', 'Aktif'],
      ['13', 'Daikin Service Center Palembang',        'Palembang',  '08:00 – 17:00', 'Aktif'],
      ['14', 'Daikin Service Center Pekanbaru',        'Pekanbaru',  '08:00 – 17:00', 'Aktif'],
      ['15', 'Daikin Service Center Medan',            'Medan',      '08:00 – 17:00', 'Aktif'],
      ['16', 'Daikin Service Center Manado',           'Manado',     '08:00 – 17:00', 'Aktif'],
      ['17', 'Daikin Service Center Batam',            'Batam',      '08:00 – 17:00', 'Aktif'],
    ],
  },
}

// ─── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { value: 14,   suffix: '',  label: 'Cabang Regional'  },
  { value: 1200, suffix: '+', label: 'Dealer Resmi'     },
  { value: 500,  suffix: '+', label: 'Titik Service'    },
  { value: 2012, suffix: '',  label: 'PT Resmi Berdiri' },
]

// ─── Branches ───────────────────────────────────────────────────────────────
const branches = [
  'Tangerang', 'Bekasi', 'Bandung', 'Semarang', 'Yogyakarta', 'Surabaya',
  'Denpasar', 'Makassar', 'Palembang', 'Pekanbaru', 'Medan', 'Manado', 'Batam',
]

// ─── Vision / Mission ───────────────────────────────────────────────────────
const missionPoints = [
  'Berkontribusi kepada masyarakat Indonesia dengan menyediakan solusi dan produk AC yang mutakhir',
  'Melakukan hubungan bisnis yang baik dengan pelanggan dan penyedia eksternal',
]

// ─── Quality Policy ─────────────────────────────────────────────────────────
const qualityPolicy = [
  {
    icon: CheckCircle2,
    title: 'Kepuasan Pelanggan',
    desc: 'Memenuhi persyaratan pelanggan untuk peningkatan kepuasan dan berkomitmen untuk patuh terhadap regulasi dan/atau peraturan-peraturan yang berlaku di Indonesia',
  },
  {
    icon: Award,
    title: 'Produk Berkualitas',
    desc: 'Menyediakan produk yang bermutu, berteknologi tinggi dengan harga bersaing',
  },
  {
    icon: Globe,
    title: 'Perluasan Jaringan',
    desc: 'Menambah jaringan penjualan dan service di seluruh Indonesia',
  },
  {
    icon: Users,
    title: 'Pengembangan SDM',
    desc: 'Meningkatkan kualitas dan produktivitas sumber daya manusia',
  },
  {
    icon: TrendingUp,
    title: 'Perbaikan Berkelanjutan',
    desc: 'Melakukan perbaikan terus-menerus terhadap pelayanan dan efektivitas penerapan Sistem Manajemen Mutu',
  },
]

// ─── Milestones ─────────────────────────────────────────────────────────────
const milestones = [
  {
    year: '1974', side: 'left', highlight: false,
    title: 'Awal Kehadiran di Indonesia',
    desc: 'Daikin mulai hadir di pasar Indonesia melalui jalur distribusi resmi, membawa teknologi pendingin udara Jepang terbaik ke Nusantara untuk pertama kalinya.',
  },
  {
    year: '1985', side: 'right', highlight: false,
    title: 'Ekspansi Distribusi Nasional',
    desc: 'Jaringan distribusi Daikin berkembang menjangkau kota-kota besar di seluruh Indonesia, membangun reputasi kualitas dan kepercayaan di benak jutaan konsumen.',
  },
  {
    year: '1994', side: 'left', highlight: false,
    title: 'Pionir AC Inverter Indonesia',
    desc: 'Daikin menjadi pelopor dalam meluncurkan AC inverter di Indonesia - menetapkan standar baru efisiensi energi dan merevolusi industri AC nasional selamanya.',
  },
  {
    year: '2004', side: 'right', highlight: false,
    title: 'Era Solusi Komersial VRV',
    desc: 'Sistem VRV (Variable Refrigerant Volume) untuk gedung komersial diperkenalkan, membuka era baru solusi pendingin udara skala besar dan konsep gedung pintar di Indonesia.',
  },
  {
    year: '2012', side: 'left', highlight: true,
    title: 'PT Daikin Resmi Berdiri & Pabrik Beroperasi',
    desc: 'PT Daikin Airconditioning Indonesia didirikan secara resmi pada Juni 2012 sebagai bagian dari DAIKIN Global. Pabrik resmi Daikin di Indonesia mulai beroperasi - menegaskan komitmen investasi jangka panjang untuk Indonesia.',
  },
  {
    year: '2016', side: 'right', highlight: false,
    title: 'Ekspansi 10+ Cabang Regional',
    desc: 'Pembukaan kantor cabang regional di kota-kota strategis: Surabaya, Bandung, Semarang, Medan, Makassar, Denpasar, dan kota-kota lainnya di seluruh nusantara.',
  },
  {
    year: '2020', side: 'left', highlight: false,
    title: 'Pusat Layanan Terintegrasi',
    desc: 'Integrasi customer service center nasional dan peluncuran Daikin Contact Center 0800 1 081 081 - layanan bebas pulsa yang siap melayani seluruh pelanggan Indonesia.',
  },
  {
    year: '2024', side: 'right', highlight: true,
    title: '50 Tahun: Pemimpin Industri AC Indonesia',
    desc: 'Merayakan lebih dari 50 tahun kehadiran di Indonesia dengan 14 cabang, 1.200+ dealer resmi, dan 500+ titik service aktif. Daikin menegaskan posisinya sebagai pemimpin industri AC #1 di Indonesia.',
  },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function AboutIndonesia() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const tableRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (id: string) => {
    if (activeCard === id) {
      setActiveCard(null)
      setSearchQuery('')
      return
    }
    setActiveCard(id)
    setSearchQuery('')
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150)
  }

  const detail = activeCard ? cardDetails[activeCard] : null
  const filteredRows = detail
    ? detail.rows.filter(row => row.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
    : []

  return (
    <PageTransition>
      <PageMeta
        title="Tentang Daikin Indonesia"
        description="Mengenal PT Daikin Airconditioning Indonesia - lebih dari 50 tahun hadir di Indonesia dengan 14 cabang, 1.200+ dealer, dan 500+ titik service."
        canonical="/profile/about"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb
            items={[{ label: 'Profile', path: '/profile' }, { label: 'Tentang Daikin Indonesia' }]}
            className="text-white mb-8"
          />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Tentang Daikin Indonesia</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Lebih dari 50 tahun hadir di Indonesia, menghadirkan produk-produk berkualitas dunia untuk memenuhi beragam kebutuhan pelanggan.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* ── 4 Network Cards (float out of hero) ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {networkCards.map(({ id, icon: Icon, title, value, unit, bg, color }, i) => (
            <FadeInUp key={id} delay={i * 0.07}>
              <button
                onClick={() => handleCardClick(id)}
                className={cn(
                  'w-full bg-white rounded-2xl border p-5 md:p-6 text-center transition-all duration-200',
                  activeCard === id
                    ? 'border-daikin-blue shadow-[0_8px_32px_rgba(0,110,200,0.18)] ring-2 ring-daikin-blue/20 -translate-y-0.5'
                    : 'border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-lg hover:-translate-y-0.5'
                )}
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <div className={`text-2xl font-bold ${color} leading-tight`}>{value}</div>
                <div className="text-xs text-gray-400 mb-2">{unit}</div>
                <div className="text-sm font-semibold text-charcoal leading-snug mb-2">{title}</div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs text-daikin-blue font-medium">
                    {activeCard === id ? 'Tutup' : 'Lihat Detail'}
                  </span>
                  <ChevronDown className={cn(
                    'w-3.5 h-3.5 text-daikin-blue transition-transform duration-200',
                    activeCard === id && 'rotate-180'
                  )} />
                </div>
              </button>
            </FadeInUp>
          ))}
        </div>

        {/* Datatable panel */}
        <AnimatePresence mode="wait">
          {activeCard && detail && (
            <motion.div
              key={activeCard}
              ref={tableRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-4"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* Panel header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-charcoal text-sm">{detail.label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{detail.rows.length} data tersedia</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative hidden sm:block">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-daikin-blue transition-colors w-44"
                      />
                    </div>
                    <button
                      onClick={() => { setActiveCard(null); setSearchQuery('') }}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label="Tutup"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-daikin-blue-50">
                        {detail.headers.map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold text-daikin-blue uppercase tracking-wider whitespace-nowrap first:w-12">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td colSpan={detail.headers.length} className="px-5 py-10 text-center text-gray-400 text-sm">
                            Tidak ada data yang sesuai dengan pencarian
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((row, ri) => (
                          <tr
                            key={ri}
                            className={cn(
                              'border-t border-gray-50 hover:bg-daikin-blue-50/40 transition-colors',
                              ri % 2 !== 0 && 'bg-gray-50/50'
                            )}
                          >
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className={cn(
                                  'px-5 py-3 text-gray-700 align-middle',
                                  ci === 0 && 'text-gray-400 text-xs font-medium w-12',
                                  // last col of service table - status badge
                                  activeCard === 'service' && ci === row.length - 1
                                    ? 'whitespace-nowrap'
                                    : 'text-xs'
                                )}
                              >
                                {activeCard === 'service' && ci === row.length - 1 ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                    {cell}
                                  </span>
                                ) : cell}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50/60 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                  <span>Menampilkan <strong className="text-charcoal">{filteredRows.length}</strong> dari <strong className="text-charcoal">{detail.rows.length}</strong> data</span>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-daikin-blue hover:underline">
                      Reset pencarian
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Company Overview ─────────────────────────────────────────────── */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">PT Daikin Airconditioning Indonesia</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PT Daikin Airconditioning Indonesia didirikan pada bulan Juni 2012 dan menjadi bagian dari DAIKIN Global untuk menyediakan produk-produk berkualitas dunia dan melayani pasar Indonesia dengan beragam kebutuhan pelanggan.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Saat ini PT Daikin Airconditioning Indonesia memiliki jaringan distribusi{' '}
              <strong className="text-charcoal">14 cabang</strong> di berbagai kota besar, lebih dari{' '}
              <strong className="text-charcoal">1.200 dealer</strong> dan lebih dari{' '}
              <strong className="text-charcoal">500 titik service</strong> di Indonesia.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Untuk mengelola layanan purna jual dan pertanyaan terkait produk, PT Daikin Airconditioning Indonesia telah mengintegrasikan pusat layanan pelanggan yang siap membantu seluruh kebutuhan Anda.
            </p>
          </FadeInLeft>
          <FadeInRight>
            <div className="bg-soft-gray rounded-card overflow-hidden h-96">
              <img
                src="/images/daikin-group.jpg"
                alt="Kantor Daikin Indonesia"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading title="Daikin Indonesia dalam Angka" centered />
          <StatCounter stats={stats} />
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section className="section-container">
        <SectionHeading title="Visi & Misi" centered />
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeInLeft>
            <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue rounded-2xl p-8 text-white h-full">
              <div className="w-12 h-1 rounded-full bg-white/40 mb-5" />
              <h3 className="text-xl font-bold mb-4">Visi</h3>
              <p className="text-white/90 leading-relaxed text-lg">
                Menjadi AC dengan penjualan no. 1 dan dipercayai oleh masyarakat Indonesia.
              </p>
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 h-full">
              <div className="accent-line" />
              <h3 className="text-xl font-bold text-charcoal mb-4">Misi</h3>
              <ul className="space-y-4">
                {missionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-daikin-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-daikin-blue" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* ── Quality Policy (redesigned) ──────────────────────────────────── */}
      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading
            title="Kebijakan Mutu"
            subtitle="Komitmen PT Daikin Airconditioning Indonesia terhadap standar kualitas dan kepuasan pelanggan."
            centered
          />
          <FadeInUp stagger className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {qualityPolicy.map((p, i) => (
              <FadeInItem key={p.title}>
                <div className={cn(
                  'bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-card-hover hover:border-daikin-blue/20 transition-all duration-200',
                  i === 4 && 'md:col-span-2'
                )}>
                  <div className="w-11 h-11 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-5 h-5 text-daikin-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1.5 text-sm">{p.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── Branches ─────────────────────────────────────────────────────── */}
      <section className="section-container">
        <SectionHeading
          title="Jaringan Cabang"
          subtitle="14 cabang yang tersebar di kota-kota strategis di seluruh Indonesia."
        />
        <FadeInUp stagger className="flex flex-wrap gap-3">
          {branches.map((city) => (
            <FadeInItem key={city}>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-daikin-blue-50 rounded-full border border-daikin-blue/10 hover:bg-daikin-blue transition-colors duration-200 cursor-default group">
                <MapPin className="w-3.5 h-3.5 text-daikin-blue group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-daikin-blue-dark group-hover:text-white transition-colors">{city}</span>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading title="Informasi Kontak" centered />
          <div className="max-w-2xl mx-auto">
            <FadeInUp>
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-daikin-blue-dark to-daikin-blue px-8 py-6">
                  <h3 className="text-white font-bold text-lg">PT Daikin Airconditioning Indonesia</h3>
                  <p className="text-white/70 text-sm mt-1">Head Quarter - Sudirman, Jakarta</p>
                </div>
                <div className="p-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-daikin-blue" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Alamat</div>
                      <p className="text-sm text-charcoal leading-relaxed">
                        Menara Astra, Jl. Jenderal Sudirman Kav. 5-6<br />
                        Karet Tengsin, Tanah Abang<br />
                        Jakarta Pusat - 10220
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-daikin-blue" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Telepon</div>
                        <p className="text-sm font-medium text-charcoal">+62 21 8665 6886</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Daikin Contact Center</div>
                        <p className="text-sm font-bold text-daikin-blue">0800 1 081 081</p>
                        <p className="text-xs text-gray-400 mt-0.5">Layanan bebas pulsa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      <section className="section-container">
        <SectionHeading
          title="Perjalanan Kami"
          subtitle="Lebih dari 50 tahun dedikasi menghadirkan teknologi AC terbaik untuk Indonesia."
          centered
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-daikin-blue-100" />
          {milestones.map((item, i) => (
            <div
              key={i}
              className={`mb-10 flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`md:w-5/12 ${item.side === 'right' ? 'md:pl-10' : 'md:pr-10'}`}>
                <FadeInUp delay={i * 0.05}>
                  <div className={cn(
                    'floating-card p-5 hover:shadow-card-hover transition-shadow',
                    item.highlight && 'border-l-4 border-daikin-blue'
                  )}>
                    <div className={cn('font-bold text-xl mb-1', item.highlight ? 'text-daikin-blue' : 'text-daikin-blue/60')}>
                      {item.year}
                    </div>
                    <h3 className="font-bold text-charcoal mb-2 leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeInUp>
              </div>
              <div className="hidden md:flex md:w-2/12 justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className={cn(
                    'rounded-full border-4 border-white shadow-md z-10',
                    item.highlight ? 'w-6 h-6 bg-daikin-blue' : 'w-4 h-4 bg-sky-300'
                  )}
                />
              </div>
              <div className="hidden md:block md:w-5/12" />
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
