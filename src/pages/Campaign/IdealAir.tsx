import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import WaveBackground from '@/components/animations/WaveBackground'
import FadeInUp from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

export default function IdealAir() {
  return (
    <PageTransition>
      <PageMeta title="The Ideal Air" canonical="/campaign/ideal-air" />

      <div className="relative min-h-[60vh] bg-gradient-to-br from-daikin-blue via-daikin-blue to-daikin-blue-dark flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-36 pb-36 relative z-10">
          <Breadcrumb items={[{ label: 'Campaign', path: '/campaign' }, { label: 'The Ideal Air' }]} className="text-white mb-8" />
          <FadeInUp>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">The<br />Ideal Air</h1>
            <p className="text-white/80 text-xl max-w-xl">Udara yang sempurna bukan sekadar dingin. Ini tentang kesehatan, kesegaran, dan keseimbangan yang kita rasakan setiap napas.</p>
          </FadeInUp>
        </div>
        <WaveBackground />
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Apa Itu Udara Ideal?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Udara ideal bukan hanya soal suhu. Ini mencakup tingkat kelembaban yang tepat, bebas dari partikel berbahaya, dengan aroma segar yang menenangkan - kondisi yang memungkinkan Anda dan keluarga bernapas dengan bebas.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Daikin memahami bahwa setiap orang memiliki definisi kenyamanan yang berbeda. Itulah mengapa kami menghadirkan teknologi yang dapat disesuaikan dengan kebutuhan unik setiap ruangan dan penggunanya.
            </p>
          </FadeInLeft>
          <FadeInRight>
            <div className="bg-daikin-blue-50 rounded-card h-96 flex items-center justify-center text-daikin-blue text-xl font-bold">
              Campaign Visual
            </div>
          </FadeInRight>
        </div>
      </section>
    </PageTransition>
  )
}
