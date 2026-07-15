import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm', className)}>
      <Link to="/" className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            {!isLast && item.path ? (
              <Link to={item.path} className="opacity-70 hover:opacity-100 transition-opacity">{item.label}</Link>
            ) : (
              <span className={cn('font-medium', isLast ? 'opacity-100' : 'opacity-70')}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
