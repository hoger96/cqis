import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/main.vue")
    },
    {
      path: "/annc",
      name: "annc",
      component: () => import("../system/announcement/index.vue")
    },
    {
      path: "/annc/:id",
      component: () => import("../system/announcement/[id].vue")
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../system/faq/index.vue")
    },
    {
      path: "/faq/:id",
      component: () => import("../system/faq/[id].vue")
    },
    {
      path: "/qna",
      name: "qna",
      component: () => import("../system/qna/index.vue")
    },
    {
      path: "/qna/:id",
      component: () => import("../system/qna/[id].vue")
    },
    {
      path: "/example",
      name: "example",
      component: () => import("../examples/pages/index.vue")
    },
    {
      path: "/example/button",
      name: "button",
      component: () => import("../examples/pages/button.vue")
    },
    {
      path: "/example/chart",
      name: "chart",
      component: () => import("../examples/pages/chart.vue")
    },
    {
      path: "/example/datepicker",
      name: "datepicker",
      component: () => import("../examples/pages/datepicker.vue")
    },
    {
      path: "/example/editor-example",
      name: "editor",
      component: () => import("../examples/pages/editor-example.vue")
    },
    {
      path: "/example/file",
      name: "file",
      component: () => import("../examples/pages/file.vue")
    },
    {
      path: "/example/form",
      name: "form",
      component: () => import("../examples/pages/form.vue")
    },
    {
      path: "/example/grid",
      name: "grid",
      component: () => import("../examples/pages/grid.vue")
    },
    {
      path: "/example/popup",
      name: "popup",
      component: () => import("../examples/pages/popup.vue")
    },
    {
      path: "/example/tree",
      name: "tree",
      component: () => import("../examples/pages/tree.vue")
    },
    {
      path: "/example/chart-js",
      name: "chart-js",
      component: () => import("../examples/pages/chart-js.vue")
    },
    {
      path: "/example/icon-example",
      name: "quickPromptPopup",
      component: () => import("../examples/pages/icon-example.vue")
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../map/index.vue")
    },
    {
      path: "/globe",
      name: "globe",
      component: () => import("../globe/index.vue")
    },
  ]
})

export default router;