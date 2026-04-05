<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

const router       = useRouter()
const authStore    = useAuthStore()
const wishlistStore = useWishlistStore()
const toastStore   = useToastStore()

// ─── Edit state ─────────────────────────────
const editingItem = ref(null)
const editPriority = ref(1)
const editNota     = ref('')

// ─── Remove confirm state ─────────────────
const confirmDeleteId = ref(null)

// ─── Sort / Filter ─────────────────────────
const sortBy = ref('date') // 'date' | 'priority_asc' | 'priority_desc'

const sortedItems = computed(() => {
    const list = Array.isArray(wishlistStore.items) ? [...wishlistStore.items] : []
    if (sortBy.value === 'priority_desc') {
        return list.sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1))
    }
    if (sortBy.value === 'priority_asc') {
        return list.sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1))
    }
    // 'date' — orden original de la API (más reciente primero)
    return list.reverse()
})

// ─── Mount ──────────────────────────────────
onMounted(async () => {
    authStore.initialize()

    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }

    await wishlistStore.loadWishlist()
})

// ─── Edit actions ───────────────────────────
function startEdit(item) {
    editingItem.value = item.id
    editPriority.value = item.priority ?? 1
    editNota.value     = item.nota ?? ''
}

function cancelEdit() {
    editingItem.value = null
    editPriority.value = 1
    editNota.value     = ''
}

async function saveEdit(item) {
    try {
        await wishlistStore.updateItem(item.id, editPriority.value, editNota.value)
        toastStore.addToast({ message: 'Favorito actualizado', type: 'success' })
        cancelEdit()
    } catch {
        toastStore.addToast({ message: 'Error al actualizar', type: 'error' })
    }
}

// ─── Remove actions ─────────────────────────
function requestDelete(id) {
    confirmDeleteId.value = id
}

function cancelDelete() {
    confirmDeleteId.value = null
}

async function confirmDelete(id) {
    try {
        await wishlistStore.removeFromWishlist(id)
        toastStore.addToast({ message: 'Eliminado de favoritos', type: 'success' })
    } catch {
        toastStore.addToast({ message: 'Error al eliminar', type: 'error' })
    } finally {
        confirmDeleteId.value = null
    }
}

// ─── Priority helpers ────────────────────────
const PRIORITY_META = {
    1: { label: 'Baja',  icon: '▲',  textClass: 'text-blue-400',   bgClass: 'bg-blue-500/10 border border-blue-500/20' },
    2: { label: 'Media', icon: '▲▲', textClass: 'text-yellow-400', bgClass: 'bg-yellow-500/10 border border-yellow-500/20' },
    3: { label: 'Alta',  icon: '▲▲▲',textClass: 'text-red-400',    bgClass: 'bg-red-500/10 border border-red-500/20' }
}

function priorityMeta(priority) {
    return PRIORITY_META[priority] ?? PRIORITY_META[1]
}

// ─── Image fallback ─────────────────────────
function onImgError(e) {
    e.target.src = 'https://via.placeholder.com/120x160/0f0f14/D4AF37?text=🌸'
}
</script>

<template>
  <div class="min-h-screen bg-[#050508]">
    <!-- Ambient background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B4513]/5 rounded-full blur-[100px]"></div>
    </div>

    <div class="relative container mx-auto px-4 pt-10 pb-20">

      <!-- ── Page Header ─────────────────────────── -->
      <div class="mb-10">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-[#D4AF37]/10">
          <!-- Title -->
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/15 to-[#8B4513]/10 border border-[#D4AF37]/20 rounded-2xl shadow-lg shadow-[#D4AF37]/5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Mis Favoritos</h1>
              <p class="text-white/40 text-sm mt-0.5">Tu colección de perfumes deseados</p>
            </div>
          </div>

          <!-- Stats + Sort -->
          <div class="flex items-center gap-3 flex-wrap">
            <!-- Count badge -->
            <div class="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/8 border border-[#D4AF37]/15 rounded-xl">
              <span class="text-[#D4AF37] font-bold text-lg leading-none">{{ wishlistStore.items.length }}</span>
              <span class="text-white/40 text-sm">perfume{{ wishlistStore.items.length !== 1 ? 's' : '' }}</span>
            </div>

            <!-- Sort selector -->
            <select
              v-if="wishlistStore.items.length > 1"
              v-model="sortBy"
              class="bg-[#1A1B24] border border-white/10 text-white/70 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]/40 cursor-pointer"
            >
              <option value="date">Más recientes</option>
              <option value="priority_desc">Prioridad: Alta → Baja</option>
              <option value="priority_asc">Prioridad: Baja → Alta</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ── Loading ─────────────────────────────── -->
      <div v-if="wishlistStore.isLoading" class="flex flex-col items-center justify-center py-32">
        <div class="relative w-16 h-16 mb-6">
          <div class="absolute inset-0 border-2 border-[#D4AF37]/10 rounded-full"></div>
          <div class="absolute inset-1 border-2 border-[#D4AF37]/40 rounded-full border-t-transparent animate-spin"></div>
          <div class="absolute inset-5 bg-[#D4AF37]/70 rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
        </div>
        <p class="text-[#D4AF37] text-sm tracking-[0.25em] uppercase animate-pulse">Cargando favoritos...</p>
      </div>

      <!-- ── Empty State ─────────────────────────── -->
      <div v-else-if="wishlistStore.items.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="relative mb-8">
          <div class="w-28 h-28 mx-auto flex items-center justify-center bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <div class="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-2xl -z-10"></div>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Sin favoritos aún</h3>
        <p class="text-white/40 text-sm max-w-xs mb-8 leading-relaxed">
          Explora el catálogo y añade los perfumes que te gustan a tu lista personal
        </p>
        <router-link
          to="/collections"
          class="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z"/>
          </svg>
          Explorar catálogo
        </router-link>
      </div>

      <!-- ── Wishlist Grid ────────────────────────── -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          v-for="item in sortedItems"
          :key="item.id"
          class="group relative flex flex-col bg-[#0F0F14] border rounded-2xl overflow-hidden transition-all duration-300"
          :class="editingItem === item.id
            ? 'border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.08)]'
            : 'border-white/8 hover:border-[#D4AF37]/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]'"
        >

          <!-- ── Priority stripe (top) -->
          <div
            class="h-0.5 w-full"
            :class="{
              'bg-gradient-to-r from-transparent via-blue-400 to-transparent': item.priority === 1,
              'bg-gradient-to-r from-transparent via-yellow-400 to-transparent': item.priority === 2,
              'bg-gradient-to-r from-transparent via-red-400 to-transparent':   item.priority === 3
            }"
          ></div>

          <!-- ── Image + Info (clickable link) ─── -->
          <router-link :to="`/product/${item.perfume_id}`" class="flex gap-4 p-4 flex-1">
            <!-- Image -->
            <div class="w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-[#1A1B24] shadow-lg">
              <img
                :src="item.imagen_principal
                  ? (item.imagen_principal.startsWith('http')
                      ? item.imagen_principal
                      : `https://api.perfumezafari.cl${item.imagen_principal}`)
                  : 'https://via.placeholder.com/120x160/0f0f14/D4AF37?text=🌸'"
                :alt="item.nombre ?? 'Perfume'"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                @error="onImgError"
              />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-200">
                  {{ item.nombre ?? 'Perfume' }}
                </h3>
                <p class="text-[#D4AF37]/70 text-xs mt-1 font-medium uppercase tracking-wider">
                  {{ item.marca ?? '' }}
                </p>
              </div>

              <!-- Priority badge -->
              <div class="mt-3 flex items-center gap-2">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide"
                  :class="priorityMeta(item.priority).bgClass + ' ' + priorityMeta(item.priority).textClass"
                >
                  <span class="text-[10px] opacity-80">{{ priorityMeta(item.priority).icon }}</span>
                  {{ priorityMeta(item.priority).label }}
                </span>
              </div>

              <!-- Nota preview -->
              <p v-if="item.nota && editingItem !== item.id" class="mt-2 text-xs text-white/35 line-clamp-2 italic">
                "{{ item.nota }}"
              </p>
            </div>
          </router-link>

          <!-- ── Delete confirmation overlay ─── -->
          <Transition
            enter-active-class="transition duration-150"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="confirmDeleteId === item.id"
              class="absolute inset-0 bg-[#050508]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10 rounded-2xl p-6"
            >
              <div class="w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <p class="text-white/80 text-sm text-center">¿Eliminar de favoritos?</p>
              <div class="flex gap-2 w-full">
                <button
                  @click="confirmDelete(item.id)"
                  class="flex-1 py-2 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
                <button
                  @click="cancelDelete"
                  class="flex-1 py-2 bg-white/8 text-white/60 font-medium text-sm rounded-xl hover:bg-white/12 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Edit Form ──────────────────────── -->
          <Transition
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="editingItem === item.id"
              class="px-4 pb-4 pt-3 space-y-3 border-t border-[#D4AF37]/10"
            >
              <!-- Priority select -->
              <div>
                <label class="text-[10px] text-white/35 uppercase tracking-[0.15em] block mb-1.5">Prioridad</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="p in [1, 2, 3]"
                    :key="p"
                    @click="editPriority = p"
                    class="py-1.5 rounded-lg text-xs font-semibold border transition-all"
                    :class="editPriority === p
                      ? priorityMeta(p).bgClass + ' ' + priorityMeta(p).textClass + ' shadow-sm'
                      : 'bg-transparent border-white/10 text-white/40 hover:border-white/20'"
                  >
                    {{ priorityMeta(p).label }}
                  </button>
                </div>
              </div>

              <!-- Nota textarea -->
              <div>
                <label class="text-[10px] text-white/35 uppercase tracking-[0.15em] block mb-1.5">
                  Nota personal
                  <span class="text-white/20 ml-1">{{ editNota.length }}/255</span>
                </label>
                <textarea
                  v-model="editNota"
                  rows="2"
                  maxlength="255"
                  placeholder="Añade una nota personal..."
                  class="w-full bg-[#1A1B24] border border-white/10 rounded-xl px-3 py-2 text-white/80 text-sm focus:outline-none focus:border-[#D4AF37]/40 resize-none placeholder-white/20 transition-colors"
                ></textarea>
              </div>

              <!-- Save / Cancel -->
              <div class="flex gap-2">
                <button
                  @click="saveEdit(item)"
                  class="flex-1 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-200"
                >
                  Guardar
                </button>
                <button
                  @click="cancelEdit"
                  class="flex-1 py-2 bg-white/5 text-white/50 font-medium text-sm rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── Action Bar ─────────────────────── -->
          <div
            v-if="editingItem !== item.id && confirmDeleteId !== item.id"
            class="flex gap-2 px-4 pb-4"
          >
            <button
              @click="startEdit(item)"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 text-white/50 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white/80 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Editar
            </button>
            <button
              @click="requestDelete(item.id)"
              class="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500/8 text-red-400/70 text-sm rounded-xl hover:bg-red-500/15 hover:text-red-400 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>

        </div><!-- end card -->
      </div><!-- end grid -->

      <!-- ── Back to catalogue ─────────────────── -->
      <div class="mt-12">
        <router-link
          to="/collections"
          class="inline-flex items-center gap-2 px-5 py-3 border border-white/10 rounded-xl text-white/50 text-sm hover:border-[#D4AF37]/25 hover:text-white/80 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al catálogo
        </router-link>
      </div>

    </div>
  </div>
</template>
