import { motion } from 'framer-motion'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'

const capabilities = [
  { stat: '99.9%', label: 'Virus & Bakteri', desc: 'Termasuk Influenza, COVID-19, dan patogen berbahaya lainnya' },
  { stat: '99.6%', label: 'Spora Jamur', desc: 'Eliminasi efektif terhadap spora jamur yang menyebabkan alergi' },
  { stat: '99.3%', label: 'Alergen', desc: 'Tungau debu, bulu hewan peliharaan, dan serbuk sari' },
  { stat: '99%', label: 'Bau Tak Sedap', desc: 'Formaldehida, asap rokok, dan senyawa organik volatil' },
]

export default function StreamerTechnology() {
  return (
    <PageTransition>
      <PageMeta title="Streamer Technology" canonical="/profile/streamer" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Streamer Technology' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Streamer Technology</h1>
            <p className="text-white/80 text-xl max-w-2xl">Teknologi purifikasi udara eksklusif Daikin yang secara aktif mendisinfeksi udara menggunakan aliran elektron berenergi tinggi.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInUp>
            <div className="accent-line" />
            <h2 className="section-heading">Bagaimana Cara Kerjanya?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Streamer Technology menggunakan prinsip plasma non-termal (non-thermal plasma) untuk menghasilkan aliran elektron berenergi tinggi. Elektron-elektron ini bereaksi dengan oksigen dan nitrogen di udara untuk menghasilkan oksidan reaktif yang sangat kuat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Berbeda dengan filter konvensional yang hanya menangkap partikel, Streamer secara aktif mendekonstruksi senyawa berbahaya pada tingkat molekuler, menjadikannya tidak aktif dan tidak berbahaya.
            </p>
            <div className="bg-daikin-blue-50 rounded-card p-6">
              <h3 className="font-bold text-charcoal mb-2">Keunggulan Dibanding Filter Biasa</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Aktif mendisinfeksi, bukan hanya menyaring', 'Bekerja terus-menerus bahkan saat AC menyala', 'Tidak menghasilkan ozon berbahaya', 'Konsumsi daya sangat rendah'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-daikin-blue flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-daikin-blue rounded-card p-8 text-white">
              <h3 className="text-xl font-bold mb-6 text-center">Efektivitas Streamer</h3>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 rounded-xl p-4 text-center"
                  >
                    <div className="text-3xl font-bold mb-1">{cap.stat}</div>
                    <div className="text-sm font-semibold text-white/90 mb-1">{cap.label}</div>
                    <div className="text-xs text-white/60 leading-snug">{cap.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading title="Produk dengan Streamer Technology" centered />
          <FadeInUp className="text-center text-gray-600">
            <p className="mb-6">Streamer Technology tersedia di berbagai lini produk Daikin, mulai dari AC rumahan hingga solusi komersial.</p>
            <span className="btn-primary inline-flex items-center gap-2 pointer-events-none cursor-default">Lihat Produk dengan Streamer</span>
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
