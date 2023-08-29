<script setup lang="ts">
import { useQuery, useMutation } from "vue-query";
import { FETCH_CATEGORIES } from "../../api/category";
import { Bars2Icon } from "@heroicons/vue/24/outline";
import { watch, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../../stores/categories";

const router = useRouter();
const route = useRoute();

const { saveCategory } = useCategoryStore();

const { data: categories, isLoading } = useQuery({
	queryKey: ["categories"],
	queryFn: () => FETCH_CATEGORIES().then((data) => data),
	keepPreviousData: true,
	refetchOnWindowFocus: false,
});

watch(categories, (val) => {
	if (val) {
		if (`c` in route.query) {
			val.forEach((v) => {
				// @ts-ignore
				if (v.id === parseInt(route.query.c)) saveCategory(v);
			});
			return;
		}
		selectWorkspace(val[0]);
	}
});

const selectWorkspace = (category: any) => {
	saveCategory(category);
	router.replace({ query: { c: category.id } });
};
</script>

<template>
	<div class="items">
		<div
			v-for="category in categories"
			:key="category.id"
			class="item text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg"
			@click="selectWorkspace(category)"
			:class="[route.query.c == category.id ? 'bg-indigo-500 text-white' : '']"
		>
			<span class="item-name">{{ category.name }}</span>
		</div>
	</div>
</template>

<style scoped>
.items {
	padding-right: 15px;
}

.item {
	display: flex;
	padding: 10px;
	border-radius: 10px;
	font-size: 13px;
	font-weight: 700;
	align-items: center;
	cursor: pointer;
	margin-top: 5px;
}

.item-name {
	margin-left: 10px;
}
</style>
