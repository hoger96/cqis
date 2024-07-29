// import {createRouter, createWebHistory} from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(""),
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: () => import("../components/main.vue")
//     },
//     {
//       path: "/annc",
//       name: "annc",
//       component: () => import("../system/announcement/index.vue")
//     },
//     {
//       path: "/annc/:id",
//       component: () => import("../system/announcement/[id].vue")
//     },
//     {
//       path: "/admin/annc",
//       name: "admin-annc",
//       component: () => import("../system/announcement/admin-index.vue")
//     },
//     {
//       path: "/admin/annc/:id",
//       name: "admin-annc-detail",
//       component: () => import("../system/announcement/admin-[id].vue")
//     },
//     {
//       path: "/admin/annc/create",
//       name: "admin-annc-create",
//       component: () => import("../system/announcement/create.vue")
//     },
//     {
//       path: "/faq",
//       name: "faq",
//       component: () => import("../system/faq/index.vue")
//     },
//     {
//       path: "/faq/:id",
//       component: () => import("../system/faq/[id].vue")
//     },
//     {
//       path: "/admin/faq",
//       name: "admin-faq",
//       component: () => import("../system/faq/admin-index.vue")
//     },
//     {
//       path: "/admin/faq/:id",
//       name: "admin-faq-detail",
//       component: () => import("../system/faq/admin-[id].vue")
//     },
//     {
//       path: "/admin/faq/create",
//       name: "admin-faq-create",
//       component: () => import("../system/faq/create.vue")
//     },
//     {
//       path: "/qna",
//       name: "qna",
//       component: () => import("../system/qna/index.vue")
//     },
//     {
//       path: "/qna/:id",
//       component: () => import("../system/qna/[id].vue")
//     },
//     {
//       path: "/qna/create",
//       component: () => import("../system/qna/create.vue")
//     },
//     {
//       path: "/admin/qna",
//       name: "admin-qna",
//       component: () => import("../system/qna/admin-index.vue")
//     },
//     {
//       path: "/admin/qna/:id",
//       name: "admin-qna-detail",
//       component: () => import("../system/qna/admin-[id].vue")
//     },
//     // {
//     //   path: "/admin/qna/create",
//     //   name: "admin-qna-create",
//     //   component: () => import("../system/qna/admin-create.vue")
//     // },
//     {
//       path: "/example",
//       name: "example",
//       component: () => import("../examples/pages/index.vue")
//     },
//     {
//       path: "/example/button",
//       name: "button",
//       component: () => import("../examples/pages/button.vue")
//     },
//     {
//       path: "/example/chart",
//       name: "chart",
//       component: () => import("../examples/pages/chart.vue")
//     },
//     {
//       path: "/example/datepicker",
//       name: "datepicker",
//       component: () => import("../examples/pages/datepicker.vue")
//     },
//     {
//       path: "/example/editor-example",
//       name: "editor",
//       component: () => import("../examples/pages/editor-example.vue")
//     },
//     {
//       path: "/example/file",
//       name: "file",
//       component: () => import("../examples/pages/file.vue")
//     },
//     {
//       path: "/example/form",
//       name: "form",
//       component: () => import("../examples/pages/form.vue")
//     },
//     {
//       path: "/example/grid",
//       name: "grid",
//       component: () => import("../examples/pages/grid.vue")
//     },
//     {
//       path: "/example/popup",
//       name: "popup",
//       component: () => import("../examples/pages/popup.vue")
//     },
//     {
//       path: "/example/tree",
//       name: "tree",
//       component: () => import("../examples/pages/tree.vue")
//     },
//     {
//       path: "/example/chart-js",
//       name: "chart-js",
//       component: () => import("../examples/pages/chart-js.vue")
//     },
//     {
//       path: "/example/icon-example",
//       name: "quickPromptPopup",
//       component: () => import("../examples/pages/icon-example.vue")
//     },
//     {
//       path: "/map",
//       name: "map",
//       component: () => import("../map/index.vue")
//     },
//     {
//       path: "/globe",
//       name: "globe",
//       component: () => import("../globe/index.vue")
//     },
//     {
//       path: "/admin/user-mgmt",
//       name: "user-mgmt",
//       component: () => import("../admin/pages/user-mgmt.vue")
//     },
//   ]
// })

// export default router;