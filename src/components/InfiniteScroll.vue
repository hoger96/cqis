<script setup lang="ts">
const props = withDefaults(defineProps<{
  rows: any
  onScroll?: boolean // infinite scroll 사용 여부
  height?: number // scroll 영역 height
  width?: number // scroll 영역 width
  customClass?: string // scroll 영역 추가 class
  scrollInterval?: number // scroll throttle 제어
  useLoading?: boolean // 로딩 영역 사용 여부
  loadingStatus?: boolean // 로딩 상태
  itemHeight?: number
  useHandleScroll?: boolean
  // 로딩 상태
}>(), {
  onScroll: false,
  height: 200,
  width: 300,
  customClass: 'infinite-scroll',
  scrollInterval: 500,
  useLoading: false,
  loadingStatus: false,
  itemHeight: 86,
  useHandleScroll: false
})

const emits = defineEmits<{
  (e: 'onLoadTrigger'): void
  (e: 'update:modelValue', val: any): void
  (e: 'handleScrollDirection', p: any): void
}>()


const containerRef = ref<HTMLElement | null>(null)
const loadingState = computed(() => {
  return props.loadingStatus
})

const { arrivedState } = useScroll(containerRef, {
  throttle: props.scrollInterval,
  behavior: 'smooth',
  offset: {
    top: 0,
    bottom: 0,
  },

  // onScroll: () => {
  //   console.log("onScroll", y)
  //   if (containerRef.value) {
  //     console.log("===> ", containerRef.value.scrollTop, containerRef.value.scrollHeight, containerRef.value.clientHeight)
  //   }
  // }
})
// const { top: toTop, bottom: toBottom } = toRefs(directions)
const { bottom, top: _isTop } = toRefs(arrivedState)

function fetchTrigger() {
  if (props.onScroll) {
    emits('onLoadTrigger')
  }
}

watch(bottom, (isBottom: boolean) => {
  // console.log("===> ", isBottom)
  if (isBottom) {
    fetchTrigger()
  }
})

const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  containerRef.value?.scrollTo({ top: 0, left: 0, behavior })
}


defineExpose({ scrollToTop })
</script>

<template>
  <div ref="containerRef" id="project-scroll-container" :class="customClass">
    <slot name="content" :rows="rows" />
    <slot v-if="useLoading && loadingState" name="loading" class="bg-red-300 h-14">
      isLoading..
    </slot>
  </div>
</template>

<style lang="scss"></style>
