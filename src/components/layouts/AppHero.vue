<template>
      

  <section class="relative container rounded-xl my-5 mx-auto px-4 min-h-[700px]  w-full flex items-center overflow-hidden ">

    
  
    <!-- Background Elements -->
       <img src="../../assets/img/bg-1.webp" alt="Background Image" class="container mx-auto absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0">
          <div class="absolute inset-0 bg-[url('../../assets/img/bg-ps3.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <!-- Radial Gold light effect -->
          <div class="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-luxury-gold/10 rounded-full blur-[100px]"></div>
          <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-deep-midnight via-deep-midnight/80 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <!-- Text Content -->
          <div class="space-y-8 animate-fade-in-up py-12 md:py-0">
              <div class="flex items-center gap-3">
                  <span class="h-[1px] w-12 bg-luxury-gold"></span>
                  <span class="text-luxury-gold tracking-[0.2em] uppercase text-sm font-semibold">Exclusivo</span>
              </div>
              
              <h1 class="text-5xl md:text-7xl font-bold leading-none tracking-tight">
                  <span class="block text-white">Sauvage</span>
                  <span class="block text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-white">Elixir</span>
              </h1>
              
              <p class="text-gray-300 text-lg md:text-xl font-light max-w-lg leading-relaxed">
                  Una concentración extraordinariamente intensa que fusiona la frescura emblemática de Sauvage con un corazón de especias embriagadoras y una esencia de lavanda hecha a medida.
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <button class="bg-luxury-gold text-deep-midnight px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      Comprar Ahora
                  </button>
                  <button class="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                      Ver Detalles
                  </button>
              </div>
          </div>

          <!-- Hero Image -->
          <div class="relative hidden md:flex justify-center items-center h-[600px]">
               <!-- Decorative Circle behind bottle -->
              <div class="absolute w-[550px] h-[550px] border border-luxury-gold/30 rounded-full animate-spin-slow shadow"></div>
              <div class="absolute w-[450px] h-[450px] border border-white/20 rounded-full animate-reverse-spin"></div>
              
              <!-- Image using a placeholder that looks like a premium bottle since we rely on external links -->
              <img 
                src="../../assets/img/dior_suavage_elixir.png" 
                alt="Sauvage Elixir Bottle" 
                class="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-700 animate-float max-h-[650px] w-auto mask-gradient"
              />
          </div>
      </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-spin-slow {
    animation: spin 30s linear infinite;
}

.animate-reverse-spin {
    animation: spin 40s linear infinite reverse;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.mask-gradient {
    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>
