import type { Job } from '@/types/career'

export const jobs: Job[] = [
  {
    id: 'job-001',
    title: { id: 'Sales Engineer - Commercial', en: 'Sales Engineer - Commercial' },
    department: 'Commercial Sales',
    location: 'Jakarta Selatan',
    type: 'full-time',
    postedDate: '2026-05-01',
    description: {
      id: 'Kami mencari Sales Engineer yang berpengalaman untuk menangani penjualan produk AC komersial Daikin di wilayah Jabodetabek.',
      en: 'We are looking for an experienced Sales Engineer to handle Daikin commercial AC product sales in the Jabodetabek area.',
    },
    requirements: [
      'Minimal S1 Teknik Mesin / Elektro / terkait',
      'Pengalaman minimal 3 tahun di bidang sales HVAC',
      'Memiliki network yang luas di industri properti/konstruksi',
      'Kemampuan komunikasi dan presentasi yang baik',
      'Bersedia melakukan perjalanan dinas',
    ],
    responsibilities: [
      'Mencapai target penjualan bulanan dan tahunan',
      'Membangun dan memelihara hubungan dengan kontraktor dan developer',
      'Melakukan presentasi produk dan solusi kepada klien',
      'Berkoordinasi dengan tim teknis untuk proposal proyek',
    ],
    isHighlight: true,
  },
  {
    id: 'job-002',
    title: { id: 'Marketing Digital Specialist', en: 'Digital Marketing Specialist' },
    department: 'Marketing',
    location: 'Jakarta Pusat',
    type: 'full-time',
    postedDate: '2026-04-20',
    description: {
      id: 'Bergabunglah dengan tim Marketing Daikin sebagai Digital Marketing Specialist yang akan mengelola kampanye digital dan konten media sosial.',
      en: 'Join the Daikin Marketing team as a Digital Marketing Specialist to manage digital campaigns and social media content.',
    },
    requirements: [
      'Minimal S1 Marketing / Komunikasi / terkait',
      'Pengalaman 2+ tahun di digital marketing',
      'Mahir menggunakan Google Ads, Meta Ads',
      'Memahami SEO/SEM dan analytics',
      'Portofolio kampanye digital yang solid',
    ],
    responsibilities: [
      'Mengelola kampanye iklan digital (Google, Meta, TikTok)',
      'Membuat dan mengelola konten media sosial',
      'Menganalisis performa kampanye dan optimasi',
      'Berkoordinasi dengan tim kreatif untuk materi iklan',
    ],
    isHighlight: false,
  },
  {
    id: 'job-003',
    title: { id: 'Teknisi Servis AC', en: 'AC Service Technician' },
    department: 'Technical Service',
    location: 'Berbagai Kota',
    type: 'full-time',
    postedDate: '2026-05-10',
    description: {
      id: 'Daikin membuka lowongan untuk Teknisi Servis AC di berbagai kota untuk memastikan kepuasan pelanggan melalui layanan servis berkualitas.',
      en: 'Daikin opens AC Service Technician positions in various cities to ensure customer satisfaction through quality service.',
    },
    requirements: [
      'Minimal SMK/D3 Teknik Refrigerasi / Teknik Elektro',
      'Sertifikasi teknisi AC merupakan nilai plus',
      'Pengalaman servis AC minimal 1 tahun',
      'Memiliki SIM A/C',
      'Komunikatif dan berorientasi pada kepuasan pelanggan',
    ],
    responsibilities: [
      'Melakukan instalasi, servis, dan perbaikan AC Daikin',
      'Mendiagnosa dan menyelesaikan masalah teknis',
      'Memberikan edukasi perawatan kepada pelanggan',
      'Membuat laporan servis yang akurat',
    ],
    isHighlight: true,
  },
  {
    id: 'job-004',
    title: { id: 'Supply Chain Analyst', en: 'Supply Chain Analyst' },
    department: 'Operations',
    location: 'Tangerang',
    type: 'full-time',
    postedDate: '2026-04-05',
    description: {
      id: 'Kami membutuhkan Supply Chain Analyst untuk mengoptimalkan rantai pasokan dan inventori produk Daikin di Indonesia.',
      en: 'We need a Supply Chain Analyst to optimize Daikin product supply chain and inventory in Indonesia.',
    },
    requirements: [
      'Minimal S1 Teknik Industri / Manajemen / terkait',
      'Pengalaman 2+ tahun di supply chain / logistik',
      'Mahir menggunakan SAP atau ERP sejenis',
      'Kemampuan analisis data yang baik (Excel, Power BI)',
    ],
    responsibilities: [
      'Menganalisis dan mengoptimalkan tingkat inventori',
      'Berkoordinasi dengan supplier dan forwarder',
      'Membuat laporan performa supply chain',
      'Mengidentifikasi peluang efisiensi biaya logistik',
    ],
    isHighlight: false,
  },
  {
    id: 'job-005',
    title: { id: 'Magang - Software Developer', en: 'Internship - Software Developer' },
    department: 'IT',
    location: 'Jakarta Selatan',
    type: 'internship',
    postedDate: '2026-05-15',
    description: {
      id: 'Kesempatan magang 3-6 bulan untuk mahasiswa IT yang ingin belajar pengembangan aplikasi enterprise di lingkungan profesional.',
      en: '3-6 month internship opportunity for IT students who want to learn enterprise application development in a professional environment.',
    },
    requirements: [
      'Mahasiswa S1 Ilmu Komputer / Informatika (semester 5+)',
      'Menguasai minimal satu bahasa pemrograman (Python, JS, PHP)',
      'Antusias belajar dan bekerja dalam tim',
    ],
    responsibilities: [
      'Membantu pengembangan fitur aplikasi internal',
      'Melakukan testing dan debugging',
      'Belajar dan berkolaborasi dengan tim developer senior',
    ],
    isHighlight: false,
  },
]

export function getJobById(id: string) {
  return jobs.find((j) => j.id === id)
}

export function getHighlightJobs() {
  return jobs.filter((j) => j.isHighlight)
}
