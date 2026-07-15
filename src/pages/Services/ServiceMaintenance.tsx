import { Wrench, Calendar, Clock, Star } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'

const packages = [
  { icon: Star, name: 'Paket Basic', price: 'Rp 150.000', desc: 'Pembersihan filter, cek freon, pengujian performa dasar.', features: ['Pembersihan filter', 'Cek kondisi freon', 'Uji dingin'], recommended: false },
  { icon: Star, name: 'Paket Premium', price: 'Rp 350.000', desc: 'Cuci AC lengkap, isi freon, pemasangan bracket, dan laporan kondisi unit.', features: ['Cuci AC menyeluruh', 'Isi freon (1x)', 'Cek semua komponen', 'Laporan kondisi unit', 'Garansi 30 hari'], recommended: true },
  { icon: Star, name: 'Paket Annual', price: 'Rp 800.000/tahun', desc: '3x service dalam setahun, prioritas booking, dan diskon 20% spare parts.', features: ['3x service/tahun', 'Prioritas booking', 'Diskon 20% spare parts', 'Konsultasi teknis'], recommended: false },
]

export default function ServiceMaintenance() {
  return (
    <PageTransition>
      <PageMeta title="Service & Maintenance" canonical="/services/maintenance" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Layanan', path: '/services' }, { label: 'Service & Maintenance' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Service & Maintenance</h1>
            <p className="text-white/80 text-xl max-w-2xl">Layanan perawatan rutin dan perbaikan oleh teknisi bersertifikat Daikin untuk menjaga performa optimal AC Anda.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{ icon: Wrench, title: 'Teknisi Bersertifikat', desc: 'Semua teknisi Daikin telah menjalani pelatihan dan sertifikasi resmi.' },
            { icon: Calendar, title: 'Booking Mudah', desc: 'Jadwalkan servis via telpon, WhatsApp, atau aplikasi Daikin.' },
            { icon: Clock, title: 'Tepat Waktu', desc: 'Kami menghargai waktu Anda dengan layanan tepat waktu sesuai jadwal.' }].map((item) => {
            const Icon = item.icon
            return (
              <FadeInUp key={item.title}>
                <div className="floating-card p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-daikin-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-daikin-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </FadeInUp>
            )
          })}
        </div>

        <SectionHeading title="Paket Service" subtitle="Pilih paket yang sesuai kebutuhan Anda." centered />
        <FadeInUp stagger className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <FadeInItem key={pkg.name}>
              <div className={`rounded-card p-6 h-full flex flex-col ${pkg.recommended ? 'bg-daikin-blue text-white shadow-card-hover ring-4 ring-daikin-blue-light' : 'bg-white shadow-card'}`}>
                {pkg.recommended && (
                  <div className="inline-block px-3 py-1 bg-white text-daikin-blue text-xs font-bold rounded-full mb-4 self-start">Direkomendasikan</div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${pkg.recommended ? 'text-white' : 'text-charcoal'}`}>{pkg.name}</h3>
                <p className={`text-2xl font-bold mb-3 ${pkg.recommended ? 'text-white' : 'text-daikin-blue'}`}>{pkg.price}</p>
                <p className={`text-sm mb-4 ${pkg.recommended ? 'text-white/80' : 'text-gray-500'}`}>{pkg.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${pkg.recommended ? 'text-white/90' : 'text-gray-700'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${pkg.recommended ? 'text-white' : 'text-daikin-blue'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`py-2.5 rounded-btn font-semibold text-sm transition-all ${pkg.recommended ? 'bg-white text-daikin-blue hover:bg-daikin-blue-50' : 'bg-daikin-blue text-white hover:bg-daikin-blue-dark'}`}>
                  Pesan Sekarang
                </button>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>
    </PageTransition>
  )
}
