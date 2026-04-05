import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import KelasView from '../views/KelasView.vue'
import MapelView from '../views/MapelView.vue'
import GuruIndexView from '../views/GuruIndexView.vue'
import GuruFormView from '../views/GuruFormView.vue'
import GuruDetailView from '../views/GuruDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          next({ name: 'home' })
        } else {
          next()
        }
      }
    },
    {
      // Parent Route untuk semua rute yang wajib login
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '', 
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'kelas',
          name: 'kelas',
          component: KelasView
        },
        {
          path: 'mapel',
          name: 'mapel',
          component: MapelView
        },
        {
          path: 'guru',
          name: 'guru-index',
          component: GuruIndexView
        },
        {
          path: 'guru/tambah',
          name: 'guru-create',
          component: GuruFormView
        },
        {
          path: 'guru/:id/edit',
          name: 'guru-edit',
          component: GuruFormView
        },
        {
          path: 'guru/:id/detail',
          name: 'guru-detail',
          component: GuruDetailView
        }
      ]
    },

  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router