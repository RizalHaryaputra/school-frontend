<template>
    <div class="space-y-6">
        <div
            class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-lg shadow-blue-200 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
                    Selamat datang, {{ authStore.user?.username || 'Admin' }}! 👋
                </h1>
                <p class="text-blue-100 font-medium">
                    Ini adalah ringkasan aktivitas Sistem Informasi Sekolah untuk hari ini.
                </p>
            </div>
            <div
                class="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 flex items-center space-x-2">
                <CalendarDaysIcon class="w-5 h-5 text-blue-100" />
                <span class="font-semibold text-sm">{{ tanggalHariIni }}</span>
            </div>
        </div>

        <div v-if="isLoading" class="flex flex-col justify-center items-center py-20 space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="text-gray-500 font-medium text-sm">Memuat data dashboard...</p>
        </div>

        <div v-else-if="errorMessage"
            class="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon class="w-10 h-10 mb-2 text-red-500" />
            <p class="font-medium">{{ errorMessage }}</p>
            <button @click="fetchDashboard"
                class="mt-4 px-5 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-sm font-medium transition">Coba
                Lagi</button>
        </div>

        <div v-else class="space-y-6">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 transition hover:shadow-md">
                    <div
                        class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <UserGroupIcon class="w-7 h-7" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Siswa</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_siswa }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 transition hover:shadow-md">
                    <div
                        class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <AcademicCapIcon class="w-7 h-7" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Guru</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_guru }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 transition hover:shadow-md">
                    <div
                        class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <BuildingOffice2Icon class="w-7 h-7" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Kelas</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_kelas }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 transition hover:shadow-md">
                    <div
                        class="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <ShieldCheckIcon class="w-7 h-7" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Akun Sistem</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_user }}</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div class="lg:col-span-2 space-y-6">
                    <div
                        class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <h3 class="text-lg font-bold text-gray-900 flex items-center">
                                <ClockIcon class="w-5 h-5 mr-2 text-blue-500" />
                                Jadwal Mengajar Hari Ini (<span class="capitalize">{{ dashboardData.hari_ini }}</span>)
                            </h3>
                            <RouterLink to="/jadwal" class="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat
                                Semua</RouterLink>
                        </div>

                        <div class="p-0 flex-1">
                            <ul v-if="dashboardData.jadwal_hari_ini && dashboardData.jadwal_hari_ini.length > 0"
                                class="divide-y divide-gray-100">
                                <li v-for="jadwal in dashboardData.jadwal_hari_ini" :key="jadwal.id"
                                    class="px-6 py-4 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div
                                        class="bg-blue-50 text-blue-700 font-mono text-sm font-bold px-3 py-1.5 rounded-lg shrink-0 text-center">
                                        {{ jadwal.waktu }}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-bold text-gray-900">{{ jadwal.mapel }}</p>
                                        <p class="text-sm text-gray-500 mt-0.5">Pengajar: {{ jadwal.guru }}</p>
                                    </div>
                                    <div class="shrink-0">
                                        <span
                                            class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                                            {{ jadwal.kelas }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="flex flex-col items-center justify-center h-48 text-gray-500">
                                <CalendarIcon class="w-12 h-12 text-gray-300 mb-3" />
                                <p>Tidak ada jadwal pelajaran untuk hari ini.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1 space-y-6">

                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <h3 class="text-lg font-bold text-gray-900 flex items-center mb-4">
                            <ChartPieIcon class="w-5 h-5 mr-2 text-indigo-500" />
                            Demografi Siswa
                        </h3>

                        <div v-if="dashboardData.stats.total_siswa > 0">
                            <div class="flex justify-between text-sm mb-2 font-medium">
                                <span class="text-blue-600">Laki-laki ({{ persentaseLakiLaki }}%)</span>
                                <span class="text-pink-500">Perempuan ({{ persentasePerempuan }}%)</span>
                            </div>
                            <div class="h-4 w-full flex rounded-full overflow-hidden">
                                <div class="bg-blue-500 transition-all duration-1000"
                                    :style="{ width: persentaseLakiLaki + '%' }"></div>
                                <div class="bg-pink-400 transition-all duration-1000"
                                    :style="{ width: persentasePerempuan + '%' }"></div>
                            </div>
                            <div class="flex justify-between text-xs text-gray-500 mt-2">
                                <span>{{ dashboardData.demografi.laki_laki }} Siswa</span>
                                <span>{{ dashboardData.demografi.perempuan }} Siswi</span>
                            </div>
                        </div>
                        <div v-else class="text-center text-gray-500 text-sm py-4">
                            Data belum tersedia.
                        </div>
                    </div>

                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="px-6 py-5 border-b border-gray-100">
                            <h3 class="text-lg font-bold text-gray-900 flex items-center">
                                <UserPlusIcon class="w-5 h-5 mr-2 text-green-500" />
                                Siswa Baru Didaftarkan
                            </h3>
                        </div>
                        <div class="p-0">
                            <ul v-if="dashboardData.siswa_terbaru && dashboardData.siswa_terbaru.length > 0"
                                class="divide-y divide-gray-50">
                                <li v-for="siswa in dashboardData.siswa_terbaru" :key="siswa.id"
                                    class="px-6 py-4 hover:bg-gray-50 transition">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="font-semibold text-gray-900 text-sm">{{ siswa.nama }}</p>
                                            <p class="text-xs text-gray-500 mt-0.5">Kelas: {{ siswa.kelas }}</p>
                                        </div>
                                        <span
                                            class="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{
                                            siswa.created_at }}</span>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="text-center text-gray-500 text-sm py-8">
                                Belum ada data pendaftaran siswa.
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../utils/api'
import {
    UserGroupIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    BuildingOffice2Icon,
    CalendarDaysIcon,
    ClockIcon,
    UserPlusIcon,
    ChartPieIcon,
    ExclamationTriangleIcon,
    CalendarIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const isLoading = ref(true)
const errorMessage = ref('')
const dashboardData = ref(null)

// Mengatur format tanggal untuk Banner Atas (Sesuai locale Indonesia)
const tanggalHariIni = computed(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('id-ID', options)
})

// Kalkulasi Persentase Gender secara dinamis
const persentaseLakiLaki = computed(() => {
    if (!dashboardData.value || dashboardData.value.stats.total_siswa === 0) return 0
    const l = dashboardData.value.demografi.laki_laki
    const t = dashboardData.value.stats.total_siswa
    return Math.round((l / t) * 100)
})

const persentasePerempuan = computed(() => {
    if (!dashboardData.value || dashboardData.value.stats.total_siswa === 0) return 0
    return 100 - persentaseLakiLaki.value
})

const fetchDashboard = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
        const response = await api.get('/dashboard')
        // Mengambil objek 'data' dari format JSON { meta: {...}, data: {...} }
        dashboardData.value = response.data.data
    } catch (error) {
        console.error('Error fetching dashboard data:', error)
        errorMessage.value = 'Gagal memuat data dashboard. Pastikan backend menyala dan rute tersedia.'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchDashboard()
})
</script>