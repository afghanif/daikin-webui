import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { NavigationProvider } from '@/context/NavigationContext'
import RootLayout from '@/components/layout/RootLayout'
import Spinner from '@/components/ui/Spinner'

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'))

// Profile
const AboutIndonesia = lazy(() => import('@/pages/Profile/AboutIndonesia'))
const DaikinGroup = lazy(() => import('@/pages/Profile/DaikinGroup'))
const OurHistory = lazy(() => import('@/pages/Profile/OurHistory'))
const BrandPhilosophy = lazy(() => import('@/pages/Profile/BrandPhilosophy'))
const TechnologyOverview = lazy(() => import('@/pages/Profile/TechnologyOverview'))
const StreamerTechnology = lazy(() => import('@/pages/Profile/StreamerTechnology'))
const AwardsCertifications = lazy(() => import('@/pages/Profile/AwardsCertifications'))

// Products
const ProductsIndex = lazy(() => import('@/pages/Products'))
const ResidentialSolutions = lazy(() => import('@/pages/Products/ResidentialSolutions'))
const CommercialSolutions = lazy(() => import('@/pages/Products/CommercialSolutions'))
const Accessories = lazy(() => import('@/pages/Products/Accessories'))
const SpareParts = lazy(() => import('@/pages/Products/SpareParts'))
const ECatalogue = lazy(() => import('@/pages/Products/ECatalogue'))
const ProductDetail = lazy(() => import('@/pages/Products/ProductDetail'))

// Services
const ServicesIndex = lazy(() => import('@/pages/Services'))
const IShop = lazy(() => import('@/pages/Services/IShop'))
const ProShop = lazy(() => import('@/pages/Services/ProShop'))
const ServiceMaintenance = lazy(() => import('@/pages/Services/ServiceMaintenance'))
const ServiceCenter = lazy(() => import('@/pages/Services/ServiceCenter'))
const WarrantySupport = lazy(() => import('@/pages/Services/WarrantySupport'))

// Solutions
const SolutionsIndex = lazy(() => import('@/pages/Solutions'))
const HowToChoose = lazy(() => import('@/pages/Solutions/HowToChoose'))
const EnergyEfficiency = lazy(() => import('@/pages/Solutions/EnergyEfficiency'))
const ACCalculator = lazy(() => import('@/pages/Solutions/ACCalculator'))
const IndoorAirQuality = lazy(() => import('@/pages/Solutions/IndoorAirQuality'))
const MaintenanceTips = lazy(() => import('@/pages/Solutions/MaintenanceTips'))

// Insights
const InsightsIndex = lazy(() => import('@/pages/Insights'))
const News = lazy(() => import('@/pages/Insights/News'))
const NewsDetail = lazy(() => import('@/pages/Insights/NewsDetail'))
const Promotions = lazy(() => import('@/pages/Insights/Promotions'))
const Events = lazy(() => import('@/pages/Insights/Events'))
const TrainingCertification = lazy(() => import('@/pages/Insights/TrainingCertification'))
const DaikinImpact = lazy(() => import('@/pages/Insights/DaikinImpact'))

// Campaign
const CampaignIndex = lazy(() => import('@/pages/Campaign'))
const IdealAir = lazy(() => import('@/pages/Campaign/IdealAir'))
const PowerToCreate = lazy(() => import('@/pages/Campaign/PowerToCreate'))
const PerfectingAirStories = lazy(() => import('@/pages/Campaign/PerfectingAirStories'))

// Standalone
const Competition = lazy(() => import('@/pages/Competition'))
const Careers = lazy(() => import('@/pages/Careers'))
const JobDetail = lazy(() => import('@/pages/Careers/JobDetail'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/errors/NotFound'))

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      {children}
    </Suspense>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <NavigationProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<PageSuspense><Home /></PageSuspense>} />

            {/* Profile */}
            <Route path="/profile/about" element={<PageSuspense><AboutIndonesia /></PageSuspense>} />
            <Route path="/profile/daikin-group" element={<PageSuspense><DaikinGroup /></PageSuspense>} />
            <Route path="/profile/history" element={<PageSuspense><OurHistory /></PageSuspense>} />
            <Route path="/profile/brand-philosophy" element={<PageSuspense><BrandPhilosophy /></PageSuspense>} />
            <Route path="/profile/technology" element={<PageSuspense><TechnologyOverview /></PageSuspense>} />
            <Route path="/profile/streamer" element={<PageSuspense><StreamerTechnology /></PageSuspense>} />
            <Route path="/profile/awards" element={<PageSuspense><AwardsCertifications /></PageSuspense>} />

            {/* Products */}
            <Route path="/products" element={<PageSuspense><ProductsIndex /></PageSuspense>} />
            <Route path="/products/residential" element={<PageSuspense><ResidentialSolutions /></PageSuspense>} />
            <Route path="/products/commercial" element={<PageSuspense><CommercialSolutions /></PageSuspense>} />
            <Route path="/products/accessories" element={<PageSuspense><Accessories /></PageSuspense>} />
            <Route path="/products/spare-parts" element={<PageSuspense><SpareParts /></PageSuspense>} />
            <Route path="/products/e-catalogue" element={<PageSuspense><ECatalogue /></PageSuspense>} />
            <Route path="/products/:productSlug" element={<PageSuspense><ProductDetail /></PageSuspense>} />

            {/* Services */}
            <Route path="/services" element={<PageSuspense><ServicesIndex /></PageSuspense>} />
            <Route path="/services/ishop" element={<PageSuspense><IShop /></PageSuspense>} />
            <Route path="/services/proshop" element={<PageSuspense><ProShop /></PageSuspense>} />
            <Route path="/services/maintenance" element={<PageSuspense><ServiceMaintenance /></PageSuspense>} />
            <Route path="/services/service-center" element={<PageSuspense><ServiceCenter /></PageSuspense>} />
            <Route path="/services/warranty" element={<PageSuspense><WarrantySupport /></PageSuspense>} />

            {/* Solutions */}
            <Route path="/solutions" element={<PageSuspense><SolutionsIndex /></PageSuspense>} />
            <Route path="/solutions/how-to-choose" element={<PageSuspense><HowToChoose /></PageSuspense>} />
            <Route path="/solutions/energy-efficiency" element={<PageSuspense><EnergyEfficiency /></PageSuspense>} />
            <Route path="/solutions/ac-calculator" element={<PageSuspense><ACCalculator /></PageSuspense>} />
            <Route path="/solutions/air-quality" element={<PageSuspense><IndoorAirQuality /></PageSuspense>} />
            <Route path="/solutions/maintenance-tips" element={<PageSuspense><MaintenanceTips /></PageSuspense>} />

            {/* Insights */}
            <Route path="/insights" element={<PageSuspense><InsightsIndex /></PageSuspense>} />
            <Route path="/insights/news" element={<PageSuspense><News /></PageSuspense>} />
            <Route path="/insights/news/:slug" element={<PageSuspense><NewsDetail /></PageSuspense>} />
            <Route path="/insights/promotions" element={<PageSuspense><Promotions /></PageSuspense>} />
            <Route path="/insights/events" element={<PageSuspense><Events /></PageSuspense>} />
            <Route path="/insights/training" element={<PageSuspense><TrainingCertification /></PageSuspense>} />
            <Route path="/insights/csr" element={<PageSuspense><DaikinImpact /></PageSuspense>} />

            {/* Campaign */}
            <Route path="/campaign" element={<PageSuspense><CampaignIndex /></PageSuspense>} />
            <Route path="/campaign/ideal-air" element={<PageSuspense><IdealAir /></PageSuspense>} />
            <Route path="/campaign/power-to-create" element={<PageSuspense><PowerToCreate /></PageSuspense>} />
            <Route path="/campaign/perfecting-air" element={<PageSuspense><PerfectingAirStories /></PageSuspense>} />

            {/* Standalone */}
            <Route path="/competition" element={<PageSuspense><Competition /></PageSuspense>} />
            <Route path="/careers" element={<PageSuspense><Careers /></PageSuspense>} />
            <Route path="/careers/:jobId" element={<PageSuspense><JobDetail /></PageSuspense>} />
            <Route path="/contact" element={<PageSuspense><Contact /></PageSuspense>} />

            {/* 404 */}
            <Route path="*" element={<PageSuspense><NotFound /></PageSuspense>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </NavigationProvider>
  )
}
