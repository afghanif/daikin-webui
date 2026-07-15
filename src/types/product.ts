export type ProductCategory = 'residential' | 'commercial' | 'accessory' | 'spare-part'
export type ProductBadge = 'new' | 'bestseller' | 'promo'
export type UnitType = 'Split Wall' | 'Cassette' | 'Floor Standing' | 'Ducted' | 'Multi-Split'

export interface ProductSpec {
  pk: number
  btu: number
  voltage: number
  coverage_m2: number
  powerInput?: number
  cop?: number
  refrigerant?: string
}

export interface Product {
  id: string
  slug: string
  category: ProductCategory
  subcategory: string
  unitType?: UnitType
  name: { id: string; en: string }
  tagline: { id: string; en: string }
  description: { id: string; en: string }
  imageUrl: string
  images?: string[]
  videoUrl?: string
  specs: ProductSpec
  features: string[]
  isInverter: boolean
  badge?: ProductBadge
  priceRange: string
  relatedIds?: string[]
  eCatalogueUrl?: string
}
