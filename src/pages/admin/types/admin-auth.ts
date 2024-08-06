export interface ISearchParams {
  searchCondition: string
  keyword: string
  page?: number
}

export interface IAdminAuthData{
  index: number
  adminId: string
  name: string
  adminGroup: string
  authDate: string
}

export interface IAdminAuthPopup{
  modelValue: boolean
  userId?: string
}

export interface IAdminAuthDetail{
  name: string
  auth: []
  reason: string
}