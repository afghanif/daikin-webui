import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { cn } from '@/utils/cn'

interface LanguageSwitcherProps {
  className?: string
  compact?: boolean
  isTransparent?: boolean
}

export default function LanguageSwitcher({ className, compact, isTransparent = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'id'

  function switchLang(lang: string) {
    i18n.changeLanguage(lang)
  }

  if (compact) {
    return (
      <button
        onClick={() => switchLang(currentLang === 'id' ? 'en' : 'id')}
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors',
          isTransparent
            ? 'text-white/90 hover:text-white'
            : 'text-charcoal hover:text-daikin-blue',
          className
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase tracking-wide">{currentLang}</span>
      </button>
    )
  }

  return (
    <div className={cn('flex items-center gap-1 border rounded-lg p-0.5', isTransparent ? 'border-white/30' : 'border-gray-200', className)}>
      {(['id', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={cn(
            'px-2.5 py-1 text-xs font-semibold rounded uppercase transition-all duration-200',
            currentLang === lang
              ? isTransparent ? 'bg-white/20 text-white' : 'bg-daikin-blue text-white'
              : isTransparent ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-charcoal'
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
