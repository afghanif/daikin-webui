import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Zap, ArrowRight, Shield, Wind, Sparkles, Wifi, Leaf, CheckCircle2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

const getFeatureIcon = (feature: string) => {
  const f = feature.toLowerCase()
  if (f.includes('wifi')) return Wifi
  if (f.includes('inverter') || f.includes('energy') || f.includes('power')) return Zap
  if (f.includes('filter') || f.includes('mold') || f.includes('streamer')) return Shield
  if (f.includes('air') || f.includes('coanda') || f.includes('breeze')) return Wind
  if (f.includes('clean')) return Sparkles
  if (f.includes('saving') || f.includes('eco')) return Leaf
  return CheckCircle2
}

export default function ProductCard({ product }: ProductCardProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'

  return (
    <Card padding="none" className="overflow-hidden group flex flex-col h-full">
      <Link to={`/products/${product.slug}`} className="flex flex-col h-full">
        <div className="relative h-52 bg-soft-gray overflow-hidden shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name[lang]}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={208}
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={product.badge === 'new' ? 'new' : product.badge === 'bestseller' ? 'bestseller' : 'promo'}>
                {product.badge === 'new' ? 'Baru' : product.badge === 'bestseller' ? 'Terlaris' : 'Promo'}
              </Badge>
            </div>
          )}
          {product.isInverter && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-daikin-blue text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
              <Zap className="w-3 h-3" />
              Inverter
            </div>
          )}
          {product.specs.pk > 0 && (
            <div className="absolute bottom-3 left-3 bg-daikin-blue/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
              {product.specs.pk} PK
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{product.subcategory}</div>
          <h3 className="font-bold text-charcoal mb-1 group-hover:text-daikin-blue transition-colors">{product.name[lang]}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.tagline[lang]}</p>
          
          {/* Feature Icons - matched with the user's reference design */}
          {product.features && product.features.length > 0 && (
            <div className="flex justify-between w-full gap-2 mb-5 mt-auto">
              {product.features.slice(0, 4).map((feature, idx) => {
                const Icon = getFeatureIcon(feature)
                return (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center justify-center flex-1 max-w-[72px] h-[64px] bg-gradient-to-b from-[#00b0f0] to-[#0070a0] rounded-lg p-1 shadow-sm border border-[#50c8f5]/50 group-hover:shadow-md transition-shadow"
                    title={feature}
                  >
                    <Icon className="w-5 h-5 text-white mb-1 drop-shadow-sm" strokeWidth={2.5} />
                    <span className="text-[7px] text-white font-bold text-center leading-[1.1] uppercase tracking-tight line-clamp-2 drop-shadow-sm w-full px-0.5">
                      {feature}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex items-center justify-end mt-auto pt-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full
              bg-transparent text-daikin-blue border border-daikin-blue/30
              group-hover:bg-daikin-blue group-hover:text-white group-hover:border-daikin-blue
              transition-all duration-300">
              Lihat Detail <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
