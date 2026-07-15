import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import PichonKunHelper from '@/components/sections/PichonKunHelper'

const pollutants = [
  { name: 'PM2.5', source: 'Asap, debu halus', effect: 'Penyakit pernapasan, kardiovaskular', solution: 'Filter HEPA + Streamer' },
  { name: 'VOC', source: 'Cat, perabot baru', effect: 'Sakit kepala, iritasi mata', solution: 'Streamer Technology' },
  { name: 'Jamur & Bakteri', source: 'Kelembaban tinggi', effect: 'Alergi, infeksi pernapasan', solution: 'Auto-clean + Streamer' },
  { name: 'Virus', source: 'Udara dari orang sakit', effect: 'Penularan penyakit', solution: 'Streamer 99.9% efektif' },
]

export default function IndoorAirQuality() {
  return (
    <PageTransition>
      <PageMeta title="Kualitas Udara Dalam Ruangan" canonical="/solutions/air-quality" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Solusi', path: '/solutions' }, { label: 'Kualitas Udara' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kualitas Udara Dalam Ruangan</h1>
            <p className="text-white/80 text-xl max-w-2xl">Udara dalam ruangan bisa 5x lebih tercemar dari udara luar. Ketahui cara melindungi keluarga Anda.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Polutan Udara Dalam Ruangan" subtitle="Kenali ancaman kualitas udara yang tidak terlihat dan cara mengatasinya." />
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-daikin-blue text-white">
                <th className="px-4 py-3 text-left rounded-tl-xl">Polutan</th>
                <th className="px-4 py-3 text-left">Sumber</th>
                <th className="px-4 py-3 text-left">Dampak Kesehatan</th>
                <th className="px-4 py-3 text-left rounded-tr-xl">Solusi Daikin</th>
              </tr>
            </thead>
            <tbody>
              {pollutants.map((p, i) => (
                <tr key={p.name} className={i % 2 === 0 ? 'bg-white' : 'bg-soft-gray'}>
                  <td className="px-4 py-3 font-semibold text-charcoal">{p.name}</td>
                  <td className="px-4 py-3 text-gray-600">{p.source}</td>
                  <td className="px-4 py-3 text-gray-600">{p.effect}</td>
                  <td className="px-4 py-3 text-daikin-blue font-medium">{p.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading title="Solusi Daikin untuk Udara Bersih" centered />
        <FadeInUp stagger className="grid sm:grid-cols-3 gap-6">
          {[
            { title: 'Streamer Technology', desc: 'Aktif membunuh 99.9% virus, bakteri, dan mendekonstruksi VOC secara terus-menerus.' },
            { title: 'Filter PM2.5', desc: 'Filter presisi tinggi yang menangkap partikel berbahaya berukuran 2.5 mikron atau lebih kecil.' },
            { title: 'Self-Cleaning', desc: 'Sistem pembersihan otomatis mencegah pertumbuhan jamur dan bakteri di dalam unit.' },
          ].map((sol) => (
            <FadeInItem key={sol.title}>
              <div className="floating-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-daikin-blue flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-bold text-charcoal mb-2">{sol.title}</h3>
                <p className="text-sm text-gray-600">{sol.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>

      <PichonKunHelper message="Udara bersih itu penting! AC Daikin dengan Streamer Technology aktif membersihkan udara 24 jam. 🌬️" variant="help" />
    </PageTransition>
  )
}
