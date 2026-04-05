import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import KelasView from '../views/KelasView.vue'
import MapelView from '../views/MapelView.vue'
import GuruIndexView from '../views/GuruIndexView.vue'
import GuruFormView from '../views/GuruFormView.vue'
import GuruDetailView from '../views/GuruDetailView.vue'
import JadwalIndexView from '../views/JadwalIndexView.vue'
import JadwalFormView from '../views/JadwalFormView.vue'
import SiswaIndexView from '../views/SiswaIndexView.vue'
import SiswaFormView from '../views/SiswaFormView.vue'
import SiswaDetailView from '../views/SiswaDetailView.vue'
import UserView from '../views/UserView.vue'

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
        },
        {
          path: 'jadwal',
          name: 'jadwal-index',
          component: JadwalIndexView
        },
        {
          path: 'jadwal/tambah',
          name: 'jadwal-create',
          component: JadwalFormView
        },
        {
          path: 'jadwal/:id/edit',
          name: 'jadwal-edit',
          component: JadwalFormView
        },
        { path: 'siswa', name: 'siswa-index', component: SiswaIndexView },
        { path: 'siswa/tambah', name: 'siswa-create', component: SiswaFormView },
        { path: 'siswa/:id/edit', name: 'siswa-edit', component: SiswaFormView },
        { path: 'siswa/:id/detail', name: 'siswa-detail', component: SiswaDetailView },
        { path: 'users', name: 'users-index', component: UserView }
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