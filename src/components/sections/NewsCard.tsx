import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatShortDate } from '@/utils/formatters'
import type { NewsArticle } from '@/types/news'

interface NewsCardProps {
  article: NewsArticle
  featured?: boolean
}

const categoryMeta: Record<string, {
  label: string
  variant: 'blue' | 'gray' | 'new' | 'promo'
  gradient: string
  bgLabel: string
}> = {
  news:      { label: 'Berita',   variant: 'blue',  gradient: 'from-daikin-blue-dark to-daikin-blue',  bgLabel: 'NEWS'     },
  promotion: { label: 'Promo',    variant: 'promo',  gradient: 'from-amber-500 to-orange-600',          bgLabel: 'PROMO'    },
  event:     { label: 'Event',    variant: 'new',    gradient: 'from-emerald-600 to-teal-700',           bgLabel: 'EVENT'    },
  training:  { label: 'Training', variant: 'gray',   gradient: 'from-violet-600 to-purple-700',          bgLabel: 'TRAINING' },
  csr:       { label: 'CSR',      variant: 'gray',   gradient: 'from-green-700 to-emerald-900',          bgLabel: 'CSR'      },
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
  const meta = categoryMeta[article.category] ?? {
    label: article.category, variant: 'gray' as const,
    gradient: 'from-slate-600 to-slate-800', bgLabel: article.category.toUpperCase(),
  }

  return (
    <Card padding="none" className="overflow-hidden group">
      <Link to={`/insights/news/${article.slug}`}>

        {/* Cover */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${meta.gradient} ${featured ? 'h-64' : 'h-48'}`}>
          {/* Photo - object-cover for real images, falls back to gradient for SVG */}
          <img
            src={article.coverImage}
            alt={article.title[lang]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Branded tint - keeps category colour identity over the photo */}
          <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-50`} />
          {/* Bottom vignette for readability */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={meta.variant}>{meta.label}</Badge>
          </div>
          {/* Arrow on hover */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatShortDate(article.publishedAt)}</span>
          </div>
          <h3 className="font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-daikin-blue transition-colors leading-snug">
            {article.title[lang]}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{article.excerpt[lang]}</p>
          <span className="inline-flex items-center gap-1 text-daikin-blue text-sm font-medium group-hover:gap-2 transition-all">
            Baca selengkapnya <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </Card>
  )
}
