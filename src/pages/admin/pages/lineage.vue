<script setup lang="ts">
import "@ollion/flow-lineage";
import { html } from "lit";
import { ref } from "vue";
import { useRouter } from 'vue-router'
import axios from 'axios'

const { t } = useI18n()

const nodes = ref()
const links = ref([])
const lineageForm = reactive({
  name: '',
  description: '',
  children: []
})
// const nodes = ref({
//   rdj: {
//     fData: {
//       fullName: "Robert Downey Jr.",
//       description: "Movies"
//     },
//     fClick: (event: any, node: any) => {
//       setLineageDetail(event, node)
//     }
//   },
//   nase: {
//     fData: {
//       fullName: "Na Seong eon.",
//       description: "name"
//     },
//     fClick: (event: any, node: any) => {
//       setLineageDetail(event, node)
//     }
//   },
//   judge: {
//     fData: {
//       fullName: "The Judge",
//       description: "Hank Palmer"
//     },
//     fClick: (event: any, node: any) => {
//       setLineageDetail(event, node)
//     }
//   },
//   ironman: {
//     fData: {
//       fullName: "Iron Man",
//       description: "Tony stark"
//     },
//     fClick: (event: any, node: any) => {
//       setLineageDetail(event, node)
//     },
//     fChildren: {
//       irchild1: {
//         fData: {
//           icon: "i-hashtag",
//           title: "Iron man 1"
//         }
//       },
//       irchild2: {
//         fData: {
//           icon: "Mavis",
//           title: "Mavis"
//         }
//       }
//     },
//     fHideChildren: false
//   }
// });

// const links = ref([
//   { from: "judge", to: "rdj" },
//   { from: "ironman", to: "rdj" },
//   { from: "rdj", to: "nase" }
// ]);

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

const getLineageDetail = async () => {
  try {
    const res = await axios.get('../../../../public/assets/lineageSample.json')
    return res.data
  }
  catch (error) {
    console.error(error)
  }
}
const setLineageData = async () => {
  const lineageData = await getLineageDetail()
  const nodes = lineageData.nodeList.reduce((acc, item) => {
    acc[item.tblName] = {
      fData: {
        fullName: item.tblName,
        description: item.description
      },
      fClick: (event, node) => {
        setLineageDetail(event, node);
      },
      fHideChildren: false,
      fChildren: item.clmnList ? item.clmnList.reduce((clmnAcc, clmn, index) => {
        clmnAcc[`irchild${index + 1}`] = {
          fData: {
            icon: "i-hashtag",
            title: clmn.clmnName
          }
        };
        return clmnAcc;
      }, {}) : {}  // fChildren이 존재하지 않을 때 빈 객체 반환
    };
    return acc;
  }, {});

  return nodes
}

const setLineageLinks = async () => {
  const lineageData = await getLineageDetail()
  const links = lineageData.links

  return links
}

onMounted(async () => {
  nodes.value = await setLineageData()
  links.value = await setLineageLinks()
})
</script>

<template>
  <div>
    <h2 class="title">
      리니지
    </h2>
    <div class="h-full">
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
    </div>
  </div>
</template>
<style></style>