<script setup lang="ts">
import "@ollion/flow-core";
import "@ollion/flow-lineage";
import { html } from "lit";
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts';

// Define the nodes and links
const nodes = ref({
  rdj: {
    fData: {
      fullName: "Robert Downey Jr.",
      description: "Movies"
    },
    fClick: (event: any, node: any) => {
      console.log("Node Clicked", event, node);
    }
  },
  nase: {
    fData: {
      fullName: "Na Seong eon.",
      description: "name"
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
</script>

<template>
  <f-lineage direction="horizontal" :padding="28" :gap="100" :node-size.prop="{ width: 240, height: 500 }"
    :children-node-size.prop="{ width: 240, height: 32 }" :max-childrens="8" :links.prop="links" :nodes.prop="nodes"
    :node-template.prop="nodeTemplate" :children-node-template.prop="childNodeTemplate">
  </f-lineage>
</template>