import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

export type IconVariant = 'wave' | 'think' | 'help' | 'happy' | 'idle'

interface PichonKunHelperProps {
  message?: string
  autoShow?: boolean
  size?: number
  variant?: IconVariant
}

const ICON = '/images/mascot/icon-daikin-help.png'

const variantConfig: Record<IconVariant, {
  animate: Record<string, unknown>
  transition: Record<string, unknown>
  flip?: boolean
}> = {
  // Gentle float + side-to-side sway - default greeting pose
  wave: {
    animate: { y: [0, -8, 0], rotate: [0, 4, -4, 0] },
    transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
  },
  // Mirrored + slow head-tilt - thinking / contemplating
  think: {
    animate: { y: [0, -4, 0], rotate: [-6, -10, -6] },
    transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
    flip: true,
  },
  // Energetic double-bounce - asking for help / urgent
  help: {
    animate: { y: [0, -14, -2, -10, 0], scale: [1, 1.08, 1, 1.04, 1] },
    transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
  },
  // Excited wiggle + scale pulse - happy / celebration
  happy: {
    animate: { y: [0, -10, 0], scale: [1, 1.07, 1], rotate: [0, 6, -6, 0] },
    transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
  },
  // Very slow minimal float - idle / background presence
  idle: {
    animate: { y: [0, -5, 0] },
    transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
  },
}

export default function PichonKunHelper({
  message = 'Ada yang bisa saya bantu? 😊',
  autoShow = false,
  size = 80,
  variant = 'wave',
}: PichonKunHelperProps) {
  const [showBubble, setShowBubble] = useState(autoShow)
  const cfg = variantConfig[variant]

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-2xl rounded-br-none shadow-card-hover border border-daikin-blue-100 p-4 max-w-[240px]"
          >
            <button
              onClick={() => setShowBubble(false)}
              className="absolute top-2 right-2 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-charcoal leading-relaxed pr-4">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
        onClick={() => setShowBubble((v) => !v)}
        className="relative"
        aria-label="Bantuan Pichon-kun"
      >
        <div className={cfg.flip ? '[transform:scaleX(-1)]' : undefined}>
          <motion.div animate={cfg.animate as never} transition={cfg.transition}>
            <img
              src={ICON}
              alt="Pichon-kun"
              style={{ height: size, width: 'auto' }}
              className="drop-shadow-lg"
              loading="lazy"
            />
          </motion.div>
        </div>
        {!showBubble && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-daikin-blue rounded-full flex items-center justify-center"
          >
            <MessageCircle className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}
