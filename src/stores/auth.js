import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/helpers/api'
import router from '@/router'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
	const userStorage = useStorage('user')
	const user = ref(null)
	const getToken = computed(() =>
		userStorage.value ? JSON.parse(userStorage.value) : null
	)
	const auth = async (formData) => {
		try {
			const res = await api.post(`auth/login`, {
				...formData,
			})
			user.value = res
			userStorage.value = JSON.stringify(res)
			router.push('/')
		} catch (error) {
			console.error(error)
		}
	}
	return { user, getToken, auth }
})
