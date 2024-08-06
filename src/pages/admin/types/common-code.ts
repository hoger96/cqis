export interface ISearchParams {
  searchCondition: string
  useState: string
  keyword: string
  page: number
}

export interface ISearchParamsCode {
  groupCode: string
  searchCondition: string
  useState: string
  keyword: string
  page: number
}

export interface IGroupCode {
  groupCode: string
  groupCodeName: string
  groupCodeDesc: string
  useStatus: string
}

export interface ICode {
  code: string
  codeName: string
  codeValue: string
  codeDesc: string
  codeSeq: string
  useStatus: string
}

export interface IGroupCodeDetail{
  groupCode: string
  groupCodeName: string
  groupCodeDesc: string
  useStatus: string
  createDate: string
  createUser: string
  updateDate: string
  updateUser: string
}

export interface ICodeDetail {
  code: string
  codeName: string
  codeValue: string
  codeDesc: string
  codeSeq: string
  useStatus: string
  createDate: string
  createUser: string
  updateDate: string
  updateUser: string
}