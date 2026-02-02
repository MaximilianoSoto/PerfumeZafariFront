<template>
  <header class="border-b border-white/10 sticky top-0 bg-deep-midnight/90 backdrop-blur-sm z-50">
    <div class="container mx-auto h-20 flex items-center justify-between ">
      <div class="flex items-center gap-2">
        <RouterLink to="/" class="text-2xl font-bold tracking-widest text-luxury-gold uppercase">
          Perfumes Zafari
        </RouterLink>
      </div>

   
      <nav class="hidden md:flex items-center gap-8 mr-40">
        <RouterLink 
          to="/propose" 
          class="relative group px-2 py-1"
        >
          <span class="text-sm font-medium tracking-[0.15em] text-gray-300 group-hover:text-white transition-colors duration-300 uppercase">
            Agregar un perfume
          </span>
          <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 ease-out group-hover:w-full"></span>
        </RouterLink>

        <!-- Moderadores - Solo visible para admins/moderadores -->
        <RouterLink 
          v-if="authStore.canAccessAdmin"
          to="/admin/moderators" 
          class="relative group px-2 py-1"
        >
          <span class="text-sm font-medium tracking-[0.15em] text-luxury-gold group-hover:text-white transition-colors duration-300 uppercase">
            Moderadores
          </span>
          <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 ease-out group-hover:w-full"></span>
        </RouterLink>

        <!-- Propuestas - Solo visible para admins/moderadores -->
        <RouterLink 
          v-if="authStore.canAccessAdmin"
          to="/admin/proposals" 
          class="relative group px-2 py-1"
        >
          <span class="text-sm font-medium tracking-[0.15em] text-luxury-gold group-hover:text-white transition-colors duration-300 uppercase">
            Propuestas
          </span>
          <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 ease-out group-hover:w-full"></span>
        </RouterLink>

        <!-- Favoritos - Solo visible para usuarios autenticados -->
        <RouterLink 
          v-if="authStore.isAuthenticated"
          to="/favorites" 
          class="relative group px-2 py-1"
        >
          <span class="text-sm font-medium tracking-[0.15em] text-gray-300 group-hover:text-white transition-colors duration-300 uppercase flex items-center gap-1">
           
            Favoritos
          </span>
          <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 ease-out group-hover:w-full"></span>
        </RouterLink>
        
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-6">
      
        <!-- User Menu - Authenticated -->
        <template v-if="authStore.isAuthenticated">
          <div class="relative" ref="dropdownRef">
            <button 
              @click="toggleDropdown"
              class="user-menu-btn flex items-center gap-3 focus:outline-none group"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <!-- Avatar with Premium Border -->
              <div class="avatar-wrapper">
                <div class="avatar-glow"></div>
                <div class="avatar-ring">
                  <div class="avatar-inner">
                    <img 
                      :src="authStore.userPhoto || defaultAvatar" 
                      :alt="authStore.userDisplayName" 
                      class="avatar-img"
                    />
                  </div>
                </div>
                <!-- Online Status -->
                <span class="avatar-status"></span>
              </div>
              
              <!-- Name & Chevron -->
              <div class="hidden md:flex items-center gap-2">
                <div class="user-info">
                  <span class="user-greeting">Bienvenido</span>
                  <span class="user-name">{{ authStore.userDisplayName }}</span>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="chevron-icon"
                  :class="{ 'rotate-180': isOpen }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95 -translate-y-2"
              enter-to-class="transform opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100 translate-y-0"
              leave-to-class="transform opacity-0 scale-95 -translate-y-2"
            >
              <div 
                v-if="isOpen"
                class="dropdown-menu"
              >
                <!-- User Info Header -->
                <div class="dropdown-header">
                  <div class="dropdown-avatar">
                    <img 
                      :src="authStore.userPhoto || defaultAvatar" 
                      :alt="authStore.userDisplayName"
                    />
                  </div>
                  <div class="dropdown-user-info">
                    <p class="dropdown-name">{{ authStore.userDisplayName }}</p>
                    <p class="dropdown-status">
                      <span class="status-dot"></span>
                      Conectado
                    </p>
                  </div>
                </div>

                <!-- Divider -->
                <div class="dropdown-divider"></div>

                <!-- Logout Button -->
                <button 
                  @click="handleLogout"
                  class="dropdown-item dropdown-item--logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </transition>
          </div>
        </template>

        <!-- Login Button - Not Authenticated -->
        <template v-else>
          <RouterLink 
            to="/login"
            class="login-btn"
          >
            <span class="login-btn__glow"></span>
            <span class="login-btn__content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Ingresar</span>
            </span>
          </RouterLink>
        </template>

        <button class="md:hidden text-white">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isOpen = ref(false)
const dropdownRef = ref(null)

const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'

onMounted(() => {
  authStore.initialize()
  document.addEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = async () => {
  isOpen.value = false
  await authStore.logout()
  router.push('/')
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ========== AVATAR WRAPPER ========== */
.avatar-wrapper {
  position: relative;
  width: 44px;
  height: 44px;
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-menu-btn:hover .avatar-glow {
  opacity: 1;
}

.avatar-ring {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2px;
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.user-menu-btn:hover .avatar-ring {
  box-shadow: 0 6px 25px rgba(212, 175, 55, 0.5);
  transform: scale(1.05);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #0a0a0f;
  padding: 2px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border: 2px solid #0a0a0f;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

/* ========== USER INFO ========== */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.user-greeting {
  font-size: 0.65rem;
  color: rgba(212, 175, 55, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: rgba(212, 175, 55, 0.7);
  transition: all 0.3s ease;
}

.user-menu-btn:hover .chevron-icon {
  color: #D4AF37;
}

/* ========== DROPDOWN MENU ========== */
.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 12px;
  width: 280px;
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 0 40px rgba(212, 175, 55, 0.05);
  overflow: hidden;
  z-index: 100;
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%);
}

.dropdown-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  flex-shrink: 0;
}

.dropdown-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0a0a0f;
}

.dropdown-user-info {
  flex: 1;
  min-width: 0;
}

.dropdown-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
}

.dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  margin: 0 16px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item svg {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.dropdown-item span {
  font-size: 0.9rem;
  font-weight: 500;
}

.dropdown-item--logout {
  color: rgba(255, 255, 255, 0.7);
}

.dropdown-item--logout:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}

.dropdown-item--logout:hover svg {
  opacity: 1;
}

/* ========== LOGIN BUTTON ========== */
.login-btn {
  position: relative;
  display: inline-flex;
  padding: 10px 24px;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-btn__glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.login-btn:hover .login-btn__glow {
  opacity: 0.9;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
}

.login-btn__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0a0a0f;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
}

.login-btn__content svg {
  width: 18px;
  height: 18px;
}
</style>
