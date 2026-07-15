import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import PichonKunHelper from '@/components/sections/PichonKunHelper'

const tips = [
  { title: 'Set Suhu 24-26°C', desc: 'Setiap 1°C lebih rendah meningkatkan konsumsi energi ~6%. Suhu 24-26°C sudah nyaman dan efisien.' },
  { title: 'Gunakan Mode Auto/Sleep', desc: 'Mode Sleep secara otomatis menyesuaikan suhu saat tidur, menghemat energi hingga 25%.' },
  { title: 'Bersihkan Filter Rutin', desc: 'Filter kotor meningkatkan beban kerja kompressor. Bersihkan setiap 2-4 minggu.' },
  { title: 'Tutup Pintu & Jendela', desc: 'Minimalkan masuknya udara panas dari luar untuk efisiensi pendinginan optimal.' },
  { title: 'Manfaatkan Timer', desc: 'Jadwalkan AC mati 30 menit sebelum bangun tidur - ruangan masih dingin, listrik hemat.' },
  { title: 'Periksa Kondisi Freon', desc: 'Freon yang habis membuat AC bekerja keras tanpa hasil. Cek setiap 2 tahun.' },
]

export default function EnergyEfficiency() {
  return (
    <PageTransition>
      <PageMeta title="Panduan Efisiensi Energi & Inverter" canonical="/solutions/energy-efficiency" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Solusi', path: '/solutions' }, { label: 'Efisiensi Energi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panduan Efisiensi Energi & Inverter</h1>
            <p className="text-white/80 text-xl max-w-2xl">Maksimalkan penghematan listrik dengan memahami teknologi inverter dan kebiasaan penggunaan yang tepat.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <FadeInUp>
            <div className="accent-line" />
            <h2 className="section-heading">Inverter vs Non-Inverter</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AC inverter mengatur kecepatan kompressor secara dinamis sesuai kebutuhan pendinginan. Saat ruangan sudah dingin, kompressor bekerja lambat - tidak mati-nyala seperti AC konvensional.
            </p>
            <div className="space-y-3">
              {[
                ['Hemat energi', '60% lebih hemat vs non-inverter'],
                ['Pendinginan cepat', '25% lebih cepat mencapai suhu set-point'],
                ['Lebih senyap', 'Kompressor tidak berputar penuh terus-menerus'],
                ['Umur lebih panjang', 'Tanpa on-off berulang yang merusak kompressor'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-soft-gray-2">
                  <span className="text-sm font-medium text-charcoal">{key}</span>
                  <span className="text-sm text-daikin-blue font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-daikin-blue rounded-card p-8 text-white h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Estimasi Penghematan</h3>
              <div className="space-y-4">
                {[
                  { label: 'AC Non-Inverter 1 PK', kwh: '900 kWh/bulan' },
                  { label: 'AC Inverter 1 PK', kwh: '360 kWh/bulan' },
                  { label: 'Penghematan', kwh: '540 kWh/bulan' },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between p-3 rounded-xl ${i === 2 ? 'bg-white/20 font-bold' : 'bg-white/10'}`}>
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm font-semibold">{item.kwh}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60 mt-4">*Estimasi penggunaan 8 jam/hari pada tarif R1/2200VA</p>
            </div>
          </FadeInUp>
        </div>

        <SectionHeading title="6 Tips Hemat Listrik" />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tips.map((tip, i) => (
            <FadeInItem key={i}>
              <div className="floating-card p-5">
                <div className="w-8 h-8 rounded-lg bg-daikin-blue flex items-center justify-center text-white font-bold text-sm mb-3">{i + 1}</div>
                <h3 className="font-bold text-charcoal mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>

      <PichonKunHelper message="Dengan AC inverter Daikin, tagihan listrikmu bisa lebih hemat hingga 60%! 💡" />
    </PageTransition>
  )
}
