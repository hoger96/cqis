export interface ISearchParams {
  searchCondition: string
  use: string
  keyword: string
  page?: number
}

export interface IUserData{
  index: number
  userId: string
  name: string
  team: string
  use: string
  loginDate: string
}

export interface IUserPopup{
  modelValue: boolean
  userId?: string
}

export interface IUserDetail{
  name: string
  use: string
  reason: string
}