import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
// import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      //直接引入组件的方式，会将所有组件打包到一个js文件中，导致首屏加载时间过长
      component: TodoView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 这种import导入组件的懒加载形式，可以优化vue加载性能，路由切换时才会加载对应的组件
      component: () => import('../views/AboutView.vue')
      // component: AboutView
    }
  ]
})

export default router
