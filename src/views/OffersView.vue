<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { scraperService } from '@/services/scraperService'
import { useToastStore } from '@/stores/toastStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useAuthStore } from '@/stores/authStore'

const router       = useRouter()
const toastStore   = useToastStore()
const wishlistStore = useWishlistStore()
const authStore    = useAuthStore()

// ─── Tab: 'deals' | 'new' ──────────────────────
const activeTab = ref('deals')

// ─── Deals state ───────────────────────────────
const deals         = ref([])
const dealsTotal    = ref(0)
const dealsPeriod   = ref('')
const dealsLoading  = ref(false)
const dealsOffset   = ref(0)
const DEALS_LIMIT   = 16

// ─── New Arrivals state ─────────────────────────
const newArrivals    = ref([])
const newTotal       = ref(0)
const newPeriod      = ref('')
const newLoading     = ref(false)
const newOffset      = ref(0)
const NEW_LIMIT      = 16

// ─── Shared filters ────────────────────────────
const selectedDays = ref(10)
const DAY_OPTIONS  = [3, 7, 10, 15, 30]

// ─── Computed ──────────────────────────────────
const hasMoreDeals = computed(() => dealsOffset.value + DEALS_LIMIT < dealsTotal.value)
const hasMoreNew   = computed(() => newOffset.value + NEW_LIMIT < newTotal.value)

// ─── Helpers ───────────────────────────────────
function resolveImage(url) {
    if (!url) return null
    return url.startsWith('http') ? url : `https://api.perfumezafari.cl${url}`
}

function onImgError(e) {
    e.target.style.display = 'none'
    e.target.nextElementSibling?.classList.remove('hidden')
}

function formatPrice(price) {
    if (!price) return null
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price)
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

// ─── Load Deals ────────────────────────────────
async function loadDeals(reset = true) {
    if (dealsLoading.value) return
    if (reset) {
        dealsOffset.value = 0
        deals.value = []
    }
    dealsLoading.value = true
    try {
        const data = await scraperService.getDeals({
            days: selectedDays.value,
            limit: DEALS_LIMIT,
            offset: dealsOffset.value
        })
        deals.value = reset ? (data.deals ?? []) : [...deals.value, ...(data.deals ?? [])]
        dealsTotal.value = data.total ?? 0
        dealsPeriod.value = data.period ?? ''
    } catch {
        toastStore.addToast({ message: 'Error al cargar ofertas', type: 'error' })
    } finally {
        dealsLoading.value = false
    }
}

async function loadMoreDeals() {
    dealsOffset.value += DEALS_LIMIT
    await loadDeals(false)
}

// ─── Load New Arrivals ─────────────────────────
async function loadNewArrivals(reset = true) {
    if (newLoading.value) return
    if (reset) {
        newOffset.value = 0
        newArrivals.value = []
    }
    newLoading.value = true
    try {
        const data = await scraperService.getNewArrivals({
            days: selectedDays.value,
            limit: NEW_LIMIT,
            offset: newOffset.value
        })
        newArrivals.value = reset ? (data.newArrivals ?? []) : [...newArrivals.value, ...(data.newArrivals ?? [])]
        newTotal.value = data.total ?? 0
        newPeriod.value = data.period ?? ''
    } catch {
        toastStore.addToast({ message: 'Error al cargar novedades', type: 'error' })
    } finally {
        newLoading.value = false
    }
}

async function loadMoreNew() {
    newOffset.value += NEW_LIMIT
    await loadNewArrivals(false)
}

// ─── Wishlist toggle ───────────────────────────
async function toggleFav(perfumeId) {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    try {
        const result = await wishlistStore.toggleWishlist(perfumeId)
        toastStore.addToast({
            message: result.action === 'added' ? 'Añadido a favoritos' : 'Eliminado de favoritos',
            type: result.action === 'added' ? 'success' : 'info'
        })
    } catch {
        toastStore.addToast({ message: 'Error al actualizar favoritos', type: 'error' })
    }
}

// ─── Watch tab + days ──────────────────────────
watch(activeTab, (tab) => {
    if (tab === 'deals' && deals.value.length === 0) loadDeals()
    if (tab === 'new' && newArrivals.value.length === 0) loadNewArrivals()
})

watch(selectedDays, () => {
    if (activeTab.value === 'deals') loadDeals()
    else loadNewArrivals()
})

// ─── Mount ─────────────────────────────────────
onMounted(async () => {
    authStore.initialize()
    if (authStore.isAuthenticated && !wishlistStore.isInitialized) {
        wishlistStore.loadWishlist()
    }
    await loadDeals()
})
</script>

<template>
  <div class="min-h-screen bg-[#050508]">

    <!-- Ambient -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#8B4513]/5 rounded-full blur-[100px]"></div>
    </div>

    <div class="relative container mx-auto px-4 pt-10 pb-24">

      <!-- ── Page Header ──────────────────────────── -->
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-3">
          <span class="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/10 border border-[#D4AF37]/20 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </span>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Ofertas &amp; Novedades</h1>
            <p class="text-white/35 text-sm">Precios actualizados desde tiendas ZOFRI</p>
          </div>
        </div>
      </div>

      <!-- ── Controls: Tabs + Days ────────────────── -->
      <div class="flex flex-col gap-3 mb-8">
        <!-- Row 1: Tabs -->
        <div class="flex gap-1 p-1 bg-white/5 rounded-xl w-full sm:w-fit">
          <button
            @click="activeTab = 'deals'"
            class="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 sm:flex-none justify-center"
            :class="activeTab === 'deals'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black shadow-lg'
              : 'text-white/50 hover:text-white/80'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Ofertas
            <span v-if="dealsTotal" class="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-md"
              :class="activeTab === 'deals' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'"
            >{{ dealsTotal }}</span>
          </button>
          <button
            @click="activeTab = 'new'"
            class="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 sm:flex-none justify-center"
            :class="activeTab === 'new'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black shadow-lg'
              : 'text-white/50 hover:text-white/80'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            Nuevos
            <span v-if="newTotal" class="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-md"
              :class="activeTab === 'new' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'"
            >{{ newTotal }}</span>
          </button>
        </div>

        <!-- Row 2: Days filter -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-white/35 text-xs uppercase tracking-wider flex-shrink-0">Periodo:</span>
          <div class="flex gap-1 flex-wrap">
            <button
              v-for="d in DAY_OPTIONS"
              :key="d"
              @click="selectedDays = d"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-w-[40px] text-center"
              :class="selectedDays === d
                ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]'
                : 'border border-white/8 text-white/35 hover:border-white/20 hover:text-white/60'"
            >{{ d }}d</button>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════ -->
      <!-- TAB: OFERTAS                              -->
      <!-- ══════════════════════════════════════════ -->
      <div v-show="activeTab === 'deals'">

        <!-- Loading skeleton -->
        <div v-if="dealsLoading && deals.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="i in 8" :key="i" class="bg-[#0F0F14] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
            <div class="aspect-[3/4] bg-white/5"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-white/5 rounded w-3/4"></div>
              <div class="h-3 bg-white/5 rounded w-1/2"></div>
              <div class="h-5 bg-white/5 rounded w-1/3 mt-3"></div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!dealsLoading && deals.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
          <div class="w-24 h-24 flex items-center justify-center bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Sin ofertas en este período</h3>
          <p class="text-white/35 text-sm">Prueba con más días para ver más resultados</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div
            v-for="deal in deals"
            :key="deal.id"
            class="group relative flex flex-col bg-[#0F0F14] border border-white/8 rounded-2xl overflow-hidden hover:border-[#D4AF37]/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
            @click="router.push(`/product/${deal.id}`)"
          >
            <!-- Discount badge -->
            <div v-if="deal.discount_percent" class="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-red-500 rounded-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              <span class="text-white text-xs font-bold">-{{ Math.round(deal.discount_percent) }}%</span>
            </div>

            <!-- Wishlist btn -->
            <button
              v-if="authStore.isAuthenticated"
              @click.stop="toggleFav(deal.id)"
              class="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/40 transition-all"
              :class="wishlistStore.isInWishlist(deal.id) ? 'text-red-400' : 'text-white/50 hover:text-red-400'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :fill="wishlistStore.isInWishlist(deal.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <!-- Image -->
            <div class="aspect-[3/4] bg-[#1A1B24] overflow-hidden relative">
              <img
                v-if="resolveImage(deal.imagen_principal)"
                :src="resolveImage(deal.imagen_principal)"
                :alt="deal.nombre"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                @error="onImgError"
              />
              <!-- Fallback icon -->
              <div class="hidden w-full h-full flex items-center justify-center text-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <!-- Info -->
            <div class="flex flex-col flex-1 p-4 gap-3">
              <div>
                <p class="text-[#D4AF37]/70 text-[11px] font-semibold uppercase tracking-wider mb-1">{{ deal.marca }}</p>
                <h3 class="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{{ deal.nombre }}</h3>
                <p v-if="deal.ml" class="text-white/30 text-xs mt-1">{{ deal.ml }}ml · {{ deal.tipo }}</p>
              </div>

              <!-- Price section -->
              <div class="mt-auto">
                <div class="flex items-end gap-2 flex-wrap">
                  <span v-if="deal.current_price" class="text-xl font-bold text-white">
                    {{ formatPrice(deal.current_price) }}
                  </span>
                  <span v-if="deal.old_price" class="text-sm text-white/30 line-through">
                    {{ formatPrice(deal.old_price) }}
                  </span>
                </div>
                <!-- Store + date -->
                <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <span class="text-white/35 text-[11px] truncate max-w-[60%]">{{ deal.store_name ?? deal.store_source }}</span>
                  <span class="text-white/25 text-[11px]">{{ formatDate(deal.price_changed_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMoreDeals && !dealsLoading" class="mt-10 text-center">
          <button
            @click="loadMoreDeals"
            class="px-10 py-3 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37]/8 transition-all duration-200"
          >
            Ver más ofertas
          </button>
        </div>
        <div v-if="dealsLoading && deals.length > 0" class="mt-8 flex justify-center">
          <div class="w-8 h-8 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════ -->
      <!-- TAB: NUEVOS                               -->
      <!-- ══════════════════════════════════════════ -->
      <div v-show="activeTab === 'new'">

        <!-- Loading skeleton -->
        <div v-if="newLoading && newArrivals.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="i in 8" :key="i" class="bg-[#0F0F14] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
            <div class="aspect-[3/4] bg-white/5"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-white/5 rounded w-3/4"></div>
              <div class="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!newLoading && newArrivals.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
          <div class="w-24 h-24 flex items-center justify-center bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Sin novedades en este período</h3>
          <p class="text-white/35 text-sm">Prueba con más días para ver más resultados</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div
            v-for="item in newArrivals"
            :key="item.id"
            class="group relative flex flex-col bg-[#0F0F14] border border-white/8 rounded-2xl overflow-hidden hover:border-[#D4AF37]/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
            @click="router.push(`/product/${item.id}`)"
          >
            <!-- NEW badge -->
            <div class="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#D4AF37] rounded-lg shadow-lg">
              <span class="text-black text-[10px] font-bold uppercase tracking-wider">Nuevo</span>
            </div>

            <!-- Wishlist btn -->
            <button
              v-if="authStore.isAuthenticated"
              @click.stop="toggleFav(item.id)"
              class="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/40 transition-all"
              :class="wishlistStore.isInWishlist(item.id) ? 'text-red-400' : 'text-white/50 hover:text-red-400'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :fill="wishlistStore.isInWishlist(item.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <!-- Image -->
            <div class="aspect-[3/4] bg-[#1A1B24] overflow-hidden relative">
              <img
                v-if="resolveImage(item.imagen_principal)"
                :src="resolveImage(item.imagen_principal)"
                :alt="item.nombre"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                @error="onImgError"
              />
              <div class="hidden w-full h-full flex items-center justify-center text-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <!-- Info -->
            <div class="flex flex-col flex-1 p-4 gap-2">
              <p class="text-[#D4AF37]/70 text-[11px] font-semibold uppercase tracking-wider">{{ item.marca }}</p>
              <h3 class="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{{ item.nombre }}</h3>
              <div class="flex items-center gap-2 flex-wrap mt-1">
                <span v-if="item.ml" class="text-white/30 text-[11px]">{{ item.ml }}ml</span>
                <span v-if="item.gender" class="capitalize text-white/30 text-[11px] border-l border-white/10 pl-2">{{ item.gender }}</span>
              </div>

              <!-- Price if available -->
              <div class="mt-auto pt-3 border-t border-white/5">
                <div v-if="item.current_price" class="flex items-center justify-between">
                  <span class="text-white font-bold">{{ formatPrice(item.current_price) }}</span>
                  <span v-if="item.store_name" class="text-white/30 text-[11px] truncate max-w-[50%]">{{ item.store_name }}</span>
                </div>
                <div v-else class="flex items-center justify-between">
                  <span class="text-white/20 text-xs italic">Sin precio registrado</span>
                  <span class="text-white/25 text-[11px]">{{ formatDate(item.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMoreNew && !newLoading" class="mt-10 text-center">
          <button
            @click="loadMoreNew"
            class="px-10 py-3 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37]/8 transition-all duration-200"
          >
            Ver más novedades
          </button>
        </div>
        <div v-if="newLoading && newArrivals.length > 0" class="mt-8 flex justify-center">
          <div class="w-8 h-8 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      </div>

    </div>
  </div>
</template>
