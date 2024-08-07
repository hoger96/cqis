export interface ISearchParams {
  searchCondition: string
  adminState: string
  useYn: string
  keyword: string
  currentPage?: number
}

export interface IUserData{
  rowNum: string
  userId: string
  userName: string
  mtrYn: string
  qlikUserAuthTp: string
  useYn: string
  lastLoginDt: string
  crteUserId: string
  crteDttm: string
  updUserId: string
  updDttm: string
}

export interface IUserPopup{
  modelValue: boolean
  userId?: string
}

export interface IUserDetail{
  userId: string
  userName: string
  mtrYn: string
  qlikUserAuthTp: string
  qlikUserAuthYn: string
  useYn: string
  rsn: string
  crteUserId: string
  crteDttm: string
  updUserId: string
  updDttm: string
}