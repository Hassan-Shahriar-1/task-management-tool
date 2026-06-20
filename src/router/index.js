import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      redirect: '/',
    },
    {
      path: '/team',
      redirect: '/',
    },
    {
      path: '/settings',
      redirect: '/',
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // Catch-all route to redirect back to home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ],
})

export default router

