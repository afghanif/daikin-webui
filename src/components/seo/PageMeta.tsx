import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
  title: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export default function PageMeta({ title, description, canonical, ogImage, noIndex }: PageMetaProps) {
  const fullTitle = `${title} | Daikin Indonesia`
  const defaultDesc = 'Solusi pendingin udara terdepan untuk hunian dan komersial. Temukan produk, layanan, dan teknologi Daikin terbaik di Indonesia.'
  const desc = description ?? defaultDesc

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={`https://www.daikin.co.id${canonical}`} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <link rel="alternate" hrefLang="id" href={`https://www.daikin.co.id${canonical ?? ''}`} />
      <link rel="alternate" hrefLang="en" href={`https://www.daikin.co.id/en${canonical ?? ''}`} />
    </Helmet>
  )
}
