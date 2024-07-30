export interface ISearchParams {
  searchCondition: string
  use: string
  keyword: string
  page?: number
}

export interface IUserAuthData{
  index: number
  userId: string
  name: string
  team: string
  authDate: string
}

export interface IUserAuthPopup{
  modelValue: boolean
  userId?: string
}

export interface IUserAuthDetail{
  name: string
  auth: []
  reason: string
}