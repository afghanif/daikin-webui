import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export default function SEO({
  title = 'Daikin Indonesia - AC Terbaik & Solusi Udara Sempurna',
  description = 'Daikin adalah spesialis pendingin udara terkemuka di dunia. Temukan berbagai solusi AC untuk kebutuhan residensial, komersial, dan industri di Indonesia.',
  keywords = 'Daikin, AC Daikin, Pendingin Udara, AC Inverter, AC Hemat Energi, Air Conditioner',
  image = 'https://www.daikin.co.id/images/og-daikin.jpg',
  url = 'https://www.daikin.co.id',
}: SEOProps) {
  const siteTitle = title === 'Daikin Indonesia - AC Terbaik & Solusi Udara Sempurna' 
    ? title 
    : `${title} | Daikin Indonesia`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Tags for SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
