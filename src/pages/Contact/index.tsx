import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import Button from '@/components/ui/Button'

const contactChannels = [
  {
    icon: Phone,
    title: 'Telepon',
    value: '0800 1 081 081',
    sub: 'Bebas pulsa, Senin – Jumat 08.00–17.00',
    gradient: 'from-daikin-blue to-daikin-blue-dark',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'customercare@daikin.co.id',
    sub: 'Kami merespons dalam 1×24 jam kerja',
    gradient: 'from-daikin-blue-dark to-[#0a1628]',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    value: '+62 811-1000-0202',
    sub: 'Chat langsung dengan tim kami',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    icon: MapPin,
    title: 'Kantor Pusat',
    value: 'Menara Astra Lt. 26',
    sub: 'Jl. Jend. Sudirman Kav. 5-6, Jakarta 10220',
    gradient: 'from-charcoal to-daikin-blue-dark',
  },
]

const officeHours = [
  { day: 'Senin – Jumat', hours: '08.00 – 17.00 WIB' },
  { day: 'Sabtu',         hours: '08.00 – 13.00 WIB' },
  { day: 'Minggu & Libur Nasional', hours: 'Tutup' },
]

const topics = [
  'Pertanyaan Produk',
  'Informasi Dealer',
  'Garansi & Servis',
  'Pelatihan & Sertifikasi',
  'Kemitraan & Dealer Baru',
  'Lainnya',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <PageMeta title="Hubungi Kami" description="Hubungi tim Daikin Indonesia - kami siap membantu pertanyaan seputar produk, servis, dan dealer." canonical="/contact" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Hubungi Kami' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kami Siap Membantu</h1>
            <p className="text-white/75 text-xl max-w-2xl leading-relaxed">
              Punya pertanyaan tentang produk, servis, atau dealer? Tim Daikin Indonesia hadir untuk Anda - melalui saluran yang paling nyaman bagi Anda.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Contact channels */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInUp stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactChannels.map(({ icon: Icon, title, value, sub, gradient }) => (
              <FadeInItem key={title}>
                <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${gradient} p-6 text-white h-full`}>
                  <div className="absolute inset-0 opacity-[0.07]" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }} />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-white/60 font-semibold uppercase tracking-wide mb-1">{title}</div>
                    <div className="font-bold text-base leading-snug mb-1">{value}</div>
                    <div className="text-white/55 text-xs leading-relaxed">{sub}</div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Contact form */}
            <FadeInLeft className="lg:col-span-3">
              <div className="accent-line" />
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">Kirim Pesan</h2>
              <p className="text-gray-500 text-sm mb-8">Isi formulir berikut dan tim kami akan menghubungi Anda secepatnya.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">Pesan Terkirim!</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Terima kasih telah menghubungi kami. Tim Daikin akan merespons dalam 1×24 jam kerja.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-daikin-blue text-sm font-semibold hover:underline"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">Nama Lengkap *</label>
                      <input type="text" required placeholder="Nama Anda" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">Email *</label>
                      <input type="email" required placeholder="nama@email.com" className="input-field" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">Nomor Telepon</label>
                      <input type="tel" placeholder="+62 8xx xxxx xxxx" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">Topik *</label>
                      <select required className="select-field">
                        <option value="">Pilih topik...</option>
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Pesan *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tuliskan pertanyaan atau kebutuhan Anda secara detail..."
                      className="input-field resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg">
                    <Send className="w-4 h-4" /> Kirim Pesan
                  </Button>
                </form>
              )}
            </FadeInLeft>

            {/* Info panel */}
            <FadeInRight className="lg:col-span-2 space-y-8">
              {/* Office hours */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-daikin-blue-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-daikin-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal">Jam Operasional</h3>
                </div>
                <div className="space-y-2.5">
                  {officeHours.map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{day}</span>
                      <span className={`text-sm font-semibold ${hours === 'Tutup' ? 'text-red-400' : 'text-charcoal'}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder - replace with <iframe> embed when ready */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-daikin-blue-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-daikin-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal">Lokasi Kantor Pusat</h3>
                </div>
                {/* ↓ Replace this div with <iframe src="https://maps.google.com/..." className="w-full h-52 rounded-xl border-0" /> */}
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gradient-to-br from-daikin-blue-50 to-daikin-blue-100 border border-daikin-blue/15">
                  <div className="absolute inset-0 opacity-[0.15]" style={{
                    backgroundImage: 'linear-gradient(rgba(0,151,224,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,151,224,0.2) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <MapPin className="w-8 h-8 text-daikin-blue" />
                    <p className="text-sm font-semibold text-daikin-blue-dark text-center px-4">
                      Menara Astra Lt. 26<br />
                      <span className="font-normal text-gray-500">Jl. Jend. Sudirman Kav. 5-6, Jakarta 10220</span>
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-daikin-blue font-semibold mt-2.5 hover:underline"
                >
                  Buka di Google Maps
                </a>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
