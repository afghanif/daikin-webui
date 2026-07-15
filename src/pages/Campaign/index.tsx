import { Link } from 'react-router-dom'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import WaveBackground from '@/components/animations/WaveBackground'

const campaigns = [
  {
    title: 'The Ideal Air',
    subtitle: 'Udara yang Sempurna',
    desc: 'Udara yang sempurna bukan sekadar dingin - ini tentang kualitas, kesehatan, dan kenyamanan yang sesungguhnya. Bagaimana Daikin mendefinisikan ulang standar kesejahteraan udara untuk setiap ruang hidup.',
    path: '/campaign/ideal-air',
    cta: 'Temukan Udara Ideal',
    gradient: 'from-daikin-blue to-sky-400',
    tag: 'Brand Campaign',
  },
  {
    title: 'The Power to Create the Air of the Future',
    subtitle: 'Masa Depan Udara',
    desc: 'Inovasi Daikin membentuk masa depan pendinginan udara yang lebih hijau, lebih cerdas, dan berkelanjutan. Dari refrigeran ramah lingkungan hingga sistem AI-powered - kami memimpin transisi menuju era HVAC baru.',
    path: '/campaign/power-to-create',
    cta: 'Lihat Inovasi',
    gradient: 'from-charcoal to-daikin-blue-dark',
    tag: 'Innovation',
  },
  {
    title: 'Perfecting The Air Stories',
    subtitle: 'Kisah Nyata',
    desc: 'Kisah nyata dari pelanggan Daikin yang telah merasakan perbedaan udara sempurna dalam kehidupan sehari-hari - dari keluarga yang mendambakan rumah lebih sehat, hingga arsitek yang merancang gedung masa depan.',
    path: '/campaign/perfecting-air',
    cta: 'Baca Kisah Nyata',
    gradient: 'from-daikin-blue-dark to-charcoal',
    tag: 'Stories',
  },
]

const brandValues = [
  { value: '90+', label: 'Tahun Inovasi', desc: 'Daikin berdiri sejak 1924 - lebih dari 90 tahun mempersembahkan udara terbaik' },
  { value: '160+', label: 'Negara', desc: 'Kehadiran global di lebih dari 160 negara dengan jaringan produksi dan distribusi terintegrasi' },
  { value: '#1', label: 'HVAC Global', desc: 'Produsen sistem HVAC-R terbesar di dunia berdasarkan pendapatan global' },
  { value: '4%+', label: 'R&D Revenue', desc: 'Lebih dari 4% pendapatan global diinvestasikan kembali untuk riset dan pengembangan tiap tahun' },
]

export default function CampaignIndex() {
  return (
    <PageTransition>
      <PageMeta
        title="Campaign Daikin Indonesia"
        description="Kampanye brand Daikin yang menginspirasi - tentang udara yang sempurna, inovasi masa depan, dan kisah nyata pelanggan kami."
        canonical="/campaign"
      />

      {/* Hero - keep dark charcoal theme for campaigns */}
      <div className="relative bg-gradient-to-br from-charcoal to-daikin-blue-dark pt-36 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Campaign' }]} className="text-white mb-6" />
          <FadeInUp>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span className="text-sky-400 text-sm font-semibold uppercase tracking-widest">Daikin Brand Campaign</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Kampanye yang<br />Menginspirasi
            </h1>
            <p className="text-white/75 text-xl max-w-2xl leading-relaxed">
              Lebih dari sekadar iklan - ini adalah narasi tentang udara, kehidupan, dan visi Daikin untuk masa depan yang lebih nyaman dan berkelanjutan.
            </p>
          </FadeInUp>
        </div>
        <WaveBackground inverted />
      </div>

      {/* Campaign cards */}
      <section className="section-container -mt-8">
        <FadeInUp stagger className="grid md:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <FadeInItem key={camp.path}>
              <Link to={camp.path} className="block group">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${camp.gradient} text-white h-80 flex flex-col justify-between p-8 cursor-pointer`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, white, transparent 55%)' }} />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                  <div className="relative z-10">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 mb-3">{camp.tag}</span>
                    <h3 className="text-xl font-bold leading-snug mb-2">{camp.title}</h3>
                    <p className="text-white/65 text-xs">{camp.subtitle}</p>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-sm mb-5 leading-relaxed line-clamp-3">{camp.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                      {camp.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>

      {/* Brand story */}
      <section className="section-bg-light">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div className="accent-line" />
              <h2 className="section-heading">Cerita di Balik Brand Daikin</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Daikin bukan hanya produsen AC. Sejak 1924, kami adalah penjaga kenyamanan - sebuah misi yang terus hidup di setiap inovasi yang kami hadirkan. Nama "Daikin" berasal dari bahasa Jepang yang berarti "Nitrogen Besar" - mencerminkan akar kami dalam kimia dan gas.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kampanye kami tidak hanya berbicara tentang produk. Mereka mengundang Anda untuk merasakan bagaimana udara yang tepat dapat mengubah cara Anda hidup, bekerja, dan berkreasi. "The Ideal Air" adalah keyakinan bahwa kenyamanan sejati adalah hak semua orang.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Di Indonesia, Daikin telah hadir lebih dari 50 tahun dan terus memperluas visinya - dari membangun pabrik lokal di 2012 hingga menjadi merek AC terpercaya bagi jutaan keluarga Indonesia.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/campaign/ideal-air" className="btn-primary inline-flex items-center gap-2">
                  <Play className="w-4 h-4" /> Lihat Kampanye
                </Link>
                <Link to="/profile/about" className="btn-secondary inline-flex items-center gap-2">
                  Tentang Daikin <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-charcoal via-daikin-blue-dark to-daikin-blue relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 50%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Since 1924</p>
                      <p className="text-white font-bold text-2xl">The Ideal Air</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-sky-500 to-daikin-blue relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white font-semibold text-sm">Power to Create</span>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-slate-700 to-charcoal relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white font-semibold text-sm">Air Stories</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Angka yang Berbicara"
            subtitle="Di balik setiap kampanye, ada legacy puluhan tahun inovasi global yang menjadi fondasi kepercayaan Anda."
            centered
          />
          <FadeInUp stagger className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {brandValues.map(({ value, label, desc }) => (
              <FadeInItem key={label}>
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                  <div className="text-4xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sky-400 font-semibold text-sm mb-3">{label}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
