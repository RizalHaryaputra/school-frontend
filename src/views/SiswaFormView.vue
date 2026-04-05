<template>
    <div class="space-y-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button @click="$router.push('/siswa')"
                    class="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-gray-950 tracking-tight">
                        {{ isEditMode ? 'Edit Data Siswa' : 'Tambah Siswa Baru' }}
                    </h1>
                    <p class="text-sm text-gray-500 mt-1">Lengkapi informasi akademik dan pribadi peserta didik.</p>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <form @submit.prevent="submitForm">
                <div class="p-6 md:p-8 space-y-8">

                    <div v-if="formErrors.message"
                        class="bg-red-50 text-red-600 text-sm p-4 rounded-xl font-medium flex items-center">
                        <ExclamationCircleIcon class="w-5 h-5 mr-2" />
                        {{ formErrors.message }}
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Informasi Akademik</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="nis" class="block text-sm font-medium text-gray-700 mb-1.5">NIS (Nomor Induk
                                    Siswa) <span class="text-red-500">*</span></label>
                                <input id="nis" v-model="form.nis" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.nis ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: 1234567890" />
                                <p v-if="formErrors.nis" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.nis[0] }}</p>
                            </div>

                            <div>
                                <label for="kelas_id" class="block text-sm font-medium text-gray-700 mb-1.5">Penempatan
                                    Kelas <span class="text-red-500">*</span></label>
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

                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Profil Pribadi</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="nama" class="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap
                                    <span class="text-red-500">*</span></label>
                                <input id="nama" v-model="form.nama" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.nama ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Masukkan nama lengkap siswa" />
                                <p v-if="formErrors.nama" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.nama[0] }}</p>
                            </div>

                            <div>
                                <label for="gender" class="block text-sm font-medium text-gray-700 mb-1.5">Jenis Kelamin
                                    <span class="text-red-500">*</span></label>
                                <select id="gender" v-model="form.gender" required
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
                                    :class="formErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                    <option value="" disabled>-- Pilih Jenis Kelamin --</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                                <p v-if="formErrors.gender" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.gender[0] }}</p>
                            </div>

                            <div>
                                <label for="tempat_lahir" class="block text-sm font-medium text-gray-700 mb-1.5">Tempat
                                    Lahir</label>
                                <input id="tempat_lahir" v-model="form.tempat_lahir" type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.tempat_lahir ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: Bandung" />
                                <p v-if="formErrors.tempat_lahir" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.tempat_lahir[0] }}</p>
                            </div>

                            <div>
                                <label for="tgl_lahir" class="block text-sm font-medium text-gray-700 mb-1.5">Tanggal
                                    Lahir</label>
                                <input id="tgl_lahir" v-model="form.tgl_lahir" type="date"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.tgl_lahir ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'" />
                                <p v-if="formErrors.tgl_lahir" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.tgl_lahir[0] }}</p>
                            </div>

                            <div>
                                <label for="nama_ortu" class="block text-sm font-medium text-gray-700 mb-1.5">Nama Orang
                                    Tua / Wali</label>
                                <input id="nama_ortu" v-model="form.nama_ortu" type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.nama_ortu ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Nama Ayah/Ibu/Wali" />
                                <p v-if="formErrors.nama_ortu" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.nama_ortu[0] }}</p>
                            </div>

                            <div>
                                <label for="phone_number" class="block text-sm font-medium text-gray-700 mb-1.5">Nomor
                                    HP (Siswa/Ortu)</label>
                                <input id="phone_number" v-model="form.phone_number" type="tel"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.phone_number ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: 08123456789" />
                                <p v-if="formErrors.phone_number" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.phone_number[0] }}</p>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Alamat
                                    Email</label>
                                <input id="email" v-model="form.email" type="email"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: siswa@sekolah.com" />
                                <p v-if="formErrors.email" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.email[0] }}</p>
                            </div>

                            <div class="md:col-span-2">
                                <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1.5">Alamat
                                    Lengkap</label>
                                <textarea id="alamat" v-model="form.alamat" rows="3"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none resize-none"
                                    :class="formErrors.alamat ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Masukkan alamat domisili lengkap..."></textarea>
                                <p v-if="formErrors.alamat" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.alamat[0] }}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="px-6 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                    <button type="button" @click="$router.push('/siswa')"
                        class="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition">
                        Batal
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
                        <span v-if="isSubmitting"
                            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Data Siswa' }}</span>
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

const isLoading = ref(true)
const isSubmitting = ref(false)
const formErrors = ref({})

const options = reactive({ kelas: [] })

const form = ref({
    nis: '',
    nama: '',
    gender: '',
    tempat_lahir: '',
    tgl_lahir: '',
    nama_ortu: '',
    phone_number: '',
    email: '',
    kelas_id: '',
    alamat: ''
})

const fetchKelasOptions = async () => {
    try {
        const response = await api.get('/kelas?per_page=100')
        const data = response.data

        // Ekstraksi data secara robust
        if (Array.isArray(data.items)) options.kelas = data.items;
        else if (data.data && Array.isArray(data.data.items)) options.kelas = data.data.items;
        else if (data.data && Array.isArray(data.data)) options.kelas = data.data;
        else if (Array.isArray(data)) options.kelas = data;
    } catch (error) {
        formErrors.value = { message: 'Gagal memuat data opsi Kelas.' }
    }
}

const fetchSiswaDetail = async () => {
    try {
        const fetchUrl = route.query.fetch_url || `/siswa/${route.params.id}`

        // axios request bisa langsung menggunakan full URL (http://...) jika tersedia
        const response = await api.get(fetchUrl)
        const siswaData = response.data.data || response.data

        Object.keys(form.value).forEach(key => {
            if (siswaData[key] !== undefined) {
                form.value[key] = siswaData[key]
            }
        })

        // Tangani mapping jika backend merender kelas_id dari dalam nested object
        if (!siswaData.kelas_id && siswaData.kelas && typeof siswaData.kelas === 'object') {
            form.value.kelas_id = siswaData.kelas.id
        }

    } catch (error) {
        console.error('Error fetching siswa detail:', error)
        alert('Gagal mengambil data siswa. Data mungkin sudah dihapus.')
        router.push('/siswa')
    }
}

const submitForm = async () => {
    isSubmitting.value = true
    formErrors.value = {}

    try {
        if (isEditMode.value) {
            // MENGGUNAKAN UPDATE_URL DARI QUERY PARAMETERS HATEOAS
            const updateUrl = route.query.update_url;
            if (!updateUrl) {
                // Fallback just in case user refreshed the edit page (query params lost)
                await api.put(`/siswa/${route.params.id}`, form.value)
            } else {
                await api.put(updateUrl, form.value)
            }
        } else {
            await api.post('/siswa', form.value)
        }

        router.push('/siswa')
    } catch (error) {
        if (error.response && error.response.status === 422) {
            formErrors.value = error.response.data.errors
        } else {
            formErrors.value = { message: 'Terjadi kesalahan sistem saat menyimpan data siswa.' }
        }
    } finally {
        isSubmitting.value = false
    }
}

onMounted(async () => {
    isLoading.value = true
    await fetchKelasOptions()

    if (isEditMode.value) {
        await fetchSiswaDetail()
    }

    isLoading.value = false
})
</script>