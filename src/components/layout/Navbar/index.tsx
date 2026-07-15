import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown, Search, Facebook, Instagram, Youtube, Twitter, Building2, Zap } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { useNavigation } from '@/context/NavigationContext'
import { cn } from '@/utils/cn'
import MegaMenu from './MegaMenu'
import TwoColumnMenu from './TwoColumnMenu'
import LanguageSwitcher from './LanguageSwitcher'
import SearchOverlay from './SearchOverlay'

const mobileCategoryIconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Zap,
}

const topBarLinks = [
  { label: '#KeputusanYangTepat', href: '/profile/about', accent: true },
  { label: 'DAIKIN DESIGNER AWARDS', href: '/campaign/ideal-air', accent: false },
]

const socialLinks = [
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
  { icon: Twitter,   href: '#', label: 'Twitter / X' },
]

export default function Navbar() {
  const { t } = useTranslation('nav')
  const location = useLocation()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation()
  const [scrolled, setScrolled]             = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen]         = useState(false)
  const navRef    = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    closeMobileMenu()
    setActiveDropdown(null)
  }, [location.pathname, closeMobileMenu])

  useEffect(() => {
    const handleOut = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleOut)
    return () => document.removeEventListener('mousedown', handleOut)
  }, [])

  const isTransparent = !scrolled && !isMobileMenuOpen

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top info bar ─────────────────────────────────────── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="topbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn(
              'transition-colors duration-300 text-xs',
              isTransparent ? 'bg-black/35 backdrop-blur-sm text-white/90' : 'bg-charcoal text-white/80'
            )}>
              <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-9">

                {/* Left: page links */}
                <div className="hidden lg:flex items-center">
                  {topBarLinks.map((link, i) => (
                    <span key={link.href} className="flex items-center">
                      <Link
                        to={link.href}
                        className={cn(
                          'font-medium tracking-wide hover:text-white transition-colors px-3',
                          link.accent ? 'text-daikin-blue-light font-bold' : 'text-white/75'
                        )}
                      >
                        {link.label}
                      </Link>
                      {i < topBarLinks.length - 1 && (
                        <span className="text-white/25 select-none">|</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Right: social icons */}
                <div className="flex items-center gap-4 ml-auto">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main navigation bar ──────────────────────────────── */}
      <div className={cn(
        'transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-lg shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
      )}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link to="/" onClick={() => setActiveDropdown(null)} className="flex-shrink-0">
              <img
                src={isTransparent ? '/images/logo/logo-daikin-white.png' : '/images/logo/logo-daikin.svg'}
                alt="Daikin Indonesia"
                className="h-8 md:h-9 w-auto transition-all duration-300"
              />
            </Link>

            {/* Desktop nav links - centred */}
            <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navItems.map((item) => {
                const isActive      = location.pathname.startsWith(item.path) && item.path !== '/'
                const hasDropdown   = !!(item.children?.length)
                const isOpen        = activeDropdown === item.labelKey

                const baseCls = cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap',
                  isTransparent
                    ? isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    : isActive
                      ? 'text-daikin-blue bg-daikin-blue-50'
                      : 'text-charcoal hover:text-daikin-blue hover:bg-daikin-blue-50'
                )

                return (
                  <li key={item.labelKey} className="relative">
                    {item.isDealer ? (
                      <Link
                        to={item.path}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-btn text-white bg-[#0097E0] hover:bg-daikin-blue-dark transition-colors duration-200 whitespace-nowrap ml-1"
                      >
                        {t(item.labelKey)}
                      </Link>
                    ) : hasDropdown ? (
                      <button
                        onMouseEnter={() => setActiveDropdown(item.labelKey)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        onClick={() => setActiveDropdown(isOpen ? null : item.labelKey)}
                        className={baseCls}
                      >
                        {t(item.labelKey)}
                        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', isOpen && 'rotate-180')} />
                      </button>
                    ) : item.disabled ? (
                      <span className={cn(baseCls, 'pointer-events-none cursor-default')}>
                        {t(item.labelKey)}
                      </span>
                    ) : (
                      <Link to={item.path} className={baseCls}>
                        {t(item.labelKey)}
                      </Link>
                    )}

                    {/* Dropdown panel */}
                    {hasDropdown && (
                      <div
                        onMouseEnter={() => setActiveDropdown(item.labelKey)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute top-full left-0 pt-2"
                      >
                        <AnimatePresence>
                          {isOpen && (
                            item.isMegaMenu
                              ? <MegaMenu items={item.children!} onClose={() => setActiveDropdown(null)} />
                              : item.isTwoColumn
                                ? <TwoColumnMenu items={item.children!} onClose={() => setActiveDropdown(null)} />
                              : (
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: 0.15 }}
                                  className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 py-2 min-w-[220px]"
                                >
                                  {item.children!.map((child) => (
                                    child.isDivider ? (
                                      <div key={child.path} className="px-4 pt-2 pb-1 mt-1 border-t border-gray-100">
                                        {child.groupLabel && (
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {child.groupLabel}
                                          </span>
                                        )}
                                      </div>
                                    ) : child.disabled ? (
                                      <span
                                        key={child.path}
                                        className="block px-4 py-2.5 text-sm text-charcoal pointer-events-none cursor-default"
                                      >
                                        {t(child.labelKey)}
                                      </span>
                                    ) : (
                                      <Link
                                        key={child.path}
                                        to={child.path}
                                        onClick={() => setActiveDropdown(null)}
                                        className="block px-4 py-2.5 text-sm text-charcoal hover:text-daikin-blue hover:bg-daikin-blue-50 transition-colors"
                                      >
                                        {t(child.labelKey)}
                                      </Link>
                                    )
                                  ))}
                                </motion.div>
                              )
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Right-side actions */}
            <div className="flex items-center gap-2 flex-shrink-0">

              {/* Search - desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-charcoal hover:text-daikin-blue hover:bg-daikin-blue-50'
                  )}
                  aria-label="Cari"
                >
                  <Search className="w-5 h-5" />
                </button>

                <LanguageSwitcher compact isTransparent={isTransparent} />
              </div>

              {/* Mobile: lang + hamburger */}
              <LanguageSwitcher compact isTransparent={isTransparent} className="lg:hidden" />
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-charcoal hover:bg-soft-gray'
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </nav>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.labelKey}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.labelKey ? null : item.labelKey)}
                        className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-charcoal rounded-lg hover:bg-soft-gray"
                      >
                        {t(item.labelKey)}
                        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', mobileExpanded === item.labelKey && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.labelKey && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              child.isDivider ? (
                                <div key={child.path} className="px-3 pt-3 pb-1 mt-2 first:mt-0 first:pt-1 border-t border-gray-100 first:border-t-0">
                                  {child.groupLabel && (
                                    <div className="flex items-center gap-1.5">
                                      {child.categoryIcon && mobileCategoryIconMap[child.categoryIcon] && (() => {
                                        const CatIcon = mobileCategoryIconMap[child.categoryIcon!]
                                        return <CatIcon className="w-3 h-3 text-gray-400" />
                                      })()}
                                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {child.groupLabel}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : child.disabled ? (
                                <span
                                  key={child.path}
                                  className="block px-3 py-2.5 text-sm text-gray-600 rounded-lg pointer-events-none cursor-default"
                                >
                                  {t(child.labelKey)}
                                </span>
                              ) : (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  className="block px-3 py-2.5 text-sm text-gray-600 hover:text-daikin-blue rounded-lg"
                                >
                                  {t(child.labelKey)}
                                </Link>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.isDealer ? (
                    <Link
                      to={item.path}
                      className="block px-3 py-3 text-sm font-semibold text-white bg-[#0097E0] rounded-lg hover:bg-daikin-blue-dark transition-colors text-center"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-3 py-3 text-sm font-medium text-charcoal rounded-lg hover:bg-soft-gray"
                    >
                      {t(item.labelKey)}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile top-bar links */}
              <div className="pt-3 mt-2 border-t border-gray-100 space-y-1">
                {topBarLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'block px-3 py-2 text-xs font-semibold tracking-wide rounded-lg hover:bg-daikin-blue-50',
                      link.accent ? 'text-daikin-blue' : 'text-gray-500 hover:text-daikin-blue'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

    </header>
  )
}
