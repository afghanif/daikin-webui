import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const quickLinks = [
  { label: 'Produk Residential', href: '/products/residential' },
  { label: 'Panduan Memilih AC', href: '/solutions/how-to-choose' },
  { label: 'Dealer Resmi', href: '/services/ishop' },
]

const popularTags = [
  'Inverter',
  'Streamer',
  'Hemat Energi',
  'VRV',
  'ProShop',
]

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Small timeout to allow animation to start before focusing
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col pt-24 px-4 md:px-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col items-center mt-12 md:mt-20">
            {/* Header Titles */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-daikin-blue uppercase mb-2.5">Eksplorasi</h4>
              <h2 className="text-2xl md:text-3xl font-medium text-charcoal">Apa yang sedang Anda cari?</h2>
            </motion.div>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full relative mb-12"
            >
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari produk, teknologi, layanan..."
                className="w-full pl-14 pr-6 py-4 md:py-5 text-lg md:text-xl border-2 border-gray-200 rounded-2xl focus:border-daikin-blue focus:ring-4 focus:ring-daikin-blue/10 transition-all outline-none text-charcoal placeholder-gray-400 shadow-sm"
              />
            </motion.div>

            {/* Links and Tags Layout */}
            <div className="w-full grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Tautan Cepat</h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className="flex items-center text-charcoal hover:text-daikin-blue font-medium transition-colors group"
                      >
                        <ArrowRight className="w-4 h-4 mr-3 text-gray-300 group-hover:text-daikin-blue transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Pencarian Populer</h3>
                <div className="flex flex-wrap gap-2.5">
                  {popularTags.map((tag, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 bg-gray-100 hover:bg-daikin-blue-50 hover:text-daikin-blue text-charcoal text-sm rounded-full transition-colors border border-transparent hover:border-daikin-blue/20"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
