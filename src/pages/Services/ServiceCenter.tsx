import { useState } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { dealers, provinces } from '@/data/dealers'

export default function ServiceCenter() {
  const [selectedProvince, setSelectedProvince] = useState('Semua')

  const filtered = selectedProvince === 'Semua'
    ? dealers
    : dealers.filter((d) => d.province === selectedProvince)

  return (
    <PageTransition>
      <PageMeta title="Service Center Daikin" canonical="/services/service-center" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Layanan', path: '/services' }, { label: 'Service Center' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Service Center</h1>
            <p className="text-white/80 text-xl max-w-2xl">Temukan service center resmi Daikin terdekat di kota Anda di seluruh Indonesia.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="flex items-center gap-4 mb-8">
          <label className="text-sm font-medium text-gray-600">Provinsi:</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="select-field max-w-xs"
          >
            <option value="Semua">Semua Provinsi</option>
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dealer) => (
            <FadeInItem key={dealer.id}>
              <div className="floating-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-charcoal leading-snug">{dealer.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dealer.type === 'ishop' ? 'bg-daikin-blue-50 text-daikin-blue' : 'bg-purple-50 text-purple-600'}`}>
                    {dealer.type === 'ishop' ? 'iShop' : 'ProShop'}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-daikin-blue flex-shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-daikin-blue flex-shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                  {dealer.openHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-daikin-blue flex-shrink-0" />
                      <span>{dealer.openHours}</span>
                    </div>
                  )}
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">Tidak ada service center di provinsi yang dipilih.</div>
        )}
      </section>
    </PageTransition>
  )
}
