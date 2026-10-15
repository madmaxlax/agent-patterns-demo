export type Brand = 'visa' | 'mastercard' | 'discover'

export interface TimelineEvent {
  id: string
  brand: Brand
  year: number
  title: string
  summary: string
  source: string
}
