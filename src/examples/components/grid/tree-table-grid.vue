<script setup lang="ts">
import Sortable from 'sortablejs'
import type { IColumn, IGridData, IRowClassNameArgument } from '~/types/grid'
import { DragTreeTableTargetClassName } from '~/types/enums/grid'
import { useGridStore } from '~/store/grid'

const props = withDefaults(defineProps<{
  parentColumns: IColumn[]
  childColumns: IColumn[]
  rows: IGridData[]
  rowIdKey: string
  modelValue?: IGridData[]
  useParentCheckBox?: boolean
  useChildCheckBox?: boolean
  useParentDragColumn?: boolean
  useChildDragColumn?: boolean
  useParentDragRow?: boolean
  useChildDragRow?: boolean
  useParentColumnResizable?: boolean
  useChildColumnResizable?: boolean
  parentHeaderAlign?: string
  childHeaderAlign?: string
  parentRowAlign?: string
  childRowAlign?: string
  noDataText?: string
  otherChildrenDragYn?: boolean // 자식 row 같은 경우 다른 자식 row 에 드래그 가능 여부
  parentRowDragGroupName?: string
  childRowDragGroupName?: string // otherChildrenDragYn 값이 true 인 경우 이 값이 group 이름으로 지정
  parentColumnDragGroupName?: string
  childColumnDragGroupName?: string
}>(), {
  modelValue: () => [],
  useParentCheckBox: false,
  useChildCheckBox: false,
  useParentDragColumn: false,
  useChildDragColumn: false,
  useParentDragRow: false,
  useChildDragRow: false,
  useParentColumnResizable: true,
  useChildColumnResizable: true,
  parentHeaderAlign: 'center',
  childHeaderAlign: 'center',
  parentRowAlign: 'left',
  childRowAlign: 'left',
  noDataText: '조회된 데이터가 없습니다.',
  otherChildrenDragYn: false,
  parentRowDragGroupName: 'treeTableParentDragRow',
  childRowDragGroupName: 'treeTableChildDragRow',
  parentColumnDragGroupName: 'treeTableParentDragColumn',
  childColumnDragGroupName: 'treeTableChildDragColumn',
})

const emits = defineEmits<{
  (e: 'changeColumnOrder', columnList: IColumn[], isUpperTable: boolean): void // 컬럼 순서를 드래그로 순서가 변경 된 후 실행
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:rows', value: IGridData[]): void // rowList 를 직접적으로 변경했을때 실행
  (e: 'changeRowOrder', list: IGridData[]): void // rowList 가 드래그로 순서가 변경 된 후 실행
  (e: 'update:parentColumns', value: IColumn[]): void
  (e: 'update:childColumns', value: IColumn[]): void
}>()

const gridStore = useGridStore()

const rowList = computed({
  get() {
    return props.rows
  },
  set(val) {
    emits('update:rows', val)
  },
})

const parentColumns = computed({
  get() {
    return props.parentColumns
  },
  set(val) {
    emits('update:parentColumns', val)
  },
})

const childColumns = computed({
  get() {
    return props.childColumns
  },
  set(val) {
    emits('update:childColumns', val)
  },
})

const parentColumnSortableInstance = ref<Sortable | null>(null)
const childColumnSortableInstances = ref<(Sortable | null)[]>([])

const parentRowSortableInstance = ref<Sortable | null>(null)
const childRowSortableInstances = ref<(Sortable | null)[]>([])

const internalUseParentColumnResizable = ref<boolean>(props.useParentColumnResizable)
const internalUseChildColumnResizable = ref<boolean>(props.useChildColumnResizable)

const parentTableKey = ref<string>('')
const childTableKey = ref<string>('')

// 하위 탭 열려있는 row Id 배열
const expandedRowIds = ref<(string | number)[]>([])

// new Map 으로 키-값 쌍으로 tr element 에 맞는 데이터를 저장
// const rowElementToData = null

const internalParentUseCheckBox = computed(() => {
  return props.useParentCheckBox
})
const internalChildUseCheckBox = computed(() => {
  return props.useChildCheckBox
})

const internalParentHeaderAlign = computed(() => {
  return props.parentHeaderAlign
})
const internalParentRowAlign = computed(() => {
  return props.parentRowAlign
})
const internalChildHeaderAlign = computed(() => {
  return props.childHeaderAlign
})
const internalChildRowAlign = computed(() => {
  return props.childRowAlign
})

// 자식 데이터가 없는 경우 row 에 class 적용
const setChildTableRowClass = ({ row }: IRowClassNameArgument) => {
  if (!row.childList)
    return 'no-expand'

  else
    return ''
}

const getSortableInstance = (targetHtml: HTMLElement, sortableOption: Sortable.Options) => {
  return Sortable.create(targetHtml, {
    ...sortableOption,
  })
}

const changeListItemOrder = (list: (IColumn | IGridData)[], fromIndex: number | undefined, toIndex: number | undefined) => {
  if (fromIndex !== undefined && toIndex !== undefined) {
    const [item] = list.splice(fromIndex, 1)
    list.splice(toIndex, 0, item)
  }
}

const onChangeColumnOrder = (evt: Sortable.SortableEvent, isUpperTable: boolean) => {
  const { oldIndex, newIndex } = evt
  if (oldIndex !== newIndex) {
    let fromIndex = oldIndex!
    let toIndex = newIndex!
    let changedOrderColumns = []
    if (isUpperTable) {
      fromIndex--
      toIndex--
      changedOrderColumns = parentColumns.value
    }
    else {
      changedOrderColumns = childColumns.value
    }
    // 자식테이블이 보이도록 확장하는 화살표가 있는 컬럼이 추가되었기 때문에 -1 필요
    changeListItemOrder(changedOrderColumns, fromIndex, toIndex)
    emits('changeColumnOrder', changedOrderColumns, isUpperTable)
  }
}

const getCommonDragOption = (draggableItem: string) => {
  return {
    delay: 0,
    animation: 150,
    draggable: draggableItem,
  }
}

const findParent = (nodes: IGridData[], parentId: string): null | IGridData => {
  for (const node of nodes) {
    if (node[props.rowIdKey] === parentId)
      return node

    if (node.childList && node.childList.length > 0) {
      const result = findParent(node.childList, parentId)
      if (result !== null)
        return result
    }
  }

  return null
}
// row 드래그 완료
const onChangeRowOrder = (evt: Sortable.SortableEvent, isUpperTable: boolean, domToDataMap: Map<Element, IGridData>) => {
  const { oldIndex, newIndex } = evt
  // 위치를 옮긴 경우에만 실제 데이터 update
  if (oldIndex !== newIndex) {
    // 부모 row
    if (isUpperTable) {
      changeListItemOrder(rowList.value, oldIndex, newIndex)
    }
    else { // 자식 row
      const draggedItemInfo = domToDataMap.get(evt.item)
      const draggedParent: IGridData | null = findParent(rowList.value, draggedItemInfo?.parentId)
      let draggedChildList: IGridData[] = []
      // 자식(하위) row 리스트 데이터는 el-table 의 key 값을 갱신시켜줘야 순서가 바뀐 값을 그리드에 적용할 수 있다.
      childTableKey.value = getUniqueId()
      if (draggedParent && draggedParent!.childList) {
        draggedChildList = findParent(rowList.value, draggedItemInfo?.parentId)!.childList!
        // draggedParent.childList = changeListItemOrder(draggedChildList, oldIndex, newIndex)
        changeListItemOrder(draggedChildList, oldIndex, newIndex)
      }
    }
    emits('changeRowOrder', rowList.value)
  }
}

const onMoveColumnOrder = (evt: Sortable.MoveEvent) => {
  // 드래그 filter 걸린 컬럼에는 다른 드래그 가능한 컬럼도 드래그 안되도록 적용
  if (evt.related.classList.contains('filter-column-drag'))
    return false
}

const getRowTargetAndOption = (targetClassWrapper: string, targetClassName: string, isUpperTable: boolean, tbodyData: IGridData[]) => {
  const parentTbody: HTMLElement | null = document.querySelector(targetClassWrapper)
  const allChildTbodys: NodeListOf<HTMLElement> | null = document.querySelectorAll(targetClassWrapper)
  const targetTbody = isUpperTable ? parentTbody : allChildTbodys
  let tbodySortableOption = {}
  if (targetTbody) {
    const domToDataMap = new Map<Element, IGridData>()
    if (tbodyData && tbodyData.length > 0) {
      // Map 을 이용해서 dom: data 형태의 key-value 값으로 저장해놓기
      tbodyData.forEach((td, idx) => {
        const rowElement = document.querySelector(`${targetClassWrapper} tr:nth-child(${idx + 1})`)
        if (rowElement)
          domToDataMap.set(rowElement, td)
      })
    }
    tbodySortableOption = {
      ...getCommonDragOption(targetClassName),
      onUpdate: (evt: Sortable.SortableEvent) => onChangeRowOrder(evt, isUpperTable, domToDataMap),
    }
  }

  return { targetTbody, tbodySortableOption }
}

const getColumnTargetAndOption = (targetClassWrapper: string, targetClassName: string, isUpperTable: boolean) => {
  const parentHeader: HTMLElement | null = document.querySelector(targetClassWrapper)
  const allChildHeaders: NodeListOf<HTMLElement> | null = document.querySelectorAll(targetClassWrapper)

  const targetHeader = isUpperTable ? parentHeader : allChildHeaders
  let columnSortableOption = {}
  if (targetHeader) {
    columnSortableOption = {
      ...getCommonDragOption(targetClassName),
      onMove: onMoveColumnOrder,
      onUpdate: (evt: Sortable.SortableEvent) => onChangeColumnOrder(evt, isUpperTable),
      filter: '.filter-column-drag',
    }
  }

  return { targetHeader, columnSortableOption }
}

const setInitParentTableSortable = (appliedTargetHtml: HTMLElement | null, sortableOption: Sortable.Options, savedInstanceTemplate: Ref<null | Sortable>, useDrag: boolean) => {
  if (appliedTargetHtml) {
    savedInstanceTemplate.value = getSortableInstance(appliedTargetHtml, sortableOption)
    savedInstanceTemplate.value.option('disabled', !useDrag)
  }
}

const setInitChildTableSortable = (appliedTargetHtmls: NodeListOf<HTMLElement> | null, sortableOption: Sortable.Options, savedInstanceTemplates: Ref<(null | Sortable)[]>, useDrag: boolean) => {
  if (appliedTargetHtmls) {
    for (let i = 0; i < appliedTargetHtmls.length; i++)
      savedInstanceTemplates.value.push(getSortableInstance(appliedTargetHtmls[i], sortableOption))

    savedInstanceTemplates.value = savedInstanceTemplates.value.map((sortableInstance: Sortable | null) => {
      sortableInstance?.option('disabled', !useDrag)
      return sortableInstance
    })
  }
}

const changeExpand = async (selectedRow: IGridData, _parentRowInfo: IGridData) => {
  // 탭을 닫는 경우
  if (expandedRowIds.value.includes(selectedRow[props.rowIdKey])) {
    expandedRowIds.value = expandedRowIds.value.filter(ei => ei !== selectedRow[props.rowIdKey])
    childRowSortableInstances.value = []
    childColumnSortableInstances.value = []
  }
  else { // 탭을 열은 경우
    expandedRowIds.value.push(selectedRow[props.rowIdKey])
    await nextTick()
    // 자식 테이블 컬럼 및 row 드래그 적용
    const childTableRowTargetsAndOption = getRowTargetAndOption(DragTreeTableTargetClassName.CHILD_EL_TBODY_WRAPPER, DragTreeTableTargetClassName.ROW_DRAGGABLE, false, selectedRow.childList ? selectedRow.childList : [])
    setInitChildTableSortable(childTableRowTargetsAndOption.targetTbody as NodeListOf<HTMLElement> | null, childTableRowTargetsAndOption.tbodySortableOption, childRowSortableInstances, props.useChildDragRow)

    const childTableColumnTargetsAndOption = getColumnTargetAndOption(DragTreeTableTargetClassName.CHILD_EL_THEAD_WRAPPER, DragTreeTableTargetClassName.TH_DRAGGABLE, false)
    setInitChildTableSortable(childTableColumnTargetsAndOption.targetHeader as NodeListOf<HTMLElement> | null, childTableColumnTargetsAndOption.columnSortableOption, childColumnSortableInstances, props.useChildDragColumn)
  }
}

const changeParentCheckedSelection = (selection: IGridData[]) => {
  gridStore.setTreeParentCheckedList(selection)
}

const changeChildCheckedSelection = (selection: IGridData[], parentId: string) => {
  gridStore.setTreeChildrenCheckedList(selection, parentId)
}

watch(() => [props.useParentColumnResizable, props.useChildColumnResizable], ([parentNewValue, childNeValue]: boolean[]) => {
  // resizable 설정을 동적으로 바꾸려면 el-table 의 key 값을 갱신해줘야함.
  parentTableKey.value = getUniqueId()
  childTableKey.value = getUniqueId()

  internalUseParentColumnResizable.value = parentNewValue
  internalUseChildColumnResizable.value = childNeValue
})

watch(() => props.useParentDragColumn, (newValue: boolean) => {
  parentColumnSortableInstance.value?.option('disabled', !newValue)
})
watch(() => props.useParentDragRow, (newValue: boolean) => {
  parentRowSortableInstance.value?.option('disabled', !newValue)
})
watch(() => props.useChildDragColumn, (newValue: boolean) => {
  childColumnSortableInstances.value = childColumnSortableInstances.value.map((sortableInstance: Sortable | null) => {
    sortableInstance?.option('disabled', !newValue)
    return sortableInstance
  })
})
watch(() => props.useChildDragRow, (newValue: boolean) => {
  childRowSortableInstances.value = childRowSortableInstances.value.map((sortableInstance: Sortable | null) => {
    sortableInstance?.option('disabled', !newValue)
    return sortableInstance
  })
})

// 자식(하위) el-table 의 key 값을 갱신시켜 줬을때 sortable 적용
watch(() => childTableKey.value, async () => {
  await nextTick()
  if (expandedRowIds.value.length > 0) {
    for (let i = 0; i < expandedRowIds.value.length; i++) {
      const parentRowInfo = rowList.value.find(row => row[props.rowIdKey] === expandedRowIds.value[i])
      const childTableRowTargetsAndOption = getRowTargetAndOption(DragTreeTableTargetClassName.CHILD_EL_TBODY_WRAPPER, DragTreeTableTargetClassName.ROW_DRAGGABLE, false, parentRowInfo!.childList ? parentRowInfo!.childList : [])
      setInitChildTableSortable(childTableRowTargetsAndOption.targetTbody as NodeListOf<HTMLElement> | null, childTableRowTargetsAndOption.tbodySortableOption, childRowSortableInstances, props.useChildDragRow)

      const childTableColumnTargetsAndOption = getColumnTargetAndOption(DragTreeTableTargetClassName.CHILD_EL_THEAD_WRAPPER, DragTreeTableTargetClassName.TH_DRAGGABLE, false)
      setInitChildTableSortable(childTableColumnTargetsAndOption.targetHeader as NodeListOf<HTMLElement> | null, childTableColumnTargetsAndOption.columnSortableOption, childColumnSortableInstances, props.useChildDragColumn)
    }
  }
})

onMounted(() => {
  const parentTableRowTargetAndOption = getRowTargetAndOption(DragTreeTableTargetClassName.PARENT_EL_TBODY_WRAPPER, DragTreeTableTargetClassName.ROW_DRAGGABLE, true, rowList.value)
  setInitParentTableSortable(parentTableRowTargetAndOption.targetTbody as HTMLElement | null, parentTableRowTargetAndOption.tbodySortableOption, parentRowSortableInstance, props.useParentDragRow)

  const parentTableColumnTargetAndOption = getColumnTargetAndOption(DragTreeTableTargetClassName.PARENT_EL_THEAD_WRAPPER, DragTreeTableTargetClassName.TH_DRAGGABLE, true)
  setInitParentTableSortable(parentTableColumnTargetAndOption.targetHeader as HTMLElement | null, parentTableColumnTargetAndOption.columnSortableOption, parentColumnSortableInstance, props.useParentDragColumn)
})
</script>

<template>
  <div>
    <el-table :key="parentTableKey" :data="rowList" :row-key="rowIdKey" border style="width: 100%"
      :empty-text="noDataText" :row-class-name="setChildTableRowClass" @expand-change="changeExpand"
      @selection-change="changeParentCheckedSelection">
      <el-table-column v-if="internalParentUseCheckBox" type="selection" class-name="filter-column-drag" />
      <el-table-column type="expand" class-name="filter-column-drag">
        <template #default="parentRows">
          <div v-if="!isEmpty(parentRows.row.childList)" class="m-4 bg-slate-200">
            <el-table :key="childTableKey" :data="parentRows.row.childList" border
              @selection-change="(selection) => changeChildCheckedSelection(selection, parentRows.row[rowIdKey])">
              <el-table-column v-if="internalChildUseCheckBox" type="selection" class-name="filter-column-drag" />
              <el-table-column v-for="(childColumn) of childColumns"
                :key="`tree-child-grid-column-${childColumn.property}`" :label="childColumn.label"
                :prop="childColumn.type ? '' : childColumn.property" :min-width="childColumn.minWidth"
                :sortable="childColumn.sortable" :resizable="internalUseChildColumnResizable"
                :header-align="internalChildHeaderAlign" :align="internalChildRowAlign">
                <template v-if="childColumn.type" #default="scope">
                  <slot :name="`Child-${childColumn.property}`" :scope="scope" :column="childColumn" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="(parentColumn) of parentColumns" :key="`tree-parent-grid-column-${parentColumn.property}`"
        :label="parentColumn.label" :prop="parentColumn.type ? '' : parentColumn.property"
        :min-width="parentColumn.minWidth" :sortable="parentColumn.sortable"
        :resizable="internalUseParentColumnResizable" :header-align="internalParentHeaderAlign"
        :align="internalParentRowAlign">
        <template v-if="parentColumn.type" #default="scope">
          <slot :name="parentColumn.property" :scope="scope" :column="parentColumn" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.no-expand .el-icon {
  display: none;
}

.no-expand .el-table__expand-icon {
  pointer-events: none;
}

// .no-expand {
//     :deep(.el-table__expand-column) {
//         .el-table {
//             td {
//                 .cell {
//                     .expand-icon {
//                         display: none !important;
//                         pointer-events: none !important;
//                     }
//                 }
//             }
//         }

//     }
// }
.no-expand {
  &.empty-child {
    td {
      &.el-table__expand-column {
        .el-table__expand-icon {
          display: none !important;
        }
      }
    }
  }

  td {
    .el-table__expand-column {
      .cell {
        .el-table__expand-icon {
          .el-icon {
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
