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

export interface IUserPopup{
  modelValue: boolean
  userId?: string
}

export interface IUserDetail{
  name: string
  auth: []
  reason: string
}