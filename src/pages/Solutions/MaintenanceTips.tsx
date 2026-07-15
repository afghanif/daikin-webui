import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import PichonKunHelper from '@/components/sections/PichonKunHelper'

const schedule = [
  { freq: 'Setiap 2 Minggu', tasks: ['Bersihkan filter udara', 'Lap permukaan unit indoor', 'Cek remote control'] },
  { freq: 'Setiap 3 Bulan', tasks: ['Cuci evaporator (Indoor coil)', 'Periksa kondisi freon', 'Bersihkan saluran drainase'] },
  { freq: 'Setiap 6 Bulan', tasks: ['Cuci kondensor (Outdoor unit)', 'Cek semua sambungan pipa', 'Uji performa pendinginan'] },
  { freq: 'Setiap Tahun', tasks: ['Service menyeluruh oleh teknisi', 'Pengecekan sistem kelistrikan', 'Evaluasi kondisi kompressor'] },
]

export default function MaintenanceTips() {
  return (
    <PageTransition>
      <PageMeta title="Tips Perawatan AC" canonical="/solutions/maintenance-tips" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Solusi', path: '/solutions' }, { label: 'Tips Perawatan' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tips Perawatan AC</h1>
            <p className="text-white/80 text-xl max-w-2xl">AC yang terawat hemat energi lebih optimal, lebih awet, dan memberikan kualitas udara terbaik.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Jadwal Perawatan" subtitle="Ikuti jadwal perawatan ini untuk menjaga AC Anda selalu dalam kondisi prima." />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {schedule.map((s, i) => (
            <FadeInItem key={i}>
              <div className="floating-card p-5 h-full">
                <div className="text-xs font-bold text-daikin-blue uppercase tracking-wide mb-3 pb-2 border-b border-daikin-blue-100">{s.freq}</div>
                <ul className="space-y-2">
                  {s.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-daikin-blue mt-1.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>

        <div className="bg-daikin-blue-50 rounded-card p-8 text-center">
          <h3 className="text-xl font-bold text-charcoal mb-3">Jadwalkan Service Profesional</h3>
          <p className="text-gray-600 mb-5">Biarkan teknisi bersertifikat Daikin merawat AC Anda secara menyeluruh untuk hasil terbaik.</p>
          <a href="/services/maintenance" className="btn-primary inline-flex">Pesan Service Sekarang</a>
        </div>
      </section>

      <PichonKunHelper message="Ingat! Filter kotor bikin boros listrik. Bersihkan setiap 2 minggu ya! 🔧" variant="help" />
    </PageTransition>
  )
}
