import { useTranslation } from 'react-i18next'
import { Calendar, MapPin } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import Badge from '@/components/ui/Badge'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { formatDate } from '@/utils/formatters'
import { events } from '@/data/news'

export default function Events() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'

  return (
    <PageTransition>
      <PageMeta title="Events & Kegiatan" canonical="/insights/events" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Insights', path: '/insights' }, { label: 'Events & Kegiatan' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events & Kegiatan</h1>
            <p className="text-white/80 text-xl max-w-2xl">Bergabunglah dalam event-event Daikin Indonesia - pameran, webinar, dan kegiatan komunitas.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Event Mendatang" />
        <FadeInUp stagger className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <FadeInItem key={event.id}>
              <div className="floating-card overflow-hidden">
                <div className="h-56 bg-daikin-blue-50 overflow-hidden">
                  <img src={event.imageUrl} alt={event.title[lang]} className="w-full h-full object-cover" loading="lazy" width={600} height={224} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={event.isUpcoming ? 'new' : 'gray'}>{event.isUpcoming ? 'Upcoming' : 'Past Event'}</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{event.title[lang]}</h3>
                  <p className="text-sm text-gray-600 mb-3">{event.description[lang]}</p>
                  <div className="flex items-center gap-1.5 text-sm text-daikin-blue">
                    <MapPin className="w-4 h-4" />
                    {event.location}
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
