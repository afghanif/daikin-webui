import { cn } from '@/utils/cn'
import FadeInUp from '@/components/animations/FadeInUp'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
  subtitleClassName?: string
}

export default function SectionHeading({ title, subtitle, centered = false, light = false, className, subtitleClassName }: SectionHeadingProps) {
  return (
    <FadeInUp className={cn('mb-12', centered && 'text-center', className)}>
      <div className={cn('w-12 h-1 rounded-full mb-4', light ? 'bg-white/60' : 'bg-daikin-blue', centered && 'mx-auto')} />
      <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', light ? 'text-white' : 'text-charcoal')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-lg leading-relaxed max-w-2xl', light ? 'text-white/80' : 'text-gray-600', centered && 'mx-auto', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </FadeInUp>
  )
}
