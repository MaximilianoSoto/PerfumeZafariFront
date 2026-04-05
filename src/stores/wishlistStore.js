import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { wishlistService } from '@/services/wishlistService'

/**
 * Store de Wishlist / Favoritos
 *
 * Prioridades (según schema de la API):
 *   1 = Baja
 *   2 = Media
 *   3 = Alta
 */
export const useWishlistStore = defineStore('wishlist', () => {

    // ─── State ─────────────────────────────────
    const items       = ref([])
    const isLoading   = ref(false)
    const isInitialized = ref(false)

    // ─── Getters ───────────────────────────────

    /** Array de perfume_id que están en la wishlist */
    const wishlistIds = computed(() => {
        if (!Array.isArray(items.value)) return []
        return items.value.map(item => item.perfume_id)
    })

    /** Devuelve true si el perfumeId está en la wishlist (lookup local) */
    function isInWishlist(perfumeId) {
        return wishlistIds.value.includes(perfumeId)
    }

    /** Devuelve el ítem completo de la wishlist por perfumeId, o undefined */
    function getWishlistItem(perfumeId) {
        return items.value.find(item => item.perfume_id === perfumeId)
    }

    // ─── Etiquetas de prioridad ────────────────

    const PRIORITY_LABELS = {
        1: 'Baja',
        2: 'Media',
        3: 'Alta'
    }

    const PRIORITY_COLORS = {
        1: 'text-blue-400',
        2: 'text-yellow-400',
        3: 'text-red-400'
    }

    const PRIORITY_BG = {
        1: 'bg-blue-500/10 border-blue-500/20',
        2: 'bg-yellow-500/10 border-yellow-500/20',
        3: 'bg-red-500/10 border-red-500/20'
    }

    function getPriorityLabel(priority) {
        return PRIORITY_LABELS[priority] ?? 'Media'
    }

    function getPriorityColor(priority) {
        return PRIORITY_COLORS[priority] ?? 'text-yellow-400'
    }

    function getPriorityBg(priority) {
        return PRIORITY_BG[priority] ?? 'bg-yellow-500/10 border-yellow-500/20'
    }

    // ─── Actions ───────────────────────────────

    /**
     * 1. GET /api/wishlist
     * Carga todos los ítems de la wishlist del usuario.
     */
    async function loadWishlist() {
        if (isLoading.value) return

        isLoading.value = true
        try {
            const response = await wishlistService.getWishlist()
            // Estructura real: { success, data: { items: [], total, limit, offset } }
            const raw = response?.data?.items ?? response?.data ?? response
            items.value = Array.isArray(raw) ? raw : []
            isInitialized.value = true
        } catch (error) {
            console.error('[wishlistStore] Error loading wishlist:', error)
            items.value = []
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 2. POST /api/wishlist
     * Agrega un perfume a la wishlist.
     * @param {string} perfumeId  UUID del perfume
     * @param {number} priority   1=baja | 2=media | 3=alta (default: 1)
     * @param {string} nota       Nota personal (máx. 255 chars)
     */
    async function addToWishlist(perfumeId, priority = 1, nota = '') {
        const token = localStorage.getItem('auth_token')
        if (!token) {
            throw new Error('Debes iniciar sesión para agregar favoritos')
        }

        const response = await wishlistService.addToWishlist(perfumeId, priority, nota)
        const newItem = response.data || response

        // Actualiza estado local
        items.value.push(newItem)
        return newItem
    }

    /**
     * 3. PUT /api/wishlist/{id}
     * Actualiza la prioridad o nota de un ítem.
     * @param {number|string} id
     * @param {number}        priority
     * @param {string}        nota
     */
    async function updateItem(id, priority, nota) {
        const response = await wishlistService.updateWishlistItem(id, priority, nota)

        // Actualiza estado local
        const index = items.value.findIndex(item => item.id === id)
        if (index !== -1) {
            items.value[index] = { ...items.value[index], priority, nota }
        }

        return response
    }

    /**
     * 4. DELETE /api/wishlist/{id}
     * Elimina un ítem de la wishlist.
     * @param {number|string} id  ID del ítem en la wishlist
     */
    async function removeFromWishlist(id) {
        await wishlistService.removeFromWishlist(id)

        // Actualiza estado local
        items.value = items.value.filter(item => item.id !== id)
    }

    /**
     * 5. GET /api/wishlist/check/{perfumeId}
     * Verifica en la API si un perfume específico está en la wishlist.
     * Útil al entrar al detalle de producto para un estado exacto server-side.
     * @param {string} perfumeId  UUID del perfume
     * @returns {Promise<{ inWishlist: boolean, item: Object|null }>}
     */
    async function checkIfInWishlist(perfumeId) {
        try {
            const result = await wishlistService.checkIfInWishlist(perfumeId)

            // Sincroniza el estado local si la API devuelve que está en la wishlist
            if (result.inWishlist && result.item) {
                const existsLocally = items.value.some(i => i.perfume_id === perfumeId)
                if (!existsLocally) {
                    items.value.push(result.item)
                }
            } else {
                // Si la API dice que no está, lo quitamos del estado local
                items.value = items.value.filter(i => i.perfume_id !== perfumeId)
            }

            return result
        } catch (error) {
            console.error('[wishlistStore] Error checking wishlist:', error)
            return { inWishlist: false, item: null }
        }
    }

    /**
     * Toggle: agrega o elimina un perfume según el estado actual.
     * Usa el estado local para evitar llamadas innecesarias a la API check.
     * @param {string} perfumeId  UUID del perfume
     * @returns {Promise<{ action: 'added'|'removed', item?: Object }>}
     */
    async function toggleWishlist(perfumeId) {
        const existingItem = getWishlistItem(perfumeId)

        if (existingItem) {
            await removeFromWishlist(existingItem.id)
            return { action: 'removed' }
        } else {
            const newItem = await addToWishlist(perfumeId)
            return { action: 'added', item: newItem }
        }
    }

    /**
     * Reinicia el store (útil al cerrar sesión).
     */
    function reset() {
        items.value = []
        isInitialized.value = false
        isLoading.value = false
    }

    // ─── Expose ────────────────────────────────
    return {
        // State
        items,
        isLoading,
        isInitialized,
        // Getters
        wishlistIds,
        isInWishlist,
        getWishlistItem,
        getPriorityLabel,
        getPriorityColor,
        getPriorityBg,
        // Actions
        loadWishlist,
        addToWishlist,
        updateItem,
        removeFromWishlist,
        checkIfInWishlist,
        toggleWishlist,
        reset
    }
})
