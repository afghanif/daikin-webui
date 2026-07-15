import { useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Tab {
  key: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (key: string) => void
  children: (activeKey: string) => ReactNode
  className?: string
}

export default function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key)

  function handleChange(key: string) {
    setActive(key)
    onChange?.(key)
  }

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-soft-gray-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleChange(tab.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-all duration-200',
              active === tab.key
                ? 'border-daikin-blue text-daikin-blue'
                : 'border-transparent text-gray-500 hover:text-charcoal hover:border-soft-gray-2'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{children(active)}</div>
    </div>
  )
}
