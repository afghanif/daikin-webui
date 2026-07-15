import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }

export default function Card({ hover = true, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, boxShadow: '0 16px 48px rgba(0,151,224,0.18), 0 4px 16px rgba(0,0,0,0.10)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('bg-white rounded-card shadow-card', paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
