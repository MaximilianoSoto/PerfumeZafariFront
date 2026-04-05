const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'

/**
 * Helper: returns Authorization headers with Bearer token from localStorage
 */
function getAuthHeaders() {
    const token = localStorage.getItem('auth_token')
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
}

/**
 * Servicio de lista de deseos (Wishlist / Favoritos)
 *
 * Schema POST/PUT:
 * {
 *   perfumeId: string (uuid)   -- requerido
 *   priority:  integer 1-3     -- 1=baja, 2=media, 3=alta (default: 1)
 *   nota:      string ≤255     -- opcional
 * }
 */
export const wishlistService = {

    // ────────────────────────────────────────────
    // 1. GET /api/wishlist
    // ────────────────────────────────────────────
    /**
     * Obtener todos los ítems de la wishlist del usuario autenticado.
     * @returns {Promise<Object>} Respuesta completa de la API
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

    // ────────────────────────────────────────────
    // 2. POST /api/wishlist
    // ────────────────────────────────────────────
    /**
     * Agregar un perfume a la wishlist.
     * @param {string}  perfumeId  UUID del perfume (requerido)
     * @param {number}  priority   1=baja | 2=media | 3=alta (default: 1)
     * @param {string}  nota       Nota personal (máx. 255 caracteres)
     * @returns {Promise<Object>}
     */
    async addToWishlist(perfumeId, priority = 1, nota = '') {
        const body = { perfumeId }

        if (priority !== undefined && priority !== null) {
            body.priority = Math.min(3, Math.max(1, Number(priority)))
        }

        if (nota) {
            body.nota = String(nota).slice(0, 255)
        }

        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al agregar a favoritos')
        }

        return response.json()
    },

    // ────────────────────────────────────────────
    // 3. PUT /api/wishlist/{id}
    // ────────────────────────────────────────────
    /**
     * Actualizar un ítem de la wishlist.
     * @param {number|string} id       ID del ítem en la wishlist
     * @param {number}        priority 1=baja | 2=media | 3=alta
     * @param {string}        nota     Nota personal (máx. 255 caracteres)
     * @returns {Promise<Object>}
     */
    async updateWishlistItem(id, priority, nota) {
        const body = {}

        if (priority !== undefined && priority !== null) {
            body.priority = Math.min(3, Math.max(1, Number(priority)))
        }

        if (nota !== undefined && nota !== null) {
            body.nota = String(nota).slice(0, 255)
        }

        const response = await fetch(`${API_URL}/wishlist/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al actualizar favorito')
        }

        return response.json()
    },

    // ────────────────────────────────────────────
    // 4. DELETE /api/wishlist/{id}
    // ────────────────────────────────────────────
    /**
     * Eliminar un ítem de la wishlist.
     * @param {number|string} id  ID del ítem en la wishlist
     * @returns {Promise<Object>}
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
    },

    // ────────────────────────────────────────────
    // 5. GET /api/wishlist/check/{perfumeId}
    // ────────────────────────────────────────────
    /**
     * Verificar si un perfume está en la wishlist del usuario.
     * @param {string} perfumeId  UUID del perfume
     * @returns {Promise<{ inWishlist: boolean, item: Object|null }>}
     */
    async checkIfInWishlist(perfumeId) {
        const response = await fetch(`${API_URL}/wishlist/check/${perfumeId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'Error al verificar favorito')
        }

        return response.json()
    }
}

export default wishlistService
