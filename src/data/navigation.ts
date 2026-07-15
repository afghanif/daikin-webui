import type { NavItem } from '@/types/navigation'

export const navItems: NavItem[] = [
  {
    labelKey: 'nav:profile.label',
    path: '/profile',
    isMegaMenu: false,
    isTwoColumn: true,
    children: [
      // ── Column 1: Perusahaan ──────────────────────────────────
      { labelKey: '', path: '__divider_company', isDivider: true, groupLabel: 'Perusahaan', categoryIcon: 'Building2' },
      { labelKey: 'nav:profile.about',       path: '/profile/about',            description: 'Mengenal Daikin Indonesia lebih dekat', disabled: true },
      { labelKey: 'nav:profile.group',       path: '/profile/daikin-group',     description: 'Daikin Industries, Ltd. global',         disabled: true },
      { labelKey: 'nav:profile.history',     path: '/profile/history',          description: 'Perjalanan kami sejak 1924',             disabled: true },
      { labelKey: 'nav:profile.philosophy',  path: '/profile/brand-philosophy', description: 'Nilai dan filosofi brand',               disabled: true },
      { labelKey: 'nav:insights.csr',        path: '/insights/csr',             description: 'Program CSR Daikin',                     disabled: true },
      // ── Column 2: Teknologi & Keunggulan ─────────────────────
      { labelKey: '', path: '__divider_tech', isDivider: true, groupLabel: 'Teknologi & Keunggulan', categoryIcon: 'Zap' },
      { labelKey: 'nav:profile.technology',  path: '/profile/technology',       description: 'Inovasi teknologi Daikin',               disabled: true },
      { labelKey: 'nav:profile.streamer',    path: '/profile/streamer',         description: 'Teknologi Streamer eksklusif',           disabled: true },
      { labelKey: 'nav:profile.awards',      path: '/profile/awards',           description: 'Penghargaan dan sertifikasi',            disabled: true },
      { labelKey: 'nav:profile.tkdn',        path: '/profile/tkdn',             description: 'Kandungan komponen lokal Indonesia',     disabled: true },
      { labelKey: 'nav:profile.discovery',   path: '/profile/discovery',        description: 'Program eksplorasi & inovasi Daikin',    disabled: true },
    ],
  },
  {
    labelKey: 'nav:products.label',
    path: '/products',
    isMegaMenu: true,
    children: [
      { labelKey: 'nav:products.residential', path: '/products/residential', icon: 'Home', description: 'AC untuk hunian', disabled: true },
      { labelKey: 'nav:products.commercial', path: '/products/commercial', icon: 'Building2', description: 'Solusi komersial & proyek', disabled: true },
      { labelKey: 'nav:products.accessories', path: '/products/accessories', icon: 'Package', description: 'Aksesori pelengkap', disabled: true },
      { labelKey: 'nav:products.spareParts', path: '/products/spare-parts', icon: 'Settings', description: 'Suku cadang resmi', disabled: true },
      { labelKey: 'nav:products.catalogue', path: '/products/e-catalogue', icon: 'BookOpen', description: 'Unduh e-catalogue', disabled: true },
    ],
  },
  {
    labelKey: 'nav:solutions.label',
    path: '/solutions',
    children: [
      { labelKey: 'nav:solutions.calculator', path: '/solutions/ac-calculator', description: 'Kalkulator PK & Daya AC' },
      { labelKey: 'nav:solutions.howToChoose', path: '/solutions/how-to-choose', description: 'Panduan memilih AC' },
      { labelKey: 'nav:solutions.energy', path: '/solutions/energy-efficiency', description: 'Hemat energi dengan inverter' },
      { labelKey: 'nav:solutions.airQuality', path: '/solutions/air-quality', description: 'Kualitas udara dalam ruangan' },
      { labelKey: 'nav:solutions.tips', path: '/solutions/maintenance-tips', description: 'Tips perawatan AC' },
    ],
  },
  {
    labelKey: 'nav:services.label',
    path: '/services',
    children: [
      { labelKey: 'nav:services.ishop',        path: '/services/ishop',        description: 'Dealer resmi AC untuk hunian',         disabled: true },
      { labelKey: 'nav:services.proshop',      path: '/services/proshop',      description: 'Dealer resmi AC komersial & proyek',   disabled: true },
      { labelKey: '', path: '__divider_service', isDivider: true, groupLabel: 'Layanan Teknis' },
      { labelKey: 'nav:services.center',       path: '/services/service-center', description: 'Temukan service center resmi terdekat', disabled: true },
      { labelKey: 'nav:services.maintenance',  path: '/services/maintenance',  description: 'Servis & perawatan berkala',            disabled: true },
      { labelKey: 'nav:services.warranty', path: '/services/warranty', description: 'Jaminan & garansi resmi' },
      { labelKey: 'nav:services.vrv', path: '/profile/vrv-certified', description: 'Program dealer bersertifikat VRV', disabled: true },
      { labelKey: 'nav:services.technicalData', path: '/services/technical-data', description: 'Spesifikasi & data teknis produk', disabled: true },
    ],
  },
  {
    labelKey: 'nav:insights.label',
    path: '/insights',
    children: [
      { labelKey: 'nav:insights.news', path: '/insights/news', description: 'Berita terbaru' },
      { labelKey: 'nav:insights.promotions', path: '/insights/promotions', description: 'Promo spesial', disabled: true },
      { labelKey: 'nav:insights.events', path: '/insights/events', description: 'Acara & kegiatan', disabled: true },
      { labelKey: 'nav:insights.training', path: '/insights/training', description: 'Pelatihan & sertifikasi', disabled: true },
      { labelKey: '', path: '__divider_perfecting', isDivider: true, groupLabel: 'Perfecting The Air' },
      { labelKey: 'nav:perfecting.idealAir', path: '/campaign/ideal-air', description: 'Udara nyaman adalah hak semua orang', disabled: true },
      { labelKey: 'nav:perfecting.power', path: '/campaign/power-to-create', description: 'Inovasi hijau untuk masa depan', disabled: true },
      { labelKey: 'nav:perfecting.stories', path: '/campaign/perfecting-air', description: 'Kisah nyata pelanggan Daikin', disabled: true },
    ],
  },
  // { labelKey: 'nav:competition.label', path: '/competition' }, // hidden
  {
    labelKey: 'nav:careers.label',
    path: '/careers',
  },
  {
    labelKey: 'nav:contact.label',
    path: '/contact',
  },
  {
    labelKey: 'nav:dealer.label',
    path: '/services/ishop',
    isDealer: true,
  },
]
