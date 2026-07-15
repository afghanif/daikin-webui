export interface Appliance {
  id: string
  name: string
  watt: number
  qty: number
  enabled: boolean
}

export type ACModel = 'low_watt' | 'standard' | 'inverter'

export interface PowerCalcInput {
  homeCapacityVA: number
  appliances: Appliance[]
  newACModel: ACModel
  existingACWatt: number
}

export interface PowerCalcResult {
  totalLoad: number
  safeCapacity: number
  remaining: number
  status: 'green' | 'yellow' | 'red'
  suggestion: string
}

export const AC_MODEL_WATT: Record<ACModel, { label: string; watt: number; desc: string }> = {
  low_watt:  { label: 'Low Watt', watt: 330,  desc: 'Konsumsi daya rendah, ideal untuk daya terbatas' },
  standard:  { label: 'Standard', watt: 400,  desc: 'Konsumsi daya standar, performa optimal' },
  inverter:  { label: 'Inverter', watt: 250,  desc: 'Hemat 30–60% energi, stabil & senyap' },
}

export const HOME_VA_OPTIONS = [450, 900, 1300, 2200, 3500, 4400, 5500, 6600]

export const PRESET_APPLIANCES: Omit<Appliance, 'enabled'>[] = [
  { id: 'kulkas',     name: 'Kulkas',        watt: 150, qty: 1 },
  { id: 'tv',         name: 'TV LED',         watt: 100, qty: 1 },
  { id: 'pompa_air',  name: 'Pompa Air',      watt: 350, qty: 1 },
  { id: 'mesin_cuci', name: 'Mesin Cuci',     watt: 300, qty: 1 },
  { id: 'rice_cooker',name: 'Rice Cooker',    watt: 400, qty: 1 },
  { id: 'setrika',    name: 'Setrika',        watt: 300, qty: 1 },
  { id: 'kipas',      name: 'Kipas Angin',    watt:  50, qty: 1 },
  { id: 'lampu',      name: 'Lampu (per titik)', watt: 15, qty: 5 },
  { id: 'laptop',     name: 'Laptop/PC',      watt: 100, qty: 1 },
]

export function calculatePower(input: PowerCalcInput): PowerCalcResult {
  const { homeCapacityVA, appliances, newACModel, existingACWatt } = input

  const safeCapacity = homeCapacityVA * 0.8

  const applianceLoad = appliances
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.watt * a.qty, 0)

  const newACWatt = AC_MODEL_WATT[newACModel].watt
  const totalLoad = applianceLoad + newACWatt + existingACWatt
  const remaining = safeCapacity - totalLoad

  let status: 'green' | 'yellow' | 'red'
  let suggestion = ''

  if (remaining > 500) {
    status = 'green'
    suggestion = 'Kapasitas daya Anda aman. AC yang dipilih dapat dipasang tanpa masalah.'
  } else if (remaining >= 0) {
    status = 'yellow'
    suggestion = 'Sisa daya cukup sempit. Pertimbangkan AC Low Watt atau Inverter Daikin untuk konsumsi lebih hemat.'
  } else {
    status = 'red'
    suggestion = 'Kapasitas daya tidak mencukupi. Kami sarankan upgrade daya PLN atau pilih Daikin Inverter (250W) yang paling hemat.'
  }

  return { totalLoad, safeCapacity, remaining, status, suggestion }
}
