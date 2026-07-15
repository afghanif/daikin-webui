import { motion } from 'framer-motion'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

const timeline = [
  { year: '1924', title: 'Kelahiran Daikin', desc: 'Daikin Industries, Ltd. didirikan di Osaka, Jepang oleh Akira Yamada. Fokus awal pada tabung logam untuk pembuatan pesawat.', isRight: false },
  { year: '1951', title: 'Memasuki Bisnis AC', desc: 'Daikin meluncurkan produk AC split pertamanya, memulai era baru di industri pendingin udara Jepang.', isRight: true },
  { year: '2012', title: 'Hadir di Indonesia', desc: 'PT Daikin Airconditioning Indonesia didirikan secara resmi pada Juni 2012, bergabung dengan jaringan DAIKIN Global untuk melayani pasar Indonesia.', isRight: false },
  { year: '1994', title: 'Inverter Pertama', desc: 'Daikin menjadi pionir dalam meluncurkan AC inverter di Indonesia, merevolusi efisiensi energi industri AC.', isRight: true },
  { year: '2004', title: 'Ekspansi VRV', desc: 'Sistem VRV (Variable Refrigerant Volume) untuk komersial diperkenalkan, membuka era baru solusi gedung pintar.', isRight: false },
  { year: '2012', title: 'Streamer Technology', desc: 'Teknologi Streamer revolusioner diluncurkan di Indonesia, membawa kemampuan purifikasi udara aktif ke produk residential.', isRight: true },
  { year: '2020', title: 'Era Smart Home', desc: 'Peluncuran ekosistem IoT Daikin dengan aplikasi mobile controller dan integrasi smart home.', isRight: false },
  { year: '2024', title: '#1 di Indonesia', desc: 'Daikin mencapai posisi market leader AC inverter di Indonesia, melayani lebih dari 10 juta pelanggan.', isRight: true },
]

export default function OurHistory() {
  return (
    <PageTransition>
      <PageMeta title="Sejarah Daikin" canonical="/profile/history" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Sejarah Kami' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sejarah Daikin</h1>
            <p className="text-white/80 text-xl max-w-2xl">Perjalanan lebih dari satu abad inovasi, dari tabung logam hingga pemimpin industri HVAC-R global.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Tonggak Sejarah" centered subtitle="100 tahun dedikasi penuh untuk menghadirkan teknologi terbaik bagi kenyamanan manusia." />

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-daikin-blue-100" />

          {timeline.map((item, i) => (
            <div key={i} className={`mb-12 flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center ${item.isRight ? 'md:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={`md:w-5/12 ${item.isRight ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                {item.isRight ? (
                  <FadeInLeft>
                    <div className="floating-card p-5 hover:shadow-card-hover transition-shadow">
                      <div className="text-daikin-blue font-bold text-lg mb-1">{item.year}</div>
                      <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeInLeft>
                ) : (
                  <FadeInRight>
                    <div className="floating-card p-5 hover:shadow-card-hover transition-shadow">
                      <div className="text-daikin-blue font-bold text-lg mb-1">{item.year}</div>
                      <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeInRight>
                )}
              </div>

              {/* Center dot */}
              <div className="hidden md:flex md:w-2/12 justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-4 h-4 rounded-full bg-daikin-blue border-4 border-white shadow-md z-10"
                />
              </div>

              {/* Empty side */}
              <div className="hidden md:block md:w-5/12" />
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
