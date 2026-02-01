<template>
  <div class="min-h-screen relative bg-deep-midnight text-white font-montserrat flex items-center justify-center p-4">

    
    <div v-if="loading" class="h-screen flex items-center justify-center">
        <div class="relative w-20 h-20">
            <div class="absolute inset-0 border-4 border-luxury-gold/30 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-luxury-gold rounded-full border-t-transparent animate-spin"></div>
        </div>
    </div>

    <div v-else-if="product" class=" w-full max-w-7xl">
        <!-- 
        <RouterLink 
            to="/" 
            class="absolute top-[18%] right-[17%]  inline-flex border border-white/5  p-3 rounded-md items-center gap-2 text-gray-400 hover:text-luxury-gold transition-colors mb-8 group"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-sm font-medium tracking-wide">Volver al Catálogo</span>
        </RouterLink>-->

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

                <div class="pt-6">
                    <button class="w-full sm:w-auto bg-luxury-gold text-deep-midnight px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                        Agregar a Expedición
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="h-screen flex flex-col items-center justify-center text-center">
        <h2 class="text-2xl font-bold text-white mb-2">Producto no encontrado</h2>
        <RouterLink to="/" class="text-luxury-gold underline hover:text-white transition-colors">Volver a la galería</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '../services/productService'

const route = useRoute()
const product = ref(null)
const loading = ref(true)

onMounted(async () => {
    product.value = await getProductById(route.params.id)
    loading.value = false
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
