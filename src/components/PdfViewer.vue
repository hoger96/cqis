<script setup lang="ts">
import * as pdfJsDist from 'pdfjs-dist'

const props = defineProps<{
  modelValue: boolean
  title: string
  pdf: string
  closeOnClickModal: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
const currentPage = ref(1)
const totalPages = ref(0)
// PdfJs-dist
let pdfDoc = '' as any // PDF 문서 객체 저장
const pdfPath = props.pdf

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// PDF 뷰어 설정
// pdfJsDist.GlobalWorkerOptions.workerSrc = pdfWorker;
pdfJsDist.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'

const context = ref()
const canvas = ref<HTMLCanvasElement | null>(null)
const currentScale = ref(1)
// 페이지 렌더링 함수
const renderPage = async (pageNum: number) => {
  const page = await pdfDoc.getPage(pageNum)
  canvas.value = document.getElementById('pdf-viewer') as HTMLCanvasElement
  context.value = canvas?.value?.getContext('2d')
  const viewport = page.getViewport({ scale: currentScale.value })
  canvas.value.height = viewport.height
  canvas.value.width = viewport.width

  const renderContext = {
    canvasContext: context.value,
    viewport,
  }

  await page.render(renderContext).promise
}

const handleViewPort = async (scale: number) => {
  const outputScale = window.devicePixelRatio || 1
  const page = await pdfDoc.getPage(currentPage.value)
  const viewport = page.getViewport({ scale })
  canvas.value!.width = Math.floor(viewport.width * outputScale)
  canvas.value!.height = Math.floor(viewport.height * outputScale)
  const transform = outputScale !== 1
    ? [outputScale, 0, 0, outputScale, 0, 0]
    : null
  const renderContext = {
    canvasContext: context.value,
    transform,
    viewport,
  }

  await page.render(renderContext).promise
}

const zoomIn = () => {
  currentScale.value += 0.1 // Increase the scale value
  handleViewPort(currentScale.value)
}

const zoomOut = () => {
  currentScale.value = Math.max(0.1, currentScale.value - 0.1) // Decrease the scale value but not below 0.1
  handleViewPort(currentScale.value)
}

// 모달 열기 함수
const openPdfPreview = async () => {
  if (typeof pdfPath !== 'undefined') {
    pdfDoc = await pdfJsDist.getDocument(pdfPath).promise
    totalPages.value = pdfDoc.numPages // 총 페이지 수 설정
    currentPage.value = 1 // 현재 페이지 초기화
    renderPage(currentPage.value) // 첫 페이지 렌더링
  }
}

// 이전 페이지로 이동 함수
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    renderPage(currentPage.value)
  }
}

// 다음 페이지로 이동 함수
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    renderPage(currentPage.value)
  }
}

const handleDownloadPdf = async (pdfItem: any) => {
  if (!pdfItem)
    return
  const pdfData = await pdfItem.getData()
  const blob = new Blob([pdfData], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = props.title // 파일명 설정
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  await openPdfPreview()
})
</script>

<template>
  <el-dialog v-model="isShow" class="pdf-p" :close-on-click-modal="closeOnClickModal" show-close destroy-on-close
    @keyup.left="goToPrevPage" @keyup.right="goToNextPage">
    <template #header>
      <h1>{{ title }}</h1>
    </template>
    <div class="flex justify-center">
      <canvas id="pdf-viewer" />
    </div>
    <!-- <div ref="pdfViewer" /> -->
    <div class="pdf-p__util">
      <span>
        {{ `${currentPage} / ${totalPages}` }} 페이지
      </span>
      <button type="button" class="ml-2" @click="zoomOut">
        <icon name="minus__line--333" width="15" height="15" alt="zoomout" />
      </button>
      <button type="button" class="mx-2" @click="zoomIn">
        <icon name="plus__line--333" width="15" height="15" alit="zoomin" />
      </button>
      <!-- <button type="button" class="ml-2" @click="handleDownloadPdf(pdfDoc)">
        <icon name="download__line--222" width="15" height="15" alt="다운로드" />
      </button> -->
    </div>
    <div class="pdf-p__btn">
      <button type="button" @click="goToPrevPage">
        <icon name="arrow-r__line--c7c" width="25" height="25" class="rotate-180" />
      </button>
      <button type="button" @click="goToNextPage">
        <icon name="arrow-r__line--c7c" width="25" height="25" />
      </button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
@import '~/styles/pages/user-service-chat/popup';
</style>
