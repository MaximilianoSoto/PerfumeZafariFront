<template>
  <div class="min-h-screen bg-deep-midnight text-white font-montserrat flex flex-col">

    
    <div class="pt-20 pb-10 text-center">
        <h1 class="text-4xl text-luxury-gold font-bold uppercase tracking-widest">Nuestra Colección</h1>
        <p class="text-gray-400 mt-4">Explore our exclusive range of fragrances.</p>
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
