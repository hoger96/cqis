import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VueRouter({
        routesFolder: [
          { src: 'src/pages', path: '' },
          { src: 'src/examples/pages', path: 'examples/' },
          {src: 'public/icon', path: 'icon'}
        ],
        // extensions: ['.vue', '.md'],
        // importMode: (filepath: string) => 'async',
        importMode: 'async',
        // extendRoute(route) {
        //   if (route.path === '/ui-examples') {
        //     route.meta = { layout: 'detail' }
        //   }
        // },
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables/**', 'src/store', 'src/utils'],
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        // extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        // dirs: ["src/components", "src/view"],
        // globs: ['src/**/components/**/*.(vue|tsx|ts|js)'],
        deep: true,
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
        directoryAsNamespace: true,
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
  ],

  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
