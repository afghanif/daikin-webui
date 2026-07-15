import { Download } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'

const catalogues = [
  { title: 'Residential Catalogue 2026', desc: 'Daftar lengkap produk AC hunian beserta spesifikasi teknis.', size: '12.4 MB', format: 'PDF', cover: '/images/catalogues/residential.svg' },
  { title: 'Commercial Catalogue 2026', desc: 'Solusi komersial VRV, Sky Air, dan Cassette.', size: '18.7 MB', format: 'PDF', cover: '/images/catalogues/commercial.svg' },
  { title: 'VRV System Technical Guide', desc: 'Panduan teknis instalasi dan konfigurasi sistem VRV.', size: '24.1 MB', format: 'PDF', cover: '/images/catalogues/vrv.svg' },
  { title: 'Accessories & Spare Parts', desc: 'Katalog aksesori dan suku cadang resmi Daikin.', size: '8.9 MB', format: 'PDF', cover: '/images/catalogues/accessories.svg' },
  { title: 'Daikin Solution Book 2026', desc: 'Panduan solusi lengkap untuk berbagai jenis bangunan.', size: '32.0 MB', format: 'PDF', cover: '/images/catalogues/solution.svg' },
]

export default function ECatalogue() {
  return (
    <PageTransition>
      <PageMeta title="E-Catalogue Daikin" canonical="/products/e-catalogue" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Produk', path: '/products' }, { label: 'E-Catalogue' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">E-Catalogue</h1>
            <p className="text-white/80 text-xl max-w-2xl">Unduh katalog produk Daikin terbaru dalam format PDF untuk referensi spesifikasi lengkap.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Katalog Digital" subtitle="Katalog produk Daikin tersedia untuk diunduh secara gratis." />
        <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((cat) => (
            <FadeInItem key={cat.title}>
              <div className="floating-card overflow-hidden group">
                <div className="h-48 bg-daikin-blue-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-sm font-bold text-daikin-blue">{cat.format}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal mb-2">{cat.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{cat.size}</span>
                    <button className="flex items-center gap-2 px-3 py-2 bg-daikin-blue text-white text-sm font-medium rounded-btn hover:bg-daikin-blue-dark transition-colors">
                      <Download className="w-4 h-4" />
                      Unduh
                    </button>
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
