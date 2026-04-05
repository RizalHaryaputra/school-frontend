<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div
            class="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">

            <div class="text-center mb-10">
                <div
                    class="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
                    <AcademicCapIcon class="h-10 w-10 text-white" />
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Selamat Datang
                </h2>
                <p class="mt-2 text-sm text-gray-500 font-medium">
                    Masuk ke Panel Manajemen Sistem Informasi Sekolah
                </p>
            </div>

            <transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100">
                <div v-if="errorMessage" class="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start">
                    <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p class="text-sm font-medium text-red-700">{{ errorMessage }}</p>
                </div>
            </transition>

            <form class="space-y-5" @submit.prevent="handleLogin">

                <div>
                    <label for="username" class="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <UserIcon class="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="username" v-model="form.username" type="text" required
                            class="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="Masukkan username Anda">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <LockClosedIcon class="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="password" v-model="form.password" type="password" required
                            class="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50/50 focus:bg-white"
                            placeholder="••••••••">
                    </div>
                </div>

                <!-- <div class="flex items-center justify-between pt-2">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-blue-600">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-600">
                            Ingat saya
                        </label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition">
                            Lupa password?
                        </a>
                    </div>
                </div> -->

                <div class="pt-4">
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed">
                        <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </span>
                        <span>{{ isLoading ? 'Memverifikasi...' : 'Masuk ke Sistem' }}</span>
                    </button>
                </div>
            </form>
        </div>

        <div class="fixed bottom-6 text-center w-full pointer-events-none">
            <p class="text-xs text-gray-400 font-medium tracking-wide">
                &copy; 2026 Sistem Informasi Sekolah. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../utils/api'
import { AcademicCapIcon, UserIcon, LockClosedIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'

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
        const response = await api.post('/login', form)

        const token = response.data.meta.token
        const user = response.data.data

        authStore.setToken(token)
        authStore.setUser(user)

        router.push({ name: 'home' })

    } catch (error) {
        if (error.response && error.response.status === 422) {
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