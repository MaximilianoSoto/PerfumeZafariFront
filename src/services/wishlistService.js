const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl'

function getAuthHeaders() {
    const token = localStorage.getItem('auth_token')
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
}

export const wishlistService = {
    /**
     * Get all wishlist items
     */
    async getWishlist() {
        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al obtener lista de deseos')
        }

        return response.json()
    },

    /**
     * Add perfume to wishlist
     * @param {number} perfumeId - ID of the perfume
     * @param {number} priority - Priority level (1-5)
     * @param {string} nota - Optional note
     */
    async addToWishlist(perfumeId, priority = 3, nota = '') {


        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                perfumeId,
                priority,
                nota
            })
        })



        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al agregar a favoritos')
        }



        return response.json()
    },

    /**
     * Update wishlist item
     * @param {number} id - Wishlist item ID
     * @param {number} priority - Priority level
     * @param {string} nota - Note
     */
    async updateWishlistItem(id, priority, nota) {
        const response = await fetch(`${API_URL}/wishlist/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                priority,
                nota
            })
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al actualizar favorito')
        }

        return response.json()
    },

    /**
     * Remove item from wishlist
     * @param {number} id - Wishlist item ID
     */
    async removeFromWishlist(id) {
        const response = await fetch(`${API_URL}/wishlist/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al eliminar de favoritos')
        }

        return response.json()
    }
}
