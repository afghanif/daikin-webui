import { Zap, Wind, Droplets, Cpu } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'

const technologies = [
  { icon: Zap, title: 'Inverter Technology', desc: 'Teknologi inverter Daikin mengatur kecepatan kompressor secara dinamis, menghemat energi hingga 60% dan menjaga suhu konstan tanpa fluktuasi.', badge: 'Flagship' },
  { icon: Wind, title: 'Streamer Technology', desc: 'Teknologi eksklusif yang menghasilkan aliran elektron berenergi tinggi untuk mendisinfeksi udara, menetralisir alergen, virus, dan senyawa kimia berbahaya.', badge: 'Eksklusif' },
  { icon: Droplets, title: '3D Airflow', desc: 'Sistem distribusi udara tiga dimensi memastikan sirkulasi udara merata ke seluruh ruangan tanpa draft langsung yang tidak nyaman.', badge: 'Inovatif' },
  { icon: Cpu, title: 'Smart Control', desc: 'Ekosistem IoT Daikin memungkinkan kontrol penuh via smartphone, integrasi smart home, dan monitoring konsumsi energi secara real-time.', badge: 'Smart' },
]

export default function TechnologyOverview() {
  return (
    <PageTransition>
      <PageMeta title="Teknologi Daikin" canonical="/profile/technology" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Profile', path: '/profile' }, { label: 'Teknologi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Teknologi & Inovasi</h1>
            <p className="text-white/80 text-xl max-w-2xl">Daikin berinvestasi lebih dari 4% pendapatan globalnya untuk riset dan pengembangan setiap tahun.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Teknologi Unggulan Daikin" subtitle="Setiap teknologi Daikin dirancang untuk memberikan kenyamanan optimal, efisiensi energi, dan kualitas udara terbaik." />
        <div className="space-y-12">
          {technologies.map((tech, i) => {
            const Icon = tech.icon
            const isEven = i % 2 === 0
            return (
              <FadeInUp key={tech.title} delay={i * 0.1}>
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`bg-daikin-blue-50 rounded-card h-72 flex items-center justify-center ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <Icon className="w-32 h-32 text-daikin-blue opacity-30" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-daikin-blue text-white text-xs font-bold rounded-full mb-3">{tech.badge}</span>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">{tech.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              </FadeInUp>
            )
          })}
        </div>
      </section>
    </PageTransition>
  )
}
