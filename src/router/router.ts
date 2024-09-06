import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
    },
    component: () => import('@/components/HelloWorld.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '测试',
      keepAlive: true,
    },
    component: () => import('@/pages/views/test/test.vue'),
  },
  {
    path: '/fabric',
    name: 'Fabric',
    meta: {
      title: '测试',
      keepAlive: true,
    },
    component: () => import('@/pages/fabric/index.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
