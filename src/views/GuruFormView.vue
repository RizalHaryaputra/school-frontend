<template>
    <div class="space-y-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button @click="$router.push('/guru')"
                    class="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-gray-950 tracking-tight">
                        {{ isEditMode ? 'Edit Data Guru' : 'Tambah Guru Baru' }}
                    </h1>
                    <p class="text-sm text-gray-500 mt-1">Lengkapi informasi profil tenaga pendidik di bawah ini.</p>
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

                    <div v-if="!isEditMode">
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Informasi Akun</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2">
                                <label for="user_id" class="block text-sm font-medium text-gray-700 mb-1.5">Tautkan Akun
                                    Sistem (User) <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="user_id" v-model="form.user_id" required
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white appearance-none"
                                        :class="formErrors.user_id ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                        <option value="" disabled>-- Pilih Akun User untuk Guru Ini --</option>
                                        <option v-for="user in availableUsers" :key="user.id" :value="user.id">
                                            {{ user.username }}
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
                                <p v-if="formErrors.user_id" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.user_id[0] }}</p>
                                <p class="text-xs text-gray-500 mt-1.5">Pilih akun yang memiliki akses sebagai Guru.
                                    Jika belum ada, buat akun terlebih dahulu di Manajemen User.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Profil Pribadi</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="nip" class="block text-sm font-medium text-gray-700 mb-1.5">NIP (Nomor Induk
                                    Pegawai)</label>
                                <input id="nip" v-model="form.nip" type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.nip ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Masukkan NIP (jika ada)" />
                                <p v-if="formErrors.nip" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.nip[0] }}</p>
                            </div>

                            <div>
                                <label for="nama" class="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap
                                    <span class="text-red-500">*</span></label>
                                <input id="nama" v-model="form.nama" type="text" required
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.nama ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: Budi Santoso, S.Pd." />
                                <p v-if="formErrors.nama" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.nama[0] }}</p>
                            </div>

                            <div>
                                <label for="tempat_lahir" class="block text-sm font-medium text-gray-700 mb-1.5">Tempat
                                    Lahir</label>
                                <input id="tempat_lahir" v-model="form.tempat_lahir" type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none"
                                    :class="formErrors.tempat_lahir ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                    placeholder="Contoh: Jakarta" />
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
                                <label for="gender" class="block text-sm font-medium text-gray-700 mb-1.5">Jenis
                                    Kelamin</label>
                                <select id="gender" v-model="form.gender"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
                                    :class="formErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-200'">
                                    <option value="" disabled>Pilih Jenis Kelamin</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                                <p v-if="formErrors.gender" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.gender[0] }}</p>
                            </div>

                            <div>
                                <label for="pendidikan"
                                    class="block text-sm font-medium text-gray-700 mb-1.5">Pendidikan Terakhir</label>
                                <input id="pendidikan" v-model="form.pendidikan" type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
                                    :class="formErrors.pendidikan ? 'border-red-300 bg-red-50' : 'border-gray-200'"
                                    placeholder="Contoh: S1 Teknik Informatika" />
                                <p v-if="formErrors.pendidikan" class="text-red-500 text-xs mt-1 font-medium">{{
                                    formErrors.pendidikan[0] }}</p>
                            </div>

                            <div>
                                <label for="phone_number" class="block text-sm font-medium text-gray-700 mb-1.5">Nomor
                                    Telepon / WhatsApp</label>
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
                                    placeholder="Contoh: guru@sekolah.com" />
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
                    <button type="button" @click="$router.push('/guru')"
                        class="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition">
                        Batal
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
                        <span v-if="isSubmitting"
                            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Data Guru' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import api from '../utils/api'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => !!route.params.id)
const guruId = computed(() => route.params.id)

const isLoading = ref(true) // Set true by default karena kita perlu load daftar user
const isSubmitting = ref(false)
const formErrors = ref({})

// Menyimpan daftar user dari API
const availableUsers = ref([])

// Form ditambahkan user_id
const form = ref({
    user_id: '',
    nip: '',
    nama: '',
    tempat_lahir: '',
    tgl_lahir: '',
    gender: '',
    phone_number: '',
    email: '',
    alamat: '',
    pendidikan: ''
})

// Mengambil daftar user dari backend
const fetchAvailableUsers = async () => {
    try {
        const response = await api.get('/users/available-for-guru')

        availableUsers.value = response.data.items || response.data.data || response.data
    } catch (error) {
        console.error('Gagal memuat daftar user:', error)
        formErrors.value = { message: 'Gagal memuat daftar akun.' }
    }
}

const fetchGuruDetail = async () => {
    try {
        const response = await api.get(`/guru/${guruId.value}`)
        const guruData = response.data.data || response.data

        // 1. Mapping field utama
        Object.keys(form.value).forEach(key => {
            if (guruData[key] !== undefined) {
                form.value[key] = guruData[key]
            }
        })

        // 2. Mapping KHUSUS untuk user_id karena berada di dalam object 'info_akun'
        if (guruData.info_akun && guruData.info_akun.user_id) {
            form.value.user_id = guruData.info_akun.user_id
        }

    } catch (error) {
        console.error('Error fetching guru:', error)
        alert('Gagal mengambil data guru. Data mungkin sudah dihapus.')
        router.push('/guru')
    }
}

const submitForm = async () => {
    isSubmitting.value = true
    formErrors.value = {}

    try {
        if (isEditMode.value) {
            // Ingat untuk HATEOAS, idealnya getLinkByRel di sini. 
            // Tapi karena ini hardcoded view, tembak langsung.
            await api.put(`/guru/${guruId.value}`, form.value)
        } else {
            await api.post('/guru', form.value)
        }

        router.push('/guru')
    } catch (error) {
        if (error.response && error.response.status === 422) {
            formErrors.value = error.response.data.errors
        } else {
            formErrors.value = { message: 'Terjadi kesalahan sistem saat menyimpan data.' }
        }
    } finally {
        isSubmitting.value = false
    }
}

onMounted(async () => {
    isLoading.value = true
    // Load daftar user terlebih dahulu agar dropdown terisi
    await fetchAvailableUsers()

    if (isEditMode.value) {
        await fetchGuruDetail()
    }
    isLoading.value = false
})
</script>