<template>
  <div class="fixed inset-0 z-40 bg-deep-midnight flex items-center justify-center transition-opacity duration-500" v-if="loading">
    <div class="flex flex-col items-center gap-4">
      <div class="relative w-16 h-16">
        <!-- Gold spinning ring -->
        <div class="absolute inset-0 border-4 border-luxury-gold/30 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-luxury-gold rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div class="text-luxury-gold text-sm tracking-widest uppercase font-medium animate-pulse">
        Loading...
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean
})
</script>
