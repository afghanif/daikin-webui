import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

interface AccordionItem {
  key: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export default function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(allowMultiple ? prev : new Set<string>())
      if (prev.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className={cn('divide-y divide-soft-gray-2', className)}>
      {items.map((item) => {
        const isOpen = openKeys.has(item.key)
        return (
          <div key={item.key}>
            <button
              onClick={() => toggle(item.key)}
              className="flex items-center justify-between w-full py-4 text-left text-charcoal font-medium hover:text-daikin-blue transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown className={cn('w-5 h-5 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-gray-600 leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
