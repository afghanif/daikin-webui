export type JobType = 'full-time' | 'contract' | 'internship'

export interface Job {
  id: string
  title: { id: string; en: string }
  department: string
  location: string
  type: JobType
  postedDate: string
  description: { id: string; en: string }
  requirements: string[]
  responsibilities: string[]
  isHighlight: boolean
}
