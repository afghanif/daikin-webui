import { Link } from 'react-router-dom'
import { Home, Building2, Package, Settings, BookOpen, ArrowRight, Zap, Wind, Cpu } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

const categories = [
  {
    icon: Home, title: 'Residential Solutions', subtitle: 'Hunian', path: '/products/residential',
    desc: 'AC inverter dan standar untuk semua ukuran ruangan. Dilengkapi Streamer Technology, Smart Control, dan mode hemat energi otomatis - kenyamanan hunian yang sesungguhnya.',
    count: '20+ Model', gradient: 'from-sky-400 to-daikin-blue',
  },
  {
    icon: Building2, title: 'Commercial Solutions', subtitle: 'Komersial', path: '/products/commercial',
    desc: 'Sistem VRV, Sky Air, dan Cassette untuk gedung perkantoran, hotel, mall, dan fasilitas industri. Efisiensi tinggi dengan fleksibilitas instalasi maksimal.',
    count: '15+ Model', gradient: 'from-slate-700 to-daikin-blue-dark',
  },
  {
    icon: Package, title: 'Accessories', subtitle: 'Aksesori', path: '/products/accessories',
    desc: 'Wifi adapter, remote control pintar, bracket premium, dan aksesori resmi yang menyempurnakan ekosistem AC Daikin Anda untuk kontrol lebih mudah.',
    count: '10+ Item', gradient: 'from-emerald-500 to-teal-700',
  },
  {
    icon: Settings, title: 'Spare Parts', subtitle: 'Suku Cadang', path: '/products/spare-parts',
    desc: 'Suku cadang 100% orisinal Daikin untuk menjaga performa optimal dan memperpanjang usia unit AC Anda. Tersedia di semua cabang dan service center resmi.',
    count: '100+ SKU', gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: BookOpen, title: 'E-Catalogue', subtitle: 'Katalog Digital', path: '/products/e-catalogue',
    desc: 'Spesifikasi teknis lengkap, panduan pemilihan, dan referensi produk terbaru Daikin Indonesia tersedia dalam format PDF yang mudah diunduh dan dibagikan.',
    count: '5 Katalog', gradient: 'from-violet-500 to-purple-700',
  },
]

const techFeatures = [
  {
    icon: Zap, title: 'Inverter Technology',
    desc: 'Kompressor variabel Daikin menyesuaikan kapasitas pendinginan secara dinamis - hemat energi hingga 60% dibanding AC konvensional sambil menjaga suhu tetap stabil.',
  },
  {
    icon: Wind, title: 'Streamer Technology',
    desc: 'Teknologi plasma non-termal eksklusif Daikin yang secara aktif menetralisir virus, bakteri, alergen, jamur, dan senyawa kimia berbahaya di udara ruangan Anda.',
  },
  {
    icon: Cpu, title: 'Smart Control',
    desc: 'Ekosistem IoT Daikin - kontrol penuh via smartphone, penjadwalan otomatis, integrasi smart home, dan pemantauan konsumsi energi real-time dari mana saja.',
  },
]

export default function ProductsIndex() {
  return (
    <PageTransition>
      <PageMeta
        title="Produk Daikin Indonesia"
        description="Temukan rangkaian produk AC Daikin - dari solusi hunian hingga komersial. Lebih dari 100 model dengan teknologi Inverter, Streamer, dan Smart Control."
        canonical="/products"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Produk' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Produk Daikin</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Lebih dari 100 model untuk setiap kebutuhan - dari hunian pribadi hingga gedung komersial berskala besar, semua dirancang dengan standar kualitas global Daikin.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Category cards with gradient thumbnails */}
      <section className="section-container">
        <SectionHeading
          title="Kategori Produk"
          subtitle="Daikin menyediakan solusi pendingin udara lengkap untuk setiap segmen - dari keluarga yang mendambakan udara bersih di rumah hingga pengelola gedung yang membutuhkan sistem HVAC-R terintegrasi."
        />
        <FadeInUp stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
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
                        <span className="text-xs font-bold text-white/85 uppercase tracking-wider">{cat.subtitle}</span>
                      </div>
                      <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-charcoal group-hover:text-daikin-blue transition-colors mb-2">{cat.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">{cat.desc}</p>
                      <div className="flex items-center gap-1 text-daikin-blue text-sm font-semibold mt-4">
                        Lihat Produk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInItem>
            )
          })}
        </FadeInUp>
      </section>

      {/* Tech features */}
      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading
            title="Teknologi di Setiap Produk Daikin"
            subtitle="Bukan sekadar AC biasa - setiap produk Daikin mengintegrasikan teknologi eksklusif yang memberikan keunggulan nyata dalam kenyamanan, efisiensi energi, dan kualitas udara."
            centered
          />
          <FadeInUp stagger className="grid md:grid-cols-3 gap-6">
            {techFeatures.map((f) => {
              const Icon = f.icon
              return (
                <FadeInItem key={f.title}>
                  <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow h-full">
                    <div className="w-12 h-12 rounded-xl bg-daikin-blue-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-daikin-blue" />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </FadeInItem>
              )
            })}
          </FadeInUp>
        </div>
      </section>

      {/* Why choose Daikin */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Mengapa Memilih Produk Daikin?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Daikin adalah satu-satunya produsen AC di dunia yang menguasai penuh rantai inovasi - dari pengembangan refrigeran, kompressor, hingga sistem kontrol elektronik secara in-house. Keunggulan vertikal ini menghasilkan produk dengan efisiensi dan keandalan yang tidak tertandingi.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Setiap unit yang kami produksi melewati ratusan tahap pengujian ketat sesuai standar global JIS, ISO 9001, dan SNI Indonesia - memastikan bahwa produk yang tiba di rumah Anda adalah yang terbaik yang bisa kami hadirkan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Garansi Kompressor', value: '5 Tahun' },
                { label: 'Hemat Energi', value: 'Hingga 60%' },
                { label: 'Model Tersedia', value: '100+ Model' },
                { label: 'Beroperasi di Indonesia', value: '50+ Tahun' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-soft-gray rounded-xl p-4">
                  <div className="text-xl font-bold text-daikin-blue">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-daikin-blue via-sky-500 to-cyan-400 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 50%)' }} />
                <div className="absolute bottom-4 left-5">
                  <span className="text-white font-bold text-lg">Residential Line</span>
                  <p className="text-white/70 text-sm">AC Hunian Daikin Series</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-slate-700 to-daikin-blue-dark relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">VRV System</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-emerald-600 to-teal-800 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Sky Air</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* CTA row */}
      <section className="section-bg-light">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-6">
            <FadeInUp>
              <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue rounded-2xl p-8 text-white h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2">Tidak Yaitu Produk Mana yang Tepat?</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-6 flex-1">
                  Gunakan kalkulator AC kami untuk menghitung kapasitas PK yang Anda butuhkan, atau konsultasikan langsung dengan ahli Daikin di iShop dan ProShop terdekat.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/solutions/ac-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-daikin-blue rounded-lg text-sm font-bold hover:bg-white/90 transition-colors">
                    Kalkulator AC
                  </Link>
                  <span className="text-sm font-semibold text-white/80 flex items-center gap-1.5 pointer-events-none cursor-default">
                    Temukan Dealer <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 h-full flex flex-col">
                <h3 className="text-xl font-bold text-charcoal mb-2">Unduh E-Catalogue Terbaru</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  Dapatkan spesifikasi teknis lengkap, panduan pemilihan model, dan informasi terbaru semua produk Daikin Indonesia dalam format PDF.
                </p>
                <Link to="/products/e-catalogue" className="btn-primary inline-flex items-center gap-2 self-start">
                  <BookOpen className="w-4 h-4" /> Lihat E-Catalogue
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
