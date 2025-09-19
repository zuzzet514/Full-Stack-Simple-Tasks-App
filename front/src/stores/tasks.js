import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import baseURL from '@/api/baseURL.js'
import { useAuthStore } from './auth'

export const useTasksStore = defineStore('tasks', () => {
    const authStore = useAuthStore()
    const tasks = ref([])

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${baseURL}/tasks`, {
                headers: { Authorization: `Bearer ${authStore.token}` }
            })
            tasks.value = res.data
        } catch (err) {
            console.error('Error fetching tasks:', err)
        }
    }

    const addTask = async (task) => {
        try {
            const res = await axios.post(`${baseURL}/tasks`, task, {
                headers: { Authorization: `Bearer ${authStore.token}` }
            })
            tasks.value.push(res.data)
        } catch (err) {
            console.error('Error adding task:', err)
        }
    }

    const updateTask = async (taskId, updates) => {
        try {
            const res = await axios.put(`${baseURL}/tasks/${taskId}`, updates, {
                headers: { Authorization: `Bearer ${authStore.token}` }
            })
            const index = tasks.value.findIndex(t => t._id === taskId)
            if (index !== -1) tasks.value[index] = res.data
        } catch (err) {
            console.error('Error updating task:', err)
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${baseURL}/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${authStore.token}` }
            })
            tasks.value = tasks.value.filter(t => t._id !== taskId)
        } catch (err) {
            console.error('Error deleting task:', err)
        }
    }

    const filteredTasks = ref('all') // all, finished, unfinished
    const tasksToShow = computed(() => {
        if (filteredTasks.value === 'finished') return tasks.value.filter(t => t.status)
        if (filteredTasks.value === 'unfinished') return tasks.value.filter(t => !t.status)
        return tasks.value
    })

    return { tasks, fetchTasks, addTask, updateTask, deleteTask, filteredTasks, tasksToShow }
})
