export type NewsCategory = 'news' | 'promotion' | 'event' | 'training' | 'csr'

export interface NewsArticle {
  id: string
  slug: string
  category: NewsCategory
  title: { id: string; en: string }
  excerpt: { id: string; en: string }
  content: { id: string; en: string }
  coverImage: string
  publishedAt: string
  author?: string
  tags: string[]
}

export interface Promotion {
  id: string
  slug: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  imageUrl: string
  validUntil: string
  discount?: string
  badge?: string
}

export interface Event {
  id: string
  slug: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  imageUrl: string
  date: string
  location: string
  isUpcoming: boolean
}
