<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import AppLoader from './components/ui/AppLoader.vue'
import AppHeader from './components/layouts/AppHeader.vue'
import ToastNotification from './components/common/ToastNotification.vue'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

// Ocultar header en la página de login
const showHeader = computed(() => route.path !== '/login')

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  isLoading.value = false
})
</script>

<template>
  <AppHeader v-if="showHeader" />
  <AppLoader :loading="isLoading" />
  <ToastNotification />
  <RouterView />

  
</template>

<style scoped>
</style>
