import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import { useWishlistStore } from '@/stores/wishlistStore'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const token = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    // Getters
    const isAuthenticated = computed(() => !!token.value && !!user.value)
    const userDisplayName = computed(() => user.value?.display_name ?? user.value?.name ?? '')
    const userPhoto = computed(() => user.value?.photo_url ?? user.value?.picture ?? '')
    const isAdmin = computed(() => user.value?.is_admin === 1 || user.value?.is_admin === true)
    const isModerator = computed(() => user.value?.is_moderator === 1 || user.value?.is_moderator === true)
    const canAccessAdmin = computed(() => isAdmin.value || isModerator.value)

    // Actions
    async function loginWithGoogle(credential) {
        isLoading.value = true
        error.value = null

        try {
            const response = await authService.loginWithGoogle(credential)
            user.value = response.user
            token.value = response.token
            authService.saveSession(response.token, response.user)
            return true
        } catch (err) {
            error.value = err.message || 'Error al iniciar sesión'
            return false
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        try {
            await authService.logout()
        } catch {
            // Ignorar errores del servidor al cerrar sesión
        } finally {
            user.value = null
            token.value = null
            authService.clearSession()
            // Limpiar wishlist al cerrar sesión
            const wishlistStore = useWishlistStore()
            wishlistStore.reset()
            isLoading.value = false
        }
    }

    function initialize() {
        const saved = authService.getSavedSession()
        if (saved.token && saved.user) {
            token.value = saved.token
            user.value = saved.user
        }
        console.log('Auth Debug:', {
            user: user.value,
            is_admin: user.value?.is_admin,
            is_moderator: user.value?.is_moderator,
            isAdmin: isAdmin.value,
            isModerator: isModerator.value,
            canAccessAdmin: canAccessAdmin.value
        })
    }

    return {
        // State
        user,
        token,
        isLoading,
        error,
        // Getters
        isAuthenticated,
        userDisplayName,
        userPhoto,
        isAdmin,
        isModerator,
        canAccessAdmin,
        // Actions
        loginWithGoogle,
        logout,
        initialize,
    }
})

