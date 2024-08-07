import type { Delta } from '@vueup/vue-quill'
export interface ISearchParams {
  searchCondition: string
  keyword?: string
  currentPage: number
}

export interface IAnnouncementData{
  notySeq: string
  rowNum: string
  ctg: string
  title: string
  topDispYn: string
  crteUserId: string
  notyStartDt: string
  notyEndDt: string
  crteDttm: string
  updUserId: string
  updDttm: string
}

export interface IAnnouncementDetail {
  anncId?: string
  title: string
  createUser: string
  createDate: string
  updateUser?: string
  updateDate?: string
  file?: File[]
  contents: string | Delta
  postingPeriod: any[]
}

export interface IAnnouncementCreate{
  title: string
  startDate: string
  endDate: string
  contents: string | Delta
  file?: File[]
}