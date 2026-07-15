import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Briefcase, ArrowRight, Globe, BookOpen, DollarSign, HeartHandshake, Users, TrendingUp, Award } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/sections/SectionHeading'
import FadeInUp, { FadeInItem } from '@/components/animations/FadeInUp'
import { FadeInLeft, FadeInRight } from '@/components/animations/FadeInLeft'
import { jobs } from '@/data/careers'

const deptFilters = ['Semua', ...new Set(jobs.map((j) => j.department))]

const typeLabel: Record<string, string> = { 'full-time': 'Full-Time', 'contract': 'Kontrak', 'internship': 'Magang' }
const typeBg: Record<string, string> = { 'full-time': 'bg-daikin-blue-50 text-daikin-blue', 'contract': 'bg-purple-50 text-purple-600', 'internship': 'bg-green-50 text-green-600' }

const benefits = [
  { icon: Globe, title: 'Jaringan Global', desc: 'Peluang karir dan rotasi di 160+ negara sebagai bagian dari ekosistem global Daikin Group.' },
  { icon: BookOpen, title: 'Learning & Development', desc: 'Akses ke Daikin Academy, e-learning platform, dan program pelatihan internasional secara berkelanjutan.' },
  { icon: DollarSign, title: 'Kompensasi Kompetitif', desc: 'Struktur gaji yang kompetitif di industri, dilengkapi bonus kinerja, THR, dan berbagai tunjangan.' },
  { icon: HeartHandshake, title: 'Work-Life Balance', desc: 'Lingkungan kerja yang suportif, fleksibel, dan mengedepankan kesehatan fisik maupun mental karyawan.' },
  { icon: TrendingUp, title: 'Jenjang Karir Jelas', desc: 'Sistem promosi berbasis kinerja yang transparan dengan jalur karir yang terstruktur dan terencana.' },
  { icon: Award, title: 'Program Penghargaan', desc: 'Pengakuan prestasi melalui Employee of the Month, Long Service Award, dan program apresiasi lainnya.' },
]

const cultureCards = [
  { title: 'Tim yang Kolaboratif', gradient: 'from-daikin-blue to-sky-400', sub: 'People & Culture' },
  { title: 'Inovasi Tanpa Henti', gradient: 'from-slate-600 to-daikin-blue-dark', sub: 'Innovation Lab' },
  { title: 'Lingkungan Inklusif', gradient: 'from-emerald-500 to-teal-700', sub: 'Diversity & Inclusion' },
  { title: 'Belajar Setiap Hari', gradient: 'from-violet-500 to-purple-700', sub: 'Learning Culture' },
]

const recruitmentSteps = [
  { step: '01', title: 'Lamar Online', desc: 'Kirimkan CV dan surat lamaran melalui portal karir kami. Proses cepat dan mudah.' },
  { step: '02', title: 'Seleksi Administrasi', desc: 'Tim HR kami meninjau kelengkapan dan kesesuaian profil Anda dalam 5–7 hari kerja.' },
  { step: '03', title: 'Tes & Wawancara', desc: 'Sesi wawancara langsung dengan HR dan manajer departemen terkait.' },
  { step: '04', title: 'Offering & Onboarding', desc: 'Presentasi penawaran kerja dan program onboarding intensif untuk karyawan baru.' },
]

export default function Careers() {
  const [activeDept, setActiveDept] = useState('Semua')

  const filtered = activeDept === 'Semua' ? jobs : jobs.filter((j) => j.department === activeDept)

  return (
    <PageTransition>
      <PageMeta
        title="Karir di Daikin Indonesia"
        description="Bergabunglah dengan tim Daikin Indonesia - karir yang bermakna, jaringan global, dan peluang tumbuh bersama pemimpin industri HVAC dunia."
        canonical="/careers"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Karir' }]} className="text-white mb-6" />
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Karir di Daikin</h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Bergabunglah dengan tim Daikin Indonesia dan bangun karir yang bermakna bersama pemimpin industri AC global. Kami percaya karyawan yang bahagia menciptakan produk yang luar biasa.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Culture - gradient photo cards */}
      <section className="section-container">
        <SectionHeading
          title="Budaya Kerja Daikin"
          subtitle="Di Daikin, kami membangun budaya di mana setiap orang merasa dihargai, didukung untuk berkembang, dan terinspirasi untuk memberikan yang terbaik setiap hari."
        />
        <FadeInUp stagger className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {cultureCards.map((card) => (
            <FadeInItem key={card.title}>
              <div className={`rounded-2xl overflow-hidden h-52 bg-gradient-to-br ${card.gradient} relative group cursor-default`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{card.sub}</p>
                  <h4 className="text-white font-bold leading-snug">{card.title}</h4>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="accent-line" />
            <h2 className="section-heading">Mengapa Berkarir di Daikin?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Daikin Indonesia bukan sekadar tempat bekerja - ini adalah komunitas profesional yang terus tumbuh bersama. Kami memberikan kesempatan nyata untuk berkembang, belajar, dan memberikan dampak yang berarti.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dengan lebih dari 5.000 karyawan di seluruh Indonesia dan akses ke jaringan 80.000+ karyawan global Daikin, Anda akan bergabung dengan ekosistem yang dinamis dan penuh peluang lintas budaya.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Kami juga bangga dengan komitmen kami terhadap kesetaraan dan inklusi - setiap individu, tanpa memandang latar belakang, mendapatkan kesempatan yang sama untuk berkontribusi dan maju.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ v: '5000+', l: 'Karyawan Indonesia' }, { v: '80K+', l: 'Global Workforce' }, { v: '160+', l: 'Negara Operasi' }].map(({ v, l }) => (
                <div key={l} className="bg-soft-gray rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-daikin-blue">{v}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </FadeInLeft>
          <FadeInRight>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-daikin-blue via-sky-500 to-cyan-400 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 50%)' }} />
                <div className="absolute bottom-4 left-5">
                  <span className="text-white font-bold text-lg">Global Career Network</span>
                  <p className="text-white/70 text-sm">160+ negara, peluang tanpa batas</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-violet-500 to-purple-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Daikin Academy</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-emerald-500 to-teal-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-semibold text-sm">Work-Life Balance</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-bg-blue">
        <div className="section-container">
          <SectionHeading
            title="Benefit & Fasilitas"
            subtitle="Kami menginvestasikan yang terbaik untuk karyawan kami - karena kami tahu bahwa tim yang bahagia adalah fondasi dari perusahaan yang sukses."
            centered
          />
          <FadeInUp stagger className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <FadeInItem key={title}>
                <div className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow h-full">
                  <div className="w-11 h-11 rounded-xl bg-daikin-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-daikin-blue" />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* Recruitment process */}
      <section className="section-bg-light">
        <div className="section-container">
          <SectionHeading
            title="Proses Rekrutmen"
            subtitle="Proses yang transparan dan efisien - kami menghargai waktu Anda dan berkomitmen untuk memberikan pengalaman rekrutmen yang positif."
            centered
          />
          <FadeInUp stagger className="grid md:grid-cols-4 gap-6">
            {recruitmentSteps.map((step) => (
              <FadeInItem key={step.step}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-daikin-blue text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-charcoal mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* Job listings */}
      <section className="section-container">
        <SectionHeading title="Lowongan Terbuka" subtitle={`${filtered.length} posisi tersedia - temukan peluang yang tepat untuk Anda`} />

        <div className="flex flex-wrap gap-2 mb-8">
          {deptFilters.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-all ${activeDept === dept ? 'bg-daikin-blue text-white border-daikin-blue' : 'border-gray-200 text-gray-600 hover:border-daikin-blue'}`}
            >
              {dept}
            </button>
          ))}
        </div>

        <FadeInUp stagger className="space-y-4">
          {filtered.map((job) => (
            <FadeInItem key={job.id}>
              <Link to={`/careers/${job.id}`}>
                <div className="floating-card p-5 hover:shadow-card-hover transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-bold text-charcoal group-hover:text-daikin-blue transition-colors">{job.title.id}</h3>
                        {job.isHighlight && (
                          <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">Hot</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.postedDate}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeBg[job.type]}`}>{typeLabel[job.type]}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-daikin-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInUp>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">Tidak ada posisi untuk departemen ini saat ini.</p>
            <button onClick={() => setActiveDept('Semua')} className="mt-3 text-sm text-daikin-blue font-semibold hover:underline">
              Lihat semua lowongan
            </button>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
