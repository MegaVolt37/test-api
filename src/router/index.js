import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/index.vue'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true },
		},
		{
			path: '/login',
			name: 'login',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/login.vue'),
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !useAuthStore().getToken?.token) {
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router
