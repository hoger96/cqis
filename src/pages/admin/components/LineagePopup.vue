<script setup lang="ts">
import "@ollion/flow-core";
import "@ollion/flow-lineage";
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import "@ollion/flow-lineage/dist/types/vue3";

const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  lineageId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { userInfo: IUserDetail }): void
}>()

const lineageId = ref('')
const nodes = ref({
  rdj: {
    fData: {
      fullName: "Robert Downey Jr.",
      description: "Movies"
    }
  },
  judge: {
    fData: {
      fullName: "The Judge",
      description: "Hank Palmer"
    }
  },
  ironman: {
    fData: {
      fullName: "Iron Man",
      description: "Tony stark"
    },
    fChildren: {
      irchild1: {
        fData: {
          icon: "i-hashtag",
          title: "Iron man 1"
        }
      },
      irchild2: {
        fData: {
          icon: "i-paragraph",
          title: "Iron man 2"
        }
      }
    },
    fHideChildren: false
  }
})
const links = ref([
  {
    from: "rdj",
    to: "judge"
  },
  {
    from: "rdj",
    to: "ironman"
  }

])

const handleCancel = () => {
  emits('cancel')
}

const getLineageDetail = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: '/data-set/${lineageId.value}',
    // })
    const res = {
    }
  }
  catch (error) {
    console.error(error)
  }
}

const nodeTemplate = (node: LineageNodeElement) => {
  return h('f-div', {
    width: "100%",
    state: "secondary",
    height: "100%",
    padding: "small",
    align: "top-left",
    variant: "curved",
    gap: "small",
  }, [
    h('f-pictogram', {
      variant: "circle",
      source: node.fData.fullName,
    }),
    h('f-div', {
      direction: "column"
    }, [
      h('f-text', {
        size: "small",
        ellipsis: true,
      }, node.fData.fullName),
      h('f-text', {
        size: "x-small",
        ellipsis: true,
      }, node.fData.description)
    ]),
    node.childrenToggle
  ]);
}

const childNodeTemplate = (node: LineageNodeElement) => {
  return h('f-div', {
    state: "secondary",
    width: "100%",
    height: "100%",
    padding: "none medium",
    align: "middle-left",
    gap: "small",
    border: "small solid default bottom"
  }, [
    h('f-icon', {
      source: node.fData.icon,
      size: "small"
    }),
    h('f-text', {
      size: "small",
      ellipsis: true,
    }, node.fData.title)
  ]);
}

const setUserDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
  }
  catch (error) {
    console.error(error)
  }
}

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

watchEffect(() => {
  lineageId.value = props.lineageId
  if (!lineageId.value) {
    return
  }

  // setUserDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('data-visual.label.lineage')" :size="MODAL_SIZE.XXXLARGE"
    @cancel="handleCancel">
    <template #content>
      <f-lineage direction="horizontal" :padding="28" :gap="100" :node-size.prop="{ width: 240, height: 500 }"
        :children-node-size.prop="{ width: 240, height: 32 }" :max-childrens="8" :links.prop="links" :nodes.prop="nodes"
        :node-template.prop="nodeTemplate" :children-node-template.prop="childNodeTemplate"></f-lineage>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__secondary--md" @click="handleUpdateUser">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>