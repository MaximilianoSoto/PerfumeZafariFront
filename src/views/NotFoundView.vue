<template>
  <div class="min-h-screen bg-deep-midnight text-white font-montserrat flex flex-col items-center justify-center text-center p-4">
    <div class="space-y-6">
      <h1 class="text-9xl font-bold text-luxury-gold opacity-20">404</h1>
      <h2 class="text-3xl md:text-5xl font-bold text-white relative z-10 -mt-20">Fragment Not Found</h2>
      <p class="text-gray-400 text-lg max-w-md mx-auto">
        The scent you are looking for has evaporated into the ether. Return to our collection to find your essence.
      </p>
      
      <div class="pt-8">
        <RouterLink 
          to="/" 
          class="bg-luxury-gold text-deep-midnight px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 inline-block"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
