import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface ActiveFilters {
  pk: number[]
  unitTypes: string[]
  inverter: 'all' | 'inverter' | 'non-inverter'
  features: string[]
}

export const DEFAULT_FILTERS: ActiveFilters = {
  pk: [],
  unitTypes: [],
  inverter: 'all',
  features: [],
}

const PK_OPTIONS = [
  { label: '½ PK', sublabel: '5.000 BTU', value: 0.5 },
  { label: '¾ PK', sublabel: '7.000 BTU', value: 0.75 },
  { label: '1 PK', sublabel: '9.000 BTU', value: 1 },
  { label: '1½ PK', sublabel: '13.500 BTU', value: 1.5 },
  { label: '2 PK', sublabel: '18.000 BTU', value: 2 },
]

const FEATURE_OPTIONS = [
  { label: 'Streamer (Pemurni Udara)', value: 'streamer' },
  { label: 'Smart / Wi-Fi Built-in', value: 'wifi' },
  { label: 'Fast Cooling', value: 'fastcooling' },
  { label: 'Premium Panel', value: 'premium' },
]

interface ProductFilterPanelProps {
  filters: ActiveFilters
  onChange: (filters: ActiveFilters) => void
  onReset: () => void
  unitTypeOptions?: string[]
  showPkFilter?: boolean
  activeCount?: number
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-soft-gray-2 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-sm font-semibold text-charcoal mb-3 hover:text-daikin-blue transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function Checkbox({
  label,
  sublabel,
  checked,
  onChange,
}: {
  label: string
  sublabel?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-daikin-blue rounded flex-shrink-0"
      />
      <span className="text-sm text-gray-600 group-hover:text-charcoal transition-colors leading-tight">
        {label}
        {sublabel && <span className="text-xs text-gray-400 block">{sublabel}</span>}
      </span>
    </label>
  )
}

export default function ProductFilterPanel({
  filters,
  onChange,
  onReset,
  unitTypeOptions = ['Split Wall', 'Cassette', 'Floor Standing', 'Ducted', 'Multi-Split'],
  showPkFilter = true,
  activeCount = 0,
}: ProductFilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  function togglePk(value: number, checked: boolean) {
    onChange({
      ...filters,
      pk: checked ? [...filters.pk, value] : filters.pk.filter((v) => v !== value),
    })
  }

  function toggleUnitType(value: string, checked: boolean) {
    onChange({
      ...filters,
      unitTypes: checked
        ? [...filters.unitTypes, value]
        : filters.unitTypes.filter((v) => v !== value),
    })
  }

  function toggleFeature(value: string, checked: boolean) {
    onChange({
      ...filters,
      features: checked
        ? [...filters.features, value]
        : filters.features.filter((v) => v !== value),
    })
  }

  const panelContent = (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-bold text-charcoal uppercase tracking-wide">Filter</span>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-daikin-blue hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Reset ({activeCount})
          </button>
        )}
      </div>

      {showPkFilter && (
        <FilterSection title="Kapasitas (PK)">
          <div className="space-y-0.5">
            {PK_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                sublabel={opt.sublabel}
                checked={filters.pk.includes(opt.value)}
                onChange={(checked) => togglePk(opt.value, checked)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Tipe Unit Indoor">
        <div className="space-y-0.5">
          {unitTypeOptions.map((type) => (
            <Checkbox
              key={type}
              label={type}
              checked={filters.unitTypes.includes(type)}
              onChange={(checked) => toggleUnitType(type, checked)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Teknologi Kompresor">
        <div className="flex flex-col gap-1.5">
          {(['all', 'inverter', 'non-inverter'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="inverter"
                value={opt}
                checked={filters.inverter === opt}
                onChange={() => onChange({ ...filters, inverter: opt })}
                className="w-4 h-4 accent-daikin-blue"
              />
              <span className="text-sm text-gray-600 group-hover:text-charcoal transition-colors capitalize">
                {opt === 'all' ? 'Semua' : opt === 'inverter' ? 'Inverter' : 'Non-Inverter'}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fitur Unggulan">
        <div className="space-y-0.5">
          {FEATURE_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              checked={filters.features.includes(opt.value)}
              onChange={(checked) => toggleFeature(opt.value, checked)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-soft-gray-2 rounded-btn bg-white text-sm font-medium text-charcoal hover:border-daikin-blue hover:text-daikin-blue transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
          {activeCount > 0 && (
            <span className="ml-1 bg-daikin-blue text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-soft-gray-2">
              <span className="font-bold text-charcoal">Filter Produk</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{panelContent}</div>
            <div className="sticky bottom-0 p-4 bg-white border-t border-soft-gray-2">
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:block w-64 flex-shrink-0',
          'bg-white rounded-xl shadow-card p-5 sticky top-28 self-start',
        )}
      >
        {panelContent}
      </aside>
    </>
  )
}
