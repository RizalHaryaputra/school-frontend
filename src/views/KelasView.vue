<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-950 tracking-tight">Manajemen Kelas</h1>
                <p class="text-sm text-gray-500 mt-1">Kelola data kelas yang terdaftar di sistem.</p>
            </div>

            <button @click="openModal"
                class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-blue-200 flex items-center space-x-2">
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
                            class="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium transition flex justify-center">
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
                                    class="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Edit</button>
                                <button
                                    class="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">Hapus</button>
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
                    <span class="block sm:inline mt-1 sm:mt-0 text-xs sm:text-sm">(Total: <span
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

        <Teleport to="body">
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="closeModal"></div>

                    <div
                        class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        <div class="px-6 py-5 border-b border-gray-100">
                            <h3 class="text-xl font-bold text-gray-900">Tambah Data Kelas</h3>
                            <p class="text-sm text-gray-500 mt-1">Silakan lengkapi formulir di bawah ini.</p>
                        </div>

                        <form @submit.prevent="submitForm">
                            <div class="p-6 space-y-4">
                                <div v-if="formErrors.message"
                                    class="bg-red-50 text-red-600 text-sm p-3 rounded-lg font-medium">
                                    {{ formErrors.message }}
                                </div>

                                <div v-for="field in koleksi?.template?.data || []" :key="field.name">
                                    <label :for="'modal-' + field.name"
                                        class="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                                        {{ field.name.replace('_', ' ') }}
                                        <span v-show="field.required" class="text-red-500 ml-1">*</span>
                                    </label>
                                    <input :id="'modal-' + field.name" v-model="formModel[field.name]"
                                        :type="field.type || 'text'" :required="field.required"
                                        :maxlength="field.maxlength"
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                                        :class="formErrors[field.name] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                        :placeholder="'Contoh: ' + (field.prompt || field.name)" />
                                    <p v-if="formErrors[field.name]" class="text-red-500 text-xs mt-1 font-medium">
                                        {{ formErrors[field.name][0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                                <button type="button" @click="closeModal"
                                    class="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition">
                                    Batal
                                </button>
                                <button type="submit" :disabled="isSubmitting"
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
                                    <span v-if="isSubmitting"
                                        class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                    <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Data' }}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, ExclamationTriangleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import api from '../utils/api'

// --- State List & Search ---
const koleksi = ref({ items: [], meta: null, template: null, queries: [] })
const isLoading = ref(true)
const errorMessage = ref('')
const searchForm = ref({})

// --- State Modal (Tambah Data) ---
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const formModel = ref({}) // Tempat menyimpan inputan user untuk modal
const formErrors = ref({}) // Tempat menyimpan error validasi dari backend

// --- Fungsi Manajemen List ---
const fetchKelas = async (page = 1) => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        const cleanParams = Object.fromEntries(
            Object.entries(searchForm.value).filter(([_, v]) => v !== '' && v !== null)
        )
        const response = await api.get('/kelas', {
            params: { page: page, ...cleanParams }
        })
        const rawData = response.data
        koleksi.value = { items: [], meta: null, template: null, queries: [] }

        if (rawData.items) koleksi.value.items = rawData.items
        else if (rawData.data && rawData.data.items) koleksi.value.items = rawData.data.items
        else if (Array.isArray(rawData.data)) koleksi.value.items = rawData.data

        if (rawData.meta) koleksi.value.meta = rawData.meta
        else if (rawData.data && rawData.data.meta) koleksi.value.meta = rawData.data.meta

        if (rawData.queries) koleksi.value.queries = rawData.queries
        else if (rawData.data && rawData.data.queries) koleksi.value.queries = rawData.data.queries

        // MENGAMBIL TEMPLATE HATEOAS DARI API
        if (rawData.template) koleksi.value.template = rawData.template
        else if (rawData.data && rawData.data.template) koleksi.value.template = rawData.data.template
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Gagal mengambil data dari server. Pastikan Anda memiliki akses.'
    } finally {
        isLoading.value = false
    }
}

const handleSearch = () => fetchKelas(1)
const resetSearch = () => {
    searchForm.value = {}
    fetchKelas(1)
}

// --- Fungsi Manajemen Modal (Tambah Data) ---
const openModal = () => {
    formErrors.value = {}
    formModel.value = {}

    // Membaca 'template' dari backend untuk menyiapkan variabel model
    if (koleksi.value?.template?.data) {
        koleksi.value.template.data.forEach(field => {
            // Set nilai default dari HATEOAS (biasanya string kosong)
            formModel.value[field.name] = field.value || ''
        })
    }
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const submitForm = async () => {
    isSubmitting.value = true
    formErrors.value = {} // Reset error sebelumnya

    try {
        // Menembak endpoint POST /api/kelas sesuai standar REST
        await api.post('/kelas', formModel.value)

        // Jika sukses
        closeModal()
        fetchKelas(1) // Refresh tabel untuk melihat data baru

    } catch (error) {
        // Menangkap validasi error (422) dari request Laravel
        if (error.response && error.response.status === 422) {
            formErrors.value = error.response.data.errors
        } else {
            formErrors.value = { message: 'Terjadi kesalahan sistem saat menyimpan data.' }
        }
    } finally {
        isSubmitting.value = false
    }
}

// --- Init ---
onMounted(() => {
    fetchKelas(1)
})
</script>