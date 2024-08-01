<script setup lang="ts">
import "@ollion/flow-core";
import "@ollion/flow-lineage";
import { html } from "lit";
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts';

const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  lineageId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
}>()

const lineageId = ref('')
const lineageForm = reactive({
  name: '',
  description: '',
  children: []
})
const nodes = ref({
  rdj: {
    fData: {
      fullName: "Robert Downey Jr.",
      description: "Movies"
    },
    fClick: (event: any, node: any) => {
      setLineageDetail(event, node)
    }
  },
  nase: {
    fData: {
      fullName: "Na Seong eon.",
      description: "name"
    },
    fClick: (event: any, node: any) => {
      setLineageDetail(event, node)
    }
  },
  judge: {
    fData: {
      fullName: "The Judge",
      description: "Hank Palmer"
    },
    fClick: (event: any, node: any) => {
      setLineageDetail(event, node)
    }
  },
  ironman: {
    fData: {
      fullName: "Iron Man",
      description: "Tony stark"
    },
    fClick: (event: any, node: any) => {
      setLineageDetail(event, node)
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
          icon: "Mavis",
          title: "Mavis"
        }
      }
    },
    fHideChildren: false
  }
});

const links = ref([
  { from: "judge", to: "rdj" },
  { from: "ironman", to: "rdj" },
  { from: "rdj", to: "nase" }
]);

const nodeTemplate = (node: LineageNodeElement) => {
  return html`
    <f-div
      width="100%"
      state="custom,#888888"
      height="100%"
      padding="small"
      align="top-left"
      variant="curved"
      gap="small"
    >
      <f-pictogram variant="circle" source="${node.fData.fullName}"></f-pictogram>
      <f-div direction="column">
        <f-text size="small" ellipsis>${node.fData.fullName}</f-text>
        <f-text size="x-small" ellipsis>${node.fData.description}</f-text>
      </f-div>
      ${node.childrenToggle}
    </f-div>
  `;
};

const childNodeTemplate = (node: LineageNodeElement) => {
  return html`
    <f-div
      width="100%"
      height="100%"
      state="custom,#434470"
      padding="none medium"
      align="middle-left"
      gap="small"
      border="small solid default bottom"
    >
      <f-icon source="${node.fData.icon}" size="small"></f-icon>
      <f-text size="small" ellipsis>${node.fData.title}</f-text>
    </f-div>
  `;
};

const resetForm = () => {
  lineageForm.name = ''
  lineageForm.description = ''
  lineageForm.children = []
}

const setLineageDetail = (e, node) => {
  resetForm()
  lineageForm.name = node.fData.fullName
  lineageForm.description = node.fData.description
  if (node.fChildren) {
    const childrenList = node.fChildren
    const childrenKeys = Object.keys(node.fChildren)
    for (let i = 0; i < childrenKeys.length; i++)
      lineageForm.children.push(childrenList[childrenKeys[i]].fData.title)
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

const handleCancel = () => {
  emits('cancel')
}

watchEffect(() => {
  lineageId.value = props.lineageId
  if (!lineageId.value) {
    return
  }

  // setUserDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('data-visual.label.lineage')" :size="MODAL_SIZE.XXXLARGE" class="lineage-p"
    @cancel="handleCancel">
    <template #content>
      <div class="lineage-p__content">
        <f-lineage direction="horizontal" :padding="28" :gap="100" :node-size.prop="{ width: 240, height: 60 }"
          :children-node-size.prop="{ width: 240, height: 32 }" :max-childrens="8" :links.prop="links"
          :nodes.prop="nodes" :node-template.prop="nodeTemplate" :children-node-template.prop="childNodeTemplate"
          :background="{ color: '$white' }">
        </f-lineage>
        <form v-if="lineageForm.name" class="form">
          <FormItem :label="t('data-visual.lineage.name')">
            <CustomInput v-model="lineageForm.name" max-length="10" readonly />
          </FormItem>
          <FormItem :label="t('data-visual.lineage.description')">
            <CustomInput v-model="lineageForm.description" max-length="10" readonly />
          </FormItem>
          <FormItem v-if="lineageForm.children.length > 0" :label="t('data-visual.lineage.column')" use-group>
            <div v-for="(table, index) in lineageForm.children" :key="index">
              <CustomInput v-model="lineageForm.children[index]" max-length="10" readonly />
            </div>
          </FormItem>
        </form>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
    </template>
  </common-modal>
</template>