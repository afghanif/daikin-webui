import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FadeInUp from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

export default function PowerToCreate() {
  return (
    <PageTransition>
      <PageMeta title="The Power to Create the Air of the Future" canonical="/campaign/power-to-create" />

      <div className="bg-charcoal pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Campaign', path: '/campaign' }, { label: 'Power to Create' }]} className="text-white mb-8" />
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">The Power to Create<br /><span className="text-daikin-blue">the Air of the Future</span></h1>
            <p className="text-gray-400 text-xl max-w-xl">Dengan teknologi terdepan dan komitmen terhadap keberlanjutan, Daikin memimpin transformasi industri pendinginan udara untuk generasi mendatang.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="bg-daikin-blue-50 rounded-card h-96 flex items-center justify-center">
              <div className="text-daikin-blue text-xl font-bold">Future Vision Visual</div>
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="accent-line" />
            <h2 className="section-heading">Menciptakan Masa Depan Udara</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Daikin berinvestasi besar dalam refrigeran ramah lingkungan, kompressor generasi berikutnya, dan sistem AI yang mampu menyesuaikan kondisi udara secara real-time untuk kenyamanan dan efisiensi maksimal.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[{ label: 'Target Net Zero', val: '2050' }, { label: 'Refrigeran Baru', val: '2026' }, { label: 'Smart Building', val: 'AI-Driven' }].map(({ label, val }) => (
                <div key={label} className="text-center p-3 bg-soft-gray rounded-xl">
                  <div className="text-xl font-bold text-daikin-blue">{val}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </FadeInRight>
        </div>
      </section>
    </PageTransition>
  )
}
