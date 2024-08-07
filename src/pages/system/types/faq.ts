import type { Delta } from '@vueup/vue-quill'
export interface ISearchParams {
  searchCondition: string
  keyword?: string
  currentPage: number
}

export interface IFaqData{
  rowNum: string
  faqSeq: string
  title: string
  faqId: string
  faqDispYn: string
  crteUserId : string
  crteDttm : string
  updUserId : string
  updDttm : string
}

export interface IFaqDetail {
  faqSeq: string
  title: string
  cont: string
  fileList: File[]
  faqDispYn: string
  crteUserId: string
  crteDttm: string
  updUserId: string
  updDttm: string
}

export interface IFaqCreate {
  title: string
  faqDispYn: string
}