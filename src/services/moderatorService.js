const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'

/**
 * Servicio para gestión de moderadores
 */
export const moderatorService = {
    /**
     * Obtener lista de moderadores pendientes
     * @returns {Promise<Array>}
     */
    async getPendingModerators() {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/moderators/pending`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener moderadores pendientes')
        }

        const result = await response.json()
        return result.data || result
    },

    /**
     * Aprobar un moderador
     * @param {string} userId 
     * @returns {Promise<Object>}
     */
    async approveModerator(userId) {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/moderators/${userId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al aprobar moderador')
        }

        const result = await response.json()
        return result
    },

    /**
     * Rechazar un moderador
     * @param {string} userId 
     * @returns {Promise<Object>}
     */
    async rejectModerator(userId) {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/moderators/${userId}/reject`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al rechazar moderador')
        }

        const result = await response.json()
        return result
    }
}

export default moderatorService
