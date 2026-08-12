import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostByCategoryView from '@/views/PostByCategoryView.vue'
import PostDetailView from '@/views/PostDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue')
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('../views/PartnersViews.vue')
    },
    {
      path: '/rapports',
      name: 'rapports',
      component: () => import('../views/ReportsView.vue')
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/categories/:categoryId',
      name: 'PostByCategoryView',
      component: PostByCategoryView,
      props: true,
    },
    {
      path: '/post/:id',
      name: 'PostDetailView',
      component: PostDetailView,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
