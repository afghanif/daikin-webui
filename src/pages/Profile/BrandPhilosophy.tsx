import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import WaveBackground from '@/components/animations/WaveBackground'

const values = [
  { title: 'Inovasi Tanpa Henti', desc: 'Terus mendorong batas teknologi untuk menciptakan produk yang lebih baik bagi kehidupan manusia.' },
  { title: 'Keberlanjutan', desc: 'Berkomitmen terhadap lingkungan hidup melalui produk hemat energi dan program ramah lingkungan.' },
  { title: 'Kepuasan Pelanggan', desc: 'Menempatkan kebutuhan dan kepuasan pelanggan di atas segalanya dalam setiap keputusan bisnis.' },
  { title: 'Integritas', desc: 'Beroperasi dengan transparansi dan kejujuran dalam setiap aspek bisnis dan hubungan.' },
  { title: 'Keunggulan', desc: 'Mengejar standar kualitas tertinggi dalam produk, layanan, dan setiap proses yang kami jalani.' },
  { title: 'Kolaborasi', desc: 'Membangun kemitraan yang kuat dengan pelanggan, dealer, dan komunitas untuk tumbuh bersama.' },
]

export default function BrandPhilosophy() {
  return (
    <PageTransition>
      <PageMeta title="Filosofi Brand" canonical="/profile/brand-philosophy" />

      <div className="relative bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Filosofi Brand' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Filosofi & Nilai Brand</h1>
            <p className="text-white/80 text-xl max-w-2xl">"Intelligence & Brightness" meets "Robustness & Stability" - dua pilar yang membentuk identitas Daikin.</p>
          </FadeInUp>
        </div>
        <WaveBackground />
      </div>

      <section className="section-container -mt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeInLeft>
            <div className="bg-white rounded-card shadow-card p-8">
              <div className="accent-line" />
              <h2 className="text-2xl font-bold text-charcoal mb-4">Intelligence & Brightness</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Daikin merepresentasikan kecerdasan teknologi dan kejernihan visi masa depan. Setiap produk dirancang dengan presisi ilmiah untuk menghadirkan solusi yang cerdas, efisien, dan responsif terhadap kebutuhan pengguna.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Warna biru khas Daikin melambangkan langit yang jernih dan udara yang bersih - cerminan dari apa yang kami hadirkan dalam setiap produk.
              </p>
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="bg-charcoal rounded-card p-8 text-white">
              <div className="w-12 h-1 rounded-full bg-daikin-blue mb-6" />
              <h2 className="text-2xl font-bold mb-4">Robustness & Stability</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Di balik desain yang elegan, Daikin membangun produk dengan ketangguhan dan keandalan yang tak tertandingi. Setiap unit dirancang untuk performa optimal dalam berbagai kondisi iklim Indonesia.
              </p>
              <p className="text-white/80 leading-relaxed">
                Standar manufaktur Daikin melampaui regulasi industri, memastikan produk Anda berfungsi sempurna selama bertahun-tahun.
              </p>
            </div>
          </FadeInRight>
        </div>
      </section>

      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading title="Nilai-Nilai Kami" subtitle="Enam prinsip inti yang memandu setiap keputusan dan tindakan Daikin." centered />
          <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <FadeInItem key={v.title}>
                <div className="floating-card p-6 hover:shadow-card-hover transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-daikin-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
