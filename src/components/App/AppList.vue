<template>
	<div class="app-list">
		<form @submit.prevent="queryParams.search = searchData">
			<AppInput
				type="text"
				v-model="searchData"
				id="form-search"
				placeholder="Введите текст"
			/>
			<AppButton type="sumbit">Найти</AppButton>
		</form>

		<table class="app-list__table">
			<thead class="app-list__thead">
				<tr class="app-list__tr">
					<th
						class="app-list__th"
						v-for="(field, index) in fields"
						:key="index"
					>
						{{ field.title }}
					</th>
				</tr>
			</thead>
			<tbody class="app-list__tbody">
				<tr class="app-list__tr" v-for="item in data" :key="item?.id">
					<td
						class="app-list__td"
						v-for="(field, indexChild) in fields"
						:key="indexChild"
						@click="startEditing(item, item?.[field?.key], field?.key)"
					>
						<input
							ref="fieldInput"
							class="app-list__input"
							v-if="isEditingField === item?.[field?.key]"
							v-model="editingItem[field?.key]"
							@keyup.enter="finishEditing"
							@blur="changeEditing"
						/>
						<span v-else>{{ item?.[field?.key] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
		<AppButton v-if="hasNext" type="button" @click="fetchMoreData"
			>Показать еще</AppButton
		>
	</div>
</template>

<script setup>
import AppButton from '@/components/App/AppButton.vue'
import AppInput from '@/components/App/AppInput.vue'
import { api } from '@/helpers/api'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
const props = defineProps({
	url: {
		type: String,
		required: true,
	},
	fields: {
		type: Array,
		required: true,
	},
})
const fieldInput = ref()
const isEditingField = ref(null)
const isEditingFieldKey = ref(null)
const editingItem = ref(null)
const data = ref(null)
const dataTotal = ref(null)
const searchData = ref('')
const queryParams = ref({
	search: '',
	limit: 5,
	skip: 0,
})
const hasNext = computed(() => data.value?.length < dataTotal.value)

const createUrlWithParams = (url, params) =>
	`${url}?${new URLSearchParams(params).toString()}`
const fetchApi = async (url) => {
	try {
		const res = await api.get(url)
		queryParams.value.skip += 5
		return res
	} catch (error) {
		console.error(error)
	}
}

const fetchData = async () => {
	const url = createUrlWithParams(props.url, queryParams.value)
	const res = await fetchApi(url)
	data.value = res?.[props.url]
	dataTotal.value = res?.total
}

const fetchMoreData = async () => {
	if (!hasNext.value) return
	const url = createUrlWithParams(props.url, queryParams.value)
	const res = await fetchApi(url)
	data.value.push(...res?.[props.url])
}

const fetchSearchData = async () => {
	const { search, ...rest } = queryParams.value
	const url = createUrlWithParams(`${props.url}/search`, { q: search, ...rest })
	const res = await fetchApi(url)
	data.value = res?.[props.url]
	dataTotal.value = res?.total
}
const startEditing = (item, value, key) => {
	if (key === 'id') return
	isEditingFieldKey.value = key
	isEditingField.value = value
	editingItem.value = { ...item }
	nextTick(() => {
		fieldInput.value?.[0]?.focus()
	})
}
const changeEditing = () => {
	isEditingFieldKey.value = null
	isEditingField.value = null
	editingItem.value = null
}
const finishEditing = async () => {
	try {
		let formData = {}
		formData[isEditingFieldKey.value] =
			editingItem.value[isEditingFieldKey.value]
		const res = await api.put(props.url + '/' + editingItem.value?.id, formData)
		const itemIndex = data.value?.findIndex((item) => item.id === res?.id)

		if (itemIndex !== -1) {
			data.value[itemIndex] = res
		}
	} catch (error) {
		console.error(error)
	} finally {
		isEditingFieldKey.value = null
		isEditingField.value = null
		editingItem.value = null
	}
}
onMounted(async () => {
	await fetchData()
})
watch(
	() => queryParams.value.search,
	async () => {
		queryParams.value.skip = 0
		queryParams.value.limit = 5
		await fetchSearchData()
	}
)
watch(
	() => props.url,
	async () => {
		queryParams.value = {
			search: '',
			limit: 5,
			skip: 0,
		}
		await fetchData()
	}
)
</script>

<style lang="scss" scoped>
.app-list {
	&__table {
		padding-bottom: 20px;
	}
	&__thead {
	}
	&__tr {
	}
	&__th {
		padding: 10px;
	}
	&__tbody {
	}
	&__td {
		text-align: left;
		padding: 10px;
	}
	&__input {
		width: 100%;
	}
}
</style>
