<template>
  <section class="py-5  min-h-screen">
    <div class="container mx-auto ">
      
      <div class="flex items-center gap-2 mb-6">
         <!-- Search Input -->
         <div class="relative flex-grow">
            <input 
              v-model="searchQuery"
              @input="handleLocalSearch"
              type="text" 
              placeholder="Busca una fragancia" 
              class="w-full bg-[#1A1B24] border-none rounded-2xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold text-white placeholder-gray-500 font-medium"
            >
            <!-- Search Icon (Left) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-4 top-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <!-- Clear Button (Right) -->
             <button 
               v-if="searchQuery" 
               @click="clearSearch"
               class="absolute right-3 top-2.5 text-gray-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
            
            <!-- Loader (Right) -->
           
         </div>

         <!-- Filter Button -->
         <button class="bg-[#1A1B24] p-3 rounded-2xl text-white hover:text-luxury-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
         </button>
      </div>

      <!-- Popular Tags -->
      <div class="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            v-for="tagObj in popularTags.data" 
            :key="tagObj.tag"
            @click="selectTag(tagObj.tag)"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap"
            :class="searchQuery === tagObj.tag 
              ? 'bg-luxury-gold text-black shadow-[0_0_5px_2px_rgba(212,175,55,0.4)] font-bold' 
              : 'bg-[#1A1B24] text-gray-400 hover:text-white hover:bg-[#252630]'"
          >
           #{{ tagObj.tag }}
          </button>
      </div>

     

      <!-- Main Loader (Centered in Grid) -->
      <!-- Main Loader (Centered in Grid) -->
      <div v-if="localLoading" class="min-h-[500px] flex flex-col items-center justify-center relative">
          <!-- Glossy Background effect -->
          <div class="absolute w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl animate-pulse"></div>
          
          <div class="relative w-24 h-24 mb-6">
             <!-- Outer Ring -->
             <div class="absolute inset-0 border-2 border-luxury-gold/20 rounded-full"></div>
             <!-- Middle Spinning Ring -->
             <div class="absolute inset-2 border-2 border-luxury-gold/50 rounded-full border-t-transparent animate-spin"></div>
             <!-- Inner Pulsing Core -->
             <div class="absolute inset-8 bg-luxury-gold/80 rounded-full animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.4)]"></div>
          </div>
          
          <h3 class="text-luxury-gold text-lg font-medium tracking-[0.3em] uppercase animate-pulse">Buscando</h3>
          <p class="text-gray-500 text-xs mt-2 tracking-widest">EXPLORANDO CATALOGO...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="displayedProducts.length === 0" class="min-h-[500px] flex flex-col items-center justify-center text-center p-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">Sin Resultados</h3>
          <p class="text-gray-400 max-w-sm leading-relaxed">
            No encontramos fragancias que coincidan con "<span class="text-luxury-gold">{{ searchQuery }}</span>". 
           
          </p>
      </div>


      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in displayedProducts" :key="product.id" class="group relative bg-[#1A1B24] border border-white/5 hover:border-luxury-gold/50 transition-all duration-300">
          <RouterLink :to="`/product/${product.id}`" class="block">
            <div class="aspect-[3/4] overflow-hidden relative bg-black/40">
                <div v-if="product.tag" :class="['absolute top-4 z-10 text-deep-midnight text-xs font-bold px-2 py-1 uppercase tracking-wider', product.tagColor || 'bg-luxury-gold', product.tag === '-20%' ? 'right-4' : 'left-4']">
                  {{ product.tag }}
                </div>
                
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100">
            </div>
            <div class="p-6 space-y-2">
                <h3 class="text-lg font-bold group-hover:text-luxury-gold transition-colors truncate" :title="product.name">{{ product.name }} </h3>
                <p class="text-sm text-gray-500 capitalize">{{ product.type }}</p>
                <div class="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                    <div class="flex gap-2 items-center">
                      <span :class="['text-xl font-medium', product.originalPrice ? 'text-savings-mint' : '']">${{ product.price.toFixed(2) }}</span>
                      <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                    </div>
                    <button class="text-savings-mint hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Load More Button -->
      <!-- Hide load more when searching because we don't have pagination for search yet or it filters locally -->
      <div v-if="!searchQuery && displayedProducts.length > 0 && !localLoading" class="mt-12 text-center">
        <button 
          @click="$emit('loadMore')" 
          class="bg-transparent border border-luxury-gold text-luxury-gold px-8 py-3 uppercase tracking-widest font-medium hover:bg-luxury-gold hover:text-deep-midnight transition-colors duration-300"
        >
          Ver Más
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { searchProducts, getPopularTags } from '../../services/productService'

const props = defineProps({
  title: {
    type: String,
    default: 'Trending Now'
  },
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['loadMore'])

// Filter Bar Logic
const searchQuery = ref('')
const localSearchResults = ref([])
const localLoading = ref(false)

const displayedProducts = computed(() => {
  if (searchQuery.value.trim()) {
    return localSearchResults.value
  }
  return props.products
})

// Debounce logic
let timeoutId = null
const handleLocalSearch = () => {
  localLoading.value = true
  if (timeoutId) clearTimeout(timeoutId)
  
  // Debounce for 500ms
  timeoutId = setTimeout(async () => {
    if (!searchQuery.value.trim()) {
      localLoading.value = false
      return
    }
    
    localSearchResults.value = await searchProducts(searchQuery.value)
    localLoading.value = false
  }, 500)
}

const clearSearch = () => {
  searchQuery.value = ''
  localSearchResults.value = []
}

// Stats & Initialization
const popularTags = ref([])

const selectTag = (tag) => {
    searchQuery.value = tag
    handleLocalSearch()
}

onMounted(async () => {
    popularTags.value = await getPopularTags()
})
</script>
