<template>
  <header class=" sticky top-0 bg-deep-midnight/95 backdrop-blur-lg z-50" ref="headerRef">
    <div class="container mx-auto h-20 flex items-center justify-between gap-8">

      <!-- ── Logo ──────────────────────────────────── -->
      <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0 group" @click="closeAll">
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-luxury-gold to-[#B8860B] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 flex-shrink-0">
          <img src="../../assets/img/Logo elegante de Perfumes Zafari.png" alt="Logo" class="w-full h-full object-contain rounded-lg">
        </div>
        <span class="text-base sm:text-xl font-bold tracking-widest text-luxury-gold uppercase leading-none">
          Perfumes<span class="text-white/70"> Zafari</span>
        </span>
      </RouterLink>

      <!-- ── Desktop Mega Nav ──────────────────────── -->
      <nav class="hidden md:flex items-center gap-1 flex-1 justify-center">

        <!-- NAV ITEM: Explorar -->
        <div class="relative" @mouseenter="openMenu('explorar')" @mouseleave="scheduleClose">
          <button
            class="mega-trigger"
            :class="{ 'mega-trigger--active': activeMenu === 'explorar' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            Explorar
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-50 transition-transform duration-200" :class="{ 'rotate-180': activeMenu === 'explorar' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Mega panel: Explorar -->
          <Transition name="mega">
            <div v-if="activeMenu === 'explorar'" class="mega-panel" @mouseenter="cancelClose" @mouseleave="scheduleClose" style="width: 520px; left: -80px;">
              <!-- Gold top line -->
              <div class="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent mb-4"></div>

              <div class="grid grid-cols-2 gap-6 p-2">
                <!-- Catálogo -->
                <div>
                  <p class="mega-section-title">Catálogo</p>
                  <div class="space-y-1">
                    <RouterLink to="/" class="mega-item" @click="closeAll">
                      <span class="mega-item__icon bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Inicio</p>
                        <p class="mega-item__desc">Portada y destacados</p>
                      </div>
                    </RouterLink>
                    <RouterLink to="/collections" class="mega-item" @click="closeAll">
                      <span class="mega-item__icon bg-purple-500/10 border-purple-500/20 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Colecciones</p>
                        <p class="mega-item__desc">Todos los perfumes</p>
                      </div>
                    </RouterLink>
                  </div>
                </div>

                <!-- Precios & Novedades -->
                <div>
                  <p class="mega-section-title">Precios & Novedades</p>
                  <div class="space-y-1">
                    <RouterLink to="/offers" class="mega-item" @click="closeAll">
                      <span class="mega-item__icon bg-red-500/10 border-red-500/20 text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Ofertas <span class="ml-1 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">HOT</span></p>
                        <p class="mega-item__desc">Precios que bajaron</p>
                      </div>
                    </RouterLink>
                    <RouterLink to="/offers" class="mega-item" @click="() => { closeAll(); }" >
                      <span class="mega-item__icon bg-[#D4AF37]/10 border-[#D4AF37]/20 text-luxury-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Nuevos</p>
                        <p class="mega-item__desc">Recién agregados</p>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>

              <!-- Featured strip -->
              <div class="mt-4 mx-2 p-3 bg-gradient-to-r from-luxury-gold/8 to-transparent border border-luxury-gold/10 rounded-xl flex items-center gap-3">
                <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-luxury-gold/15 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-white/70 text-xs font-medium leading-tight">Datos scrapeados en tiempo real</p>
                  <p class="text-white/30 text-[11px]">Precios directos de tiendas ZOFRI</p>
                </div>
              </div>

            </div>
          </Transition>
        </div>

        <!-- NAV ITEM: Mi Espacio -->
        <div class="relative" @mouseenter="openMenu('espacio')" @mouseleave="scheduleClose">
          <button
            class="mega-trigger"
            :class="{ 'mega-trigger--active': activeMenu === 'espacio' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Mi Espacio
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-50 transition-transform duration-200" :class="{ 'rotate-180': activeMenu === 'espacio' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Mega panel: Mi Espacio -->
          <Transition name="mega">
            <div v-if="activeMenu === 'espacio'" class="mega-panel" @mouseenter="cancelClose" @mouseleave="scheduleClose" style="width: 480px; left: -100px;">
              <div class="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent mb-4"></div>

              <div class="grid grid-cols-2 gap-6 p-2">
                <!-- Personal -->
                <div>
                  <p class="mega-section-title">Personal</p>
                  <div class="space-y-1">
                    <RouterLink
                      v-if="authStore.isAuthenticated"
                      to="/favorites"
                      class="mega-item"
                      @click="closeAll"
                    >
                      <span class="mega-item__icon bg-red-500/10 border-red-500/20 text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Mis Favoritos</p>
                        <p class="mega-item__desc">Tu lista de perfumes</p>
                      </div>
                    </RouterLink>
                    <div v-else class="mega-item opacity-50 cursor-default">
                      <span class="mega-item__icon bg-white/5 border-white/10 text-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label text-white/30">Mis Favoritos</p>
                        <p class="mega-item__desc">Inicia sesión primero</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contribuir -->
                <div>
                  <p class="mega-section-title">Contribuir</p>
                  <div class="space-y-1">
                    <RouterLink to="/propose" class="mega-item" @click="closeAll">
                      <span class="mega-item__icon bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                      </span>
                      <div>
                        <p class="mega-item__label">Proponer Perfume</p>
                        <p class="mega-item__desc">Añade al catálogo</p>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>

              <!-- Auth CTA si no está autenticado -->
              <div v-if="!authStore.isAuthenticated" class="mt-4 mx-2 p-3 bg-[#D4AF37]/6 border border-[#D4AF37]/15 rounded-xl flex items-center justify-between gap-3">
                <p class="text-white/50 text-xs">Inicia sesión para acceder a todas las funciones</p>
                <RouterLink to="/login" class="flex-shrink-0 px-3 py-1.5 bg-luxury-gold text-black text-xs font-bold rounded-lg hover:bg-[#F5D061] transition-colors" @click="closeAll">
                  Ingresar
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- NAV ITEM: Administración (solo admin/mod) -->
        <div v-if="authStore.canAccessAdmin" class="relative" @mouseenter="openMenu('admin')" @mouseleave="scheduleClose">
          <button
            class="mega-trigger mega-trigger--admin"
            :class="{ 'mega-trigger--active mega-trigger--admin-active': activeMenu === 'admin' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Admin
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-50 transition-transform duration-200" :class="{ 'rotate-180': activeMenu === 'admin' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Mega panel: Admin -->
          <Transition name="mega">
            <div v-if="activeMenu === 'admin'" class="mega-panel" @mouseenter="cancelClose" @mouseleave="scheduleClose" style="width: 360px; left: -80px;">
              <div class="h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent mb-4"></div>

              <!-- Admin badge -->
              <div class="flex items-center gap-2 px-2 mb-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-[11px] text-luxury-gold font-semibold uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  Panel Privilegiado
                </span>
              </div>

              <div class="space-y-1 p-2">
                <RouterLink to="/admin/moderators" class="mega-item" @click="closeAll">
                  <span class="mega-item__icon bg-[#D4AF37]/10 border-[#D4AF37]/20 text-luxury-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <div>
                    <p class="mega-item__label">Moderadores</p>
                    <p class="mega-item__desc">Gestionar solicitudes</p>
                  </div>
                </RouterLink>
                <RouterLink to="/admin/proposals" class="mega-item" @click="closeAll">
                  <span class="mega-item__icon bg-[#D4AF37]/10 border-[#D4AF37]/20 text-luxury-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                  </span>
                  <div>
                    <p class="mega-item__label">Propuestas</p>
                    <p class="mega-item__desc">Revisar y aprobar</p>
                  </div>
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>

      </nav>

      <!-- ── Actions: User Avatar / Login ─────────── -->
      <div class="flex items-center gap-4 flex-shrink-0">

        <!-- Authenticated: Avatar dropdown -->
        <template v-if="authStore.isAuthenticated">
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleUserDropdown"
              class="user-menu-btn flex items-center gap-3 focus:outline-none group"
              :aria-expanded="userDropdownOpen"
            >
              <div class="avatar-wrapper">
                <div class="avatar-glow"></div>
                <div class="avatar-ring">
                  <div class="avatar-inner">
                    <img :src="authStore.userPhoto || defaultAvatar" :alt="authStore.userDisplayName" class="avatar-img"/>
                  </div>
                </div>
                <span class="avatar-status"></span>
              </div>
              <div class="hidden md:flex items-center gap-2">
                <div class="user-info">
                  <span class="user-greeting">Bienvenido</span>
                  <span class="user-name">{{ authStore.userDisplayName }}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" :class="{ 'rotate-180': userDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>

            <!-- User dropdown -->
            <Transition name="dropdown">
              <div v-if="userDropdownOpen" class="dropdown-menu">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">
                    <img :src="authStore.userPhoto || defaultAvatar" :alt="authStore.userDisplayName"/>
                  </div>
                  <div class="dropdown-user-info">
                    <p class="dropdown-name">{{ authStore.userDisplayName }}</p>
                    <p class="dropdown-status">
                      <span class="status-dot"></span>
                      Conectado
                    </p>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <RouterLink to="/favorites" class="dropdown-item dropdown-item--link" @click="userDropdownOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  <span>Mis Favoritos</span>
                </RouterLink>
                <RouterLink to="/propose" class="dropdown-item dropdown-item--link" @click="userDropdownOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                  <span>Proponer Perfume</span>
                </RouterLink>
                <div class="dropdown-divider"></div>
                <button @click="handleLogout" class="dropdown-item dropdown-item--logout">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </Transition>
          </div>
        </template>

        <!-- Not authenticated: Login button (hidden on mobile, use hamburger menu instead) -->
        <template v-else>
          <div class="hidden sm:block">
            <RouterLink to="/login" class="login-btn" @click="closeAll">
              <span class="login-btn__glow"></span>
              <span class="login-btn__content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                <span>Ingresar</span>
              </span>
            </RouterLink>
          </div>
        </template>

        <!-- Mobile hamburger -->
        <button class="md:hidden text-white p-1" @click="mobileOpen = !mobileOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ── Mobile Menu ───────────────────────────── -->
    <Transition name="mobile">
      <div v-if="mobileOpen" class="md:hidden border-t border-white/8 bg-deep-midnight/98 backdrop-blur-md">
        <div class="container mx-auto py-4 space-y-1">

          <p class="mobile-section-label">Catálogo</p>
          <RouterLink to="/" class="mobile-link" @click="mobileOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Inicio
          </RouterLink>
          <RouterLink to="/collections" class="mobile-link" @click="mobileOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Colecciones
          </RouterLink>
          <RouterLink to="/offers" class="mobile-link" @click="mobileOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            Ofertas & Novedades
          </RouterLink>

          <p class="mobile-section-label mt-4">Mi Espacio</p>
          <RouterLink to="/propose" class="mobile-link" @click="mobileOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Proponer Perfume
          </RouterLink>
          <RouterLink v-if="authStore.isAuthenticated" to="/favorites" class="mobile-link" @click="mobileOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            Mis Favoritos
          </RouterLink>

          <template v-if="authStore.canAccessAdmin">
            <p class="mobile-section-label mt-4">Administración</p>
            <RouterLink to="/admin/moderators" class="mobile-link mobile-link--gold" @click="mobileOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Moderadores
            </RouterLink>
            <RouterLink to="/admin/proposals" class="mobile-link mobile-link--gold" @click="mobileOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              Propuestas
            </RouterLink>
          </template>

          <!-- Mobile auth -->
          <div class="pt-4 border-t border-white/8 mt-4">
            <button v-if="authStore.isAuthenticated" @click="handleLogout" class="mobile-link text-red-400/80">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Cerrar sesión
            </button>
            <RouterLink v-else to="/login" class="mobile-link text-luxury-gold" @click="mobileOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
              Ingresar
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router    = useRouter()
const authStore = useAuthStore()

const headerRef     = ref(null)
const dropdownRef   = ref(null)
const activeMenu    = ref(null)   // 'explorar' | 'espacio' | 'admin' | null
const userDropdownOpen = ref(false)
const mobileOpen    = ref(false)

const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'

// ─── Mega menu hover logic ──────────────────────
let closeTimer = null

function openMenu(name) {
    cancelClose()
    userDropdownOpen.value = false
    activeMenu.value = name
}

function scheduleClose() {
    closeTimer = setTimeout(() => {
        activeMenu.value = null
    }, 120)
}

function cancelClose() {
    if (closeTimer) clearTimeout(closeTimer)
}

function closeAll() {
    activeMenu.value = null
    userDropdownOpen.value = false
    mobileOpen.value = false
}

// ─── User dropdown ──────────────────────────────
function toggleUserDropdown() {
    activeMenu.value = null
    userDropdownOpen.value = !userDropdownOpen.value
}

// ─── Logout ─────────────────────────────────────
async function handleLogout() {
    closeAll()
    await authStore.logout()
    router.push('/')
}

// ─── Click outside ──────────────────────────────
function handleClickOutside(event) {
    if (headerRef.value && !headerRef.value.contains(event.target)) {
        closeAll()
    }
}

onMounted(() => {
    authStore.initialize()
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (closeTimer) clearTimeout(closeTimer)
})
</script>

<style scoped>
/* ══════════════════════════════════════════════
   MEGA TRIGGER BUTTON
══════════════════════════════════════════════ */
.mega-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: rgba(255,255,255,0.6);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.mega-trigger:hover,
.mega-trigger--active {
  color: white;
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.08);
}

.mega-trigger--admin {
  color: rgba(212,175,55,0.7);
}

.mega-trigger--admin:hover,
.mega-trigger--admin-active {
  color: #D4AF37;
  background: rgba(212,175,55,0.08);
  border-color: rgba(212,175,55,0.15);
}

/* ══════════════════════════════════════════════
   MEGA PANEL
══════════════════════════════════════════════ */
.mega-panel {
  position: absolute;
  top: calc(100% + 14px);
  padding: 16px;
  background: linear-gradient(160deg, rgba(12,12,18,0.99) 0%, rgba(8,8,14,1) 100%);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  box-shadow:
    0 30px 60px -10px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 0 50px rgba(212,175,55,0.04);
  z-index: 200;
}

/* Mega transition */
.mega-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.mega-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.mega-enter-from  { opacity: 0; transform: translateY(-6px) scale(0.98); }
.mega-leave-to    { opacity: 0; transform: translateY(-4px) scale(0.98); }

/* ══════════════════════════════════════════════
   MEGA SECTION TITLE
══════════════════════════════════════════════ */
.mega-section-title {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(212,175,55,0.6);
  padding: 0 4px 8px;
  margin-bottom: 2px;
}

/* ══════════════════════════════════════════════
   MEGA ITEM
══════════════════════════════════════════════ */
.mega-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.18s ease;
}

.mega-item:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.07);
}

.mega-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.mega-item:hover .mega-item__icon {
  transform: scale(1.08);
}

.mega-item__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  line-height: 1.2;
  display: flex;
  align-items: center;
}

.mega-item__desc {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  margin-top: 2px;
  line-height: 1.3;
}

/* ══════════════════════════════════════════════
   AVATAR
══════════════════════════════════════════════ */
.avatar-wrapper {
  position: relative;
  width: 42px;
  height: 42px;
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  background: radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-menu-btn:hover .avatar-glow { opacity: 1; }

.avatar-ring {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2px;
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(212,175,55,0.3);
  transition: all 0.3s ease;
}

.user-menu-btn:hover .avatar-ring {
  box-shadow: 0 6px 25px rgba(212,175,55,0.5);
  transform: scale(1.05);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #0a0a0f;
  padding: 2px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 9px;
  height: 9px;
  background: #22c55e;
  border: 2px solid #0a0a0f;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34,197,94,0.6);
}

/* ══════════════════════════════════════════════
   USER INFO
══════════════════════════════════════════════ */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.user-greeting {
  font-size: 0.6rem;
  color: rgba(212,175,55,0.8);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  width: 14px;
  height: 14px;
  color: rgba(212,175,55,0.7);
  transition: all 0.25s ease;
}

.user-menu-btn:hover .chevron-icon { color: #D4AF37; }

/* ══════════════════════════════════════════════
   USER DROPDOWN
══════════════════════════════════════════════ */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  width: 260px;
  background: linear-gradient(160deg, rgba(12,12,18,0.99), rgba(8,8,14,1));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(212,175,55,0.13);
  border-radius: 16px;
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.65), 0 0 40px rgba(212,175,55,0.04);
  overflow: hidden;
  z-index: 200;
}

.dropdown-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.dropdown-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.dropdown-enter-from  { opacity: 0; transform: translateY(-6px) scale(0.97); }
.dropdown-leave-to    { opacity: 0; transform: translateY(-4px) scale(0.97); }

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%);
}

.dropdown-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  flex-shrink: 0;
}

.dropdown-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0a0a0f;
}

.dropdown-user-info { flex: 1; min-width: 0; }

.dropdown-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin: 0 0 3px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(34,197,94,0.6);
}

.dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.18), transparent);
  margin: 0 14px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 12px 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;
  text-decoration: none;
}

.dropdown-item svg {
  width: 17px;
  height: 17px;
  opacity: 0.6;
  flex-shrink: 0;
}

.dropdown-item span {
  font-size: 0.85rem;
  font-weight: 500;
}

.dropdown-item--link {
  color: rgba(255,255,255,0.65);
}

.dropdown-item--link:hover {
  color: white;
  background: rgba(255,255,255,0.05);
}

.dropdown-item--link:hover svg { opacity: 1; }

.dropdown-item--logout { color: rgba(255,255,255,0.6); }
.dropdown-item--logout:hover { background: rgba(239,68,68,0.1); color: #f87171; }
.dropdown-item--logout:hover svg { opacity: 1; }

/* ══════════════════════════════════════════════
   LOGIN BUTTON
══════════════════════════════════════════════ */
.login-btn {
  position: relative;
  display: inline-flex;
  padding: 9px 22px;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-btn__glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
  transition: opacity 0.3s ease;
}

.login-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(212,175,55,0.4); }

.login-btn__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 7px;
  color: #0a0a0f;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
}

.login-btn__content svg { width: 16px; height: 16px; }

/* ══════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════ */
.mobile-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.mobile-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.mobile-enter-from  { opacity: 0; transform: translateY(-8px); }
.mobile-leave-to    { opacity: 0; transform: translateY(-8px); }

.mobile-section-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(212,175,55,0.5);
  padding: 4px 12px 8px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.18s ease;
}

.mobile-link:hover { background: rgba(255,255,255,0.05); color: white; }
.mobile-link--gold { color: rgba(212,175,55,0.8); }
.mobile-link--gold:hover { color: #D4AF37; background: rgba(212,175,55,0.06); }
</style>
