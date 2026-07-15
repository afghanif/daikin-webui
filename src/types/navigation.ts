export interface NavChild {
  labelKey: string
  path: string
  icon?: string
  description?: string
  disabled?: boolean
  isDivider?: boolean
  groupLabel?: string
  categoryIcon?: string
}

export interface NavItem {
  labelKey: string
  path: string
  children?: NavChild[]
  isMegaMenu?: boolean
  isTwoColumn?: boolean
  icon?: string
  disabled?: boolean
  isDealer?: boolean
}
