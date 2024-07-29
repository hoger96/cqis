import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { createApp } from 'vue'
import App from './App.vue'
<<<<<<< HEAD
import router from './router'
=======
// import router from "./router"
import { routes } from 'vue-router/auto-routes'
>>>>>>> e45f6f8 (feat: 레이아웃, 라우터 변경)

import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// createApp(App).use(router).use(ElementPlus).mount('#app')
export const createApp = ViteSSG(
  App,
  { routes: setupLayouts(routes), base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
