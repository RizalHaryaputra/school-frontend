import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // Jika user sudah login, jangan biarkan masuk ke halaman login lagi
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
      path: '/',
      name: 'home',
      // Sementara kita buat inline component sederhana untuk Home
      component: () => import('../views/HomeView.vue') 
    }
  ]
})

// Navigation Guard Global: Proteksi halaman yang wajib login
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // Daftar halaman publik yang bisa diakses tanpa login
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.isAuthenticated) {
    // Jika butuh auth dan belum login, lempar ke login
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router