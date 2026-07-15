import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'

export default function NotFound() {
  return (
    <PageTransition>
      <PageMeta title="404 - Halaman Tidak Ditemukan" noIndex />

      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="text-center max-w-lg">
          {/* Pichon-kun */}
          <motion.div
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <img
                src="/images/mascot/icon-daikin-2.png"
                alt="Pichon-kun"
                className="h-40 w-auto mx-auto drop-shadow-lg"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-white rounded-2xl rounded-b-sm shadow-card border border-daikin-blue-100 px-6 py-4 mb-8 mx-auto max-w-xs"
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-white border-b border-r border-daikin-blue-100 rotate-45 -mb-1" />
            <p className="text-sm text-charcoal font-medium">
              Aduh, halaman ini tidak ditemukan! Yuk kembali ke beranda! 😊
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-8xl font-bold text-daikin-blue-100 mb-2 leading-none">404</div>
            <h1 className="text-2xl font-bold text-charcoal mb-2">Halaman Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-8">Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Home className="w-4 h-4" />
                  Kembali ke Beranda
                </button>
              </Link>
              <Link to="/products">
                <button className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Search className="w-4 h-4" />
                  Cari Produk
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
