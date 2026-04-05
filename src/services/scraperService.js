const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'

function getAuthHeaders() {
    const token = localStorage.getItem('auth_token')
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
}

export const scraperService = {

    // ────────────────────────────────────────────────────────────────
    // 1. GET /api/scraper/perfumes/{perfumeId}/listings
    //    Precios en tiendas de un perfume específico
    // ────────────────────────────────────────────────────────────────
    /**
     * Obtiene los precios de un perfume en diferentes tiendas (ZOFRI / online).
     * @param {string} perfumeId  UUID del perfume
     * @returns {Promise<{ listings: Array, bestPrice: number|null, counts: object }>}
     */
    async getListings(perfumeId) {
        const response = await fetch(
            `${API_URL}/scraper/perfumes/${perfumeId}/listings`,
            { method: 'GET', headers: getAuthHeaders() }
        )

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            throw new Error(err.message || 'Error al obtener precios en tiendas')
        }

        const result = await response.json()
        // { success, data: { listings, bestPrice, counts } }
        return result?.data ?? result
    },

    // ────────────────────────────────────────────────────────────────
    // 2. GET /api/scraper/deals
    //    Perfumes que bajaron de precio
    // ────────────────────────────────────────────────────────────────
    /**
     * @param {object} params
     * @param {number} [params.days=10]    Período en días
     * @param {number} [params.limit=20]   Cantidad por página
     * @param {number} [params.offset=0]   Offset para paginación
     * @returns {Promise<{ deals: Array, total: number, period: string, limit: number, offset: number }>}
     */
    async getDeals({ days = 10, limit = 20, offset = 0 } = {}) {
        const qs = new URLSearchParams({ days, limit, offset }).toString()
        const response = await fetch(
            `${API_URL}/scraper/deals?${qs}`,
            { method: 'GET', headers: getAuthHeaders() }
        )

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            throw new Error(err.message || 'Error al obtener ofertas')
        }

        const result = await response.json()
        // { success, data: { deals, total, period, limit, offset } }
        return result?.data ?? result
    },

    // ────────────────────────────────────────────────────────────────
    // 3. GET /api/scraper/new-arrivals
    //    Perfumes agregados recientemente
    // ────────────────────────────────────────────────────────────────
    /**
     * @param {object} params
     * @param {number} [params.days=10]    Período en días
     * @param {number} [params.limit=20]   Cantidad por página
     * @param {number} [params.offset=0]   Offset para paginación
     * @returns {Promise<{ newArrivals: Array, total: number, period: string, limit: number, offset: number }>}
     */
    async getNewArrivals({ days = 10, limit = 20, offset = 0 } = {}) {
        const qs = new URLSearchParams({ days, limit, offset }).toString()
        const response = await fetch(
            `${API_URL}/scraper/new-arrivals?${qs}`,
            { method: 'GET', headers: getAuthHeaders() }
        )

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            throw new Error(err.message || 'Error al obtener novedades')
        }

        const result = await response.json()
        // { success, data: { newArrivals, total, period, limit, offset } }
        return result?.data ?? result
    }
}

export default scraperService
