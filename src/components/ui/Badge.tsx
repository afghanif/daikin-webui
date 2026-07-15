import { cn } from '@/utils/cn'

type BadgeVariant = 'new' | 'bestseller' | 'promo' | 'blue' | 'gray'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  new: 'bg-green-100 text-green-700',
  bestseller: 'bg-daikin-blue-50 text-daikin-blue',
  promo: 'bg-orange-100 text-orange-700',
  blue: 'bg-daikin-blue text-white',
  gray: 'bg-soft-gray-2 text-charcoal-light',
}

export default function Badge({ variant = 'blue', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  )
}
