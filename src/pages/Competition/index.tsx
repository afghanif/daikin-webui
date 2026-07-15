import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import FadeInUp from '@/components/animations/FadeInUp'
import WaveBackground from '@/components/animations/WaveBackground'

export default function Competition() {
  return (
    <PageTransition>
      <PageMeta title="Kompetisi Daikin" canonical="/competition" />

      <div className="relative min-h-screen bg-gradient-to-br from-daikin-blue to-daikin-blue-dark flex items-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-32 text-center relative z-10">
          <FadeInUp>
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Kompetisi Daikin</h1>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Ikuti kompetisi bergengsi Daikin dan tunjukkan keahlian Anda! Informasi kompetisi berikutnya akan segera diumumkan.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium">
              Segera Hadir - Stay Tuned!
            </div>
          </FadeInUp>
        </div>
        <WaveBackground inverted />
      </div>
    </PageTransition>
  )
}
