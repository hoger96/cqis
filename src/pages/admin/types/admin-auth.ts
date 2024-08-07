export interface ISearchParams {
  searchCondition: string
  keyword?: string
  currentPage: number
}

export interface IAdminAuthData{
  rowNum: string
  userId: string
  userName: string
  setYn: string
  lastRoleMppDttm: string
  crteUserId : string
  crteDttm : string
  updUserId : string
  updDttm : string
}

export interface IAdminAuthPopup{
  modelValue: boolean
  userId: string
}

export interface IAdminRold {
  mtrRoleId: string
  mtrRoleName: string    
  mtrRoleSetYn: string
}

export interface IAdminAuthDetail{
  userId: string
  userName: string
  setYn: string
  roleGroupList: IAdminRold[]
  rsn: string
  crteUserId : string
  crteDttm : string
  updUserId : string
  updDttm : string
}