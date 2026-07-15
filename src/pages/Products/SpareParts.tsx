import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'

export default function SpareParts() {
  return (
    <PageTransition>
      <PageMeta title="Spare Parts Daikin" canonical="/products/spare-parts" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Produk', path: '/products' }, { label: 'Spare Parts' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Spare Parts</h1>
            <p className="text-white/80 text-xl max-w-2xl">Suku cadang asli Daikin untuk menjaga performa dan memperpanjang usia unit AC Anda.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Suku Cadang Resmi" subtitle="Pastikan AC Anda selalu dalam kondisi prima dengan suku cadang asli Daikin." />
        <FadeInUp>
          <div className="bg-daikin-blue-50 rounded-card p-8 text-center">
            <p className="text-gray-600 mb-6 text-lg">Untuk ketersediaan dan pemesanan suku cadang, silakan hubungi dealer resmi atau service center Daikin terdekat.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/services/service-center" className="btn-primary inline-flex">Cari Service Center</a>
              <a href="/services/ishop" className="btn-secondary inline-flex">Hubungi iShop</a>
            </div>
          </div>
        </FadeInUp>
      </section>
    </PageTransition>
  )
}
