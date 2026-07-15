export type DealerType = 'ishop' | 'proshop' | 'service_center'

export interface Dealer {
  id: string
  name: string
  type: DealerType
  province: string
  city: string
  address: string
  phone: string
  isAuthorized: boolean
  openHours?: string
}

export interface RegionalSummary {
  region: string
  provinces: {
    name: string
    ishopCount: number
    proshopCount: number
    serviceCenterCount: number
    cities: string[]
    highlight?: Dealer[]
  }[]
}

export const dealers: Dealer[] = [
  // ── DKI Jakarta ───────────────────────────────────────────
  { id: 'jkt-001', name: 'Daikin iShop Sudirman',       type: 'ishop',          province: 'DKI Jakarta',     city: 'Jakarta Selatan', address: 'Jl. Jend. Sudirman No. 45, Jakarta Selatan 12190',           phone: '021-5678-9012', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'jkt-002', name: 'Daikin iShop Kelapa Gading',  type: 'ishop',          province: 'DKI Jakarta',     city: 'Jakarta Utara',   address: 'Mal Kelapa Gading 2 Lt. 1, Jakarta Utara',                   phone: '021-4567-8901', isAuthorized: true, openHours: 'Setiap Hari: 10.00–22.00' },
  { id: 'jkt-003', name: 'Daikin iShop Fatmawati',      type: 'ishop',          province: 'DKI Jakarta',     city: 'Jakarta Selatan', address: 'Jl. RS Fatmawati No. 33, Jakarta Selatan 12150',             phone: '021-7654-3210', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'jkt-004', name: 'Daikin ProShop Jakarta Pusat',type: 'proshop',        province: 'DKI Jakarta',     city: 'Jakarta Pusat',   address: 'Jl. Gatot Subroto Kav. 12, Jakarta Pusat 10270',             phone: '021-3456-7890', isAuthorized: true, openHours: 'Senin–Jumat: 08.00–17.00' },
  { id: 'jkt-005', name: 'Daikin Service Center Cempaka',type: 'service_center', province: 'DKI Jakarta',    city: 'Jakarta Pusat',   address: 'Jl. Cempaka Putih Tengah No. 12, Jakarta Pusat',             phone: '021-4244-5566', isAuthorized: true, openHours: 'Senin–Sabtu: 08.00–17.00' },
  // ── Jawa Barat ────────────────────────────────────────────
  { id: 'bjb-001', name: 'Daikin iShop Bandung Dago',   type: 'ishop',          province: 'Jawa Barat',      city: 'Bandung',         address: 'Jl. Dago No. 56, Bandung 40135',                             phone: '022-4567-8901', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–17.00' },
  { id: 'bjb-002', name: 'Daikin iShop Bandung Pasteur',type: 'ishop',          province: 'Jawa Barat',      city: 'Bandung',         address: 'Jl. Dr. Djundjunan No. 118, Bandung 40163',                  phone: '022-6031-2233', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'bjb-003', name: 'Daikin ProShop Bekasi',        type: 'proshop',        province: 'Jawa Barat',      city: 'Bekasi',          address: 'Ruko Grand Mall Bekasi Blok A7, Bekasi 17148',                phone: '021-8841-7799', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–17.00' },
  // ── Jawa Tengah ───────────────────────────────────────────
  { id: 'smg-001', name: 'Daikin iShop Semarang',        type: 'ishop',          province: 'Jawa Tengah',     city: 'Semarang',        address: 'Jl. Pandanaran No. 98, Semarang 50134',                      phone: '024-8440-1122', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'smg-002', name: 'Daikin Service Center Semarang',type: 'service_center',province: 'Jawa Tengah',     city: 'Semarang',        address: 'Jl. MT Haryono No. 45, Semarang 50136',                      phone: '024-8410-2233', isAuthorized: true, openHours: 'Senin–Sabtu: 08.00–17.00' },
  // ── Jawa Timur ────────────────────────────────────────────
  { id: 'sby-001', name: 'Daikin iShop Surabaya Darmo',  type: 'ishop',          province: 'Jawa Timur',      city: 'Surabaya',        address: 'Jl. Darmo No. 123, Surabaya 60264',                          phone: '031-5678-9012', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'sby-002', name: 'Daikin iShop Surabaya HR',     type: 'ishop',          province: 'Jawa Timur',      city: 'Surabaya',        address: 'Jl. HR Muhammad No. 234, Surabaya 60189',                    phone: '031-7325-4455', isAuthorized: true, openHours: 'Setiap Hari: 10.00–21.00' },
  { id: 'sby-003', name: 'Daikin ProShop Surabaya',      type: 'proshop',        province: 'Jawa Timur',      city: 'Surabaya',        address: 'Ruko Manyar Permai Blok B-12, Surabaya',                     phone: '031-6789-0123', isAuthorized: true, openHours: 'Senin–Jumat: 08.30–17.30' },
  { id: 'sby-004', name: 'Daikin iShop Malang',          type: 'ishop',          province: 'Jawa Timur',      city: 'Malang',          address: 'Jl. Soekarno Hatta No. 55, Malang 65141',                    phone: '0341-4455-6677', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  // ── Sumatera Utara ────────────────────────────────────────
  { id: 'mdn-001', name: 'Daikin iShop Medan Imam Bonjol',type: 'ishop',         province: 'Sumatera Utara',  city: 'Medan',           address: 'Jl. Imam Bonjol No. 78, Medan 20152',                        phone: '061-5678-9012', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–17.00' },
  { id: 'mdn-002', name: 'Daikin iShop Medan Sun Plaza',  type: 'ishop',         province: 'Sumatera Utara',  city: 'Medan',           address: 'Sun Plaza Lt. 3, Jl. K.H. Zainul Arifin, Medan 20117',       phone: '061-4512-7788', isAuthorized: true, openHours: 'Setiap Hari: 10.00–22.00' },
  { id: 'mdn-003', name: 'Daikin Service Center Medan',   type: 'service_center',province: 'Sumatera Utara',  city: 'Medan',           address: 'Jl. Gatot Subroto No. 153, Medan 20113',                     phone: '061-8880-1199', isAuthorized: true, openHours: 'Senin–Sabtu: 08.00–17.00' },
  // ── Sumatera Selatan ──────────────────────────────────────
  { id: 'plb-001', name: 'Daikin iShop Palembang',        type: 'ishop',         province: 'Sumatera Selatan',city: 'Palembang',       address: 'Jl. Jend. Sudirman No. 321, Palembang 30127',                phone: '0711-3344-5566', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  // ── Bali ──────────────────────────────────────────────────
  { id: 'bali-001', name: 'Daikin iShop Denpasar',        type: 'ishop',         province: 'Bali',            city: 'Denpasar',        address: 'Jl. Teuku Umar No. 99, Denpasar 80114',                      phone: '0361-8880-2233', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  { id: 'bali-002', name: 'Daikin iShop Kuta',            type: 'ishop',         province: 'Bali',            city: 'Badung',          address: 'Jl. Raya Kuta No. 56, Kuta, Badung 80361',                   phone: '0361-7550-4411', isAuthorized: true, openHours: 'Setiap Hari: 09.00–20.00' },
  // ── Sulawesi Selatan ──────────────────────────────────────
  { id: 'mks-001', name: 'Daikin iShop Makassar',         type: 'ishop',         province: 'Sulawesi Selatan',city: 'Makassar',        address: 'Jl. Ratulangi No. 34, Makassar 90123',                       phone: '0411-3456-789', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–17.00' },
  { id: 'mks-002', name: 'Daikin ProShop Makassar',       type: 'proshop',       province: 'Sulawesi Selatan',city: 'Makassar',        address: 'Ruko Pettarani Business Center No. 5, Makassar',             phone: '0411-5567-8899', isAuthorized: true, openHours: 'Senin–Jumat: 08.00–17.00' },
  // ── Kalimantan Timur ──────────────────────────────────────
  { id: 'bpn-001', name: 'Daikin iShop Balikpapan',       type: 'ishop',         province: 'Kalimantan Timur',city: 'Balikpapan',      address: 'Jl. Jend. Sudirman No. 44, Balikpapan 76114',                phone: '0542-7766-5544', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
  // ── Riau ──────────────────────────────────────────────────
  { id: 'pkg-001', name: 'Daikin iShop Pekanbaru',        type: 'ishop',         province: 'Riau',            city: 'Pekanbaru',       address: 'Jl. Sudirman No. 412, Pekanbaru 28122',                      phone: '0761-5566-7788', isAuthorized: true, openHours: 'Senin–Sabtu: 09.00–18.00' },
]

export const regionalSummary: RegionalSummary[] = [
  {
    region: 'Pulau Jawa',
    provinces: [
      { name: 'DKI Jakarta',   ishopCount: 3,  proshopCount: 1, serviceCenterCount: 1, cities: ['Jakarta Selatan', 'Jakarta Utara', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur'], highlight: dealers.filter(d => d.province === 'DKI Jakarta').slice(0, 3) },
      { name: 'Jawa Barat',    ishopCount: 10, proshopCount: 3, serviceCenterCount: 2, cities: ['Bandung', 'Bekasi', 'Depok', 'Bogor', 'Cirebon'], highlight: dealers.filter(d => d.province === 'Jawa Barat').slice(0, 2) },
      { name: 'Jawa Tengah',   ishopCount: 8,  proshopCount: 2, serviceCenterCount: 2, cities: ['Semarang', 'Solo', 'Yogyakarta', 'Purwokerto'], highlight: dealers.filter(d => d.province === 'Jawa Tengah').slice(0, 1) },
      { name: 'Jawa Timur',    ishopCount: 12, proshopCount: 4, serviceCenterCount: 3, cities: ['Surabaya', 'Malang', 'Kediri', 'Jember', 'Gresik'], highlight: dealers.filter(d => d.province === 'Jawa Timur').slice(0, 3) },
    ],
  },
  {
    region: 'Sumatera',
    provinces: [
      { name: 'Sumatera Utara',    ishopCount: 6,  proshopCount: 1, serviceCenterCount: 2, cities: ['Medan', 'Binjai', 'Pematangsiantar'], highlight: dealers.filter(d => d.province === 'Sumatera Utara').slice(0, 2) },
      { name: 'Sumatera Selatan',  ishopCount: 4,  proshopCount: 1, serviceCenterCount: 1, cities: ['Palembang', 'Lubuklinggau'], highlight: dealers.filter(d => d.province === 'Sumatera Selatan').slice(0, 1) },
      { name: 'Riau',              ishopCount: 4,  proshopCount: 1, serviceCenterCount: 1, cities: ['Pekanbaru', 'Dumai'], highlight: dealers.filter(d => d.province === 'Riau').slice(0, 1) },
      { name: 'Sumatera Barat',    ishopCount: 3,  proshopCount: 1, serviceCenterCount: 1, cities: ['Padang', 'Bukittinggi'], highlight: [] },
      { name: 'Lampung',           ishopCount: 3,  proshopCount: 1, serviceCenterCount: 1, cities: ['Bandar Lampung'], highlight: [] },
    ],
  },
  {
    region: 'Kalimantan',
    provinces: [
      { name: 'Kalimantan Timur',  ishopCount: 3,  proshopCount: 1, serviceCenterCount: 1, cities: ['Balikpapan', 'Samarinda'], highlight: dealers.filter(d => d.province === 'Kalimantan Timur').slice(0, 1) },
      { name: 'Kalimantan Selatan',ishopCount: 2,  proshopCount: 1, serviceCenterCount: 1, cities: ['Banjarmasin'], highlight: [] },
      { name: 'Kalimantan Barat',  ishopCount: 2,  proshopCount: 1, serviceCenterCount: 1, cities: ['Pontianak'], highlight: [] },
    ],
  },
  {
    region: 'Bali & Nusa Tenggara',
    provinces: [
      { name: 'Bali',              ishopCount: 5,  proshopCount: 2, serviceCenterCount: 2, cities: ['Denpasar', 'Badung', 'Gianyar'], highlight: dealers.filter(d => d.province === 'Bali').slice(0, 2) },
      { name: 'Nusa Tenggara Barat',ishopCount: 2, proshopCount: 1, serviceCenterCount: 1, cities: ['Mataram'], highlight: [] },
    ],
  },
  {
    region: 'Sulawesi',
    provinces: [
      { name: 'Sulawesi Selatan',  ishopCount: 5,  proshopCount: 2, serviceCenterCount: 2, cities: ['Makassar', 'Parepare'], highlight: dealers.filter(d => d.province === 'Sulawesi Selatan').slice(0, 2) },
      { name: 'Sulawesi Utara',    ishopCount: 2,  proshopCount: 1, serviceCenterCount: 1, cities: ['Manado'], highlight: [] },
    ],
  },
]

export const provinces = [...new Set(dealers.map((d) => d.province))].sort()

export function getDealersByType(type: DealerType) {
  return dealers.filter((d) => d.type === type)
}

export function getDealersByProvince(province: string) {
  return dealers.filter((d) => d.province === province)
}
