import { Link } from 'react-router-dom'
import { HelpCircle, Zap, Calculator, Wind, Wrench, ArrowRight, Lightbulb, CheckCircle2, TrendingDown } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import PichonKunHelper from '@/components/sections/PichonKunHelper'

const solutions = [
  {
    icon: HelpCircle,
    title: 'Cara Memilih AC',
    path: '/solutions/how-to-choose',
    gradient: 'from-daikin-blue to-sky-400',
    tag: 'Panduan',
    desc: 'Panduan lengkap memilih AC yang tepat - mulai dari menentukan kapasitas berdasarkan luas ruangan, memahami perbedaan tipe (split wall, cassette, floor standing), hingga fitur yang benar-benar Anda butuhkan.',
  },
  {
    icon: Calculator,
    title: 'Kalkulator AC',
    path: '/solutions/ac-calculator',
    gradient: 'from-sky-400 to-cyan-500',
    tag: 'Tools',
    desc: 'Hitung kapasitas AC yang ideal secara otomatis hanya dalam hitungan detik. Masukkan dimensi ruangan, jumlah penghuni, dan faktor lingkungan - sistem kami langsung merekomendasikan PK yang tepat.',
  },
  {
    icon: Zap,
    title: 'Panduan Efisiensi Energi',
    path: '/solutions/energy-efficiency',
    gradient: 'from-emerald-500 to-green-600',
    tag: 'Hemat Energi',
    desc: 'Teknologi inverter Daikin dapat menghemat hingga 60% konsumsi listrik dibanding AC konvensional. Pelajari cara memaksimalkan penghematan melalui pengaturan suhu yang tepat, jadwal operasi, dan mode hemat energi.',
  },
  {
    icon: Wind,
    title: 'Kualitas Udara Dalam Ruangan',
    path: '/solutions/air-quality',
    gradient: 'from-teal-500 to-cyan-600',
    tag: 'Kesehatan',
    desc: 'Kualitas udara dalam ruangan bisa 5× lebih tercemar dari udara luar. Pelajari bagaimana Streamer Technology dan sistem filtrasi multi-lapis Daikin aktif melindungi keluarga Anda dari virus, alergen, dan polutan.',
  },
  {
    icon: Wrench,
    title: 'Tips Perawatan AC',
    path: '/solutions/maintenance-tips',
    gradient: 'from-orange-400 to-amber-500',
    tag: 'Perawatan',
    desc: 'Perawatan rutin yang tepat bisa memperpanjang usia AC hingga dua kali lipat dan menjaga efisiensi energinya. Panduan praktis ini mencakup jadwal pembersihan filter, tanda-tanda kerusakan dini, dan kapan harus memanggil teknisi.',
  },
]

const quickFacts = [
  { icon: TrendingDown, title: 'Hemat hingga 60%', desc: 'Dibandingkan AC konvensional berkapasitas sama dengan inverter Daikin' },
  { icon: CheckCircle2, title: '99.9% Patogen Dinonaktifkan', desc: 'Efektivitas Streamer Technology dalam mengatasi virus dan bakteri berbahaya' },
  { icon: Lightbulb, title: '18–26°C Suhu Optimal', desc: 'Rentang suhu terbaik untuk kenyamanan dan efisiensi energi maksimal' },
]

export default function SolutionsIndex() {
  return (
    <PageTransition>
      <PageMeta
        title="Solusi & Panduan AC Daikin"
        description="Panduan lengkap memilih, menggunakan, dan merawat AC Daikin. Kalkulator kapasitas AC, tips efisiensi energi, dan panduan kualitas udara dari para ahli Daikin."
        canonical="/solutions"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Solusi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Solusi & Panduan</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Semua yang perlu Anda ketahui tentang AC - dari cara memilih yang tepat, menghitung kebutuhan, menghemat energi, hingga merawatnya agar awet bertahun-tahun.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Solution cards */}
      <section className="section-container">
        <SectionHeading
          title="Panduan Lengkap untuk Anda"
          subtitle="Daikin tidak hanya menjual AC - kami memastikan Anda memiliki semua pengetahuan untuk membuat keputusan terbaik dan mendapatkan manfaat maksimal dari produk Anda."
        />
        <FadeInUp stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => {
            const Icon = sol.icon
            return (
              <FadeInItem key={sol.path}>
                <Link to={sol.path} className="block group h-full">
                  <div className="floating-card overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                    <div className={`h-44 bg-gradient-to-br ${sol.gradient} relative overflow-hidden flex-shrink-0`}>
                      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 25% 45%, white, transparent 55%)' }} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white/85 uppercase tracking-wider">{sol.tag}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-charcoal group-hover:text-daikin-blue transition-colors mb-2">{sol.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">{sol.desc}</p>
                      <div className="flex items-center gap-1 text-daikin-blue text-sm font-semibold mt-4">
                        Baca Panduan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInItem>
            )
          })}
        </FadeInUp>
      </section>

      {/* Quick facts */}
      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading
            title="Fakta Penting yang Perlu Anda Tahu"
            subtitle="Keputusan yang baik dimulai dari informasi yang benar. Inilah beberapa fakta kunci seputar AC dan kualitas udara."
            centered
          />
          <FadeInUp stagger className="grid md:grid-cols-3 gap-6">
            {quickFacts.map((fact) => {
              const Icon = fact.icon
              return (
                <FadeInItem key={fact.title}>
                  <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow h-full">
                    <div className="w-12 h-12 rounded-xl bg-daikin-blue-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-daikin-blue" />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">{fact.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{fact.desc}</p>
                  </div>
                </FadeInItem>
              )
            })}
          </FadeInUp>
        </div>
      </section>

      {/* Featured guide */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Mulai dari Mana?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jika ini pertama kali Anda membeli AC, mulailah dengan panduan "Cara Memilih AC" untuk memahami dasar-dasarnya - tipe unit, kapasitas, dan fitur yang relevan.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sudah tahu tipe yang diinginkan? Gunakan Kalkulator AC kami untuk menentukan kapasitas PK yang tepat berdasarkan dimensi dan kondisi ruangan Anda. Hasilnya akurat dalam 30 detik.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Untuk yang sudah memiliki unit, panduan Efisiensi Energi dan Tips Perawatan akan membantu Anda menghemat tagihan listrik dan memperpanjang usia AC.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/solutions/how-to-choose" className="btn-primary inline-flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Panduan Memilih AC
              </Link>
              <Link to="/solutions/ac-calculator" className="btn-secondary inline-flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Kalkulator AC
              </Link>
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-daikin-blue via-sky-500 to-cyan-400 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 50%)' }} />
                <div className="absolute bottom-4 left-5">
                  <span className="text-white font-bold text-lg">Kalkulator AC Online</span>
                  <p className="text-white/70 text-sm">Hitung Kebutuhan PK dalam 30 Detik</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-emerald-500 to-green-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Efisiensi Energi</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-teal-500 to-cyan-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Kualitas Udara</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </section>

      <PichonKunHelper message="Hai! Butuh bantuan memilih AC? Coba Kalkulator AC Daikin untuk menemukan kapasitas yang tepat buat ruanganmu!" />
    </PageTransition>
  )
}
