export interface ISearchParams {
  dataSet: string
  tableName: string
  physicalTableName: string
  job: string
  columnName: string
  page: number
}

export interface IDatasetData{
  index: number
  datasetId: string
  datasetName: string
  targetTableName: string
  targetPhysicalTableName: string
  job: string
  period: string
}

interface ITargetData {
  id: string
  tableName: string
  column: string
  description: string
}

interface ISpanMethodProps {
  row: ITargetDate
  rowIndex: number
  columnIndex: number
}