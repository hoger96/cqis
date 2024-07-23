export interface ISearchParams {
  searchCondition: string
  keyword: string
  page?: number
}

export interface IAnnouncementData{
  index: number
  title: string
  createUser: string
  createDate: string
}

export interface IAnnouncementDetail {
  anncId: string
  title: string
  createUser: string
  createDate: string
  file?: any[]
  detail: string
}