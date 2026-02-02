<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { proposalService } from '@/services/proposalService'
import { useToastStore } from '@/stores/toastStore'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const proposals = ref([])
const isLoading = ref(true)
const error = ref(null)
const processingId = ref(null)

const API_URL = 'https://api.perfumezafari.cl'

// Verificar permisos
onMounted(async () => {
  authStore.initialize()
  
  if (!authStore.canAccessAdmin) {
    router.push('/')
    return
  }
  
  await loadProposals()
})

async function loadProposals() {
  isLoading.value = true
  error.value = null
  
  try {
    proposals.value = await proposalService.getProposals()
  } catch (err) {
    error.value = err.message || 'Error al cargar propuestas'
    console.error('Error loading proposals:', err)
  } finally {
    isLoading.value = false
  }
}

async function approveProposal(proposalId) {
  processingId.value = proposalId
  
  try {
    await proposalService.approveProposal(proposalId)
    proposals.value = proposals.value.filter(p => p.id !== proposalId)
    toastStore.addToast({
        message: 'Propuesta aprobada correctamente',
        type: 'success'
    })
  } catch (err) {
    toastStore.addToast({
        message: err.message || 'Error al aprobar la propuesta',
        type: 'error'
    })
  } finally {
    processingId.value = null
  }
}

async function rejectProposal(proposalId) {
  processingId.value = proposalId
  
  try {
    await proposalService.rejectProposal(proposalId)
    proposals.value = proposals.value.filter(p => p.id !== proposalId)
    toastStore.addToast({
        message: 'Propuesta rechazada correctamente',
        type: 'success'
    })
  } catch (err) {
    toastStore.addToast({
        message: err.message || 'Error al rechazar la propuesta',
        type: 'error'
    })
  } finally {
    processingId.value = null
  }
}

function getActionLabel(action) {
  const labels = {
    'create': 'Crear nuevo',
    'update': 'Actualizar',
    'delete': 'Eliminar'
  }
  return labels[action] || action
}

function getActionClass(action) {
  const classes = {
    'create': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'update': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'delete': 'bg-red-500/10 text-red-400 border-red-500/20'
  }
  
  return classes[action] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
}

function getImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_URL}${path}`
}
</script>

<template>
  <div class="min-h-screen p-4 sm:p-8 relative bg-[#050508]">
    <!-- Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(212,175,55,0.1)_0%,transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_110%,rgba(139,69,19,0.08)_0%,transparent_50%)]"></div>
    </div>

    <div class="relative container mx-auto pt-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-10 pb-6 border-b border-[#D4AF37]/15">
        <div class="flex items-center gap-5">
            <div class="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/15 to-[#8B4513]/10 border border-[#D4AF37]/20 rounded-2xl text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>
            </div>
            <div>
            <h1 class="m-0 mb-1 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Propuestas</h1>
            <p class="m-0 text-white/50 font-light">Gestiona las solicitudes de la comunidad</p>
            </div>
        </div>
        
        <router-link to="/" class="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
            </svg>
            <span>Volver</span>
        </router-link>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="flex items-center gap-3 p-4 mb-6 rounded-xl text-sm bg-red-500/10 border border-red-500/30 text-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 flex-shrink-0">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
        <button @click="error = null" class="ml-auto bg-none border-none text-inherit text-xl cursor-pointer opacity-70 hover:opacity-100">&times;</button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 px-8 text-white/40">
        <div class="relative w-16 h-16 mb-6">
            <div class="absolute inset-0 border-4 border-[#D4AF37]/10 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p class="font-light tracking-wide">Cargando propuestas...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="proposals.length === 0" class="text-center py-24 px-8 bg-white/[0.02] border border-white/5 rounded-3xl">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-emerald-500/5 border border-emerald-500/20 rounded-full text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="m-0 mb-2 text-2xl font-semibold text-white">Todo al día</h3>
        <p class="m-0 text-white/40 max-w-sm mx-auto">No hay propuestas pendientes de revisión en este momento.</p>
      </div>

      <!-- Proposals List -->
      <div v-else class="space-y-6">
        <div class="flex items-center justify-between px-2">
            <span class="text-sm font-medium text-[#D4AF37]/80 uppercase tracking-wider">{{ proposals.length }} PENDIENTES</span>
            <div class="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent ml-4"></div>
        </div>

        <div v-for="proposal in proposals" :key="proposal.id" 
             class="group relative bg-[#0F0F14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             
            <!-- Decorative gradient line -->
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="flex flex-col md:flex-row">
                <!-- Image Section -->
                <div class="w-full md:w-[250px] h-[220px] md:h-auto relative bg-[#050508]">
                    <img 
                        v-if="proposal.data?.imagenPrincipal" 
                        :src="getImageUrl(proposal.data.imagenPrincipal)" 
                        :alt="proposal.data?.nombre"
                        class="w-full h-full object-contain  group-hover:scale-105 transition-transform duration-500"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center text-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    
                    
                </div>

                <!-- Content Section -->
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{{ proposal.data?.nombre || 'Sin nombre' }}</h3>
                                <div class="text-[#D4AF37]/80 font-medium tracking-wide uppercase text-sm">{{ proposal.data?.marca || 'Sin marca' }}</div>
                            </div>
                            <!-- Proposer -->
                            <div class="text-right">
                                <div class="flex items-center gap-2 text-xs text-white/40 mb-1 justify-end">
                                    <span>Solicitado por</span>
                                    <div class="w-5 h-5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B4513] p-[1px]">
                                        <div class="w-full h-full rounded-full bg-[#050508] flex items-center justify-center text-xxs font-bold text-[#D4AF37]">
                                            {{ proposal.proposed_by_name?.charAt(0) || 'U' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="text-white/80 text-sm font-medium">{{ proposal.proposed_by_name }}</div>
                            </div>
                        </div>

                        <!-- Grid Info -->
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <div>
                                <span class="block text-xs text-white/30 uppercase tracking-widest mb-1">Tipo</span>
                                <span class="font-medium text-white capitalize">{{ proposal.data?.tipo || 'N/A' }}</span>
                            </div>
                            <div>
                                <span class="block text-xs text-white/30 uppercase tracking-widest mb-1">Volumen</span>
                                <span class="font-medium text-white">{{ proposal.data?.ml || 'N/A' }} ml</span>
                            </div>
                            <div class="col-span-2">
                                <span class="block text-xs text-white/30 uppercase tracking-widest mb-1">Tags</span>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in proposal.data.tags" :key="tag" 
                                          class="text-xs px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded border border-[#D4AF37]/20">
                                        {{ tag }}
                                    </span>
                                    <span v-if="!proposal.data.tags?.length" class="text-white/20 text-sm">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Reason -->
                        <div v-if="proposal.reason" class="flex gap-3 text-sm text-white/60 italic border-l-2 border-[#D4AF37]/30 pl-4 py-1 mb-6">
                            "{{ proposal.reason }}"
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3 mt-auto pt-6 border-t border-white/5">
                        <button 
                            class="flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border"
                            :class="processingId === proposal.id ? 'bg-emerald-500/5 text-emerald-500/50 border-emerald-500/10 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'"
                            @click="approveProposal(proposal.id)"
                            :disabled="processingId === proposal.id"
                        >
                            <span v-if="processingId === proposal.id" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            <span>Aprobar</span>
                        </button>
                        
                        <button 
                            class="flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border"
                            :class="processingId === proposal.id ? 'bg-red-500/5 text-red-500/50 border-red-500/10 cursor-not-allowed' : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'"
                            @click="rejectProposal(proposal.id)"
                            :disabled="processingId === proposal.id"
                        >
                            <span v-if="processingId === proposal.id" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                            <span>Rechazar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    
    </div>
  </div>
</template>
