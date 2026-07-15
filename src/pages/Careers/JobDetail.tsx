import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Clock, Briefcase, ArrowLeft, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/animations/PageTransition'
import PageMeta from '@/components/seo/PageMeta'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import FadeInUp from '@/components/animations/FadeInUp'
import { getJobById } from '@/data/careers'

const typeLabel: Record<string, string> = { 'full-time': 'Full-Time', 'contract': 'Kontrak', 'internship': 'Magang' }

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>()
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const job = getJobById(jobId ?? '')

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Lowongan tidak ditemukan</h2>
          <Link to="/careers" className="btn-primary inline-flex">Kembali ke Karir</Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <PageMeta title={job.title.id} canonical={`/careers/${job.id}`} />

      <div className="bg-gradient-to-br from-daikin-blue-dark to-daikin-blue pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Karir', path: '/careers' }, { label: job.title.id }]} className="text-white/60 mb-6" />
          <FadeInUp>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{job.title.id}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Diterbitkan: {job.postedDate}</span>
              <span className="px-2 py-0.5 bg-white/20 rounded-full">{typeLabel[job.type]}</span>
            </div>
          </FadeInUp>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <FadeInUp>
              <h2 className="text-xl font-bold text-charcoal mb-3">Deskripsi Pekerjaan</h2>
              <p className="text-gray-600 leading-relaxed">{job.description.id}</p>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="text-xl font-bold text-charcoal mb-3">Tanggung Jawab</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-daikin-blue flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="text-xl font-bold text-charcoal mb-3">Persyaratan</h2>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-daikin-blue mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.15}>
            <div className="floating-card p-6 sticky top-24">
              <h3 className="font-bold text-charcoal mb-4">Lamar Sekarang</h3>
              <p className="text-sm text-gray-600 mb-5">Kirimkan lamaran Anda dan bergabunglah dengan tim Daikin!</p>
              <Button className="w-full" onClick={() => setShowApplyModal(true)}>
                Kirim Lamaran
              </Button>
              <div className="mt-4 pt-4 border-t border-soft-gray-2">
                <Link to="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-daikin-blue">
                  <ArrowLeft className="w-4 h-4" />
                  Semua Lowongan
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-card p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-charcoal">Kirim Lamaran</h3>
                <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-charcoal mb-2">Lamaran Terkirim!</h4>
                  <p className="text-sm text-gray-600">Tim HR kami akan menghubungi Anda dalam 5-7 hari kerja.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  <div><label className="block text-sm font-medium mb-1.5">Nama Lengkap *</label><input type="text" required className="input-field" placeholder="Nama Anda" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" required className="input-field" placeholder="email@example.com" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">No. HP *</label><input type="tel" required className="input-field" placeholder="08xxxxxxxxxx" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Motivasi (opsional)</label><textarea rows={3} className="input-field resize-none" placeholder="Ceritakan alasan Anda melamar posisi ini..." /></div>
                  <Button type="submit" className="w-full">Kirim Lamaran</Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
