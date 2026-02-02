<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()

const editingItem = ref(null)
const editPriority = ref(3)
const editNota = ref('')

onMounted(async () => {
    authStore.initialize()
    
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    
    await wishlistStore.loadWishlist()
})

function startEdit(item) {
    editingItem.value = item.id
    editPriority.value = item.priority || 3
    editNota.value = item.nota || ''
}

function cancelEdit() {
    editingItem.value = null
    editPriority.value = 3
    editNota.value = ''
}

async function saveEdit(item) {
    try {
        await wishlistStore.updateItem(item.id, editPriority.value, editNota.value)
        toastStore.addToast({
            message: 'Actualizado correctamente',
            type: 'success'
        })
        cancelEdit()
    } catch (error) {
        toastStore.addToast({
            message: 'Error al actualizar',
            type: 'error'
        })
    }
}

async function removeItem(id) {
    try {
        await wishlistStore.removeFromWishlist(id)
        toastStore.addToast({
            message: 'Eliminado de favoritos',
            type: 'success'
        })
    } catch (error) {
        toastStore.addToast({
            message: 'Error al eliminar',
            type: 'error'
        })
    }
}

function getPriorityLabel(priority) {
    const labels = {
        1: 'Muy baja',
        2: 'Baja',
        3: 'Normal',
        4: 'Alta',
        5: 'Muy alta'
    }
    return labels[priority] || 'Normal'
}

function getPriorityColor(priority) {
    const colors = {
        1: 'text-gray-400',
        2: 'text-blue-400',
        3: 'text-green-400',
        4: 'text-yellow-400',
        5: 'text-red-400'
    }
    return colors[priority] || 'text-green-400'
}
</script>

<template>
  <div class="min-h-screen bg-[#050508] pt-8">
    <!-- Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(212,175,55,0.1)_0%,transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_110%,rgba(139,69,19,0.08)_0%,transparent_50%)]"></div>
    </div>

    <div class="relative container mx-auto pt-8 pb-16">
      <!-- Header -->
      <div class="flex items-center justify-between mb-10 pb-6 border-b border-[#D4AF37]/15">
        <div class="flex items-center gap-5">
          <div class="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/15 to-[#8B4513]/10 border border-[#D4AF37]/20 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Mis Favoritos</h1>
            <p class="text-white/50 text-sm">Tu lista de perfumes deseados</p>
          </div>
        </div>
        <span class="text-[#D4AF37]/80 text-sm font-medium">{{ wishlistStore.items.length }} perfume(s)</span>
      </div>

      <!-- Loading State -->
      <div v-if="wishlistStore.isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
        <p class="text-white/50">Cargando favoritos...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="wishlistStore.items.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-white/5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No tienes favoritos aún</h3>
        <p class="text-white/50 mb-6">Explora el catálogo y añade perfumes a tu lista</p>
        <router-link to="/" class="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-wider rounded-lg hover:bg-[#F5D061] transition-colors">
          Explorar Catálogo
        </router-link>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in wishlistStore.items" 
          :key="item.id"
          class="group relative bg-[#0F0F14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300"
        >
          <!-- Perfume Image & Info -->
          <router-link :to="`/product/${item.perfume_id}`" class="flex gap-4 p-4">
            <div class="w-24 h-32 flex-shrink-0 bg-black/40 rounded-lg overflow-hidden">
              <img 
                :src="item.perfume?.image || 'https://via.placeholder.com/100x130'" 
                :alt="item.perfume?.nombre"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-white truncate group-hover:text-[#D4AF37] transition-colors">
                {{ item.perfume?.nombre || 'Perfume' }}
              </h3>
              <p class="text-[#D4AF37]/80 text-sm mb-2">{{ item.perfume?.marca || '' }}</p>
              
              <!-- Priority Badge -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs text-white/40 uppercase tracking-wider">Prioridad:</span>
                <span :class="['text-sm font-medium', getPriorityColor(item.priority)]">
                  {{ getPriorityLabel(item.priority) }}
                </span>
              </div>

              <!-- Nota -->
              <p v-if="item.nota" class="text-sm text-white/50 line-clamp-2">
                {{ item.nota }}
              </p>
            </div>
          </router-link>

          <!-- Edit Mode -->
          <div v-if="editingItem === item.id" class="px-4 pb-4 space-y-3 border-t border-white/5 pt-4">
            <div>
              <label class="text-xs text-white/40 uppercase tracking-wider block mb-1">Prioridad</label>
              <select 
                v-model.number="editPriority"
                class="w-full bg-[#1A1B24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option :value="1">1 - Muy baja</option>
                <option :value="2">2 - Baja</option>
                <option :value="3">3 - Normal</option>
                <option :value="4">4 - Alta</option>
                <option :value="5">5 - Muy alta</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-white/40 uppercase tracking-wider block mb-1">Nota</label>
              <textarea 
                v-model="editNota"
                rows="2"
                placeholder="Añade una nota..."
                class="w-full bg-[#1A1B24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37] resize-none"
              ></textarea>
            </div>
            <div class="flex gap-2">
              <button 
                @click="saveEdit(item)"
                class="flex-1 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#F5D061] transition-colors"
              >
                Guardar
              </button>
              <button 
                @click="cancelEdit"
                class="flex-1 py-2 bg-white/5 text-white/60 font-medium text-sm rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div v-else class="flex gap-2 px-4 pb-4">
            <button 
              @click="startEdit(item)"
              class="flex-1 py-2 bg-white/5 text-white/60 font-medium text-sm rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
            <button 
              @click="removeItem(item.id)"
              class="py-2 px-4 bg-red-500/10 text-red-400 font-medium text-sm rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <router-link to="/" class="inline-flex items-center gap-2 mt-10 px-5 py-3 border border-white/10 rounded-xl text-white/60 hover:border-[#D4AF37]/30 hover:text-white transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al catálogo
      </router-link>
    </div>
  </div>
</template>
