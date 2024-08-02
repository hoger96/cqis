import type { Delta } from '@vueup/vue-quill'
export interface ISearchParams {
  searchCondition: string
  keyword?: string
  page?: number
}

export interface IAnnouncementData{
  index: number
  title: string
  anncId: string
  createUser: string
  createDate: string
}

export interface IAnnouncementDetail {
  anncId?: string
  title: string
  createUser: string
  createDate: string
  updateUser?: string
  updateDate?: string
  file?: File[]
  detail: string | Delta
  startDate: string
  endDate: string
}

export interface IAnnouncementCreate{
  title: string
  startDate: string
  endDate: string
  contents: string | Delta
  file?: File[]
}