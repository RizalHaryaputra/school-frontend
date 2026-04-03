<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-950 tracking-tight">Manajemen Kelas</h1>
                <p class="text-sm text-gray-500 mt-1">Kelola data kelas yang terdaftar di sistem.</p>
            </div>

            <button
                class="flex justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-blue-200 flex items-center space-x-2">
                <PlusIcon class="w-5 h-5" />
                <span>Tambah Kelas</span>
            </button>
        </div>

        <transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
            <div v-if="koleksi.queries && koleksi.queries.length > 0"
                class="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
                <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-4 items-end">
                    <div class="flex-1 w-full">
                        <label for="search" class="block text-sm font-medium text-gray-600 mb-1.5">
                            Pencarian Kelas
                        </label>
                        <input id="search" v-model="searchForm.search" type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                            placeholder="Cari berdasarkan kode atau nama kelas..." />
                    </div>

                    <div class="flex space-x-3 w-full sm:w-auto pt-2 sm:pt-0">
                        <button type="submit"
                            class="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md flex justify-center">
                            Cari
                        </button>
                        <button type="button" @click="resetSearch"
                            class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium transition flex justify-center">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </transition>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="errorMessage"
            class="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon class="w-10 h-10 mb-2 text-red-500" />
            <p class="font-medium">{{ errorMessage }}</p>
            <button @click="fetchKelas(1)"
                class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition">Coba
                Lagi</button>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider uppercase border-b border-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-4">Kode Kelas</th>
                            <th scope="col" class="px-6 py-4">Nama Kelas</th>
                            <th scope="col" class="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="kelas in koleksi?.items || []" :key="kelas.id"
                            class="hover:bg-gray-50/50 transition">
                            <td class="px-6 py-5 font-mono text-gray-700">{{ kelas.kode_kelas }}</td>
                            <td class="px-6 py-5 font-semibold text-gray-900">{{ kelas.nama_kelas }}</td>
                            <td class="px-6 py-5 text-right space-x-2">
                                <button
                                    class="mt-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-lg transition">Detail</button>
                                <button
                                    class="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Edit</button>
                                <button
                                    class="mt-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="koleksi?.items?.length === 0 || !koleksi?.items">
                            <td colspan="3" class="px-6 py-10 text-center text-gray-500">
                                Data kelas tidak ditemukan.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <div class="text-center sm:text-left w-full sm:w-auto">
                    Menampilkan halaman <span class="font-semibold text-gray-900">{{ koleksi.meta?.current_page || 1
                    }}</span> dari <span class="font-semibold text-gray-900">{{ koleksi.meta?.last_page || 1
                        }}</span>
                    <span class="block sm:inline mt-1 sm:mt-0 text-xs sm:text-sm"> (Total: <span
                            class="font-semibold text-blue-600">{{ koleksi.meta?.total || 0 }}</span> data)</span>
                </div>
                <div class="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                    <button @click="fetchKelas(koleksi.meta?.current_page - 1)"
                        :disabled="!koleksi.meta || koleksi.meta.current_page === 1"
                        class="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-sm flex justify-center">
                        Sebelumnya
                    </button>
                    <button @click="fetchKelas(koleksi.meta?.current_page + 1)"
                        :disabled="!koleksi.meta || koleksi.meta.current_page === koleksi.meta.last_page"
                        class="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-sm flex justify-center">
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import api from '../utils/api'

// State Management
const koleksi = ref({ items: [], meta: null, template: null, queries: [] })
const isLoading = ref(true)
const errorMessage = ref('')

// State untuk menyimpan inputan user (otomatis terikat ke field API)
const searchForm = ref({})

const fetchKelas = async (page = 1) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
        // Membuang parameter pencarian yang kosong agar URL API tetap bersih
        const cleanParams = Object.fromEntries(
            Object.entries(searchForm.value).filter(([_, v]) => v !== '' && v !== null)
        )

        // Menggunakan objek `params` di axios untuk otomatis merakit query string (?page=1&nama_kelas=IPA)
        const response = await api.get('/kelas', {
            params: {
                page: page,
                ...cleanParams
            }
        })

        const rawData = response.data
        koleksi.value = { items: [], meta: null, template: null, queries: [] }

        // 1. Tangkap Items
        if (rawData.items) koleksi.value.items = rawData.items
        else if (rawData.data && rawData.data.items) koleksi.value.items = rawData.data.items
        else if (Array.isArray(rawData.data)) koleksi.value.items = rawData.data

        // 2. Tangkap Meta
        if (rawData.meta) koleksi.value.meta = rawData.meta
        else if (rawData.data && rawData.data.meta) koleksi.value.meta = rawData.data.meta

        // 3. Tangkap Queries (HATEOAS)
        if (rawData.queries) koleksi.value.queries = rawData.queries
        else if (rawData.data && rawData.data.queries) koleksi.value.queries = rawData.data.queries

    } catch (error) {
        console.error(error)
        errorMessage.value = 'Gagal mengambil data dari server. Pastikan Anda memiliki akses.'
    } finally {
        isLoading.value = false
    }
}

// Fungsi Submit Form
const handleSearch = () => {
    // Setiap melakukan pencarian baru, reset ke halaman 1
    fetchKelas(1)
}

// Fungsi Reset Form
const resetSearch = () => {
    searchForm.value = {}
    fetchKelas(1)
}

onMounted(() => {
    fetchKelas(1)
})
</script>