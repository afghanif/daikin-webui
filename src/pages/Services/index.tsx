import { Link } from 'react-router-dom'
import { ShoppingBag, Building2, Wrench, MapPin, ShieldCheck, ArrowRight, Users, Star, Clock, Award } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'

const services = [
  {
    icon: ShoppingBag,
    title: 'iShop',
    subtitle: 'Dealer Residensial',
    path: '/services/ishop',
    gradient: 'from-sky-400 to-daikin-blue',
    desc: 'Jaringan toko resmi Daikin untuk kebutuhan hunian. Setiap iShop dilengkapi display unit lengkap, konsultan terlatih, dan tim instalasi bersertifikat untuk memastikan pengalaman terbaik dari pemilihan hingga pemasangan.',
    count: '1200+ Dealer',
  },
  {
    icon: Building2,
    title: 'ProShop',
    subtitle: 'Dealer Komersial',
    path: '/services/proshop',
    gradient: 'from-slate-600 to-daikin-blue-dark',
    desc: 'Mitra resmi untuk proyek komersial berskala besar. ProShop Daikin memiliki keahlian teknis dalam merancang dan mengimplementasikan sistem VRV, Sky Air, dan HVAC-R untuk gedung perkantoran, hotel, rumah sakit, dan fasilitas industri.',
    count: '500+ ProShop',
  },
  {
    icon: Wrench,
    title: 'Service & Maintenance',
    subtitle: 'Perawatan Berkala',
    path: '/services/maintenance',
    gradient: 'from-orange-500 to-amber-600',
    desc: 'Program perawatan berkala yang dirancang untuk menjaga performa optimal AC Daikin Anda sepanjang tahun. Dilakukan oleh teknisi bersertifikat resmi Daikin dengan suku cadang orisinal untuk hasil terbaik dan garansi kerja.',
    count: '5000+ Teknisi',
  },
  {
    icon: MapPin,
    title: 'Service Center',
    subtitle: 'Pusat Servis Resmi',
    path: '/services/service-center',
    gradient: 'from-emerald-500 to-teal-700',
    desc: 'Lebih dari 500 titik service center resmi Daikin tersebar di seluruh Indonesia. Setiap pusat servis memiliki peralatan diagnostik canggih dan stok suku cadang orisinal untuk menangani berbagai kerusakan dengan cepat dan tepat.',
    count: '500+ Titik Servis',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty & Support',
    subtitle: 'Garansi & Dukungan',
    path: '/services/warranty',
    gradient: 'from-violet-500 to-purple-700',
    desc: 'Garansi komprehensif hingga 5 tahun untuk kompressor dan 1 tahun untuk suku cadang memberikan ketenangan pikiran. Layanan purna jual Daikin hadir memastikan investasi AC Anda terlindungi untuk jangka panjang.',
    count: 'Garansi 5 Tahun',
  },
]

const journey = [
  { step: '01', title: 'Konsultasi', desc: 'Kunjungi iShop atau ProShop terdekat. Tim ahli kami membantu Anda memilih unit yang tepat sesuai kebutuhan dan anggaran.' },
  { step: '02', title: 'Pembelian', desc: 'Proses pembelian mudah dengan berbagai metode pembayaran. Kami juga memfasilitasi cicilan tanpa bunga.' },
  { step: '03', title: 'Instalasi', desc: 'Teknisi bersertifikat Daikin melakukan pemasangan sesuai standar teknis untuk performa optimal dan keamanan pengguna.' },
  { step: '04', title: 'Perawatan', desc: 'Program servis berkala memastikan AC Anda selalu dalam kondisi prima dengan efisiensi energi dan kualitas udara terjaga.' },
  { step: '05', title: 'Dukungan Purna Jual', desc: 'Tim support Daikin siap membantu kapan pun Anda membutuhkan - dari konsultasi teknis hingga penanganan garansi.' },
]

const stats = [
  { value: '14', label: 'Kantor Cabang' },
  { value: '1200+', label: 'Dealer iShop' },
  { value: '500+', label: 'Titik Servis' },
  { value: '5000+', label: 'Teknisi Terlatih' },
]

const reasons = [
  { icon: Award, title: 'Teknisi Bersertifikat Resmi', desc: 'Setiap teknisi menjalani pelatihan intensif dan sertifikasi resmi dari Daikin Japan sebelum melayani pelanggan.' },
  { icon: Star, title: 'Suku Cadang 100% Orisinal', desc: 'Hanya menggunakan komponen asli Daikin yang terverifikasi untuk memastikan kinerja dan keawetan unit Anda.' },
  { icon: Clock, title: 'Respons Cepat', desc: 'Layanan darurat tersedia dengan waktu respons 24 jam untuk wilayah utama - kami mengerti setiap menit kenyamanan Anda berarti.' },
  { icon: Users, title: 'Jaringan Terluas', desc: 'Lebih dari 500 titik servis di seluruh Indonesia menjamin Anda tidak pernah jauh dari bantuan ahli Daikin.' },
]

export default function ServicesIndex() {
  return (
    <PageTransition>
      <PageMeta
        title="Layanan & Dealer Daikin Indonesia"
        description="Jaringan layanan Daikin terluas di Indonesia - 14 cabang, 1200+ dealer iShop, 500+ service center, dan 5000+ teknisi bersertifikat siap melayani Anda."
        canonical="/services"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Layanan' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Layanan & Dealer</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Dari konsultasi pertama hingga perawatan jangka panjang - jaringan layanan Daikin yang luas memastikan Anda mendapat dukungan terbaik di setiap langkah.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <FadeInUp stagger className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <FadeInItem key={label}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-daikin-blue mb-1">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </div>

      {/* Service cards */}
      <section className="section-container">
        <SectionHeading
          title="Ekosistem Layanan Lengkap"
          subtitle="Daikin membangun ekosistem layanan end-to-end yang tidak tertandingi - memastikan setiap pelanggan mendapatkan pengalaman terbaik dari awal hingga purna jual."
        />
        <FadeInUp stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <FadeInItem key={svc.path}>
                <Link to={svc.path} className="block group h-full">
                  <div className="floating-card overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                    <div className={`h-44 bg-gradient-to-br ${svc.gradient} relative overflow-hidden flex-shrink-0`}>
                      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 25% 45%, white, transparent 55%)' }} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white/85 uppercase tracking-wider">{svc.subtitle}</span>
                      </div>
                      <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {svc.count}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-charcoal group-hover:text-daikin-blue transition-colors mb-2">{svc.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">{svc.desc}</p>
                      <div className="flex items-center gap-1 text-daikin-blue text-sm font-semibold mt-4">
                        Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInItem>
            )
          })}
        </FadeInUp>
      </section>

      {/* Service journey */}
      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading
            title="Perjalanan Layanan Daikin"
            subtitle="Kami merancang setiap tahap perjalanan pelanggan - dari pertama kali mengenal Daikin hingga bertahun-tahun setelah pembelian."
            centered
          />
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-daikin-blue via-sky-400 to-daikin-blue opacity-20" />
            <FadeInUp stagger className="grid md:grid-cols-5 gap-6 relative">
              {journey.map((step) => (
                <FadeInItem key={step.step}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-daikin-blue text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h4 className="font-bold text-charcoal mb-2">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Why trust Daikin service */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Mengapa Mempercayakan AC Anda kepada Daikin?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Layanan purna jual yang baik bukan sekadar memperbaiki yang rusak - ini tentang memastikan investasi Anda terlindungi selama bertahun-tahun. Itulah filosofi di balik ekosistem layanan Daikin.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Setiap teknisi Daikin melewati proses seleksi ketat dan pelatihan berjenjang yang terakreditasi langsung oleh Daikin Japan. Mereka tidak hanya mahir secara teknis - mereka memahami standar kualitas yang ditetapkan dari markas besar kami di Osaka.
            </p>
            <div className="space-y-4">
              {reasons.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-soft-gray">
                  <div className="w-10 h-10 rounded-xl bg-daikin-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-daikin-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-0.5">{title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-daikin-blue via-sky-500 to-cyan-400 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 50%)' }} />
                <div className="absolute bottom-4 left-5">
                  <span className="text-white font-bold text-lg">Teknisi Bersertifikat</span>
                  <p className="text-white/70 text-sm">Terlatih & Terverifikasi Daikin Japan</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-orange-500 to-amber-600 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Suku Cadang Ori</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-emerald-600 to-teal-800 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">500+ Service Center</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* CTA */}
      <section className="section-bg-blue">
        <div className="section-container text-center">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">Temukan Dealer atau Service Center Terdekat</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Dengan lebih dari 1700 titik layanan di seluruh Indonesia, bantuan Daikin selalu dekat dari lokasi Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/ishop" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Temukan iShop
              </Link>
              <Link to="/services/service-center" className="btn-secondary inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Cari Service Center
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </PageTransition>
  )
}
