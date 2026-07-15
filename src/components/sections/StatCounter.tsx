import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface StatCounterProps {
  stats: StatItem[]
  light?: boolean
}

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString('id-ID')}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, prefix])

  return (
    <span
      ref={(el) => {
        ref.current = el
        inViewRef(el)
      }}
      className="tabular-nums"
    >
      {prefix}0{suffix}
    </span>
  )
}

export default function StatCounter({ stats, light = false }: StatCounterProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className={`text-4xl md:text-5xl font-bold mb-2 ${light ? 'text-white' : 'text-daikin-blue'}`}>
            <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <div className={`text-sm font-medium ${light ? 'text-white/70' : 'text-gray-500'}`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
