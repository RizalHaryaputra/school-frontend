<template>
    <div class="min-h-screen flex bg-gray-50 text-gray-900">
        <transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
                class="fixed id-0 inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"></div>
        </transition>

        <aside :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
            class="fixed id-0 inset-y-0 z-30 lg:relative lg:block w-72 bg-white text-gray-900 flex flex-col shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out border-r border-gray-100">
            <div class="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3 group">
                    <div class="p-1 rounded-xl bg-blue-600 text-white shadow-blue-300 shadow-md">
                        <img src="/images/logo-school-edu.png" alt="Logo" class="w-12 h-12" />
                    </div>
                    <span
                        class="font-bold text-2xl text-gray-950 tracking-tight group-hover:text-blue-600 transition">SCHOOL<span
                            class="font-light text-gray-600">api</span></span>
                </RouterLink>
                <button @click="isSidebarOpen = false" class="lg:hidden text-gray-500 hover:text-gray-900">
                    <XMarkIcon class="w-6 h-6" />
                </button>
            </div>

            <nav class="flex-1 px-4 py-8 space-y-2.5 overflow-y-auto">
                <RouterLink :to="{ name: 'home' }"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.name === 'home'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <HomeIcon class="w-6 h-6"
                        :class="$route.name === 'home' ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Dashboard</span>
                </RouterLink>
                <RouterLink to="/kelas"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.path.startsWith('/kelas')
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <RectangleGroupIcon class="w-6 h-6"
                        :class="$route.path.startsWith('/kelas') ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Data Kelas</span>
                </RouterLink>
                <RouterLink to="/mapel"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.path.startsWith('/mapel')
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <AcademicCapIcon class="w-6 h-6"
                        :class="$route.path.startsWith('/mapel') ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Data Mapel</span>
                </RouterLink>
                <RouterLink to="/guru"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.path.startsWith('/guru')
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <UsersIcon class="w-6 h-6"
                        :class="$route.path.startsWith('/guru') ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Data Guru</span>
                </RouterLink>
                <RouterLink to="/jadwal"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.path.startsWith('/jadwal')
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <CalendarDaysIcon class="w-6 h-6"
                        :class="$route.path.startsWith('/jadwal') ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Jadwal Pelajaran</span>
                </RouterLink>
                <RouterLink to="/siswa"
                    class="flex items-center space-x-3.5 px-4 py-3 rounded-xl transition font-medium group" :class="$route.path.startsWith('/siswa')
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'">
                    <UserGroupIcon class="w-6 h-6"
                        :class="$route.path.startsWith('/siswa') ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-600'" />
                    <span>Data Siswa</span>
                </RouterLink>
            </nav>

            <div class="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                <div class="text-xs text-gray-400 font-medium mb-2.5 tracking-wider uppercase">Masuk sebagai:</div>
                <div class="flex items-center space-x-3">
                    <div
                        class="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg ring-2 ring-white">
                        {{ authStore.user?.username?.substring(0, 1).toUpperCase() || 'A' }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-semibold text-gray-950 truncate">{{ authStore.user?.username || 'Admin' }}
                        </div>
                        <div class="text-sm text-gray-500 truncate">{{ authStore.user?.role || 'administrator' }}</div>
                    </div>
                </div>
            </div>
        </aside>

        <div class="flex-1 flex flex-col">
            <header
                class="h-20 bg-white/90 backdrop-blur-sm sticky top-0 shadow-sm flex items-center justify-between px-6 lg:px-10 z-10 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                    <button @click="isSidebarOpen = true"
                        class="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <Bars3Icon class="w-6 h-6" />
                    </button>
                    <h2 class="font-bold text-gray-950 text-xl lg:text-2xl tracking-tight">{{ currentRouteTitle }}</h2>
                </div>

                <div class="flex items-center space-x-5">
                    <button class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition">
                        <BellIcon class="w-6 h-6" />
                    </button>

                    <button @click="promptLogout"
                        class="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition flex items-center space-x-2">
                        <ArrowRightOnRectangleIcon class="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main class="flex-1 p-6 lg:p-10 overflow-y-auto">
                <RouterView />
            </main>
        </div>
    </div>

    <ConfirmModal :isOpen="isLogoutModalOpen" :isLoading="isLoggingOut" title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari sesi saat ini? Anda harus login kembali untuk mengakses sistem."
        confirmText="Ya, Logout" cancelText="Batal" type="danger" @confirm="executeLogout"
        @cancel="isLogoutModalOpen = false" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../utils/api'
import { AcademicCapIcon, HomeIcon, RectangleGroupIcon, UsersIcon, UserGroupIcon, Bars3Icon, BellIcon, ArrowRightOnRectangleIcon, XMarkIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import ConfirmModal from '../components/ConfirmModal.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// State untuk membuka/menutup sidebar di mobile
const isSidebarOpen = ref(false)

const isLogoutModalOpen = ref(false)
const isLoggingOut = ref(false)

// Computed property untuk mendapatkan judul halaman berdasarkan rute saat ini
const currentRouteTitle = computed(() => {
    switch (route.name) {
        case 'home': return 'Ringkasan Sistem';
        // Tambah rute lain di sini nanti
        default: return 'Panel Manajemen';
    }
})

// 1. Fungsi buka modal
const promptLogout = () => {
    isLogoutModalOpen.value = true
}

// 2. Fungsi eksekusi logout sebenarnya
const executeLogout = async () => {
    isLoggingOut.value = true // <-- 2. Nyalakan loading
    try {
        await api.post('/logout')
    } catch (error) {
        console.error('Gagal memanggil API logout.')
    } finally {
        // Karena kita akan pindah halaman, loading tidak perlu di-false kan
        // tapi modal tetap kita tutup dan hapus state lokal
        isLogoutModalOpen.value = false
        authStore.logout()
        router.push({ name: 'login' })
    }
}
</script>