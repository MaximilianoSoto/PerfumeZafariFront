<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { moderatorService } from '@/services/moderatorService'
import { useToastStore } from '@/stores/toastStore'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const pendingModerators = ref([])
const isLoading = ref(true)
const error = ref(null)
const processingId = ref(null)

// Verificar permisos
onMounted(async () => {
  authStore.initialize()
  
  if (!authStore.canAccessAdmin) {
    router.push('/')
    return
  }
  
  await loadPendingModerators()
})

async function loadPendingModerators() {
  isLoading.value = true
  error.value = null
  
  try {
    pendingModerators.value = await moderatorService.getPendingModerators()
  } catch (err) {
    error.value = err.message || 'Error al cargar moderadores'
    console.error('Error loading moderators:', err)
  } finally {
    isLoading.value = false
  }
}

async function approveModerator(userId) {
  processingId.value = userId
  
  try {
    await moderatorService.approveModerator(userId)
    pendingModerators.value = pendingModerators.value.filter(m => m.id !== userId)
    toastStore.addToast({
        message: 'Moderador aprobado correctamente',
        type: 'success'
    })
  } catch (err) {
    toastStore.addToast({
        message: err.message || 'Error al aprobar moderador',
        type: 'error'
    })
  } finally {
    processingId.value = null
  }
}

async function rejectModerator(userId) {
  processingId.value = userId
  
  try {
    await moderatorService.rejectModerator(userId)
    pendingModerators.value = pendingModerators.value.filter(m => m.id !== userId)
    toastStore.addToast({
        message: 'Moderador rechazado correctamente',
        type: 'success'
    })
  } catch (err) {
    toastStore.addToast({
        message: err.message || 'Error al rechazar moderador',
        type: 'error'
    })
  } finally {
    processingId.value = null
  }
}
</script>

<template>
  <div class="admin-view">
    <!-- Background -->
    <div class="admin-bg">
      <div class="admin-bg__gradient"></div>
    </div>

    <div class="admin-container">
      <!-- Header -->
      <div class="admin-header">
        <div class="admin-header__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
        </div>
        <div class="admin-header__text">
          <h1>Gestión de Moderadores</h1>
          <p>Aprueba o rechaza las solicitudes pendientes</p>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="admin-alert admin-alert--error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
        <button @click="error = null" class="admin-alert__close">&times;</button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="admin-loading">
        <div class="admin-spinner"></div>
        <p>Cargando moderadores...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="pendingModerators.length === 0" class="admin-empty">
        <div class="admin-empty__icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3>No hay solicitudes pendientes</h3>
        <p>Todas las solicitudes han sido procesadas</p>
      </div>

      <!-- Moderators List -->
      <div v-else class="admin-list">
        <div class="admin-list__header">
          <span class="admin-list__count">{{ pendingModerators.length }} pendiente(s)</span>
        </div>

        <div class="admin-card" v-for="mod in pendingModerators" :key="mod.id">
          <div class="admin-card__avatar">
            <img :src="mod.photo_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + mod.id" :alt="mod.display_name" />
          </div>
          
          <div class="admin-card__info">
            <h4 class="admin-card__name">{{ mod.display_name }}</h4>
            <p class="admin-card__email">{{ mod.email }}</p>
            <p class="admin-card__date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
              </svg>
              Solicitado el {{ new Date(mod.created_at).toLocaleDateString('es-CL') }}
            </p>
          </div>

          <div class="admin-card__actions">
            <button 
              class="admin-btn admin-btn--approve"
              @click="approveModerator(mod.id)"
              :disabled="processingId === mod.id"
            >
              <svg v-if="processingId !== mod.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              <span v-else class="btn-spinner"></span>
              Aprobar
            </button>
            
            <button 
              class="admin-btn admin-btn--reject"
              @click="rejectModerator(mod.id)"
              :disabled="processingId === mod.id"
            >
              <svg v-if="processingId !== mod.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
              <span v-else class="btn-spinner"></span>
              Rechazar
            </button>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <router-link to="/" class="admin-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
        </svg>
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.admin-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  position: relative;
  background: #050508;
}

.admin-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.admin-bg__gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(139, 69, 19, 0.08) 0%, transparent 50%);
}

.admin-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 2rem;
}

/* Header */
.admin-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}

.admin-header__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(139, 69, 19, 0.1));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 1rem;
  color: #D4AF37;
}

.admin-header__icon svg {
  width: 28px;
  height: 28px;
}

.admin-header__text h1 {
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
}

.admin-header__text p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Alert */
.admin-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
}

.admin-alert--error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
}

.admin-alert svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.admin-alert__close {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
}

.admin-alert__close:hover {
  opacity: 1;
}

/* Loading */
.admin-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.admin-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(212, 175, 55, 0.2);
  border-top-color: #D4AF37;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.admin-empty {
  text-align: center;
  padding: 4rem 2rem;
}

.admin-empty__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 50%;
  color: #22c55e;
}

.admin-empty__icon svg {
  width: 40px;
  height: 40px;
}

.admin-empty h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: white;
}

.admin-empty p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
}

/* List */
.admin-list__header {
  margin-bottom: 1rem;
}

.admin-list__count {
  font-size: 0.85rem;
  color: rgba(212, 175, 55, 0.8);
  font-weight: 500;
}

/* Card */
.admin-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background: linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(15, 15, 20, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.admin-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.admin-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  flex-shrink: 0;
}

.admin-card__avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0a0a0f;
}

.admin-card__info {
  flex: 1;
  min-width: 0;
}

.admin-card__name {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.admin-card__email {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-card__date {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.admin-card__date svg {
  width: 14px;
  height: 14px;
}

.admin-card__actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* Buttons */
.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-btn svg {
  width: 16px;
  height: 16px;
}

.admin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-btn--approve {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.admin-btn--approve:hover:not(:disabled) {
  background: rgba(34, 197, 94, 0.25);
}

.admin-btn--reject {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.admin-btn--reject:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.2);
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Back Button */
.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.admin-back svg {
  width: 18px;
  height: 18px;
}

.admin-back:hover {
  border-color: rgba(212, 175, 55, 0.3);
  color: white;
}

/* Responsive */
@media (max-width: 640px) {
  .admin-card {
    flex-wrap: wrap;
  }
  
  .admin-card__actions {
    width: 100%;
    margin-top: 0.75rem;
  }
  
  .admin-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
