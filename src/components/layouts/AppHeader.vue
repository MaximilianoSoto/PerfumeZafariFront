<template>
  <header class="border-b border-white/10 sticky top-0 bg-deep-midnight/90 backdrop-blur-sm z-50">
    <div class="container mx-auto  h-20 flex items-center justify-between">
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
        
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-6">
      
        <!-- User Menu -->
        <div class="relative" ref="dropdownRef">
          <button 
            @click="toggleDropdown"
            class="flex items-center gap-3 focus:outline-none group"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <!-- Avatar Wrapper -->
            <div class="relative">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 p-[2px] shadow-lg group-hover:shadow-luxury-gold/50 transition-all duration-300">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User Avatar" 
                  class="h-full w-full rounded-full object-cover border-2 border-deep-midnight bg-deep-midnight"
                />
              </div>
              <!-- Online Status Indicator -->
              <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-deep-midnight bg-green-500 transform translate-x-1/4 translate-y-1/4"></span>
            </div>
            
            <!-- Name & Chevron -->
            <div class="hidden md:flex items-center gap-2">
              <span class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">Golden Lion</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 text-gray-400 group-hover:text-luxury-gold transition-transform duration-300"
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
              class="absolute right-0 mt-3 w-56 origin-top-right rounded-xl bg-deep-midnight border border-white/10 shadow-2xl py-2 z-[100] backdrop-blur-xl ring-1 ring-black/5"
            >
              <!-- Header in Dropdown -->
              <div class="px-4 py-3 border-b border-white/5 mb-1">
                <p class="text-xs text-luxury-gold font-bold tracking-wider uppercase">Conectado como</p>
                <p class="text-sm font-medium text-white truncate">Golden Lion</p>
              </div>

              <a 
                href="#"
                @click.prevent="logout"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-red-400 transition-all group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar sesión</span>
              </a>
            </div>
          </transition>
        </div>

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

const router = useRouter()
const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const logout = () => {
  // Logic to handle logout
  console.log('Logging out...')
  isOpen.value = false
  router.push('/')
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
