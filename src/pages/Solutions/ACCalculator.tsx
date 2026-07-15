import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight, ChevronLeft, RotateCcw, Zap, Minus, Plus } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import FadeInUp from '@/components/animations/FadeInUp'
import {
  calculateAC,
  type ACCalculatorInput,
  type CeilingHeight,
  type SunExposure,
  type RoomType,
  type WindowSize,
  type RoomFloor,
} from '@/utils/acCalculator'
import {
  calculatePower,
  type Appliance,
  type ACModel,
  type PowerCalcInput,
  AC_MODEL_WATT,
  HOME_VA_OPTIONS,
  PRESET_APPLIANCES,
} from '@/utils/powerCalculator'

// ─── PK Calculator ────────────────────────────────────────────────────

type PKStep = 1 | 2 | 3 | 4 | 5

const defaultPKInput: ACCalculatorInput = {
  length: 0,
  width: 0,
  ceilingHeight: 'standard',
  sunExposure: 'north',
  roomType: 'bedroom',
  windowSize: 'medium',
  roomFloor: 'middle',
  occupants: 1,
}

const roomTypeLabels: Record<RoomType, string> = {
  bedroom: 'Kamar Tidur',
  living_room: 'Ruang Tamu/Keluarga',
  kitchen: 'Dapur',
  office: 'Kantor',
  server_room: 'Server Room',
  store: 'Toko/Ruko',
}
const sunExposureLabels: Record<SunExposure, string> = {
  north: 'Utara (Tidak Langsung)',
  south: 'Selatan (Langsung Terik)',
  east: 'Timur (Pagi)',
  west: 'Barat (Sore)',
  shaded: 'Teduh / Tertutup',
}
const ceilingHeightLabels: Record<CeilingHeight, { label: string; sub: string }> = {
  low: { label: 'Rendah', sub: '~2.5m' },
  standard: { label: 'Standar', sub: '~3m' },
  high: { label: 'Tinggi', sub: '~3.5m' },
}
const windowSizeLabels: Record<WindowSize, { label: string; sub: string }> = {
  small:  { label: 'Kecil',  sub: '< 1 m²' },
  medium: { label: 'Sedang', sub: '1–2 m²' },
  large:  { label: 'Besar',  sub: '> 2 m²' },
}
const roomFloorLabels: Record<RoomFloor, { label: string; sub: string }> = {
  ground: { label: 'Lantai Dasar', sub: 'Tidak ada atap langsung' },
  middle: { label: 'Lantai Tengah', sub: 'Ada lantai di atas' },
  top:    { label: 'Lantai Atas',   sub: 'Langsung di bawah atap' },
}

function PKCalculator() {
  const [step, setStep] = useState<PKStep>(1)
  const [input, setInput] = useState<ACCalculatorInput>(defaultPKInput)
  const [result, setResult] = useState<ReturnType<typeof calculateAC> | null>(null)

  function handleCalculate() {
    const res = calculateAC(input)
    setResult(res)
    setStep(5)
    // Async tracking placeholder - backend not yet connected
    void fetch('/api/calculator-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pk', ...res }),
    }).catch(() => undefined)
  }

  function reset() {
    setInput(defaultPKInput)
    setResult(null)
    setStep(1)
  }

  const canGoNext = step === 1 ? input.length > 0 && input.width > 0 : true

  return (
    <div className="max-w-2xl mx-auto">
      {step < 5 && (
        <div className="flex items-center justify-center gap-2 mb-10">
          {([1, 2, 3, 4] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === s ? 'bg-daikin-blue text-white scale-110 shadow-md' : step > s ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 4 && <div className={`h-0.5 w-10 transition-all ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Dimensions */}
        {step === 1 && (
          <motion.div key="pk1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="floating-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-daikin-blue" />
                </div>
                <h2 className="text-xl font-bold text-charcoal">Dimensi Ruangan</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Panjang (meter)</label>
                  <input
                    type="number" min={1} max={50} step={0.1}
                    value={input.length || ''}
                    onChange={(e) => setInput({ ...input, length: parseFloat(e.target.value) || 0 })}
                    placeholder="mis: 4"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Lebar (meter)</label>
                  <input
                    type="number" min={1} max={50} step={0.1}
                    value={input.width || ''}
                    onChange={(e) => setInput({ ...input, width: parseFloat(e.target.value) || 0 })}
                    placeholder="mis: 3"
                    className="input-field"
                  />
                </div>
              </div>
              {input.length > 0 && input.width > 0 && (
                <p className="text-sm text-daikin-blue font-medium">
                  Luas ruangan: {(input.length * input.width).toFixed(1)} m²
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Window, Floor, Ceiling */}
        {step === 2 && (
          <motion.div key="pk2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="floating-card p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-charcoal mb-3">Tinggi Langit-Langit</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'standard', 'high'] as CeilingHeight[]).map((h) => (
                    <button key={h} onClick={() => setInput({ ...input, ceilingHeight: h })}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${input.ceilingHeight === h ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
                      <div className="font-semibold text-sm text-charcoal">{ceilingHeightLabels[h].label}</div>
                      <div className="text-xs text-gray-500">{ceilingHeightLabels[h].sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal mb-3">Ukuran Jendela</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(['small', 'medium', 'large'] as WindowSize[]).map((w) => (
                    <button key={w} onClick={() => setInput({ ...input, windowSize: w })}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${input.windowSize === w ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
                      <div className="font-semibold text-sm text-charcoal">{windowSizeLabels[w].label}</div>
                      <div className="text-xs text-gray-500">{windowSizeLabels[w].sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal mb-3">Posisi Lantai</h2>
                <div className="grid grid-cols-1 gap-2">
                  {(['ground', 'middle', 'top'] as RoomFloor[]).map((f) => (
                    <button key={f} onClick={() => setInput({ ...input, roomFloor: f })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${input.roomFloor === f ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
                      <span className="font-semibold text-sm text-charcoal">{roomFloorLabels[f].label}</span>
                      <span className="text-xs text-gray-500 ml-2">- {roomFloorLabels[f].sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Sun exposure + occupants */}
        {step === 3 && (
          <motion.div key="pk3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="floating-card p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-charcoal mb-3">Arah Paparan Matahari</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(['north', 'south', 'east', 'west', 'shaded'] as SunExposure[]).map((s) => (
                    <button key={s} onClick={() => setInput({ ...input, sunExposure: s })}
                      className={`p-3 rounded-xl border-2 text-left text-sm transition-all ${input.sunExposure === s ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
                      {sunExposureLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal mb-3">Jumlah Penghuni Biasanya</h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => setInput({ ...input, occupants: Math.max(1, input.occupants - 1) })}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-daikin-blue transition-colors">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="text-3xl font-bold text-daikin-blue w-12 text-center">{input.occupants}</div>
                  <button onClick={() => setInput({ ...input, occupants: Math.min(20, input.occupants + 1) })}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-daikin-blue transition-colors">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-gray-500 text-sm">orang</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Room type */}
        {step === 4 && (
          <motion.div key="pk4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="floating-card p-8">
              <h2 className="text-xl font-bold text-charcoal mb-6">Jenis Ruangan</h2>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(roomTypeLabels) as RoomType[]).map((rt) => (
                  <button key={rt} onClick={() => setInput({ ...input, roomType: rt })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${input.roomType === rt ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
                    <span className="text-sm font-medium text-charcoal">{roomTypeLabels[rt]}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Result */}
        {step === 5 && result && (
          <motion.div key="pk-result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="floating-card p-8 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-6"
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                  <img src="/images/mascot/icon-daikin-4.png" alt="Pichon-kun" className="h-24 w-auto mx-auto" loading="lazy" />
                </motion.div>
              </motion.div>

              <h2 className="text-xl font-bold text-charcoal mb-2">Rekomendasi Daikin</h2>

              <div className="my-6">
                <div className="text-gray-500 text-sm mb-1">Kapasitas AC yang disarankan</div>
                <div className="text-6xl font-bold text-daikin-blue mb-1">{result.pkLabel}</div>
                <div className="text-gray-500 text-sm">{result.btu.toLocaleString('id-ID')} BTU/h</div>
              </div>

              <div className="bg-daikin-blue-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-daikin-blue font-medium mb-1">💬 Pichon bilang:</p>
                <p className="text-sm text-charcoal">{result.recommendation}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm mb-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500 text-xs mb-1">Luas Ruangan</div>
                  <div className="font-semibold">{input.length} × {input.width} m</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500 text-xs mb-1">Jenis Ruangan</div>
                  <div className="font-semibold">{roomTypeLabels[input.roomType]}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500 text-xs mb-1">Penghuni</div>
                  <div className="font-semibold">{input.occupants} orang</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/products/residential" className="btn-primary flex-1 justify-center inline-flex">
                  Lihat AC {result.pkLabel}
                </Link>
                <button onClick={reset} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Hitung Ulang
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 5 && (
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1) as PKStep)} disabled={step === 1}>
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((s) => (s + 1) as PKStep)} disabled={!canGoNext}>
              Lanjut <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleCalculate}>
              Hitung Sekarang <Calculator className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Daya Calculator ──────────────────────────────────────────────────

const STATUS_CONFIG = {
  green:  { label: 'Aman',        color: 'text-green-600',  bg: 'bg-green-50',  bar: 'bg-green-500',  border: 'border-green-200' },
  yellow: { label: 'Perlu Hati-hati', color: 'text-yellow-600', bg: 'bg-yellow-50', bar: 'bg-yellow-400', border: 'border-yellow-200' },
  red:    { label: 'Tidak Cukup', color: 'text-red-600',    bg: 'bg-red-50',    bar: 'bg-red-500',    border: 'border-red-200' },
}

function DayaCalculator() {
  const [homeVA, setHomeVA] = useState(2200)
  const [appliances, setAppliances] = useState<Appliance[]>(
    PRESET_APPLIANCES.map((a) => ({ ...a, enabled: ['kulkas', 'tv', 'lampu'].includes(a.id) }))
  )
  const [newACModel, setNewACModel] = useState<ACModel>('inverter')
  const [existingACWatt, setExistingACWatt] = useState(0)

  const powerInput: PowerCalcInput = { homeCapacityVA: homeVA, appliances, newACModel, existingACWatt }
  const result = calculatePower(powerInput)
  const cfg = STATUS_CONFIG[result.status]

  const barPercent = Math.min(100, Math.max(0, (result.totalLoad / result.safeCapacity) * 100))

  useEffect(() => {
    if (result.status !== 'green') {
      void fetch('/api/calculator-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'daya', status: result.status, va: homeVA }),
      }).catch(() => undefined)
    }
  }, [result.status, homeVA])

  function toggleAppliance(id: string) {
    setAppliances((prev) => prev.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }
  function changeQty(id: string, delta: number) {
    setAppliances((prev) => prev.map((a) => a.id === id ? { ...a, qty: Math.max(1, a.qty + delta) } : a))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Live result card */}
      <FadeInUp>
        <div className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-6`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`font-bold text-lg ${cfg.color}`}>Status Daya: {cfg.label}</span>
            <span className={`text-2xl font-bold ${cfg.color}`}>
              {result.remaining >= 0 ? `+${result.remaining}W` : `${result.remaining}W`}
            </span>
          </div>
          {/* Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
            <motion.div
              className={`h-3 rounded-full ${cfg.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${barPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Beban: {result.totalLoad}W</span>
            <span>Kapasitas aman: {result.safeCapacity}W ({homeVA} VA × 80%)</span>
          </div>
          <p className={`text-sm mt-3 font-medium ${cfg.color}`}>{result.suggestion}</p>
        </div>
      </FadeInUp>

      {/* Step 1: Home capacity */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-daikin-blue" /> Kapasitas Daya Rumah
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {HOME_VA_OPTIONS.map((va) => (
            <button key={va} onClick={() => setHomeVA(va)}
              className={`py-2 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${homeVA === va ? 'border-daikin-blue bg-daikin-blue-50 text-daikin-blue' : 'border-gray-200 text-gray-600 hover:border-daikin-blue-light'}`}>
              {va.toLocaleString('id-ID')} VA
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Appliances */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Peralatan di Rumah</h3>
        <div className="space-y-2">
          {appliances.map((a) => (
            <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${a.enabled ? 'border-daikin-blue/30 bg-daikin-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
              <input type="checkbox" checked={a.enabled} onChange={() => toggleAppliance(a.id)}
                className="w-4 h-4 accent-daikin-blue flex-shrink-0 cursor-pointer" />
              <span className={`text-sm flex-1 ${a.enabled ? 'text-charcoal font-medium' : 'text-gray-400'}`}>{a.name}</span>
              <span className="text-xs text-gray-400 w-14 text-right">{a.watt}W</span>
              {a.enabled && (
                <div className="flex items-center gap-1">
                  <button onClick={() => changeQty(a.id, -1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-daikin-blue">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold w-5 text-center">{a.qty}</span>
                  <button onClick={() => changeQty(a.id, +1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-daikin-blue">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: New AC model */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Model AC yang Ingin Dibeli</h3>
        <div className="grid grid-cols-1 gap-3">
          {(Object.entries(AC_MODEL_WATT) as [ACModel, typeof AC_MODEL_WATT[ACModel]][]).map(([key, info]) => (
            <button key={key} onClick={() => setNewACModel(key)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${newACModel === key ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-charcoal">{info.label}</span>
                <span className={`text-sm font-bold ${newACModel === key ? 'text-daikin-blue' : 'text-gray-400'}`}>{info.watt}W</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{info.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 4: Existing AC */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">AC yang Sudah Ada (jika menyala bersamaan)</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Tidak Ada',  watt: 0   },
            { label: '1 AC Lama',  watt: 400 },
            { label: '1 AC Inverter', watt: 250 },
          ].map((opt) => (
            <button key={opt.label} onClick={() => setExistingACWatt(opt.watt)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${existingACWatt === opt.watt ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'}`}>
              <div className="text-sm font-semibold text-charcoal">{opt.label}</div>
              {opt.watt > 0 && <div className="text-xs text-gray-500">~{opt.watt}W</div>}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── Inverter Calculator ──────────────────────────────────────────────

type PKOption = 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5

const INVERTER_AC_DATA: Record<PKOption, { nonInverter: number; inverter: number; label: string }> = {
  0.5:  { nonInverter: 420,  inverter: 340,  label: '1/2 PK' },
  0.75: { nonInverter: 620,  inverter: 500,  label: '3/4 PK' },
  1:    { nonInverter: 820,  inverter: 660,  label: '1 PK' },
  1.5:  { nonInverter: 1200, inverter: 960,  label: '1.5 PK' },
  2:    { nonInverter: 1600, inverter: 1290, label: '2 PK' },
  2.5:  { nonInverter: 2000, inverter: 1620, label: '2.5 PK' },
}

const PLN_TARIFFS = [
  { label: 'R-1 / 450 VA',      value: 415  },
  { label: 'R-1 / 900 VA',      value: 1352 },
  { label: 'R-1 / 1300–2200 VA', value: 1444 },
  { label: 'R-2 / 3500–5500 VA', value: 1699 },
]

function InverterCalculator() {
  const [pk, setPk]             = useState<PKOption>(1)
  const [hours, setHours]       = useState(8)
  const [tariffIdx, setTariffIdx] = useState(2)

  const tariff   = PLN_TARIFFS[tariffIdx].value
  const data     = INVERTER_AC_DATA[pk]
  const days     = 30

  // Inverter on average runs at ~65% of rated watt (compressor modulates)
  const inverterAvgW    = Math.round(data.inverter * 0.65)
  const nonInverterAvgW = data.nonInverter

  const monthlyKWhInv    = (inverterAvgW    * hours * days) / 1000
  const monthlyKWhNonInv = (nonInverterAvgW * hours * days) / 1000

  const monthlyCostInv    = Math.round(monthlyKWhInv    * tariff)
  const monthlyCostNonInv = Math.round(monthlyKWhNonInv * tariff)
  const monthlySavings    = monthlyCostNonInv - monthlyCostInv
  const yearlySavings     = monthlySavings * 12
  const savingPct         = Math.round((monthlySavings / monthlyCostNonInv) * 100)

  // CO2: Indonesia grid emission factor ~0.85 kg/kWh
  const yearlyCO2 = (((monthlyKWhNonInv - monthlyKWhInv) * 12) * 0.85).toFixed(1)

  const fmt = (n: number) => n.toLocaleString('id-ID')

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Result card - live */}
      <div className="rounded-2xl bg-gradient-to-br from-daikin-blue-dark to-daikin-blue p-6 text-white shadow-lg">
        <p className="text-sm font-medium text-white/70 mb-1">Estimasi penghematan per bulan</p>
        <div className="text-5xl font-bold mb-1">Rp {fmt(monthlySavings)}</div>
        <p className="text-white/70 text-sm">
          Hemat <span className="font-bold text-white">{savingPct}%</span> dibanding AC non-inverter ·{' '}
          <span className="font-bold text-white">Rp {fmt(yearlySavings)}</span>/tahun
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm bg-white/10 rounded-xl px-4 py-2.5 w-fit">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span className="text-white/90">CO₂ lebih sedikit: <span className="font-bold text-white">{yearlyCO2} kg/tahun</span></span>
        </div>
      </div>

      {/* PK selector */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Kapasitas AC</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {(Object.keys(INVERTER_AC_DATA) as unknown as PKOption[]).map((p) => (
            <button
              key={p}
              onClick={() => setPk(p)}
              className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                pk === p ? 'border-daikin-blue bg-daikin-blue-50 text-daikin-blue' : 'border-gray-200 text-gray-600 hover:border-daikin-blue-light'
              }`}
            >
              {INVERTER_AC_DATA[p].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-gray-500 text-xs mb-1">Non-Inverter (rata-rata maks)</div>
            <div className="font-bold text-charcoal">{fmt(nonInverterAvgW)} W</div>
          </div>
          <div className="bg-daikin-blue-50 rounded-xl p-3">
            <div className="text-gray-500 text-xs mb-1">Inverter Daikin (rata-rata aktual)</div>
            <div className="font-bold text-daikin-blue">{fmt(inverterAvgW)} W</div>
          </div>
        </div>
      </div>

      {/* Usage hours */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Jam Pemakaian Per Hari</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setHours((h) => Math.max(1, h - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-daikin-blue transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <div className="text-4xl font-bold text-daikin-blue w-16 text-center">{hours}</div>
          <button
            onClick={() => setHours((h) => Math.min(24, h + 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-daikin-blue transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-gray-500 text-sm">jam/hari</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">{hours * days} jam/bulan · {(monthlyKWhInv).toFixed(1)} kWh (inverter) vs {(monthlyKWhNonInv).toFixed(1)} kWh (non-inverter)</p>
      </div>

      {/* Tariff selector */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Tarif Listrik PLN</h3>
        <div className="grid grid-cols-2 gap-2">
          {PLN_TARIFFS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTariffIdx(i)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                tariffIdx === i ? 'border-daikin-blue bg-daikin-blue-50' : 'border-gray-200 hover:border-daikin-blue-light'
              }`}
            >
              <div className={`text-xs font-semibold mb-0.5 ${tariffIdx === i ? 'text-daikin-blue' : 'text-gray-600'}`}>{t.label}</div>
              <div className="text-sm font-bold text-charcoal">Rp {fmt(t.value)}/kWh</div>
            </button>
          ))}
        </div>
      </div>

      {/* Monthly comparison */}
      <div className="floating-card p-6">
        <h3 className="font-bold text-charcoal mb-4">Perbandingan Biaya Bulanan</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Non-Inverter</span>
              <span className="font-semibold text-charcoal">Rp {fmt(monthlyCostNonInv)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="h-3 rounded-full bg-gray-400" style={{ width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-daikin-blue font-medium">Inverter Daikin</span>
              <span className="font-semibold text-daikin-blue">Rp {fmt(monthlyCostInv)}</span>
            </div>
            <div className="w-full bg-daikin-blue-50 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-daikin-blue"
                animate={{ width: `${100 - savingPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-700">
            Dengan <span className="font-bold">AC Inverter Daikin {INVERTER_AC_DATA[pk].label}</span>, Anda menghemat{' '}
            <span className="font-bold">Rp {fmt(monthlySavings)}/bulan</span> - setara{' '}
            <span className="font-bold">Rp {fmt(yearlySavings)}/tahun</span>.
          </p>
        </div>
      </div>

    </div>
  )
}

// ─── Page wrapper ─────────────────────────────────────────────────────

type Tab = 'pk' | 'daya' | 'inverter'

export default function ACCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>('pk')

  return (
    <PageTransition>
      <PageMeta title="Kalkulator AC" canonical="/solutions/ac-calculator" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Informasi', path: '/solutions' }, { label: 'Kalkulator AC' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kalkulator AC</h1>
            <p className="text-white/80 text-xl max-w-2xl">Hitung kebutuhan kapasitas PK dan kelayakan daya listrik rumah Anda - akurat dan gratis.</p>
          </FadeInUp>
        </div>
      </div>

      {/* Tab selector */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-0">
            {([
              { key: 'pk',       label: 'Kalkulator PK',       desc: 'Kapasitas ruangan' },
              { key: 'daya',     label: 'Kalkulator Daya',     desc: 'Kelayakan listrik' },
              { key: 'inverter', label: 'Kalkulator Inverter', desc: 'Hemat energi inverter' },
            ] as { key: Tab; label: string; desc: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-start px-6 py-4 border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-daikin-blue text-daikin-blue'
                    : 'border-transparent text-gray-500 hover:text-charcoal'
                }`}
              >
                <span className="font-semibold text-sm">{tab.label}</span>
                <span className="text-xs opacity-70">{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-container">
        <AnimatePresence mode="wait">
          {activeTab === 'pk' ? (
            <motion.div key="tab-pk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <PKCalculator />
            </motion.div>
          ) : activeTab === 'daya' ? (
            <motion.div key="tab-daya" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <DayaCalculator />
            </motion.div>
          ) : (
            <motion.div key="tab-inverter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <InverterCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  )
}
