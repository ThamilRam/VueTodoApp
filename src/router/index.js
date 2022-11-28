import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from '../views/LayoutView.vue'
import DashboardView from '../views/DashboardView.vue'
import AddTaskView from '../views/AddTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Login',
      component: HomeView
    },    
    {
      path: '/',
      name: 'Layout',
      component: LayoutView,
      children:[
        { path: "/Dashboard", name: "Dashboard", component: DashboardView},
        {path: '/about', name: 'about', component: () => import('../views/AboutView.vue')},        
        { path: '/AddTask', name: 'AddTask', component: () => import('../views/AddTaskView.vue') }
      ]
    },
  ]
})
// router.beforeEach((to,from)=>{
// console.log(to,from);
// })
export default router
