import { useTranslation } from 'react-i18next'
import { Calendar } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { formatShortDate } from '@/utils/formatters'
import { promotions } from '@/data/news'

export default function Promotions() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'

  return (
    <PageTransition>
      <PageMeta title="Promosi Daikin" canonical="/insights/promotions" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Insights', path: '/insights' }, { label: 'Promosi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Promosi Spesial</h1>
            <p className="text-white/80 text-xl max-w-2xl">Penawaran terbaik dari Daikin Indonesia - jangan sampai terlewat!</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Promo Aktif" />
        <FadeInUp stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <FadeInItem key={promo.id}>
              <div className="floating-card overflow-hidden group">
                <div className="h-48 bg-daikin-blue-50 overflow-hidden relative">
                  <img src={promo.imageUrl} alt={promo.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={192} />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {promo.badge && <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{promo.badge}</span>}
                    {promo.discount && <span className="bg-daikin-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">{promo.discount}</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal mb-2">{promo.title[lang]}</h3>
                  <p className="text-sm text-gray-600 mb-3">{promo.description[lang]}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    Berlaku hingga {formatShortDate(promo.validUntil)}
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
