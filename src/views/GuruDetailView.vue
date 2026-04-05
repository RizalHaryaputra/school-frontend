<template>
    <div class="space-y-6 max-w-5xl mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button @click="$router.push('/guru')"
                    class="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-gray-950 tracking-tight">Profil Lengkap Guru</h1>
                    <p class="text-sm text-gray-500 mt-1">Menampilkan detail informasi tenaga pendidik.</p>
                </div>
            </div>

            <div v-if="guru" class="flex space-x-3">
                <RouterLink :to="{ name: 'guru-edit', params: { id: guru.id } }"
                    class="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-5 py-2.5 rounded-xl font-medium transition flex items-center space-x-2">
                    <PencilSquareIcon class="w-5 h-5" />
                    <span class="hidden sm:inline">Edit Profil</span>
                </RouterLink>
            </div>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-32">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="errorMessage"
            class="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon class="w-10 h-10 mb-2 text-red-500" />
            <p class="font-medium">{{ errorMessage }}</p>
            <button @click="$router.push('/guru')"
                class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition">Kembali ke
                Daftar</button>
        </div>

        <div v-else-if="guru" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div class="lg:col-span-1 space-y-6">
                <div
                    class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                    <div class="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                    <div
                        class="relative mt-8 mb-4 h-28 w-28 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-md overflow-hidden">
                        <UserCircleIcon class="h-24 w-24 text-gray-300" />
                    </div>

                    <h2 class="text-xl font-bold text-gray-900">{{ guru.nama }}</h2>
                    <p class="text-sm font-medium text-blue-600 mt-1 mb-4">{{ guru.nip || 'NIP Belum Diatur' }}</p>

                    <div class="w-full pt-4 border-t border-gray-100 flex justify-center">
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            <CheckBadgeIcon class="w-4 h-4 mr-1.5" />
                            Status: Aktif
                        </span>
                    </div>
                </div>

                <div v-if="guru.info_akun" class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-base font-bold text-gray-900 flex items-center mb-4">
                        <KeyIcon class="w-5 h-5 mr-2 text-gray-400" />
                        Informasi Akun
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between items-center pb-2 border-b border-gray-50">
                            <span class="text-gray-500">Username</span>
                            <span class="font-medium text-gray-900">{{ guru.info_akun.username }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500">User ID</span>
                            <span class="font-medium text-gray-900">#{{ guru.info_akun.user_id }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2 space-y-6">

                <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">Informasi Pribadi
                    </h3>

                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Tempat Lahir</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">{{ guru.tempat_lahir || '-' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">{{ formatDate(guru.tgl_lahir) }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Jenis Kelamin</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">
                                {{ guru.gender === 'L' || guru.gender === 'laki-laki' ? 'Laki-laki' : (guru.gender ===
                                    'P' || guru.gender === 'perempuan' ? 'Perempuan' : '-') }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Pendidikan Terakhir</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">{{ guru.pendidikan || '-' }}</dd>
                        </div>
                    </dl>
                </div>

                <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5">Kontak & Domisili
                    </h3>

                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Nomor Telepon / WA</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">{{ guru.phone_number || '-' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Alamat Email</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900">{{ guru.email || '-' }}</dd>
                        </div>
                        <div class="sm:col-span-2">
                            <dt class="text-sm font-medium text-gray-500">Alamat Lengkap</dt>
                            <dd class="mt-1 text-base font-medium text-gray-900 leading-relaxed">{{ guru.alamat || '-'
                                }}</dd>
                        </div>
                    </dl>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    ExclamationTriangleIcon,
    UserCircleIcon,
    CheckBadgeIcon,
    KeyIcon
} from '@heroicons/vue/24/outline'
import api from '../utils/api'

const route = useRoute()
const guruId = route.params.id

const guru = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

// Fungsi Fetch Data Detail
const fetchGuruDetail = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
        const response = await api.get(`/guru/${guruId}`)
        // Menyesuaikan dengan format JSON dari API Laravel kamu
        guru.value = response.data.data || response.data
    } catch (error) {
        console.error('Error fetching guru detail:', error)
        errorMessage.value = 'Gagal memuat profil guru. Data mungkin tidak ditemukan atau telah dihapus.'
    } finally {
        isLoading.value = false
    }
}

// Fungsi Format Tanggal (Opsional, agar tampilan tanggal lebih enak dibaca)
const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    try {
        return new Date(dateString).toLocaleDateString('id-ID', options)
    } catch (e) {
        return dateString
    }
}

onMounted(() => {
    fetchGuruDetail()
})
</script>