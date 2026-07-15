import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import StatCounter from '@/components/sections/StatCounter'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { getNewsByCategory } from '@/data/news'
import NewsCard from '@/components/sections/NewsCard'

const csrStats = [
  { value: 10000, suffix: '+', label: 'Pohon Ditanam' },
  { value: 5000, suffix: '+', label: 'Siswa Dibantu' },
  { value: 100, suffix: '+', label: 'Komunitas Terlibat' },
  { value: 15, suffix: 'M+', prefix: 'Rp', label: 'Dana CSR/Tahun' },
]

const programs = [
  { title: 'Daikin Green Earth', desc: 'Program penanaman pohon dan restorasi ekosistem pesisir di seluruh Indonesia.', icon: '🌱' },
  { title: 'Daikin Smart School', desc: 'Donasi AC dan fasilitas pendingin untuk sekolah di daerah terpencil.', icon: '🏫' },
  { title: 'Daikin Bersama', desc: 'Program pemberdayaan masyarakat dan pelatihan teknisi di daerah tertinggal.', icon: '🤝' },
  { title: 'Daikin Zero Carbon', desc: 'Inisiatif pengurangan emisi karbon di fasilitas produksi dan distribusi.', icon: '🌍' },
]

export default function DaikinImpact() {
  const csrNews = getNewsByCategory('csr')

  return (
    <PageTransition>
      <PageMeta title="Daikin Impact - CSR" canonical="/insights/csr" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Insights', path: '/insights' }, { label: 'Daikin Impact' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Daikin Impact</h1>
            <p className="text-white/80 text-xl max-w-2xl">Program CSR Daikin Indonesia - berkontribusi untuk lingkungan, pendidikan, dan komunitas yang lebih baik.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading title="Dampak yang Kami Ciptakan" centered />
          <StatCounter stats={csrStats} />
        </div>
      </section>

      <section className="section-container">
        <SectionHeading title="Program CSR" />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {programs.map((prog) => (
            <FadeInItem key={prog.title}>
              <div className="floating-card p-6 text-center">
                <div className="text-4xl mb-3">{prog.icon}</div>
                <h3 className="font-bold text-charcoal mb-2">{prog.title}</h3>
                <p className="text-sm text-gray-600">{prog.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>

        {csrNews.length > 0 && (
          <>
            <SectionHeading title="Berita CSR Terbaru" />
            <div className="grid md:grid-cols-3 gap-6">
              {csrNews.map((a) => <NewsCard key={a.id} article={a} />)}
            </div>
          </>
        )}
      </section>
    </PageTransition>
  )
}
