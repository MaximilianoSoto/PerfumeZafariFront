<template>
  <div class="min-h-screen relative bg-deep-midnight text-white font-montserrat">

    <!-- Loading -->
    <div v-if="loading" class="h-screen flex items-center justify-center">
      <div class="relative w-20 h-20">
        <div class="absolute inset-0 border-4 border-luxury-gold/30 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-luxury-gold rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>

    <!-- Product -->
    <div v-else-if="product" class="container mx-auto px-4 py-16 max-w-7xl">

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Image Section -->
        <div class="relative group">
          <div class="absolute inset-0 bg-luxury-gold/5 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
          <img :src="product.image" :alt="product.name" class="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/5 bg-[#1A1B24]">
        </div>

        <!-- Info Section -->
        <div class="space-y-8 animate-fade-in-up">
          <div>
            <h3 class="text-luxury-gold tracking-[0.2em] font-medium uppercase mb-2">{{ product.brand }}</h3>
            <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">{{ product.name }}</h1>
            <div class="flex items-center gap-4 text-gray-400 text-sm">
              <span class="bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">{{ product.type }}</span>
              <span>{{ product.ml }}ml</span>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4 border-y border-white/10 py-8">
            <div class="text-center space-y-2">
              <div class="text-3xl font-bold text-luxury-gold">{{ product.stats.duration }}/10</div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">Duración</div>
            </div>
            <div class="text-center space-y-2 border-l border-white/10">
              <div class="text-3xl font-bold text-luxury-gold">{{ product.stats.projection }}/10</div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">Proyección</div>
            </div>
            <div class="text-center space-y-2 border-l border-white/10">
              <div class="text-3xl font-bold text-luxury-gold">{{ product.stats.quality }}/10</div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">Calidad</div>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="product.tags.length" class="flex flex-wrap gap-2">
            <span v-for="tag in product.tags" :key="tag" class="text-sm font-medium text-gray-400 before:content-['#'] before:text-luxury-gold mr-2 capitalize">
              {{ tag }}
            </span>
          </div>

          <!-- Actions -->
          <div class="pt-2 flex gap-3">
            <button
              @click="handleToggleFav"
              class="flex items-center gap-2 px-6 py-3 rounded-md border font-bold uppercase tracking-widest text-sm transition-all duration-300"
              :class="isInWishlist
                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                : 'border-white/20 text-white hover:bg-white/10'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :fill="isInWishlist ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              {{ isInWishlist ? 'En Favoritos' : 'Agregar a Favoritos' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── Store Listings ──────────────────────────────── -->
      <section class="mt-16">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-xl font-bold text-white tracking-tight">Dónde Comprar</h2>
          <div v-if="listingsData" class="flex gap-2">
            <span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50">
              {{ listingsData.counts?.total ?? 0 }} tienda{{ listingsData.counts?.total !== 1 ? 's' : '' }}
            </span>
            <span v-if="listingsData.bestPrice" class="px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-xs text-[#D4AF37] font-semibold">
              Mejor: {{ formatPrice(listingsData.bestPrice) }}
            </span>
          </div>
        </div>

        <!-- Listings loading -->
        <div v-if="listingsLoading" class="flex gap-4">
          <div v-for="i in 3" :key="i" class="flex-1 h-24 bg-white/5 rounded-2xl animate-pulse"></div>
        </div>

        <!-- No listings -->
        <div v-else-if="!listings.length" class="flex items-center gap-4 p-6 bg-[#0F0F14] border border-white/8 rounded-2xl">
          <div class="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <div>
            <p class="text-white/50 text-sm font-medium">Sin resultados en tiendas</p>
            <p class="text-white/25 text-xs mt-0.5">No encontramos este perfume en las tiendas actualmente monitoreadas</p>
          </div>
        </div>

        <!-- Listings grid -->
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="listing in listings"
            :key="listing.id"
            :href="listing.store?.productUrl || listing.store?.url || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 p-4 bg-[#0F0F14] border rounded-2xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            :class="listing.available
              ? 'border-white/8 hover:border-[#D4AF37]/25'
              : 'border-white/5 opacity-60 cursor-not-allowed'"
            @click.prevent="listing.available && listing.store?.productUrl ? openUrl(listing.store.productUrl) : null"
          >
            <!-- Store logo / initial -->
            <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#1A1B24] rounded-xl overflow-hidden">
              <img
                v-if="listing.store?.logo"
                :src="listing.store.logo"
                :alt="listing.store.name"
                class="w-full h-full object-contain p-1"
                @error="e => e.target.style.display = 'none'"
              />
              <span v-else class="text-lg font-bold text-luxury-gold uppercase">
                {{ (listing.store?.name ?? '?')[0] }}
              </span>
            </div>

            <!-- Store info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <p class="text-white/80 text-sm font-semibold truncate">{{ listing.store?.name ?? 'Tienda' }}</p>
                <span v-if="listing.store?.isVerified" class="flex-shrink-0 w-4 h-4 flex items-center justify-center bg-[#D4AF37] rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md"
                  :class="listing.available
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-white/5 text-white/30 border border-white/10'"
                >
                  {{ listing.available ? 'En stock' : 'Sin stock' }}
                </span>
                <span class="text-white/25 text-[10px]">
                  Act. {{ formatDate(listing.lastUpdated) }}
                </span>
              </div>
            </div>

            <!-- Price -->
            <div class="text-right flex-shrink-0">
              <p class="text-white font-bold text-lg">{{ formatPrice(listing.price) }}</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#D4AF37]/0 group-hover:text-[#D4AF37]/70 transition-colors ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </a>
        </div>
      </section>

    </div>

    <!-- Not Found -->
    <div v-else class="h-screen flex flex-col items-center justify-center text-center">
      <h2 class="text-2xl font-bold text-white mb-2">Producto no encontrado</h2>
      <RouterLink to="/" class="text-luxury-gold underline hover:text-white transition-colors">Volver a la galería</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '../services/productService'
import { scraperService } from '@/services/scraperService'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

const route  = useRoute()
const router = useRouter()
const wishlistStore = useWishlistStore()
const authStore     = useAuthStore()
const toastStore    = useToastStore()

// ─── Product ───────────────────────────────────
const product = ref(null)
const loading = ref(true)

// ─── Listings ──────────────────────────────────
const listingsData    = ref(null)
const listingsLoading = ref(false)

const listings = computed(() => listingsData.value?.listings ?? [])

// ─── Wishlist ──────────────────────────────────
const isInWishlist = computed(() => wishlistStore.isInWishlist(route.params.id))

// ─── Helpers ───────────────────────────────────
function formatPrice(price) {
    if (!price) return '—'
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price)
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
}

// ─── Toggle Favorite ───────────────────────────
async function handleToggleFav() {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    try {
        const result = await wishlistStore.toggleWishlist(route.params.id)
        toastStore.addToast({
            message: result.action === 'added' ? 'Añadido a favoritos' : 'Eliminado de favoritos',
            type: result.action === 'added' ? 'success' : 'info'
        })
    } catch {
        toastStore.addToast({ message: 'Error al actualizar favoritos', type: 'error' })
    }
}

// ─── Mount ─────────────────────────────────────
onMounted(async () => {
    authStore.initialize()

    // Load product and wishlist in parallel
    const [productData] = await Promise.all([
        getProductById(route.params.id),
        authStore.isAuthenticated && !wishlistStore.isInitialized
            ? wishlistStore.loadWishlist()
            : Promise.resolve()
    ])
    product.value = productData
    loading.value = false

    // Load store listings after product is shown
    if (productData) {
        listingsLoading.value = true
        try {
            listingsData.value = await scraperService.getListings(route.params.id)
        } catch {
            // Silent fail — no listings available
        } finally {
            listingsLoading.value = false
        }
    }
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
