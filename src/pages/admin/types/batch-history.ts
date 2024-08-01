export interface ISearchParams {
  searchCondition: string
  batchState: string
  batchPeriod: string
  keyword: string
  page: number
}

export interface IBatchData{
  index: number
  batchId: string
  batchCode: string
  batchName: string
  batchKind: string
  createDate: string
}

export interface IBatchDetail{
  batchId: string
  batchCode: string
  batchName: string
  batchKind: string
  batchTime: string
  batchDescription: string
}