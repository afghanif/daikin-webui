import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import { getDealersByType } from '@/data/dealers'

export default function ProShop() {
  const proshops = getDealersByType('proshop')

  return (
    <PageTransition>
      <PageMeta title="ProShop - Dealer Komersial Daikin" canonical="/services/proshop" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Layanan', path: '/services' }, { label: 'ProShop' }]} className="text-white/60 mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ProShop</h1>
            <p className="text-white/80 text-xl max-w-2xl">Partner resmi Daikin untuk proyek komersial berskala besar - dari perkantoran, hotel, hingga fasilitas industri.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <FadeInRight>
            <div className="bg-daikin-blue-50 rounded-card h-72 flex items-center justify-center">
              <img src="/images/services/proshop.svg" alt="ProShop" className="w-full h-full object-cover rounded-card" loading="lazy" width={600} height={288} />
            </div>
          </FadeInRight>
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Solusi untuk Proyek Komersial</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              ProShop Daikin menyediakan layanan end-to-end untuk proyek komersial: dari konsultasi teknis, perancangan sistem, instalasi, hingga commissioning dan maintenance berkala.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Sistem VRV & Central AC', 'Sky Air untuk gedung menengah', 'Cassette & Ceiling', 'Chiller & HVAC Industrial', 'BMS Integration', 'Proyek Turnkey'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-daikin-blue flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </FadeInLeft>
        </div>

        <SectionHeading title="Lokasi ProShop" />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {proshops.map((dealer) => (
            <FadeInItem key={dealer.id}>
              <div className="floating-card p-5">
                <h3 className="font-bold text-charcoal mb-2">{dealer.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{dealer.address}</p>
                <p className="text-sm text-daikin-blue font-medium">{dealer.phone}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>
      </section>
    </PageTransition>
  )
}
