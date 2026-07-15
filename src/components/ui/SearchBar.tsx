import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { Product } from '@/types/product'

interface SearchBarProps {
  products: Product[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({
  products,
  value,
  onChange,
  placeholder = 'Cari produk Daikin…',
  className,
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  const computeSuggestions = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSuggestions([])
        return
      }
      const q = query.toLowerCase()
      const matches = products
        .filter(
          (p) =>
            p.name.id.toLowerCase().includes(q) ||
            p.name.en.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q),
        )
        .slice(0, 5)
      setSuggestions(matches)
    },
    [products],
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    onChange(val)
    setActiveSuggestion(-1)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      computeSuggestions(val)
      setShowSuggestions(true)
    }, 200)
  }

  function handleClear() {
    onChange('')
    setSuggestions([])
    setShowSuggestions(false)
    setActiveSuggestion(-1)
  }

  function handleSelect(product: Product) {
    onChange(product.name.id)
    setShowSuggestions(false)
    navigate(`/products/${product.slug}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault()
      handleSelect(suggestions[activeSuggestion])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true)
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3.5 rounded-card border border-soft-gray-2 bg-white text-charcoal
            placeholder:text-gray-400 focus:outline-none focus:border-daikin-blue focus:ring-2
            focus:ring-daikin-blue/20 transition-all duration-200 shadow-sm text-sm"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-30 top-full left-0 right-0 mt-1.5 bg-white rounded-card shadow-card-hover border border-soft-gray-2 overflow-hidden">
          {suggestions.map((product, i) => (
            <li key={product.id}>
              <button
                onMouseDown={() => handleSelect(product)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-daikin-blue-50 transition-colors',
                  i === activeSuggestion && 'bg-daikin-blue-50',
                )}
              >
                <img
                  src={product.imageUrl}
                  alt=""
                  className="w-9 h-9 object-contain flex-shrink-0"
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-charcoal truncate">{product.name.id}</div>
                  <div className="text-xs text-gray-400">{product.subcategory}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
