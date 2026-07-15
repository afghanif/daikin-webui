import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, Shield, FileText } from 'lucide-react'

const footerSections = [
  {
    titleKey: 'nav:footer.company',
    links: [
      { labelKey: 'nav:profile.about', path: '/profile/about' },
      { labelKey: 'nav:profile.history', path: '/profile/history' },
      { labelKey: 'nav:profile.philosophy', path: '/profile/brand-philosophy' },
      { labelKey: 'nav:profile.technology', path: '/profile/technology' },
      { labelKey: 'nav:careers.label', path: '/careers' },
    ],
  },
  {
    titleKey: 'nav:footer.products',
    links: [
      { labelKey: 'nav:products.residential', path: '/products/residential' },
      { labelKey: 'nav:products.commercial', path: '/products/commercial' },
      { labelKey: 'nav:products.accessories', path: '/products/accessories' },
      { labelKey: 'nav:products.spareParts', path: '/products/spare-parts' },
      { labelKey: 'nav:products.catalogue', path: '/products/e-catalogue' },
    ],
  },
  {
    titleKey: 'nav:footer.services',
    links: [
      { labelKey: 'nav:services.ishop', path: '/services/ishop' },
      { labelKey: 'nav:services.proshop', path: '/services/proshop' },
      { labelKey: 'nav:services.maintenance', path: '/services/maintenance' },
      { labelKey: 'nav:services.center', path: '/services/service-center' },
      { labelKey: 'nav:services.warranty', path: '/services/warranty' },
    ],
  },
  {
    titleKey: 'nav:footer.solutions',
    links: [
      { labelKey: 'nav:solutions.howToChoose', path: '/solutions/how-to-choose' },
      { labelKey: 'nav:solutions.calculator', path: '/solutions/ac-calculator' },
      { labelKey: 'nav:solutions.energy', path: '/solutions/energy-efficiency' },
      { labelKey: 'nav:solutions.airQuality', path: '/solutions/air-quality' },
      { labelKey: 'nav:insights.news', path: '/insights/news' },
    ],
  },
]

export default function Footer() {
  const { t } = useTranslation(['nav', 'common'])

  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/images/logo/logo-daikin.svg" alt="Daikin" className="h-10 brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('common:footer.description', 'Solusi pendingin udara terdepan untuk hunian dan komersial di Indonesia sejak 1976.')}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-daikin-blue flex-shrink-0" />
                <span>0800-1-234567 (Bebas Pulsa)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-daikin-blue flex-shrink-0" />
                <span>customercare@daikin.co.id</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-daikin-blue flex-shrink-0 mt-0.5" />
                <span>Wisma Argo Manunggal Lt. 18, Jl. Gatot Subroto, Jakarta Selatan</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-daikin-blue-light transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} PT Daikin Airconditioning Indonesia. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            <Link
              to="/privacy-policy"
              className="flex items-center gap-1.5 text-gray-500 text-xs hover:text-daikin-blue-light transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy Policy
            </Link>
            <span className="text-white/15 select-none">|</span>
            <Link
              to="/terms-conditions"
              className="flex items-center gap-1.5 text-gray-500 text-xs hover:text-daikin-blue-light transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Terms &amp; Conditions
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-daikin-blue transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-daikin-blue transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-daikin-blue transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-daikin-blue transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
