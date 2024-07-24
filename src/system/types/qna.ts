export interface ISearchParams {
  searchCondition: string
  state: string
  keyword: string
  page?: number
}

export interface IQnaData{
  index: number
  qnaId: string
  title: string
  createUser: string
  createDate: string
  state: wait
}

export interface IQnaDetail {
  qnaId: string
  question: {
    title: string
    createUser: string
    createDate: string
    detail: string
    file: any[]
  }
  answer: {
    title: string
    createUser: string
    createDate: string
    detail: string
    file: any[]
  }
}

export interface IQnaCreate {
  title: string
  createUser: string
  createDate: string
  detail: string
  file: any[]
}