import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'

const stories = [
  { name: 'Budi & Keluarga', location: 'Jakarta Selatan', quote: '"Sejak pasang Daikin dengan Streamer Technology, alergi anak saya jauh berkurang. Udara di rumah terasa lebih segar dan bersih."', product: 'Smile Series 1 PK Inverter' },
  { name: 'Rini Wijaya', location: 'Surabaya', quote: '"Tagihan listrik turun 40% setelah ganti ke AC inverter Daikin. Pendinginnya juga lebih merata dan tidak berisik."', product: 'Aurora Series 1.5 PK Inverter' },
  { name: 'PT Maju Jaya', location: 'Bandung', quote: '"Sistem VRV Daikin di kantor kami sangat andal. Kontrol per ruangan memudahkan manajemen energi gedung secara keseluruhan."', product: 'VRV IV System' },
  { name: 'Hotel Bintang Lima', location: 'Bali', quote: '"Daikin menjadi pilihan utama kami karena keandalan, efisiensi, dan layanan purna jual yang luar biasa di seluruh Indonesia."', product: 'Sky Air Commercial' },
]

export default function PerfectingAirStories() {
  return (
    <PageTransition>
      <PageMeta title="Perfecting The Air Stories" canonical="/campaign/perfecting-air" />

      <div className="bg-gradient-to-br from-daikin-blue to-daikin-blue-dark pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Campaign', path: '/campaign' }, { label: 'Perfecting The Air Stories' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Perfecting The Air Stories</h1>
            <p className="text-white/80 text-xl max-w-2xl">Kisah nyata dari pelanggan yang merasakan perbedaan udara sempurna bersama Daikin.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Kisah Pelanggan Kami" subtitle="Kepercayaan jutaan pelanggan adalah bukti nyata komitmen Daikin." />
        <FadeInUp stagger className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <FadeInItem key={story.name}>
              <div className="floating-card p-6">
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6">{story.quote}</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-daikin-blue-50 flex items-center justify-center text-daikin-blue font-bold">
                    {story.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-charcoal">{story.name}</div>
                    <div className="text-sm text-gray-500">{story.location}</div>
                    <div className="text-xs text-daikin-blue font-medium mt-0.5">{story.product}</div>
                  </div>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>
    </PageTransition>
  )
}
