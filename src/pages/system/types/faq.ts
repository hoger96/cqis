import type { Delta } from '@vueup/vue-quill'
export interface ISearchParams {
  searchCondition: string
  keyword?: string
  page?: number
}

export interface IFaqData{
  index: number
  title: string
  faqId: string
  output: string
  createDate: string
}

export interface IFaqDetail {
  faqId: string
  title: string
  createUser: string
  createDate: string
  detail: string | Delta
  file? : File[]
}

export interface IFaqCreate {
  title: string
  detail: string | Delta
  file?: File[]
}