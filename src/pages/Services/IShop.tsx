import { useState } from 'react'
import { MapPin, Phone, Clock, ChevronDown, Store, Wrench, ShieldCheck, Building2, Users } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import { dealers, regionalSummary, DealerType } from '@/data/dealers'

const TYPE_META: Record<DealerType, { label: string; badge: string; icon: typeof Store }> = {
  ishop:          { label: 'iShop',          badge: 'bg-daikin-blue text-white',       icon: Store },
  proshop:        { label: 'ProShop',         badge: 'bg-daikin-blue-dark text-white',  icon: Building2 },
  service_center: { label: 'Service Center',  badge: 'bg-sky-600 text-white',           icon: Wrench },
}

const benefits = [
  'Produk AC Daikin lengkap & original',
  'Konsultasi gratis dengan ahli Daikin',
  'Instalasi profesional bergaransi',
  'Program cicilan 0% tersedia',
  'Layanan after-sales & garansi resmi',
]

const FILTER_TYPES: { value: DealerType | 'all'; label: string }[] = [
  { value: 'all',           label: 'Semua' },
  { value: 'ishop',         label: 'iShop' },
  { value: 'proshop',       label: 'ProShop' },
  { value: 'service_center',label: 'Service Center' },
]

export default function IShop() {
  const [openRegion, setOpenRegion]   = useState<number | null>(0)
  const [typeFilter, setTypeFilter]   = useState<DealerType | 'all'>('all')
  const [provFilter, setProvFilter]   = useState<string>('all')

  const allProvinces = ['all', ...Array.from(new Set(dealers.map(d => d.province))).sort()]

  const filtered = dealers.filter(d => {
    if (typeFilter !== 'all' && d.type !== typeFilter) return false
    if (provFilter !== 'all' && d.province !== provFilter) return false
    return true
  })

  const totalIshop   = dealers.filter(d => d.type === 'ishop').length
  const totalPro     = dealers.filter(d => d.type === 'proshop').length
  const totalSC      = dealers.filter(d => d.type === 'service_center').length

  return (
    <PageTransition>
      <PageMeta title="Temukan Dealer - iShop, ProShop & Service Center Daikin" canonical="/services/ishop" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Layanan', path: '/services' }, { label: 'Dealer & Service Center' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dealer & Service Center</h1>
            <p className="text-white/80 text-xl max-w-2xl">Temukan iShop, ProShop, dan Service Center Daikin resmi di seluruh Indonesia - konsultasi, pembelian, dan layanan purna jual di satu tempat.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">

        {/* ── Benefits ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Mengapa Belanja di Dealer Resmi?</h2>
            <ul className="space-y-3 mt-6">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-daikin-blue flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {b}
                </li>
              ))}
            </ul>
          </FadeInLeft>
          <FadeInRight>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Store,     label: 'iShop',          count: `${totalIshop}+`,  desc: 'Toko residential' },
                { icon: Building2, label: 'ProShop',         count: `${totalPro}+`,    desc: 'Toko komersial' },
                { icon: Wrench,    label: 'Service Center',  count: `${totalSC}+`,     desc: 'Pusat servis' },
              ].map(({ icon: Icon, label, count, desc }) => (
                <div key={label} className="floating-card p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-daikin-blue" />
                  </div>
                  <div className="text-2xl font-bold text-daikin-blue">{count}</div>
                  <div className="text-xs font-semibold text-charcoal">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </FadeInRight>
        </div>

        {/* ── Regional Breakdown ───────────────────────────────── */}
        <SectionHeading
          title="Jaringan Dealer per Wilayah"
          subtitle="Dealer resmi Daikin tersebar di seluruh nusantara. Klik wilayah untuk melihat rincian per provinsi."
        />

        <FadeInUp className="mb-20">
          <div className="space-y-3">
            {regionalSummary.map((region, ri) => {
              const totalIS  = region.provinces.reduce((s, p) => s + p.ishopCount, 0)
              const totalPS  = region.provinces.reduce((s, p) => s + p.proshopCount, 0)
              const totalSCr = region.provinces.reduce((s, p) => s + p.serviceCenterCount, 0)
              const isOpen   = openRegion === ri

              return (
                <div key={region.region} className="border border-gray-200 rounded-2xl overflow-hidden">

                  {/* Region header */}
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white hover:bg-daikin-blue-50 transition-colors text-left"
                    onClick={() => setOpenRegion(isOpen ? null : ri)}
                  >
                    <span className="text-lg font-bold text-charcoal">{region.region}</span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-xs font-semibold bg-daikin-blue-50 text-daikin-blue px-2.5 py-1 rounded-full">
                        <Store className="w-3 h-3" /> {totalIS} iShop
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold bg-daikin-blue-50 text-daikin-blue-dark px-2.5 py-1 rounded-full">
                        <Building2 className="w-3 h-3" /> {totalPS} ProShop
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full">
                        <Wrench className="w-3 h-3" /> {totalSCr} SC
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Province detail */}
                  {isOpen && (
                    <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">

                      {/* Province table */}
                      <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                          <thead className="bg-daikin-blue text-white">
                            <tr>
                              <th className="text-left px-4 py-3 font-semibold">Provinsi</th>
                              <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">iShop</th>
                              <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">ProShop</th>
                              <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">Service Center</th>
                              <th className="text-left px-4 py-3 font-semibold">Kota yang Dilayani</th>
                            </tr>
                          </thead>
                          <tbody>
                            {region.provinces.map((prov, pi) => (
                              <tr key={prov.name} className={pi % 2 === 0 ? 'bg-white' : 'bg-daikin-blue-50/30'}>
                                <td className="px-4 py-3 font-medium text-charcoal">{prov.name}</td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block min-w-[2rem] text-center font-bold text-daikin-blue">{prov.ishopCount}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block min-w-[2rem] text-center font-bold text-daikin-blue-dark">{prov.proshopCount}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className="inline-block min-w-[2rem] text-center font-bold text-sky-600">{prov.serviceCenterCount}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{prov.cities.join(' · ')}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-100 border-t border-gray-200">
                            <tr>
                              <td className="px-4 py-3 font-bold text-charcoal">Total {region.region}</td>
                              <td className="px-4 py-3 text-center font-bold text-daikin-blue">{totalIS}</td>
                              <td className="px-4 py-3 text-center font-bold text-daikin-blue-dark">{totalPS}</td>
                              <td className="px-4 py-3 text-center font-bold text-sky-600">{totalSCr}</td>
                              <td />
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* Highlight dealers */}
                      {region.provinces.some(p => (p.highlight ?? []).length > 0) && (
                        <>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Dealer Unggulan</p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {region.provinces
                              .flatMap(p => p.highlight ?? [])
                              .map(dealer => {
                                const meta = TYPE_META[dealer.type]
                                const Icon = meta.icon
                                return (
                                  <div key={dealer.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-daikin-blue/40 hover:shadow-card transition-all">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>
                                        {meta.label}
                                      </span>
                                      <div className="w-7 h-7 rounded-lg bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-daikin-blue" />
                                      </div>
                                    </div>
                                    <h4 className="font-bold text-charcoal text-sm mb-2">{dealer.name}</h4>
                                    <div className="space-y-1.5">
                                      <div className="flex items-start gap-2 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span>{dealer.address}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-xs text-daikin-blue font-medium">
                                        <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span>{dealer.phone}</span>
                                      </div>
                                      {dealer.openHours && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                          <span>{dealer.openHours}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </FadeInUp>

        {/* ── Complete Directory ────────────────────────────────── */}
        <SectionHeading
          title="Direktori Lengkap Dealer"
          subtitle="Filter berdasarkan tipe dealer atau provinsi untuk menemukan lokasi terdekat Anda."
        />

        <FadeInUp>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TYPES.map(f => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                    typeFilter === f.value
                      ? 'bg-daikin-blue text-white border-daikin-blue'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-daikin-blue/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Province filter */}
            <select
              value={provFilter}
              onChange={e => setProvFilter(e.target.value)}
              className="input-field text-sm py-1.5 w-full sm:w-56"
            >
              <option value="all">Semua Provinsi</option>
              {allProvinces.filter(p => p !== 'all').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 mb-5">
            Menampilkan <span className="font-semibold text-charcoal">{filtered.length}</span> dealer
            {typeFilter !== 'all' && ` · Tipe: ${TYPE_META[typeFilter as DealerType].label}`}
            {provFilter !== 'all' && ` · Provinsi: ${provFilter}`}
          </p>

          {/* Dealer grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((dealer, i) => {
                const meta = TYPE_META[dealer.type]
                const Icon = meta.icon
                return (
                  <FadeInUp key={dealer.id} delay={i * 0.04}>
                    <div className="floating-card p-5 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>
                          {meta.label}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-daikin-blue" />
                        </div>
                      </div>
                      <h3 className="font-bold text-charcoal mb-1">{dealer.name}</h3>
                      <p className="text-xs text-gray-400 mb-3">{dealer.province} · {dealer.city}</p>
                      <div className="space-y-2 mt-auto">
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{dealer.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-daikin-blue font-medium">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{dealer.phone}</span>
                        </div>
                        {dealer.openHours && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{dealer.openHours}</span>
                          </div>
                        )}
                        {dealer.isAuthorized && (
                          <div className="flex items-center gap-1.5 text-xs text-daikin-blue-dark font-medium pt-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Dealer Resmi Terotorisasi
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Tidak ada dealer ditemukan</p>
              <p className="text-sm mt-1">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </FadeInUp>

      </section>
    </PageTransition>
  )
}
