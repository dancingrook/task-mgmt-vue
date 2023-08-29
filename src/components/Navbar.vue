<script setup lang="ts">
import { CogIcon, BellIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";
import { debounce } from "lodash";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
import useAuth from "../hooks/useAuth";

const { logout } = useAuth();

const onLogout = async () => {
	try {
		await logout();
		location.reload();
	} catch (e) {}
};

const search = ref(route.query.search ?? null);
const showMenu = ref(false);

const onSearch = debounce((e) => {
	if (e.target.value.length > 2 || e.target.value.length === 0)
		router.replace({
			query: {
				...route.query,
				search: e.target.value,
			},
		});
}, 1000);
</script>

<template>
	<div class="navbar">
		<input
			v-model="search"
			class="searchbox bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
			type="text"
			placeholder="Search..."
			@input="onSearch"
		/>
		<div class="profile-menus">
			<CogIcon class="icon h-6 w-6" />
			<BellIcon class="icon h-6 w-6" />

			<a @click="showMenu = !showMenu"  tabindex="0">
				<img class="w-auto h-6 cursor-pointer" src="https://www.specifi.co.uk/wp-content/uploads/2019/10/Specifi2020.png" alt="" />
			</a>

			<div v-if="showMenu"  class="menu">
				<div class="menu-item" @click.stop="onLogout">
					<ArrowLeftOnRectangleIcon class="h-3 w-3" />
					<span style="margin-left: 5px; font-size: 14px">Logout</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.navbar {
	display: flex;
	justify-content: space-between;
	padding: 15px;
	align-items: center;
	border-bottom: 1px solid #e5e7eb;
}
.searchbox {
	width: 20%;
}

.profile-menus {
	display: flex;
	justify-content: flex-end;
}
</style>
