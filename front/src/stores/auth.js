import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import baseURL from "@/api/baseURL.js";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!token.value)

    const login = async (credentials) => {
        try {
            const res = await axios.post( `${baseURL}/auth/login`, credentials)
            token.value = res.data.token
            localStorage.setItem('token', token.value)
        } catch (err) {
            console.error('Login failed:', err)
            throw err
        }
    }

    const signup = async (data) => {
        try {
            const res = await axios.post(`${baseURL}/auth/register`, data)
            token.value = res.data.token
            localStorage.setItem('token', token.value)
        } catch (err) {
            console.error('Signup failed:', err)
            throw err
        }
    }

    return { token, isAuthenticated, login, signup}
})