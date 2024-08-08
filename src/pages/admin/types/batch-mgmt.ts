export interface ISearchParams {
  searchCondition: string
  batTp: string
  keyword?: string
  currentPage: number
}

export interface IBatchData{
  rowNum: string
  batSeq: string
  batName: string
  batTp: string
  crteUserId: string
  crteDttm: string
  updUserId: string
  updDttm: string
}

export interface IBatchDetail{
  batSeq: string
  batName: string
  batTp: string
  batTime: string
  batDesc: string
  crteUserId: string
  crteDttm: string
  updUserId: string
  updDttm: string
}