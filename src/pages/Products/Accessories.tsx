import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import ProductCard from '@/components/sections/ProductCard'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { getProductsByCategory } from '@/data/products'

export default function Accessories() {
  const products = getProductsByCategory('accessory')

  return (
    <PageTransition>
      <PageMeta title="Aksesori Daikin" canonical="/products/accessories" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Produk', path: '/products' }, { label: 'Accessories' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Accessories</h1>
            <p className="text-white/80 text-xl max-w-2xl">Aksesori resmi Daikin untuk memaksimalkan fungsi dan kenyamanan sistem AC Anda.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <SectionHeading title="Aksesori Resmi Daikin" />
        {products.length > 0 ? (
          <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <FadeInItem key={p.id}><ProductCard product={p} /></FadeInItem>
            ))}
          </FadeInUp>
        ) : (
          <div className="text-center py-16 text-gray-500">Aksesori akan segera tersedia.</div>
        )}
      </section>
    </PageTransition>
  )
}
