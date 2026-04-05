<template>
  <div class="min-h-screen bg-deep-midnight text-white font-montserrat flex flex-col">

    
    <div class="pt-16 pb-8 text-center px-4">
        <h1 class="text-2xl sm:text-4xl text-luxury-gold font-bold uppercase tracking-widest">Nuestra Colección</h1>
        <p class="text-gray-400 mt-3 text-sm sm:text-base">Explora nuestra selección exclusiva de fragancias.</p>
    </div>

    <ProductGrid title="All Perfumes" :products="products" @loadMore="loadProducts" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductGrid from '../components/layouts/ProductGrid.vue'
import { getProducts } from '../services/productService'

const route = useRoute()
const products = ref([])
const offset = ref(0)
const LIMIT = 20

const loadProducts = async (reset = false) => {
  if (reset) {
    products.value = []
    offset.value = 0
  }
  
  const search = route.query.search || ''
  const newProducts = await getProducts({ 
    limit: LIMIT, 
    offset: offset.value,
    search: search 
  })
  
  products.value = [...products.value, ...newProducts]
  offset.value += LIMIT
}

// Watch for changes in search query to reload lists
watch(() => route.query.search, () => {
  loadProducts(true)
})

onMounted(async () => {
  await loadProducts(true)
})
</script>
