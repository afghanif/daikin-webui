export type RoomType = 'bedroom' | 'living_room' | 'kitchen' | 'office' | 'server_room' | 'store'
export type SunExposure = 'north' | 'south' | 'east' | 'west' | 'shaded'
export type CeilingHeight = 'low' | 'standard' | 'high'
export type WindowSize = 'small' | 'medium' | 'large'
export type RoomFloor = 'ground' | 'middle' | 'top'

export interface ACCalculatorInput {
  length: number
  width: number
  ceilingHeight: CeilingHeight
  sunExposure: SunExposure
  roomType: RoomType
  windowSize: WindowSize
  roomFloor: RoomFloor
  occupants: number
}

export interface ACCalculatorResult {
  btu: number
  pk: number
  pkLabel: string
  recommendation: string
}

const CEILING_HEIGHT_FACTOR: Record<CeilingHeight, number> = {
  low: 2.5,
  standard: 3.0,
  high: 3.5,
}

export function calculateAC(input: ACCalculatorInput): ACCalculatorResult {
  const { length, width, ceilingHeight, sunExposure, roomType, windowSize, roomFloor, occupants } = input

  const height = CEILING_HEIGHT_FACTOR[ceilingHeight]
  let btu = length * width * height * 337

  if (sunExposure === 'south') btu *= 1.10
  if (roomType === 'kitchen') btu *= 1.10
  if (roomType === 'server_room') btu *= 1.20

  if (windowSize === 'large') btu *= 1.08
  else if (windowSize === 'medium') btu *= 1.04

  if (roomFloor === 'top') btu *= 1.10
  else if (roomFloor === 'ground') btu *= 1.02

  const extraOccupants = Math.max(0, (occupants ?? 1) - 1)
  btu += extraOccupants * 400

  const pkRaw = btu / 9000
  const pk = Math.ceil(pkRaw * 2) / 2

  const pkLabel = pk <= 0.5 ? '½ PK' : pk === 1 ? '1 PK' : pk === 1.5 ? '1½ PK' : pk === 2 ? '2 PK' : `${pk} PK`

  const recommendation = getRecommendation(pk)

  return { btu: Math.round(btu), pk, pkLabel, recommendation }
}

function getRecommendation(pk: number): string {
  if (pk <= 0.5) return 'Cocok untuk kamar kecil atau ruang tidur minimalis.'
  if (pk <= 1) return 'Ideal untuk kamar tidur standar atau ruang kerja.'
  if (pk <= 1.5) return 'Pas untuk ruang tamu kecil atau kamar tidur besar.'
  if (pk <= 2) return 'Tepat untuk ruang tamu, ruang keluarga, atau kantor sedang.'
  return 'Disarankan untuk ruang komersial atau area luas.'
}
