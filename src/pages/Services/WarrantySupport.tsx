import { ShieldCheck, FileText, PhoneCall, Wrench, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import Accordion from '@/components/ui/Accordion'
import FadeInUp from '@/components/animations/FadeInUp'
import { FadeInLeft } from '@/components/animations/FadeInLeft'

const warrantyItems = [
  { key: 'q1', title: 'Berapa lama garansi produk Daikin?', content: 'Garansi standar Daikin adalah 1 tahun untuk unit dan 5 tahun untuk kompressor pada semua produk inverter. Garansi diperpanjang tersedia melalui program Daikin Extended Warranty.' },
  { key: 'q2', title: 'Apa saja yang ditanggung garansi?', content: 'Garansi mencakup kerusakan akibat cacat produksi atau material. Tidak termasuk kerusakan akibat penggunaan yang tidak sesuai, bencana alam, atau instalasi oleh pihak tidak bersertifikat.' },
  { key: 'q3', title: 'Apakah garansi berlaku jika diinstalasi sendiri?', content: 'Garansi hanya berlaku jika instalasi dilakukan oleh teknisi bersertifikat Daikin. Instalasi mandiri dapat membatalkan garansi dan membahayakan keselamatan.' },
  { key: 'q4', title: 'Bagaimana cara mendaftarkan produk untuk garansi diperpanjang?', content: 'Daftarkan produk Anda di website Daikin atau melalui iShop/ProShop terdekat dalam 30 hari setelah pembelian untuk mendapatkan garansi diperpanjang secara otomatis.' },
  { key: 'q5', title: 'Berapa lama proses klaim garansi?', content: 'Estimasi waktu penyelesaian klaim 3–7 hari kerja tergantung ketersediaan suku cadang. Anda akan dihubungi oleh teknisi Daikin untuk penjadwalan kunjungan.' },
]

const claimSteps = [
  {
    step: '01',
    icon: FileText,
    title: 'Siapkan Dokumen',
    desc: 'Kartu garansi asli, bukti pembelian/nota, dan foto kerusakan unit jika ada.',
  },
  {
    step: '02',
    icon: PhoneCall,
    title: 'Hubungi Customer Care',
    desc: 'Telepon 0800-1-234567 (bebas pulsa) atau WhatsApp ke 08119048058. Sampaikan nomor model dan keluhan.',
  },
  {
    step: '03',
    icon: MessageCircle,
    title: 'Konfirmasi & Penjadwalan',
    desc: 'Tim Daikin akan memverifikasi garansi dan menjadwalkan kunjungan teknisi ke lokasi Anda.',
  },
  {
    step: '04',
    icon: Wrench,
    title: 'Diagnosa & Perbaikan',
    desc: 'Teknisi bersertifikat melakukan diagnosa dan perbaikan menggunakan suku cadang resmi Daikin.',
  },
  {
    step: '05',
    icon: CheckCircle2,
    title: 'Selesai & Terjamin',
    desc: 'Unit dikembalikan dalam kondisi prima. Perbaikan dalam masa garansi tanpa biaya tambahan.',
  },
]

export default function WarrantySupport() {
  return (
    <PageTransition>
      <PageMeta title="Jaminan & Garansi" canonical="/services/warranty" />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Layanan', path: '/services' }, { label: 'Jaminan & Garansi' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Jaminan & Garansi</h1>
            <p className="text-white/80 text-xl max-w-2xl">Investasi Anda terlindungi dengan program garansi komprehensif dan dukungan purna jual Daikin.</p>
          </FadeInUp>
        </div>
      </div>

      <section className="section-container">

        {/* Warranty tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Garansi Unit',         period: '1 Tahun',       desc: 'Semua komponen unit tercover dari cacat produksi.' },
            { title: 'Garansi Kompressor',   period: '5 Tahun',       desc: 'Kompressor inverter terlindungi selama 5 tahun penuh.' },
            { title: 'Garansi Diperpanjang', period: 'Hingga 10 Tahun', desc: 'Proteksi maksimal dengan program Extended Warranty.' },
          ].map((w) => (
            <FadeInUp key={w.title}>
              <div className="floating-card p-6 text-center">
                <ShieldCheck className="w-12 h-12 text-daikin-blue mx-auto mb-4" />
                <h3 className="font-bold text-charcoal mb-1">{w.title}</h3>
                <p className="text-3xl font-bold text-daikin-blue mb-2">{w.period}</p>
                <p className="text-sm text-gray-600">{w.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Claim flow */}
        <SectionHeading
          title="Cara Pengajuan Klaim Garansi"
          subtitle="Prosedur klaim garansi Daikin dirancang agar mudah, cepat, dan transparan."
        />
        <FadeInUp className="mb-16">
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-daikin-blue/15 z-0" style={{ margin: '0 10%' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {claimSteps.map((s, i) => (
                <div key={s.step} className="flex flex-col items-center text-center gap-3">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-card flex-shrink-0 ${i === 0 || i === 4 ? 'bg-daikin-blue' : 'bg-white border-2 border-daikin-blue/20'}`}>
                    <s.icon className={`w-8 h-8 ${i === 0 || i === 4 ? 'text-white' : 'text-daikin-blue'}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-daikin-blue mb-1">Langkah {s.step}</div>
                    <h4 className="font-bold text-charcoal text-sm mb-1">{s.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* WhatsApp contact + hotline */}
        <FadeInUp className="mb-16">
          <div className="grid md:grid-cols-2 gap-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/628119048058"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-5 bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:border-[#25D366]/60 rounded-2xl p-6 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-md">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#25D366] uppercase tracking-wide mb-1">Solusi Mudah</div>
                <h3 className="font-bold text-charcoal text-lg mb-1">Hubungi via WhatsApp</h3>
                <p className="text-gray-500 text-sm mb-3">Konsultasi kendala produk dan pengajuan garansi langsung lewat WhatsApp - respons cepat, mudah, dan gratis.</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal text-lg tracking-wide">0811-904-8058</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#25D366] group-hover:gap-2 transition-all">
                    Chat Sekarang <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>

            {/* Hotline */}
            <div className="flex items-start gap-5 bg-daikin-blue-50 border-2 border-daikin-blue/20 rounded-2xl p-6">
              <div className="w-14 h-14 rounded-xl bg-daikin-blue flex items-center justify-center flex-shrink-0 shadow-md">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-daikin-blue uppercase tracking-wide mb-1">Bebas Pulsa</div>
                <h3 className="font-bold text-charcoal text-lg mb-1">Customer Care Daikin</h3>
                <p className="text-gray-500 text-sm mb-3">Senin–Jumat 08.00–17.00 WIB. Layanan teknis, informasi garansi, dan pendaftaran unit.</p>
                <span className="font-bold text-charcoal text-lg tracking-wide">0800-1-234567</span>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* FAQ */}
        <FadeInLeft>
          <SectionHeading title="FAQ Garansi" subtitle="Pertanyaan yang sering ditanyakan tentang garansi produk Daikin." />
        </FadeInLeft>
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <Accordion items={warrantyItems} />
          </FadeInUp>
        </div>

      </section>
    </PageTransition>
  )
}
