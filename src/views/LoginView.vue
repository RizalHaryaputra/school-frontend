<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Masuk ke Akun Anda
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Sistem Informasi Sekolah
                </p>
            </div>

            <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="mb-4">
                        <label for="username" class="sr-only">Username</label>
                        <input id="username" v-model="form.username" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Username">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="form.password" type="password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>

                <div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                        <span v-if="isLoading">Memproses...</span>
                        <span v-else>Masuk</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../utils/api'

const router = useRouter()
const authStore = useAuthStore()

// State untuk form
const form = reactive({
    username: '',
    password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
        // Menembak endpoint login di backend Laravel
        const response = await api.post('/login', form)

        // Berdasarkan response AuthController backend-mu, token ada di objek 'meta'
        const token = response.data.meta.token
        // Data user ada di objek 'data' (standar Resource Laravel)
        const user = response.data.data

        // Simpan ke Pinia
        authStore.setToken(token)
        authStore.setUser(user)

        // Arahkan ke halaman beranda/dashboard setelah berhasil login
        router.push({ name: 'home' })

    } catch (error) {
        // Menangkap pesan error dari backend jika username/password salah
        if (error.response && error.response.status === 422) {
            // Menangani ValidationException dari backend
            const errors = error.response.data.errors
            errorMessage.value = errors.username ? errors.username[0] : 'Kredensial tidak valid.'
        } else {
            errorMessage.value = 'Terjadi kesalahan pada server. Pastikan backend menyala.'
        }
    } finally {
        isLoading.value = false
    }
}
</script>