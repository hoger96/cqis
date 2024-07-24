export interface ISearchParams {
  searchCondition: string
  keyword: string
  page?: number
}

export interface IFaqData{
  index: number
  title: string
  faqId: string
  createUser: string
  createDate: string
  views: number
}

export interface IFaqDetail {
  faqId: string
  title: string
  createUser: string
  createDate: string
  file?: any[]
  detail: string
}