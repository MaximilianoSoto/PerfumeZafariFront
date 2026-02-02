const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'

/**
 * Servicio para gestión de propuestas de perfumes
 */
export const proposalService = {
    /**
     * Obtener lista de propuestas pendientes
     * @returns {Promise<Array>}
     */
    async getProposals() {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/admin/proposals`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al obtener propuestas')
        }

        const result = await response.json()
        return result.data || result
    },

    /**
     * Aprobar una propuesta
     * @param {string} proposalId 
     * @returns {Promise<Object>}
     */
    async approveProposal(proposalId) {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/admin/proposals/${proposalId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al aprobar propuesta')
        }

        const result = await response.json()
        return result
    },

    /**
     * Rechazar una propuesta
     * @param {string} proposalId 
     * @returns {Promise<Object>}
     */
    async rejectProposal(proposalId) {
        const token = localStorage.getItem('auth_token')

        const response = await fetch(`${API_URL}/admin/proposals/${proposalId}/reject`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Error al rechazar propuesta')
        }

        const result = await response.json()
        return result
    }
}

export default proposalService
