import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([])

    /**
     * Add a new toast notification
     * @param {Object} toast - Toast object { message, type, duration }
     * @param {string} toast.message - The message to display
     * @param {string} [toast.type='info'] - 'success', 'error', 'info', 'warning'
     * @param {number} [toast.duration=5000] - Duration in ms
     */
    function addToast({ message, type = 'info', duration = 5000 }) {
        const id = Date.now().toString() + Math.random().toString(36).substring(2)
        const toast = { id, message, type, duration }

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }
    }

    function removeToast(id) {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return {
        toasts,
        addToast,
        removeToast
    }
})
