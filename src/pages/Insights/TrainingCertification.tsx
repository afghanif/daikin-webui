import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { getNewsByCategory } from '@/data/news'
import NewsCard from '@/components/sections/NewsCard'

const programs = [
  { title: 'Sertifikasi Teknisi Level 1', duration: '3 Hari', desc: 'Dasar instalasi, perawatan, dan troubleshooting AC Daikin residential.', badge: 'Terbuka' },
  { title: 'Sertifikasi Teknisi Level 2', duration: '5 Hari', desc: 'Lanjutan untuk teknisi berpengalaman - sistem VRV, central AC, dan diagnostik lanjutan.', badge: 'Terbuka' },
  { title: 'Training Dealer / Sales', duration: '2 Hari', desc: 'Product knowledge, teknik penjualan, dan simulasi konsultasi pelanggan.', badge: 'Terbuka' },
  { title: 'Training Manajer Proyek', duration: '4 Hari', desc: 'Manajemen proyek HVAC, estimasi, spesifikasi, dan regulasi.', badge: 'Terbatas' },
]

export default function TrainingCertification() {
  const trainingNews = getNewsByCategory('training')

  return (
    <PageTransition>
      <PageMeta title="Training & Sertifikasi" canonical="/insights/training" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Insights', path: '/insights' }, { label: 'Training & Sertifikasi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Training & Sertifikasi</h1>
            <p className="text-white/80 text-xl max-w-2xl">Tingkatkan kompetensi dengan program pelatihan dan sertifikasi resmi Daikin Indonesia.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Program Pelatihan" subtitle="Semua program diselenggarakan di Daikin Training Center dengan instruktur bersertifikat internasional." />
        <FadeInUp stagger className="grid md:grid-cols-2 gap-6 mb-16">
          {programs.map((prog) => (
            <FadeInItem key={prog.title}>
              <div className="floating-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-charcoal">{prog.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${prog.badge === 'Terbuka' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{prog.badge}</span>
                </div>
                <div className="text-sm text-daikin-blue font-medium mb-2">Durasi: {prog.duration}</div>
                <p className="text-sm text-gray-600 mb-4">{prog.desc}</p>
                <button className="btn-primary text-sm py-2">Daftar Sekarang</button>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>

        {trainingNews.length > 0 && (
          <>
            <SectionHeading title="Info Training Terbaru" />
            <div className="grid md:grid-cols-3 gap-6">
              {trainingNews.map((a) => <NewsCard key={a.id} article={a} />)}
            </div>
          </>
        )}
      </section>
    </PageTransition>
  )
}
