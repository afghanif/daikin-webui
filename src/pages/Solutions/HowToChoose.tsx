import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home, Building2, Maximize2, ArrowRight, Wrench,
  CheckCircle2, Calendar, ThermometerSun, Zap, Wind,
  Droplets, Settings, Calculator, ShieldCheck,
} from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'
import PichonKunHelper from '@/components/sections/PichonKunHelper'
import Tabs from '@/components/ui/Tabs'
import Accordion from '@/components/ui/Accordion'

// ─── Section A data ───────────────────────────────────────────────────

const capacityCards = [
  {
    label: 'Kecil',
    pk: '½ – ¾ PK',
    area: '≤ 12 m²',
    icon: Home,
    color: 'from-daikin-blue-light to-daikin-blue',
    bg: 'bg-daikin-blue-50',
    border: 'border-daikin-blue/20',
    examples: ['Kamar tidur anak', 'Kamar kos', 'Ruang kerja kecil'],
  },
  {
    label: 'Optimal',
    pk: '1 – 1½ PK',
    area: '12 – 25 m²',
    icon: Building2,
    color: 'from-daikin-blue to-daikin-blue-dark',
    bg: 'bg-daikin-blue-50',
    border: 'border-daikin-blue/30',
    examples: ['Kamar tidur standar', 'Ruang tamu kecil', 'Kantor personal'],
    highlight: true,
  },
  {
    label: 'Ekstra',
    pk: '2 PK ke atas',
    area: '> 25 m²',
    icon: Maximize2,
    color: 'from-daikin-blue-dark to-[#003d5e]',
    bg: 'bg-daikin-blue-50',
    border: 'border-daikin-blue/20',
    examples: ['Ruang tamu besar', 'Ruang keluarga', 'Ruang rapat'],
  },
]

// ─── Section B data ───────────────────────────────────────────────────

const comparisonRows = [
  { aspect: 'Konsumsi Daya',       inverter: 'Rendah, menyesuaikan beban (250–400W)', nonInverter: 'Tetap tinggi saat ON (~400–500W)' },
  { aspect: 'Kestabilan Suhu',     inverter: 'Stabil, tidak fluktuatif',              nonInverter: 'Fluktuatif, sering ON/OFF'          },
  { aspect: 'Biaya Operasional',   inverter: 'Hemat 30–60% vs Non-Inverter',         nonInverter: 'Lebih tinggi jangka panjang'        },
  { aspect: 'Harga Unit',          inverter: 'Lebih mahal (investasi awal)',          nonInverter: 'Lebih murah di awal'                },
  { aspect: 'Tingkat Kebisingan',  inverter: 'Senyap, kompresor tidak mati-nyala',   nonInverter: 'Lebih berisik saat kompresor ON'    },
  { aspect: 'Cocok untuk',         inverter: 'Penggunaan > 6 jam/hari',              nonInverter: 'Penggunaan < 4 jam/hari'            },
]

const inverterBenefits = [
  { icon: Zap,    text: 'Hemat listrik 30–60% dibanding Non-Inverter' },
  { icon: Wind,   text: 'Suhu ruangan terjaga stabil tanpa fluktuasi' },
  { icon: Settings, text: 'Kompresor berputar terus - tidak mati-nyala, lebih awet' },
]

const nonInverterBenefits = [
  { icon: CheckCircle2, text: 'Harga unit lebih terjangkau di awal' },
  { icon: Wrench,       text: 'Perawatan lebih sederhana' },
  { icon: ThermometerSun, text: 'Ideal untuk penggunaan singkat (< 4 jam)' },
]

// ─── Section C data ───────────────────────────────────────────────────

const installationItems = [
  { icon: Home,         title: 'Posisi Unit Indoor',                  desc: 'Pasang di dinding atas, minimal 15–20 cm dari langit-langit. Hindari tepat di atas pintu/jendela agar udara dingin tidak langsung keluar.' },
  { icon: Wind,         title: 'Sirkulasi Unit Outdoor',              desc: 'Butuh ruang minimal 30 cm di semua sisi untuk sirkulasi udara. Jangan tempatkan di area tertutup atau terkena sinar matahari langsung terus-menerus.' },
  { icon: Wrench,       title: 'Panjang Pipa Refrigeran',             desc: 'Panjang pipa ideal 3–5 meter. Semakin panjang pipa, semakin berkurang efisiensi. Pipa tidak boleh tertekuk atau melengkung tajam.' },
  { icon: Droplets,     title: 'Drainase & Pembuangan Air',           desc: 'Selang kondensasi harus miring ke bawah dengan kemiringan minimal 1:50 agar air tidak menggenang dan menetes.' },
  { icon: ShieldCheck,  title: 'Instalasi oleh Teknisi Bersertifikat', desc: 'Selalu gunakan teknisi bersertifikat Daikin. Instalasi mandiri atau oleh pihak tidak resmi dapat membatalkan garansi.' },
]

// ─── Section D data ───────────────────────────────────────────────────

const maintenanceSteps = [
  {
    key: 'filter',
    title: 'Bersihkan Filter Setiap 2 Minggu',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Lepaskan panel depan unit indoor</li>
        <li>Keluarkan filter, cuci dengan air mengalir</li>
        <li>Keringkan di tempat teduh sebelum dipasang kembali</li>
        <li>Filter kotor meningkatkan konsumsi daya 10–15%</li>
      </ul>
    ),
  },
  {
    key: 'kisi',
    title: 'Lap Kisi-Kisi & Bodi Luar',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Gunakan kain lembab, hindari bahan kimia keras</li>
        <li>Bersihkan kisi-kisi indoor dari debu yang menumpuk</li>
        <li>Pastikan unit outdoor bebas dari dedaunan dan kotoran</li>
      </ul>
    ),
  },
  {
    key: 'freon',
    title: 'Cek Freon (oleh Teknisi)',
    content: (
      <p className="text-sm">
        Penurunan performa pendinginan sering disebabkan freon berkurang. Pemeriksaan freon sebaiknya dilakukan oleh teknisi bersertifikat Daikin setiap 1–2 tahun sekali - jangan coba isi sendiri.
      </p>
    ),
  },
  {
    key: 'outdoor',
    title: 'Periksa Unit Outdoor',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Pastikan kipas outdoor berputar normal</li>
        <li>Tidak ada benda yang menghalangi sirkulasi udara</li>
        <li>Cek kondisi pipa refrigeran - tidak bocor atau tertekuk</li>
      </ul>
    ),
  },
]

const serviceSchedule = [
  { period: 'Setiap 2 Minggu', action: 'Bersihkan filter AC mandiri',           who: 'Mandiri' },
  { period: 'Setiap 3 Bulan',  action: 'Cuci filter menyeluruh + lap unit',     who: 'Mandiri' },
  { period: 'Setiap 6 Bulan',  action: 'Cuci AC profesional oleh teknisi',      who: 'Teknisi Daikin' },
  { period: 'Setiap 1–2 Tahun', action: 'Cek freon, kondensor, & komponen utama', who: 'Teknisi Daikin' },
]

// ─── Section E data ───────────────────────────────────────────────────

const usageTips = [
  {
    icon: ThermometerSun,
    title: 'Atur Suhu 24–25°C',
    desc: 'Setiap 1°C penurunan suhu dari 24°C dapat meningkatkan konsumsi listrik 6–8%. Suhu 24–25°C adalah titik optimal kenyamanan dan efisiensi.',
    highlight: 'Hemat 6–8% per °C',
    color: 'text-daikin-blue',
    bgColor: 'bg-daikin-blue-50',
  },
  {
    icon: Calendar,
    title: 'Gunakan Timer',
    desc: 'Aktifkan fitur timer untuk mematikan AC otomatis setelah Anda tidur (misal 3–4 jam). Ini mengurangi beban listrik semalaman.',
    highlight: 'Hemat tagihan malam',
    color: 'text-daikin-blue-dark',
    bgColor: 'bg-daikin-blue-50',
  },
  {
    icon: Droplets,
    title: 'Gunakan Mode Dry',
    desc: 'Mode Dry (Dehum) menurunkan kelembaban tanpa mendinginkan secara berlebihan - ideal di musim hujan untuk kenyamanan optimal dengan daya lebih rendah.',
    highlight: 'Ideal musim hujan',
    color: 'text-daikin-blue',
    bgColor: 'bg-daikin-blue-50',
  },
  {
    icon: Wind,
    title: 'Tutup Ruangan saat AC Menyala',
    desc: 'Celah di pintu/jendela menyebabkan udara dingin bocor keluar. Ruangan tertutup rapat membuat AC bekerja lebih efisien dan mencapai suhu target lebih cepat.',
    highlight: 'Efisiensi optimal',
    color: 'text-daikin-blue-dark',
    bgColor: 'bg-daikin-blue-50',
  },
]

// ─── Section nav items ────────────────────────────────────────────────

const sections = [
  { id: 'kapasitas',   label: 'Kapasitas' },
  { id: 'tipe',        label: 'Tipe AC' },
  { id: 'instalasi',   label: 'Instalasi' },
  { id: 'perawatan',   label: 'Perawatan' },
  { id: 'tips',        label: 'Tips' },
]

// ─── Component ───────────────────────────────────────────────────────

export default function HowToChoose() {
  const sectionRefs = {
    kapasitas:  useRef<HTMLElement>(null),
    tipe:       useRef<HTMLElement>(null),
    instalasi:  useRef<HTMLElement>(null),
    perawatan:  useRef<HTMLElement>(null),
    tips:       useRef<HTMLElement>(null),
  }

  function scrollTo(id: keyof typeof sectionRefs) {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageTransition>
      <PageMeta title="Panduan Memilih AC" canonical="/solutions/how-to-choose" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Informasi', path: '/solutions' }, { label: 'Panduan Memilih AC' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panduan Lengkap Memilih AC</h1>
            <p className="text-white/80 text-xl max-w-2xl">
              Dari kapasitas hingga perawatan - semua yang perlu Anda ketahui sebelum dan sesudah membeli AC Daikin.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* ── Section navigator (sticky) ───────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-0">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id as keyof typeof sectionRefs)}
                className="px-5 py-3.5 text-sm font-medium text-gray-500 hover:text-daikin-blue border-b-2 border-transparent hover:border-daikin-blue transition-all whitespace-nowrap"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section A: Kapasitas ─────────────────────────────── */}
      <section ref={sectionRefs.kapasitas} className="py-16 md:py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <SectionHeading
              title="Memilih Kapasitas AC"
              subtitle="Kapasitas AC diukur dalam PK (Paard Kracht) atau BTU/h. Pilih yang tepat agar AC tidak terlalu lemah atau boros."
            />
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {capacityCards.map((card, i) => (
              <FadeInUp key={card.label} delay={i * 0.1}>
                <div className={`rounded-2xl border-2 ${card.border} ${card.bg} p-6 h-full flex flex-col ${card.highlight ? 'ring-2 ring-daikin-blue ring-offset-2' : ''}`}>
                  {card.highlight && (
                    <div className="mb-3">
                      <span className="bg-daikin-blue text-white text-xs font-bold px-3 py-1 rounded-full">Paling Umum</span>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-1">{card.label}</h3>
                  <p className="text-3xl font-bold text-daikin-blue mb-1">{card.pk}</p>
                  <p className="text-sm text-gray-500 mb-4">Ideal untuk ruangan {card.area}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {card.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-daikin-blue flex-shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            ))}
          </div>

          <FadeInUp className="mt-10">
            <div className="bg-gradient-to-r from-daikin-blue-dark to-daikin-blue rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-white">
                <h3 className="text-lg font-bold mb-1">Tidak yakin butuh berapa PK?</h3>
                <p className="text-white/80 text-sm">Kalkulator Daya & PK kami menghitung kebutuhan akurat berdasarkan dimensi ruangan, arah matahari, jumlah penghuni, dan kondisi rumah Anda.</p>
              </div>
              <Link
                to="/solutions/ac-calculator"
                className="flex items-center gap-2 bg-white text-daikin-blue font-bold px-6 py-3 rounded-xl hover:bg-daikin-blue-50 transition-colors whitespace-nowrap flex-shrink-0"
              >
                <Calculator className="w-5 h-5" />
                Kalkulator Daya & PK
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Section B: Tipe AC ───────────────────────────────── */}
      <section ref={sectionRefs.tipe} className="py-16 md:py-24 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <SectionHeading
              title="Memilih Tipe AC"
              subtitle="Perbedaan utama Inverter dan Non-Inverter menentukan tagihan listrik dan kenyamanan Anda dalam jangka panjang."
            />
          </FadeInUp>

          <FadeInUp className="mt-10">
            <Tabs
              tabs={[
                { key: 'inverter',     label: 'Inverter',     icon: <Zap className="w-4 h-4" /> },
                { key: 'non_inverter', label: 'Non-Inverter', icon: <Settings className="w-4 h-4" /> },
                { key: 'comparison',   label: 'Perbandingan', icon: <ArrowRight className="w-4 h-4" /> },
              ]}
              defaultTab="inverter"
            >
              {(activeKey) => (
                <>
                  {activeKey === 'inverter' && (
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-2">AC Inverter</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          Teknologi Inverter mengatur kecepatan kompresor secara variabel sesuai kebutuhan suhu ruangan. Kompresor tidak mati-nyala, sehingga lebih hemat energi, lebih senyap, dan suhu lebih stabil.
                        </p>
                        <div className="space-y-4">
                          {inverterBenefits.map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3 bg-daikin-blue-50 rounded-xl p-3">
                              <b.icon className="w-5 h-5 text-daikin-blue flex-shrink-0" />
                              <span className="text-sm text-charcoal">{b.text}</span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="text-sm text-green-700 font-medium">Rekomendasi Daikin: pilih Inverter jika AC digunakan lebih dari 6 jam per hari.</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-daikin-blue to-daikin-blue-dark rounded-2xl p-8 text-white text-center">
                        <div className="text-5xl font-bold mb-2">30–60%</div>
                        <div className="text-white/80 text-lg mb-4">lebih hemat listrik</div>
                        <div className="text-sm text-white/60">dibandingkan AC Non-Inverter dengan penggunaan intensif</div>
                      </div>
                    </div>
                  )}
                  {activeKey === 'non_inverter' && (
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-2">AC Non-Inverter</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          AC Non-Inverter menggunakan kompresor dengan kecepatan tetap - mati saat suhu tercapai, nyala kembali saat suhu naik. Harga lebih murah di awal, namun tagihan listrik lebih tinggi untuk penggunaan intensif.
                        </p>
                        <div className="space-y-4">
                          {nonInverterBenefits.map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3 bg-gray-100 rounded-xl p-3">
                              <b.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              <span className="text-sm text-charcoal">{b.text}</span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <p className="text-sm text-yellow-700 font-medium">Cocok untuk: ruangan yang jarang digunakan atau penggunaan kurang dari 4 jam per hari.</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl p-8 text-white text-center">
                        <div className="text-5xl font-bold mb-2">~20%</div>
                        <div className="text-white/80 text-lg mb-4">lebih murah di awal</div>
                        <div className="text-sm text-white/60">namun biaya operasional lebih tinggi dalam jangka panjang</div>
                      </div>
                    </div>
                  )}
                  {activeKey === 'comparison' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 text-gray-500 font-medium w-1/3">Aspek</th>
                            <th className="text-left py-3 px-4 text-daikin-blue font-bold">Inverter</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-bold">Non-Inverter</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonRows.map((row, i) => (
                            <tr key={row.aspect} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="py-3 px-4 font-medium text-charcoal">{row.aspect}</td>
                              <td className="py-3 px-4 text-gray-600">{row.inverter}</td>
                              <td className="py-3 px-4 text-gray-600">{row.nonInverter}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </Tabs>
          </FadeInUp>
        </div>
      </section>

      {/* ── Section C: Instalasi ─────────────────────────────── */}
      <section ref={sectionRefs.instalasi} className="py-16 md:py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <SectionHeading
              title="Instalasi AC yang Benar"
              subtitle="Pemasangan yang tepat memastikan performa optimal, garansi tetap berlaku, dan keamanan jangka panjang."
            />
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-12 items-start mt-10">
            <FadeInUp>
              <div className="space-y-4">
                {installationItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-card transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-daikin-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeInUp>

            {/* SVG Airflow illustration */}
            <FadeInUp delay={0.15}>
              <div className="bg-gradient-to-br from-daikin-blue-50 to-white rounded-2xl p-8 border border-daikin-blue/10">
                <p className="text-sm font-semibold text-daikin-blue mb-4 text-center">Ilustrasi Aliran Udara AC Split</p>
                <svg viewBox="0 0 320 260" className="w-full max-w-xs mx-auto" aria-label="Diagram aliran udara AC">
                  {/* Room outline */}
                  <rect x="10" y="10" width="300" height="240" rx="8" fill="#f0f9ff" stroke="#0097E0" strokeWidth="1.5" strokeDasharray="6 3" />

                  {/* Indoor unit */}
                  <rect x="90" y="20" width="140" height="36" rx="6" fill="#0097E0" />
                  <text x="160" y="43" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Unit Indoor</text>

                  {/* Cold air arrows (downward fan) */}
                  {[-30, 0, 30].map((offset, i) => (
                    <g key={i}>
                      <line x1={160 + offset} y1="60" x2={160 + offset} y2="105" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                    </g>
                  ))}

                  {/* Circulation arrows */}
                  <path d="M80 110 Q40 140 80 200 Q120 230 160 220" stroke="#0097E0" strokeWidth="1.5" fill="none" strokeDasharray="5 3" markerEnd="url(#arrowCirc)" />
                  <path d="M240 110 Q280 140 240 200 Q200 230 160 220" stroke="#0097E0" strokeWidth="1.5" fill="none" strokeDasharray="5 3" markerEnd="url(#arrowCirc2)" />

                  {/* Return air arrows */}
                  {[-30, 30].map((offset, i) => (
                    <line key={i} x1={160 + offset} y1="115" x2={160 + offset + (offset < 0 ? -5 : 5)} y2="65" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
                  ))}

                  {/* Floor */}
                  <rect x="10" y="230" width="300" height="20" rx="0 0 8 8" fill="#e0f2fe" />
                  <text x="160" y="244" textAnchor="middle" fill="#0097E0" fontSize="10">Lantai</text>

                  {/* Label cold air */}
                  <text x="200" y="82" fill="#0369a1" fontSize="9">Udara Dingin</text>
                  {/* Label warm return */}
                  <text x="60" y="82" fill="#d97706" fontSize="9">Udara Kembali</text>

                  {/* Outdoor unit */}
                  <rect x="250" y="140" width="55" height="40" rx="4" fill="#475569" />
                  <text x="277" y="162" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Outdoor</text>
                  <line x1="240" y1="56" x2="255" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="240" y1="56" x2="240" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="240" y1="145" x2="250" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="224" y="103" fill="#64748b" fontSize="8">Pipa</text>

                  {/* Arrows defs */}
                  <defs>
                    <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
                    </marker>
                    <marker id="arrowCirc" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#0097E0" />
                    </marker>
                    <marker id="arrowCirc2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#0097E0" />
                    </marker>
                  </defs>
                </svg>
                <p className="text-xs text-gray-400 text-center mt-3">Udara panas di ruangan diserap unit indoor, didinginkan, lalu disirkulasikan kembali.</p>
              </div>

              <div className="mt-6 p-4 bg-daikin-blue-50 rounded-xl flex items-center justify-between gap-4">
                <p className="text-sm text-charcoal">Butuh instalasi resmi Daikin?</p>
                <Link to="/services/maintenance" className="flex items-center gap-2 text-daikin-blue font-semibold text-sm hover:underline whitespace-nowrap">
                  Booking Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── Section D: Perawatan ─────────────────────────────── */}
      <section ref={sectionRefs.perawatan} className="py-16 md:py-24 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <SectionHeading
              title="Merawat AC"
              subtitle="Perawatan rutin menjaga performa AC, memperpanjang umur unit, dan menjaga kualitas udara tetap sehat."
            />
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-12 mt-10">
            <FadeInUp>
              <h3 className="font-bold text-charcoal mb-4">Langkah Perawatan Mandiri</h3>
              <Accordion items={maintenanceSteps} allowMultiple />

              <div className="mt-6 p-4 bg-daikin-blue-50 rounded-xl flex items-center justify-between gap-4">
                <p className="text-sm text-charcoal">Jadwalkan cuci AC dengan teknisi Daikin</p>
                <Link to="/services/maintenance" className="flex items-center gap-2 text-daikin-blue font-semibold text-sm hover:underline whitespace-nowrap">
                  Jadwalkan Servis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h3 className="font-bold text-charcoal mb-4">Jadwal Perawatan yang Direkomendasikan</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-daikin-blue text-white">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Periode</th>
                      <th className="text-left py-3 px-4 font-medium">Tindakan</th>
                      <th className="text-left py-3 px-4 font-medium">Dilakukan oleh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {serviceSchedule.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 font-medium text-charcoal whitespace-nowrap">{row.period}</td>
                        <td className="py-3 px-4 text-gray-600">{row.action}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.who === 'Mandiri' ? 'bg-green-100 text-green-700' : 'bg-daikin-blue-50 text-daikin-blue'}`}>
                            {row.who}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── Section E: Tips Penggunaan ───────────────────────── */}
      <section ref={sectionRefs.tips} className="py-16 md:py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <SectionHeading
              title="Tips Penggunaan Hemat"
              subtitle="Kebiasaan kecil yang tepat bisa memangkas tagihan listrik tanpa mengorbankan kenyamanan."
            />
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {usageTips.map((tip, i) => (
              <FadeInUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow p-6 h-full flex flex-col">
                  <div className={`w-11 h-11 rounded-xl ${tip.bgColor} flex items-center justify-center mb-4`}>
                    <tip.icon className={`w-5 h-5 ${tip.color}`} />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{tip.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tip.desc}</p>
                  <div className={`mt-4 text-xs font-bold ${tip.color}`}>{tip.highlight}</div>
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* Energy saving stat */}
          <FadeInUp className="mt-12">
            <div className="bg-gradient-to-r from-daikin-blue-dark to-daikin-blue rounded-2xl p-8 text-white text-center">
              <p className="text-5xl font-bold mb-2">6–8%</p>
              <p className="text-white/80 text-lg">penghematan listrik untuk setiap kenaikan 1°C suhu dari 24°C</p>
              <p className="text-white/60 text-sm mt-2">Atur AC Anda di 24–25°C untuk kenyamanan dan efisiensi optimal</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      <PichonKunHelper
        message="Sudah tahu semua yang perlu diketahui? Coba Kalkulator AC untuk rekomendasi yang lebih presisi!"
        variant="help"
      />
    </PageTransition>
  )
}
