export interface ISearchParams {
  searchCondition: string
  state: string
  keyword?: string
  page?: number
}

export interface IQnaData{
  index: number
  qnaId: string
  title: string | Delta
  createUser: string
  createDate: string
  state: string
}

export interface IQnaDetail {
  qnaId: string
  question: {
    title: string
    createUser: string
    createDate: string
    detail: string | Delta
    file?: File[]
  }
  answer?: {
    title: string
    createUser: string
    createDate: string
    detail: string | Delta
    file: File[]
  }
}

export interface IQnaCreate {
  title?: string
  detail: string | Delta
  file: File[]
}