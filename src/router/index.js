import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue' // Import Layout baru kita

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
          path: '', // Ini berarti root path '/'
          name: 'home',
          component: () => import('../views/HomeView.vue')
        }
        // Nanti kita bisa tambah rute kelas, siswa, dll di sini
      ]
    }
  ]
})

// Navigation Guard (tetap sama seperti sebelumnya)
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