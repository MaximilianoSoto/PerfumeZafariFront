<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref('')

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Inicializar Google Sign-In
onMounted(() => {
  if (!document.getElementById('google-signin-script')) {
    const script = document.createElement('script')
    script.id = 'google-signin-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = initializeGoogleSignIn
    document.head.appendChild(script)
  } else {
    initializeGoogleSignIn()
  }
})

function initializeGoogleSignIn() {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
      auto_select: false,
      cancel_on_tap_outside: true,
    })
  }
}

function handleGoogleLogin() {
  isLoading.value = true
  errorMessage.value = ''
  
  if (window.google) {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large', width: '100%' }
        )
        const btn = document.querySelector('#google-signin-button div[role="button"]')
        if (btn) btn.click()
      }
    })
  } else {
    errorMessage.value = 'Error al cargar Google Sign-In'
    isLoading.value = false
  }
}

async function handleGoogleCallback(response) {
  try {
    const success = await authStore.loginWithGoogle(response.credential)
    if (success) {
      router.push('/')
    } else {
      errorMessage.value = authStore.error || 'Error al iniciar sesión'
    }
  } catch (err) {
    errorMessage.value = 'Error al procesar el login'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-view">
    <!-- Animated Luxury Background -->
    <div class="login-bg">
      <!-- Gradient Overlays -->
      <div class="login-bg__gradient"></div>
      <div class="login-bg__gradient-secondary"></div>
      
      <!-- Floating Orbs -->
      <div class="orb orb--1"></div>
      <div class="orb orb--2"></div>
      <div class="orb orb--3"></div>
      
      <!-- Particles System -->
      <div class="particles">
        <div class="particle particle--gold particle--1"></div>
        <div class="particle particle--gold particle--2"></div>
        <div class="particle particle--gold particle--3"></div>
        <div class="particle particle--gold particle--4"></div>
        <div class="particle particle--gold particle--5"></div>
        <div class="particle particle--gold particle--6"></div>
        <div class="particle particle--gold particle--7"></div>
        <div class="particle particle--gold particle--8"></div>
        <div class="particle particle--purple particle--9"></div>
        <div class="particle particle--purple particle--10"></div>
        <div class="particle particle--purple particle--11"></div>
        <div class="particle particle--purple particle--12"></div>
        <div class="particle particle--white particle--13"></div>
        <div class="particle particle--white particle--14"></div>
        <div class="particle particle--white particle--15"></div>
        <div class="particle particle--white particle--16"></div>
      </div>
      
      <!-- Shimmer Lines -->
      <div class="shimmer-lines">
        <div class="shimmer-line shimmer-line--1"></div>
        <div class="shimmer-line shimmer-line--2"></div>
        <div class="shimmer-line shimmer-line--3"></div>
      </div>
      
      <!-- Central Glow -->
      <div class="login-bg__glow"></div>
    </div>

    <!-- Card Container -->
    <div class="login-card">
      <div class="login-card__inner">
        <!-- Premium Border Effect -->
        <div class="login-card__border"></div>
        
        <!-- Logo & Brand -->
        <div class="login-header">
          <div class="login-logo">
            <div class="login-logo__glow"></div>
            <div class="login-logo__inner">
              <img 
                src="@/assets/img/perfumezafariweb.webp" 
                alt="Perfumes Zafari" 
                class="login-logo__icon"
              />
            </div>
            <div class="login-logo__ring"></div>
            <div class="login-logo__ring login-logo__ring--outer"></div>
          </div>
          
          <h1 class="login-title">
            <span class="login-title__brand">Perfumes</span>
            <span class="login-title__accent">Zafari</span>
          </h1>
          
          <p class="login-subtitle">
            <span class="login-subtitle__line"></span>
            Descubre el mundo de las fragancias alternativas
            <span class="login-subtitle__line"></span>
          </p>
        </div>
        
        <!-- Decorative Divider -->
        <div class="login-divider">
          <div class="login-divider__line"></div>
          <div class="login-divider__diamond"></div>
          <div class="login-divider__line"></div>
        </div>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="login-error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="login-error__icon">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
        
        <!-- Login Actions -->
        <div class="login-actions">
          <button 
            class="login-google" 
            @click="handleGoogleLogin"
            :disabled="isLoading"
          >
            <div class="login-google__bg"></div>
            <div class="login-google__content">
              <svg v-if="!isLoading" class="login-google__icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span v-if="isLoading" class="login-spinner"></span>
              <span class="login-google__text">{{ isLoading ? 'Conectando...' : 'Continuar con Google' }}</span>
            </div>
          </button>
          
          <div id="google-signin-button" style="display: none;"></div>
          
          <p class="login-terms">
            Al continuar, aceptas nuestros 
            <a href="#">Términos de Servicio</a> y 
            <a href="#">Política de Privacidad</a>
          </p>
        </div>
        
        <!-- Guest Section -->
        <div class="login-guest">
          <div class="login-guest__divider">
            <span>ó</span>
          </div>
          <router-link to="/" class="login-guest__btn">
            <span class="login-guest__btn-text">Explorar sin cuenta</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Bottom Signature -->
    <div class="login-signature">
      <span>Premium Fragrances</span>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  background: #050508;
}

/* ========== LUXURY BACKGROUND ========== */
.login-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.login-bg__gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(139, 69, 19, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 50% 50%, rgba(75, 0, 130, 0.08) 0%, transparent 70%);
}

.login-bg__gradient-secondary {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.02) 50%, transparent 100%);
  opacity: 0.8;
}

/* Floating Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}

.orb--1 {
  width: 400px;
  height: 400px;
  top: -150px;
  right: -100px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(184, 134, 11, 0.1) 50%, transparent 70%);
  animation: float-orb 20s ease-in-out infinite;
}

.orb--2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -80px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.1) 50%, transparent 70%);
  animation: float-orb 25s ease-in-out infinite reverse;
}

.orb--3 {
  width: 200px;
  height: 200px;
  top: 40%;
  left: 60%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 60%);
  animation: float-orb 15s ease-in-out infinite;
  animation-delay: -5s;
}

@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-20px, 30px) scale(0.95); }
  75% { transform: translate(-30px, -10px) scale(1.02); }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.particle--gold {
  background: radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.particle--purple {
  background: radial-gradient(circle, #9370DB 0%, #8B008B 50%, transparent 70%);
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
}

.particle--white {
  background: radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0.5) 50%, transparent 70%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

.particle--1 { width: 6px; height: 6px; top: 10%; left: 10%; animation: float-particle 18s linear infinite; }
.particle--2 { width: 4px; height: 4px; top: 20%; left: 25%; animation: float-particle 22s linear infinite; animation-delay: -2s; }
.particle--3 { width: 5px; height: 5px; top: 15%; right: 30%; animation: float-particle 20s linear infinite; animation-delay: -4s; }
.particle--4 { width: 3px; height: 3px; top: 30%; right: 15%; animation: float-particle 24s linear infinite; animation-delay: -6s; }
.particle--5 { width: 4px; height: 4px; bottom: 40%; left: 20%; animation: float-particle 19s linear infinite; animation-delay: -8s; }
.particle--6 { width: 6px; height: 6px; bottom: 25%; left: 35%; animation: float-particle 21s linear infinite; animation-delay: -10s; }
.particle--7 { width: 3px; height: 3px; bottom: 35%; right: 25%; animation: float-particle 23s linear infinite; animation-delay: -12s; }
.particle--8 { width: 5px; height: 5px; bottom: 20%; right: 10%; animation: float-particle 17s linear infinite; animation-delay: -14s; }
.particle--9 { width: 4px; height: 4px; top: 40%; left: 5%; animation: float-particle 25s linear infinite; animation-delay: -3s; }
.particle--10 { width: 5px; height: 5px; top: 60%; right: 8%; animation: float-particle 20s linear infinite; animation-delay: -7s; }
.particle--11 { width: 3px; height: 3px; bottom: 50%; left: 45%; animation: float-particle 22s linear infinite; animation-delay: -11s; }
.particle--12 { width: 4px; height: 4px; top: 70%; left: 15%; animation: float-particle 18s linear infinite; animation-delay: -15s; }
.particle--13 { width: 2px; height: 2px; top: 25%; left: 50%; animation: float-particle 26s linear infinite; animation-delay: -1s; }
.particle--14 { width: 2px; height: 2px; top: 55%; right: 40%; animation: float-particle 24s linear infinite; animation-delay: -5s; }
.particle--15 { width: 3px; height: 3px; bottom: 30%; left: 60%; animation: float-particle 21s linear infinite; animation-delay: -9s; }
.particle--16 { width: 2px; height: 2px; bottom: 45%; right: 50%; animation: float-particle 23s linear infinite; animation-delay: -13s; }

@keyframes float-particle {
  0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(100px) rotate(720deg); opacity: 0; }
}

/* Shimmer Lines */
.shimmer-lines {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shimmer-line {
  position: absolute;
  width: 1px;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.3), transparent);
  animation: shimmer-down 8s linear infinite;
}

.shimmer-line--1 { left: 20%; animation-delay: 0s; }
.shimmer-line--2 { left: 50%; animation-delay: -3s; }
.shimmer-line--3 { left: 80%; animation-delay: -6s; }

@keyframes shimmer-down {
  0% { top: -200px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.login-bg__glow {
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 60%);
  animation: glow-pulse 4s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
}

/* ========== CARD CONTAINER ========== */
.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

.login-card__inner {
  position: relative;
  padding: 3rem 2.5rem;
  background: linear-gradient(145deg, rgba(20, 20, 25, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
  backdrop-filter: blur(40px);
  border-radius: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 0 80px rgba(212, 175, 55, 0.05);
}

.login-card__border {
  position: absolute;
  inset: -1px;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, transparent 30%, transparent 70%, rgba(138, 43, 226, 0.3) 100%);
  z-index: -1;
  opacity: 0.5;
}

/* ========== HEADER ========== */
.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 0 auto 4rem;
  
  
}

.login-logo__glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: logo-glow 3s ease-in-out infinite;
}

@keyframes logo-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.login-logo__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(30, 30, 35, 1) 0%, rgba(15, 15, 20, 1) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 1.25rem;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

.login-logo__icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 1rem;
  filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.5));
}

.login-logo__ring {
  position: absolute;
  inset: -6px;
  border-radius: 1.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  animation: ring-rotate 10s linear infinite;
}

.login-logo__ring--outer {
  inset: -12px;
  border-radius: 1.75rem;
  border: 1px dashed rgba(212, 175, 55, 0.1);
  animation-direction: reverse;
  animation-duration: 15s;
}

@keyframes ring-rotate {
  to { transform: rotate(360deg); }
}

.login-title {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.login-title__brand {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.login-title__accent {
  display: block;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #DAA520 60%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.3);
}

.login-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  letter-spacing: 0.05em;
}

.login-subtitle__line {
  width: 30px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
}

/* ========== DIVIDER ========== */
.login-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0 2rem;
}

.login-divider__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
}

.login-divider__diamond {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #FFD700, #B8860B);
  transform: rotate(45deg);
  opacity: 0.6;
}

/* ========== ERROR ========== */
.login-error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(185, 28, 28, 0.05));
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 0.75rem;
  color: #FCA5A5;
  font-size: 0.875rem;
}

.login-error__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: #EF4444;
}

/* ========== ACTIONS ========== */
.login-actions {
  margin-bottom: 1.5rem;
}

.login-google {
  position: relative;
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 0.875rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-google__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #E8E8E8 100%);
  border-radius: 0.875rem;
  transition: all 0.3s ease;
}

.login-google__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.login-google:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-google:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(212, 175, 55, 0.2);
}

.login-google:hover:not(:disabled) .login-google__bg {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFAF0 50%, #FFF8E7 100%);
}

.login-google:active:not(:disabled) {
  transform: translateY(-1px);
}

.login-google__icon {
  width: 1.25rem;
  height: 1.25rem;
}

.login-google__text {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.01em;
}

.login-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e5e7eb;
  border-top-color: #D4AF37;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-terms {
  margin: 1.25rem 0 0;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
}

.login-terms a {
  color: rgba(212, 175, 55, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-terms a:hover {
  color: #D4AF37;
}

/* ========== GUEST ========== */
.login-guest {
  text-align: center;
}

.login-guest__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.login-guest__divider span {
  padding: 0 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.login-guest__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

.login-guest__btn svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.login-guest__btn:hover {
  background: rgba(212, 175, 55, 0.05);
  border-color: rgba(212, 175, 55, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.login-guest__btn:hover svg {
  transform: translateX(4px);
}

/* ========== SIGNATURE ========== */
.login-signature {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 480px) {
  .login-card__inner {
    padding: 2rem 1.5rem;
  }
  
  .login-title__accent {
    font-size: 2rem;
  }
  
  .login-logo {
    width: 4.5rem;
    height: 4.5rem;
  }
  
  .login-logo__icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .login-subtitle {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .login-subtitle__line {
    display: none;
  }
}
</style>
