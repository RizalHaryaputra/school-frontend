<template>
    <div class="space-y-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button @click="$router.push('/jadwal')"
                    class="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-gray-950 tracking-tight">
                        {{ isEditMode ? 'Edit Jadwal Pelajaran' : 'Tambah Jadwal Baru' }}
                    </h1>
                    <p class="text-sm text-gray-500 mt-1">Atur alokasi waktu, kelas, mata pelajaran, dan pengajar.</p>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="flex flex-col justify-center items-center py-32 space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="text-gray-500 text-sm font-medium">Memuat data relasi dan form...</p>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <form @submit.prevent="submitForm">
                <div class="p-6 md:p-8 space-y-6">

                    <div v-if="formErrors.message"
                        class="bg-red-50 text-red-600 text-sm p-4 rounded-xl font-medium flex items-center">
                        <ExclamationCircleIcon class="w-5 h-5 mr-2" />
                        {{ formErrors.message }}
                    </div>

                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Waktu Pelaksanaan</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="hari" class="block text-sm font-medium text-gray-700 mb-1.5">Hari <span
                                        class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="hari" v-model="form.hari" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white appearance-none"
                                        :class="formErrors.hari ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                        <option value="" disabled>-- Pilih Hari --</option>
                                        <option value="senin">Senin</option>
                                        <option value="selasa">Selasa</option>
                                        <option value="rabu">Rabu</option>
                                        <option value="kamis">Kamis</option>
                                        <option value="jumat">Jumat</option>
                                        <option value="sabtu">Sabtu</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p v-if="formErrors.hari" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.hari[0] }}</p>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="jam_mulai" class="block text-sm font-medium text-gray-700 mb-1.5">Jam
                                        Mulai <span class="text-red-500">*</span></label>
                                    <input id="jam_mulai" v-model="form.jam_mulai" type="time" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
                                        :class="formErrors.jam_mulai ? 'border-red-300 bg-red-50' : 'border-gray-200'" />
                                    <p v-if="formErrors.jam_mulai" class="text-red-500 text-xs mt-1 font-medium">{{
                                        formErrors.jam_mulai[0] }}</p>
                                </div>
                                <div>
                                    <label for="jam_selesai" class="block text-sm font-medium text-gray-700 mb-1.5">Jam
                                        Selesai <span class="text-red-500">*</span></label>
                                    <input id="jam_selesai" v-model="form.jam_selesai" type="time" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
                                        :class="formErrors.jam_selesai ? 'border-red-300 bg-red-50' : 'border-gray-200'" />
                                    <p v-if="formErrors.jam_selesai" class="text-red-500 text-xs mt-1 font-medium">{{
                                        formErrors.jam_selesai[0] }}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Relasi Akademik</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="kelas_id" class="block text-sm font-medium text-gray-700 mb-1.5">Kelas <span
                                        class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="kelas_id" v-model="form.kelas_id" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white appearance-none"
                                        :class="formErrors.kelas_id ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                        <option value="" disabled>-- Pilih Kelas --</option>
                                        <option v-for="kelas in options.kelas" :key="kelas.id" :value="kelas.id">
                                            {{ kelas.nama_kelas }} ({{ kelas.kode_kelas }})
                                        </option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p v-if="formErrors.kelas_id" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.kelas_id[0] }}</p>
                            </div>

                            <div>
                                <label for="mapel_id" class="block text-sm font-medium text-gray-700 mb-1.5">Mata
                                    Pelajaran <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="mapel_id" v-model="form.mapel_id" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white appearance-none"
                                        :class="formErrors.mapel_id ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                        <option value="" disabled>-- Pilih Mata Pelajaran --</option>
                                        <option v-for="mapel in options.mapel" :key="mapel.id" :value="mapel.id">
                                            {{ mapel.nama_mapel }} ({{ mapel.kode_mapel }})
                                        </option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p v-if="formErrors.mapel_id" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.mapel_id[0] }}</p>
                            </div>

                            <div class="md:col-span-2">
                                <label for="guru_id" class="block text-sm font-medium text-gray-700 mb-1.5">Guru
                                    Pengajar <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="guru_id" v-model="form.guru_id" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white appearance-none"
                                        :class="formErrors.guru_id ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                        <option value="" disabled>-- Pilih Guru Pengajar --</option>
                                        <option v-for="guru in options.guru" :key="guru.id" :value="guru.id">
                                            {{ guru.nama_guru || guru.nama }} (NIP: {{ guru.nip || '-' }})
                                        </option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p v-if="formErrors.guru_id" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.guru_id[0] }}</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                    <button type="button" @click="$router.push('/jadwal')"
                        class="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition">
                        Batal
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
                        <span v-if="isSubmitting"
                            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Jadwal' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import api from '../utils/api'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => !!route.params.id)
const jadwalId = computed(() => route.params.id)

const isLoading = ref(true)
const isSubmitting = ref(false)
const formErrors = ref({})

// Menyimpan seluruh respons API Jadwal saat edit untuk mengambil _links HATEOAS
const selectedJadwal = ref(null)

// State penampung opsi untuk dropdown relasi
const options = reactive({
    kelas: [],
    mapel: [],
    guru: []
})

// Model Data Form (pastikan key-nya sesuai dengan field database Laravel-mu)
const form = ref({
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    kelas_id: '',
    mapel_id: '',
    guru_id: ''
})

// --- Fungsi Bantuan HATEOAS ---
const getLinkByRel = (item, rel) => {
    if (!item || !item._links) return null;
    const link = item._links.find(l => l.rel === rel);
    return link ? link.href : null;
}

// --- Fetch Data Opsi Relasi secara Paralel ---
const fetchDropdownOptions = async () => {
    try {
        const [kelasRes, mapelRes, guruRes] = await Promise.all([
            api.get('/kelas?per_page=100'),
            api.get('/mapel?per_page=100'),
            api.get('/guru?per_page=100')
        ])

        const extractItems = (response) => {
            const data = response.data;
            if (!data) return [];
            if (data.data && Array.isArray(data.data.items)) return data.data.items;
            if (Array.isArray(data)) return data;
            return [];
        }

        options.kelas = extractItems(kelasRes);
        options.mapel = extractItems(mapelRes);
        options.guru = extractItems(guruRes);

    } catch (error) {
        console.error('Gagal memuat opsi relasi:', error)
        formErrors.value = { message: 'Gagal memuat data Kelas/Mapel/Guru. Periksa koneksi API.' }
    }
}

// --- Fetch Detail Jadwal (Hanya untuk Edit) ---
const fetchJadwalDetail = async () => {
    try {
        const response = await api.get(`/jadwal/${jadwalId.value}`)
        const jadwalData = response.data.data || response.data

        selectedJadwal.value = jadwalData

        // Potong 5 karakter pertama ('07:00:00' -> '07:00') agar cocok dengan input type="time"
        form.value.hari = jadwalData.hari || ''
        form.value.jam_mulai = jadwalData.jam_mulai ? jadwalData.jam_mulai.slice(0, 5) : ''
        form.value.jam_selesai = jadwalData.jam_selesai ? jadwalData.jam_selesai.slice(0, 5) : ''

        form.value.kelas_id = jadwalData.kelas_id || ''
        form.value.mapel_id = jadwalData.mapel_id || ''
        form.value.guru_id = jadwalData.guru_id || ''

    } catch (error) {
        console.error('Error fetching jadwal detail:', error)
        alert('Gagal mengambil data jadwal. Data mungkin sudah dihapus.')
        router.push('/jadwal')
    }
}

// --- Submit Data (HATEOAS Aware) ---
const submitForm = async () => {
    isSubmitting.value = true
    formErrors.value = {}

    try {
        if (isEditMode.value) {
            // Menggunakan HATEOAS untuk UPDATE
            const updateUrl = getLinkByRel(selectedJadwal.value, 'update');
            if (!updateUrl) throw new Error('Link HATEOAS update tidak ditemukan!')

            await api.put(updateUrl, form.value)
        } else {
            // Menggunakan Base Route untuk CREATE
            await api.post('/jadwal', form.value)
        }

        router.push('/jadwal')
    } catch (error) {
        if (error.response && error.response.status === 422) {
            formErrors.value = error.response.data.errors
        } else {
            formErrors.value = { message: 'Terjadi kesalahan sistem saat menyimpan data jadwal.' }
        }
    } finally {
        isSubmitting.value = false
    }
}

onMounted(async () => {
    isLoading.value = true
    await fetchDropdownOptions()
    if (isEditMode.value) {
        await fetchJadwalDetail()
    }

    isLoading.value = false
})
</script>