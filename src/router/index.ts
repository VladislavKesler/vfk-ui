import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/elements/button',
    },
    {
      path: '/elements/:component',
      component: () => import('../views/ElementPage.vue'),
    },
    {
      path: '/fragments/:component',
      component: () => import('../views/FragmentPage.vue'),
    },
    {
      path: '/layout/:component',
      component: () => import('../views/LayoutPage.vue'),
    },
  ],
})

export default router
