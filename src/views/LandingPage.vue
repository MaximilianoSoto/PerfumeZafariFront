<template>
  <div class="min-h-screen bg-black/20 text-white font-montserrat flex flex-col ">

    <AppHero />
    <ProductGrid  :products="products" @loadMore="loadProducts" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHero from '../components/layouts/AppHero.vue'
import ProductGrid from '../components/layouts/ProductGrid.vue'
import { getProducts } from '../services/productService'

const products = ref([])
const offset = ref(0)
const LIMIT = 20

const loadProducts = async () => {
  const newProducts = await getProducts({ limit: LIMIT, offset: offset.value })
  products.value = [...products.value, ...newProducts]
  offset.value += LIMIT
}

onMounted(async () => {
  await loadProducts()
})
</script>

<style scoped>
</style>
