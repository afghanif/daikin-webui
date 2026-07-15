import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home, Building2, Package, Settings, BookOpen, ArrowRight } from 'lucide-react'
import type { NavChild } from '@/types/navigation'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Home, Building2, Package, Settings, BookOpen,
}

const iconBg: Record<string, string> = {
  Home:      'bg-daikin-blue-50   group-hover:bg-daikin-blue',
  Building2: 'bg-sky-50           group-hover:bg-sky-500',
  Package:   'bg-emerald-50       group-hover:bg-emerald-500',
  Settings:  'bg-orange-50        group-hover:bg-orange-500',
  BookOpen:  'bg-violet-50        group-hover:bg-violet-500',
}

const iconColor: Record<string, string> = {
  Home:      'text-daikin-blue    group-hover:text-white',
  Building2: 'text-sky-500        group-hover:text-white',
  Package:   'text-emerald-500    group-hover:text-white',
  Settings:  'text-orange-500     group-hover:text-white',
  BookOpen:  'text-violet-500     group-hover:text-white',
}

interface MegaMenuProps {
  items: NavChild[]
  onClose: () => void
}

export default function MegaMenu({ items, onClose }: MegaMenuProps) {
  const { t } = useTranslation('nav')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-[400px] z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Produk Daikin</span>
      </div>

      {/* Items */}
      <div className="p-3 space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : null
          const bg  = item.icon ? iconBg[item.icon]   : 'bg-gray-100 group-hover:bg-daikin-blue'
          const cl  = item.icon ? iconColor[item.icon] : 'text-gray-500 group-hover:text-white'

          if (item.disabled) {
            return (
              <div
                key={item.path}
                className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl pointer-events-none cursor-default"
              >
                {Icon && (
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg.split(' ')[0]}`}>
                    <Icon className={`w-4 h-4 ${cl.split(' ')[0]}`} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-charcoal leading-tight">{t(item.labelKey)}</div>
                  {item.description && (
                    <div className="text-xs text-gray-400 mt-0.5 leading-snug truncate">{item.description}</div>
                  )}
                </div>
              </div>
            )
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 group transition-colors duration-150"
            >
              {Icon && (
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${bg}`}>
                  <Icon className={`w-4 h-4 transition-colors duration-200 ${cl}`} />
                </div>
              )}
              <div className="min-w-0">
                <div className="text-sm font-semibold text-charcoal group-hover:text-daikin-blue transition-colors leading-tight">
                  {t(item.labelKey)}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-400 mt-0.5 leading-snug truncate">{item.description}</div>
                )}
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-daikin-blue ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 duration-200" />
            </Link>
          )
        })}
      </div>

      {/* Footer shortcut - non-navigable while services section is disabled */}
      <div className="mx-3 mb-3 mt-1 rounded-xl bg-daikin-blue-50 border border-daikin-blue/10 px-4 py-3 flex items-center justify-between pointer-events-none cursor-default">
        <div>
          <div className="text-xs font-bold text-daikin-blue-dark">Temukan Dealer Resmi</div>
          <div className="text-[11px] text-daikin-blue/60 mt-0.5">iShop & ProShop di seluruh Indonesia</div>
        </div>
        <span className="text-xs font-semibold text-daikin-blue flex items-center gap-1">
          Cari <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  )
}
