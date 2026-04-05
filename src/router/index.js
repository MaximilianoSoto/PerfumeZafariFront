import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/collections',
      name: 'collections',
      component: () => import('../views/CollectionsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/offers',
      name: 'offers',
      component: () => import('../views/OffersView.vue')
    },
    {
      path: '/propose',
      name: 'propose-perfume',
      component: () => import('../views/ProposePerfumeView.vue')
    },
    {
      path: '/admin/moderators',
      name: 'admin-moderators',
      component: () => import('../views/ModeratorAdminView.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/proposals',
      name: 'admin-proposals',
      component: () => import('../views/ProposalsAdminView.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/WishlistView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
