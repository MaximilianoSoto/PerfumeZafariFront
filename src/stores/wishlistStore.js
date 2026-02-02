import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { wishlistService } from '@/services/wishlistService'

export const useWishlistStore = defineStore('wishlist', () => {
    const items = ref([])
    const isLoading = ref(false)
    const isInitialized = ref(false)

    // Getters
    const wishlistIds = computed(() => {
        if (!Array.isArray(items.value)) return []
        return items.value.map(item => item.perfume_id)
    })

    function isInWishlist(perfumeId) {
        return wishlistIds.value.includes(perfumeId)
    }

    function getWishlistItem(perfumeId) {
        return items.value.find(item => item.perfume_id === perfumeId)
    }

    // Actions
    async function loadWishlist() {
        if (isLoading.value) return

        isLoading.value = true
        try {
            const response = await wishlistService.getWishlist()
            items.value = response.data || response || []

            console.log(items.value)

            isInitialized.value = true
        } catch (error) {
            console.error('Error loading wishlist:', error)
            items.value = []
        } finally {
            isLoading.value = false
        }
    }

    async function addToWishlist(perfumeId, priority = 3, nota = '') {
        const token = localStorage.getItem('auth_token')

        if (!token) {
            throw new Error('Debes iniciar sesión para agregar favoritos')
        }

        try {

            const response = await wishlistService.addToWishlist(perfumeId, priority, nota)

            // Add to local state
            const newItem = response.data || response

            items.value.push(newItem)

            return newItem
        } catch (error) {
            console.error('Error adding to wishlist:', error)
            throw error
        }
    }

    async function updateItem(id, priority, nota) {
        try {
            const response = await wishlistService.updateWishlistItem(id, priority, nota)

            // Update local state
            const index = items.value.findIndex(item => item.id === id)
            if (index !== -1) {
                items.value[index] = { ...items.value[index], priority, nota }
            }

            return response
        } catch (error) {
            console.error('Error updating wishlist item:', error)
            throw error
        }
    }

    async function removeFromWishlist(id) {
        try {
            await wishlistService.removeFromWishlist(id)

            // Remove from local state
            items.value = items.value.filter(item => item.id !== id)
        } catch (error) {
            console.error('Error removing from wishlist:', error)
            throw error
        }
    }

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

    return {
        // State
        items,
        isLoading,
        isInitialized,
        // Getters
        wishlistIds,
        isInWishlist,
        getWishlistItem,
        // Actions
        loadWishlist,
        addToWishlist,
        updateItem,
        removeFromWishlist,
        toggleWishlist
    }
})
