import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'

const awards = [
  { year: '2026', name: 'Energy Efficiency Award', org: 'Kementerian ESDM RI', category: 'AC Inverter Terbaik' },
  { year: '2025', name: 'Top Brand Award', org: 'Frontier Research', category: 'Kategori AC' },
  { year: '2025', name: 'Best After Sales Service', org: 'Indonesia Service Quality Award', category: 'Industri AC' },
  { year: '2024', name: 'Green Industry Award', org: 'Kementerian Perindustrian RI', category: 'Efisiensi Energi' },
  { year: '2024', name: 'SNI Award', org: 'BSN Indonesia', category: 'Kesesuaian Standar Nasional' },
  { year: '2023', name: 'MURI Record', org: 'Museum Rekor Indonesia', category: 'Penjualan AC Terbanyak' },
  { year: '2023', name: 'Customer Choice Award', org: 'SWA Magazine', category: 'Merek AC Pilihan Konsumen' },
  { year: '2022', name: 'Environmental Innovation Award', org: 'KLHK', category: 'Produk Ramah Lingkungan' },
]

export default function AwardsCertifications() {
  return (
    <PageTransition>
      <PageMeta title="Penghargaan & Sertifikasi" canonical="/profile/awards" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Penghargaan & Sertifikasi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Penghargaan & Sertifikasi</h1>
            <p className="text-white/80 text-xl max-w-2xl">Pengakuan atas komitmen Daikin terhadap inovasi, kualitas, dan keberlanjutan.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Penghargaan Bergengsi" subtitle="Lebih dari 50 penghargaan nasional dan internasional yang mencerminkan keunggulan produk dan layanan Daikin." />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {awards.map((award) => (
            <FadeInItem key={`${award.year}-${award.name}`}>
              <div className="floating-card p-5 hover:shadow-card-hover transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-daikin-blue">{award.year}</span>
                  <div className="w-10 h-10 rounded-full bg-daikin-blue-50 flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                </div>
                <h3 className="font-bold text-charcoal mb-1 text-sm leading-snug">{award.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{award.org}</p>
                <span className="inline-block px-2 py-0.5 bg-daikin-blue-50 text-daikin-blue text-xs font-medium rounded-full">
                  {award.category}
                </span>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>

      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading title="Sertifikasi Produk" subtitle="Semua produk Daikin tersertifikasi sesuai standar nasional dan internasional." centered />
          <FadeInUp stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['SNI', 'ISO 9001', 'ISO 14001', 'ENERGY STAR'].map((cert) => (
              <FadeInItem key={cert}>
                <div className="bg-white rounded-card p-6 shadow-card">
                  <div className="w-16 h-16 rounded-full bg-daikin-blue-50 flex items-center justify-center mx-auto mb-3">
                    <span className="text-daikin-blue font-bold text-xs text-center leading-tight">{cert}</span>
                  </div>
                  <p className="text-sm font-medium text-charcoal">{cert}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
