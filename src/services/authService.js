const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'

/**
 * Servicio de autenticación
 */
export const authService = {
    /**
     * Login con Google OAuth
     * @param {string} credential - Token de credencial de Google
     * @returns {Promise<{user: Object, token: string}>}
     */
    async loginWithGoogle(credential) {
        const response = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: credential })
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al iniciar sesión')
        }

        const result = await response.json()
        return result.data
    },

    /**
     * Cerrar sesión
     */
    async logout() {
        const token = localStorage.getItem('auth_token')

        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
        } catch (error) {
            console.error('Error al cerrar sesión en el servidor:', error)
        }

        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    },

    /**
     * Guardar sesión en localStorage
     * @param {string} token 
     * @param {Object} user 
     */
    saveSession(token, user) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(user))
    },

    /**
     * Obtener sesión guardada
     * @returns {{token: string|null, user: Object|null}}
     */
    getSavedSession() {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('user')
        const user = userStr ? JSON.parse(userStr) : null
        return { token, user }
    },

    /**
     * Limpiar sesión
     */
    clearSession() {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    },
}

export default authService
