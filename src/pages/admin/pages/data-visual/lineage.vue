<script setup lang="ts">
import { LineageNodeElement, LineageLinkElement } from '@ollion/flow-lineage';

const nodes = ref<Record<string, LineageNodeElement>>({
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

const links = ref<LineageLinkElement[]>([
  {
    from: "rdj",
    to: "judge"
  },
  {
    from: "rdj",
    to: "ironman"
  }

])

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
</script>

<template>
  <!-- <f-lineage direction="horizontal" :padding="28" :gap="100" :node-size.prop="{ width: 240, height: 53 }"
    :children-node-size.prop="{ width: 240, height: 32 }" :max-childrens="8" :links.prop="links" :nodes.prop="nodes"
    :node-template.prop="nodeTemplate" :children-node-template.prop="childNodeTemplate">
  </f-lineage> -->
</template>
<style></style>