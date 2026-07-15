import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Building2, Zap, ArrowRight } from 'lucide-react'
import type { NavChild } from '@/types/navigation'

const categoryIconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Zap,
}

const categoryStyle: Record<string, { iconBg: string; iconText: string; labelText: string }> = {
  Building2: {
    iconBg:    'bg-daikin-blue-50',
    iconText:  'text-daikin-blue',
    labelText: 'text-daikin-blue',
  },
  Zap: {
    iconBg:    'bg-amber-50',
    iconText:  'text-amber-500',
    labelText: 'text-amber-600',
  },
}

interface Group {
  label: string
  categoryIcon: string
  items: NavChild[]
}

function parseGroups(items: NavChild[]): Group[] {
  const groups: Group[] = []
  let current: Group | null = null
  for (const item of items) {
    if (item.isDivider) {
      if (current) groups.push(current)
      current = { label: item.groupLabel ?? '', categoryIcon: item.categoryIcon ?? '', items: [] }
    } else if (current) {
      current.items.push(item)
    }
  }
  if (current) groups.push(current)
  return groups
}

interface TwoColumnMenuProps {
  items: NavChild[]
  onClose: () => void
}

export default function TwoColumnMenu({ items, onClose }: TwoColumnMenuProps) {
  const { t } = useTranslation('nav')
  const groups = parseGroups(items)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-[540px] z-50 overflow-hidden"
    >
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {groups.map((group) => {
          const Icon   = categoryIconMap[group.categoryIcon]
          const style  = categoryStyle[group.categoryIcon] ?? categoryStyle.Building2

          return (
            <div key={group.label} className="p-3">
              {/* Category header */}
              <div className="flex items-center gap-2 px-2 py-2 mb-1">
                {Icon && (
                  <div className={`w-7 h-7 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${style.iconText}`} />
                  </div>
                )}
                <span className={`text-[11px] font-bold ${style.labelText} uppercase tracking-widest`}>
                  {group.label}
                </span>
              </div>

              {/* Menu items */}
              <div className="space-y-0.5">
                {group.items.map((item) =>
                  item.disabled ? (
                    <div
                      key={item.path}
                      className="px-2 py-2 rounded-lg pointer-events-none cursor-default"
                    >
                      <div className="text-sm font-medium text-charcoal leading-tight">{t(item.labelKey)}</div>
                      {item.description && (
                        <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{item.description}</div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="group flex items-start justify-between gap-2 px-2 py-2 rounded-lg hover:bg-daikin-blue-50 transition-colors duration-150"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-charcoal group-hover:text-daikin-blue transition-colors leading-tight">
                          {t(item.labelKey)}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{item.description}</div>
                        )}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-daikin-blue mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
