<template>
    <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Selamat datang! Anda berhasil login.</p>
        <button @click="handleLogout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    router.push({ name: 'login' })
}
</script>