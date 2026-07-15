import { Link } from 'react-router-dom'
import { Newspaper, Tag, Calendar, GraduationCap, Heart, ArrowRight, TrendingUp } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import NewsCard from '@/components/sections/NewsCard'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import { getLatestNews } from '@/data/news'

const insightCategories = [
  {
    icon: Newspaper,
    title: 'Berita & Update',
    path: '/insights/news',
    gradient: 'from-daikin-blue to-sky-400',
    count: '10+ Artikel',
    desc: 'Pengumuman produk baru, update perusahaan, dan berita terkini dari ekosistem Daikin Indonesia.',
  },
  {
    icon: Tag,
    title: 'Promosi',
    path: '/insights/promotions',
    gradient: 'from-orange-500 to-red-500',
    count: '3 Promo Aktif',
    desc: 'Penawaran terbatas, cashback, cicilan 0%, dan program bundling eksklusif untuk pelanggan setia Daikin.',
  },
  {
    icon: Calendar,
    title: 'Events & Kegiatan',
    path: '/insights/events',
    gradient: 'from-emerald-500 to-teal-600',
    count: '2 Upcoming',
    desc: 'Pameran, demo produk, roadshow ke kota-kota besar, dan kegiatan komunitas Daikin di seluruh Indonesia.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Sertifikasi',
    path: '/insights/training',
    gradient: 'from-violet-500 to-purple-700',
    count: 'Open Registration',
    desc: 'Program sertifikasi teknisi resmi Daikin, pelatihan instalasi, dan workshop untuk mitra dealer kami.',
  },
  {
    icon: Heart,
    title: 'Daikin Impact (CSR)',
    path: '/insights/csr',
    gradient: 'from-rose-500 to-pink-600',
    count: 'Program Tahunan',
    desc: 'Inisiatif lingkungan, program komunitas, dan komitmen Daikin menuju masa depan yang lebih hijau dan berkelanjutan.',
  },
]

const highlights = [
  { label: 'Artikel Diterbitkan', value: '50+' },
  { label: 'Promo Sepanjang Tahun', value: '12+' },
  { label: 'Event Nasional', value: '8' },
  { label: 'Teknisi Tersertifikasi', value: '5000+' },
]

export default function InsightsIndex() {
  const latestNews = getLatestNews(3)

  return (
    <PageTransition>
      <PageMeta
        title="Insights Daikin Indonesia"
        description="Berita terbaru, promosi spesial, event, program pelatihan sertifikasi, dan inisiatif CSR dari Daikin Indonesia."
        canonical="/insights"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Insights' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Insights</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Tetap update dengan berita terbaru, promosi spesial, event, dan program Daikin Indonesia - semua dalam satu tempat.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <FadeInUp stagger className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map(({ value, label }) => (
              <FadeInItem key={label}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-daikin-blue mb-1">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </div>

      {/* Category cards */}
      <section className="section-container">
        <SectionHeading
          title="Semua Kanal Informasi"
          subtitle="Pilih kategori yang Anda minati - dari berita produk hingga program CSR, Daikin selalu punya sesuatu yang relevan untuk Anda."
        />
        <FadeInUp stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <FadeInItem key={cat.path}>
                <Link to={cat.path} className="block group h-full">
                  <div className="floating-card overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                    <div className={`h-44 bg-gradient-to-br ${cat.gradient} relative overflow-hidden flex-shrink-0`}>
                      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 25% 45%, white, transparent 55%)' }} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-charcoal group-hover:text-daikin-blue transition-colors mb-2">{cat.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">{cat.desc}</p>
                      <div className="flex items-center gap-1 text-daikin-blue text-sm font-semibold mt-4">
                        Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInItem>
            )
          })}
        </FadeInUp>
      </section>

      {/* Latest news */}
      <section className="section-bg-light">
        <div className="section-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="accent-line" />
              <h2 className="section-heading mb-0">Berita Terbaru</h2>
            </div>
            <Link to="/insights/news" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-daikin-blue hover:text-daikin-blue-dark transition-colors">
              Semua Berita <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <FadeInUp stagger className="grid md:grid-cols-3 gap-6 mb-8">
            {latestNews.map((article) => (
              <FadeInItem key={article.id}><NewsCard article={article} /></FadeInItem>
            ))}
          </FadeInUp>
          <Link to="/insights/news" className="btn-secondary inline-flex items-center gap-2 md:hidden">
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Promos & Events */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <FadeInLeft>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Tag className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-charcoal">Promosi Aktif</h2>
                <p className="text-sm text-gray-500">Penawaran terbatas untuk Anda</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Trade-In Program', desc: 'Tukar AC lama Anda dan dapatkan diskon hingga Rp 500.000 untuk unit Daikin baru. Berlaku di seluruh dealer iShop.', badge: 'HOT' },
                { title: 'Cicilan 0% 24 Bulan', desc: 'Bawa pulang AC Daikin favorit Anda tanpa bunga hingga 24 bulan dengan kartu kredit mitra.', badge: 'NEW' },
                { title: 'Bundling Gratis Instalasi', desc: 'Setiap pembelian unit AC inverter minimal 1PK mendapatkan gratis jasa instalasi standar senilai Rp 500.000.', badge: '' },
              ].map((promo) => (
                <div key={promo.title} className="floating-card p-4 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-charcoal text-sm">{promo.title}</h4>
                        {promo.badge && (
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${promo.badge === 'HOT' ? 'bg-orange-100 text-orange-600' : 'bg-daikin-blue-50 text-daikin-blue'}`}>
                            {promo.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{promo.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/insights/promotions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-daikin-blue mt-5 hover:text-daikin-blue-dark transition-colors">
              Semua Promosi <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInLeft>

          <FadeInRight>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-charcoal">Event Mendatang</h2>
                <p className="text-sm text-gray-500">Temui kami di berbagai kota</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { date: 'Jun 2025', title: 'Daikin Demo Day - Surabaya', desc: 'Sesi demo langsung teknologi Streamer dan smart control. Gratis untuk umum, registrasi diperlukan.', type: 'Demo' },
                { date: 'Jul 2025', title: 'Pameran HVAC & R Indonesia', desc: 'Temukan inovasi sistem komersial terbaru Daikin di Jakarta Convention Center. Booth A12.', type: 'Pameran' },
                { date: 'Agt 2025', title: 'Training Teknisi Bersertifikat', desc: 'Batch ke-3 program sertifikasi teknisi level 1 & 2. Terbuka untuk mitra dealer aktif Daikin.', type: 'Training' },
              ].map((event) => (
                <div key={event.title} className="floating-card p-4 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-center flex-shrink-0 w-14">
                      <div className="text-daikin-blue font-bold text-xs">{event.date}</div>
                      <span className="inline-block mt-1 text-xs bg-daikin-blue-50 text-daikin-blue px-1.5 py-0.5 rounded font-semibold">{event.type}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal text-sm mb-1">{event.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/insights/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-daikin-blue mt-5 hover:text-daikin-blue-dark transition-colors">
              Semua Event <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInRight>
        </div>
      </section>

      {/* CSR teaser */}
      <section className="section-bg-blue">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeInUp>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-3">Daikin Impact - Komitmen untuk Masa Depan</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Di luar bisnis, Daikin Indonesia aktif berkontribusi pada masyarakat dan lingkungan. Program Daikin Impact mencakup penghijauan kota, edukasi energi terbarukan, dan pemberdayaan komunitas teknisi lokal.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Setiap tahun, kami menanam ribuan pohon, mengedukasi puluhan ribu siswa tentang efisiensi energi, dan melatih ratusan teknisi dari daerah terpencil.
              </p>
              <Link to="/insights/csr" className="btn-primary inline-flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Lihat Program CSR
              </Link>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-rose-400 to-pink-600 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Penghijauan Kota</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-emerald-500 to-teal-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Edukasi Energi</span>
                  </div>
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-daikin-blue to-sky-500 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white font-semibold">Pemberdayaan Teknisi Lokal</span>
                    <p className="text-white/70 text-xs">500+ penerima manfaat per tahun</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
