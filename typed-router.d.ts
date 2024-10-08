/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/admin/components/AdminAuthPopup': RouteRecordInfo<'/admin/components/AdminAuthPopup', '/admin/components/AdminAuthPopup', Record<never, never>, Record<never, never>>,
    '/admin/components/BatchPopup': RouteRecordInfo<'/admin/components/BatchPopup', '/admin/components/BatchPopup', Record<never, never>, Record<never, never>>,
    '/admin/components/CodePopup': RouteRecordInfo<'/admin/components/CodePopup', '/admin/components/CodePopup', Record<never, never>, Record<never, never>>,
    '/admin/components/CorPopup': RouteRecordInfo<'/admin/components/CorPopup', '/admin/components/CorPopup', Record<never, never>, Record<never, never>>,
    '/admin/components/GroupCodePopup': RouteRecordInfo<'/admin/components/GroupCodePopup', '/admin/components/GroupCodePopup', Record<never, never>, Record<never, never>>,
    '/admin/components/LineagePopup': RouteRecordInfo<'/admin/components/LineagePopup', '/admin/components/LineagePopup', Record<never, never>, Record<never, never>>,
    '/admin/components/UserAuthPopup': RouteRecordInfo<'/admin/components/UserAuthPopup', '/admin/components/UserAuthPopup', Record<never, never>, Record<never, never>>,
    '/admin/components/UserPopup': RouteRecordInfo<'/admin/components/UserPopup', '/admin/components/UserPopup', Record<never, never>, Record<never, never>>,
    '/admin/pages/admin-auth': RouteRecordInfo<'/admin/pages/admin-auth', '/admin/pages/admin-auth', Record<never, never>, Record<never, never>>,
    '/admin/pages/batch-history': RouteRecordInfo<'/admin/pages/batch-history', '/admin/pages/batch-history', Record<never, never>, Record<never, never>>,
    '/admin/pages/batch-mgmt': RouteRecordInfo<'/admin/pages/batch-mgmt', '/admin/pages/batch-mgmt', Record<never, never>, Record<never, never>>,
    '/admin/pages/common-code': RouteRecordInfo<'/admin/pages/common-code', '/admin/pages/common-code', Record<never, never>, Record<never, never>>,
    '/admin/pages/corporation': RouteRecordInfo<'/admin/pages/corporation', '/admin/pages/corporation', Record<never, never>, Record<never, never>>,
    '/admin/pages/data-set/': RouteRecordInfo<'/admin/pages/data-set/', '/admin/pages/data-set', Record<never, never>, Record<never, never>>,
    '/admin/pages/data-set/[id]': RouteRecordInfo<'/admin/pages/data-set/[id]', '/admin/pages/data-set/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/pages/data-set/create': RouteRecordInfo<'/admin/pages/data-set/create', '/admin/pages/data-set/create', Record<never, never>, Record<never, never>>,
    '/admin/pages/data-visual/': RouteRecordInfo<'/admin/pages/data-visual/', '/admin/pages/data-visual', Record<never, never>, Record<never, never>>,
    '/admin/pages/data-visual/[id]': RouteRecordInfo<'/admin/pages/data-visual/[id]', '/admin/pages/data-visual/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/pages/data-visual/create': RouteRecordInfo<'/admin/pages/data-visual/create', '/admin/pages/data-visual/create', Record<never, never>, Record<never, never>>,
    '/admin/pages/lineage': RouteRecordInfo<'/admin/pages/lineage', '/admin/pages/lineage', Record<never, never>, Record<never, never>>,
    '/admin/pages/user-auth': RouteRecordInfo<'/admin/pages/user-auth', '/admin/pages/user-auth', Record<never, never>, Record<never, never>>,
    '/admin/pages/user-mgmt': RouteRecordInfo<'/admin/pages/user-mgmt', '/admin/pages/user-mgmt', Record<never, never>, Record<never, never>>,
    'ui-examples': RouteRecordInfo<'ui-examples', '/examples', Record<never, never>, Record<never, never>>,
    '/examples/button': RouteRecordInfo<'/examples/button', '/examples/button', Record<never, never>, Record<never, never>>,
    '/examples/chart': RouteRecordInfo<'/examples/chart', '/examples/chart', Record<never, never>, Record<never, never>>,
    '/examples/chart-js': RouteRecordInfo<'/examples/chart-js', '/examples/chart-js', Record<never, never>, Record<never, never>>,
    '/examples/datepicker': RouteRecordInfo<'/examples/datepicker', '/examples/datepicker', Record<never, never>, Record<never, never>>,
    '/examples/editor-example': RouteRecordInfo<'/examples/editor-example', '/examples/editor-example', Record<never, never>, Record<never, never>>,
    '/examples/file': RouteRecordInfo<'/examples/file', '/examples/file', Record<never, never>, Record<never, never>>,
    '/examples/form': RouteRecordInfo<'/examples/form', '/examples/form', Record<never, never>, Record<never, never>>,
    '/examples/icon-example': RouteRecordInfo<'/examples/icon-example', '/examples/icon-example', Record<never, never>, Record<never, never>>,
    'menu-example': RouteRecordInfo<'menu-example', '/examples/menu-admin-example', Record<never, never>, Record<never, never>>,
    '/examples/popup': RouteRecordInfo<'/examples/popup', '/examples/popup', Record<never, never>, Record<never, never>>,
    '/examples/selector': RouteRecordInfo<'/examples/selector', '/examples/selector', Record<never, never>, Record<never, never>>,
    '/examples/table': RouteRecordInfo<'/examples/table', '/examples/table', Record<never, never>, Record<never, never>>,
    '/examples/textfield': RouteRecordInfo<'/examples/textfield', '/examples/textfield', Record<never, never>, Record<never, never>>,
    '/examples/tree': RouteRecordInfo<'/examples/tree', '/examples/tree', Record<never, never>, Record<never, never>>,
    '/flatmap/': RouteRecordInfo<'/flatmap/', '/flatmap', Record<never, never>, Record<never, never>>,
    '/globe/': RouteRecordInfo<'/globe/', '/globe', Record<never, never>, Record<never, never>>,
    '/map/': RouteRecordInfo<'/map/', '/map', Record<never, never>, Record<never, never>>,
    '/system/announcement/': RouteRecordInfo<'/system/announcement/', '/system/announcement', Record<never, never>, Record<never, never>>,
    '/system/announcement/[id]': RouteRecordInfo<'/system/announcement/[id]', '/system/announcement/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/system/announcement/admin-[id]': RouteRecordInfo<'/system/announcement/admin-[id]', '/system/announcement/admin-:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/system/announcement/admin-index': RouteRecordInfo<'/system/announcement/admin-index', '/system/announcement/admin-index', Record<never, never>, Record<never, never>>,
    '/system/announcement/create': RouteRecordInfo<'/system/announcement/create', '/system/announcement/create', Record<never, never>, Record<never, never>>,
    '/system/faq/': RouteRecordInfo<'/system/faq/', '/system/faq', Record<never, never>, Record<never, never>>,
    '/system/faq/[id]': RouteRecordInfo<'/system/faq/[id]', '/system/faq/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/system/faq/admin-[id]': RouteRecordInfo<'/system/faq/admin-[id]', '/system/faq/admin-:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/system/faq/admin-index': RouteRecordInfo<'/system/faq/admin-index', '/system/faq/admin-index', Record<never, never>, Record<never, never>>,
    '/system/faq/create': RouteRecordInfo<'/system/faq/create', '/system/faq/create', Record<never, never>, Record<never, never>>,
  }
}
