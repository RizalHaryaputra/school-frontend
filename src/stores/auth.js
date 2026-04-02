import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('jwt_token') || null,
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token
            localStorage.setItem('jwt_token', token)
        },
        setUser(user) {
            this.user = user
        },
        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('jwt_token')
        }
    }
})