import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import StatCounter from '@/components/sections/StatCounter'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

const globalStats = [
  { value: 1924, suffix: '', label: 'Tahun Berdiri' },
  { value: 160, suffix: '+', label: 'Negara Beroperasi' },
  { value: 98000, suffix: '+', label: 'Karyawan Global' },
  { value: 30, suffix: 'T+', prefix: 'Rp', label: 'Pendapatan Global/Tahun' },
]

const subsidiaries = [
  { region: 'Asia Pasifik', country: 'Jepang, China, India, Australia, ASEAN', role: 'Produksi & Riset' },
  { region: 'Eropa', country: 'Belgia, Jerman, Italia, Spanyol', role: 'Distribusi & Inovasi' },
  { region: 'Amerika', country: 'Amerika Serikat, Kanada, Brasil', role: 'Pasar & Layanan' },
  { region: 'Timur Tengah & Afrika', country: '20+ Negara', role: 'Distribusi Regional' },
]

export default function DaikinGroup() {
  return (
    <PageTransition>
      <PageMeta title="Daikin Group Global" canonical="/profile/daikin-group" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Daikin Group' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Daikin Group Global</h1>
            <p className="text-white/80 text-xl max-w-2xl">Daikin Industries, Ltd. - pemimpin industri HVAC-R global yang berdiri sejak 1924 di Osaka, Jepang.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Tentang Daikin Industries</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Daikin Industries, Ltd. adalah perusahaan multinasional Jepang yang merupakan produsen peralatan pendingin udara (AC) terbesar di dunia berdasarkan volume penjualan. Berdiri pada 1924 di Osaka, Jepang, Daikin telah berkembang menjadi perusahaan global dengan kehadiran di lebih dari 160 negara.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Daikin adalah satu-satunya perusahaan di industri HVAC-R yang memiliki kompetensi penuh dalam pengembangan refrigeran, kompressor, elektronik, dan sistem kontrol secara in-house, memberikan keunggulan inovasi yang tidak tertandingi.
            </p>
          </FadeInLeft>
          <FadeInRight>
            <div className="bg-daikin-blue-50 rounded-card h-80 flex items-center justify-center">
              <img src="/images/hero/global-map.svg" alt="Daikin Global" className="w-full h-full object-cover rounded-card" loading="lazy" width={600} height={320} />
            </div>
          </FadeInRight>
        </div>
      </section>

      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading title="Daikin Group dalam Angka" centered />
          <StatCounter stats={globalStats} />
        </div>
      </section>

      <section className="section-container">
        <SectionHeading title="Jaringan Global" subtitle="Daikin beroperasi di seluruh penjuru dunia dengan anak perusahaan dan mitra lokal." />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subsidiaries.map((sub) => (
            <FadeInItem key={sub.region}>
              <div className="floating-card p-6 hover:shadow-card-hover transition-shadow">
                <h3 className="font-bold text-charcoal mb-2">{sub.region}</h3>
                <p className="text-sm text-gray-500 mb-3">{sub.country}</p>
                <span className="inline-block px-2.5 py-0.5 bg-daikin-blue-50 text-daikin-blue text-xs font-semibold rounded-full">{sub.role}</span>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>
    </PageTransition>
  )
}
