import axios from 'axios'
import { useAuthStore } from '../stores/auth'

// Sesuaikan baseURL dengan port backend Laravel kamu (biasanya 8000)
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Request Interceptor: Menyelipkan token JWT sebelum request meluncur ke backend
api.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Response Interceptor: Menangkap error 401 jika token expired/tidak valid
api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        // Nanti kita bisa tambahkan logika redirect ke halaman login di sini
    }
    return Promise.reject(error)
})

export default api