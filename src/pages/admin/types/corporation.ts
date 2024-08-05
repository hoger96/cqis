export interface ISearchParams {
  searchCondition: string
  adminState: string
  keyword: string
  page?: number
}

export interface ICorData{
  corId: string
  corName: string
  continent: string
  country: string
  city: string
  corState: string
  closeState: string
}

export interface ICorPopup{
  modelValue: boolean
  corId?: string
}

export interface ICorDetail{
  name: string
  continent: string
  country: string
  city: string
  latitude: number
  longitude: number
  corState: string
  useElectric: string
  machine: string
}