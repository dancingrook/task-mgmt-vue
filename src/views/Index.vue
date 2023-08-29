<script setup lang="ts">
// @ts-nocheck
import draggable from "vuedraggable";

import { RouterView } from "vue-router";
import { VueDraggableNext } from "vue-draggable-next";
import { defineAsyncComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

import { ChevronDownIcon, PlusIcon, EllipsisHorizontalIcon, PlusCircleIcon, ListBulletIcon, PaperClipIcon, ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";

const Categories = defineAsyncComponent(() => import("../components/Category/Categories.vue"));
const TaskKanban = defineAsyncComponent(() => import("../components/Tasks/TaskKanban.vue"));
const CategoryProgress = defineAsyncComponent(() => import("../components/Category/CategoryProgress.vue"));
const Navbar = defineAsyncComponent(() => import("../components/Navbar.vue"));

const activeTab = ref("tasks");

const statuses = [
	{ title: "Backlog", value: "backlog", color: "#fbbf24" },
	{ title: "Doing", value: "doing", color: "#1b429b" },
	{ title: "Testing", value: "testing", color: "#eb9b13" },
	{ title: "Done", value: "done", color: "#0ea513" },
];

const tabs = [
	{ title: "Overview", value: "overview" },
	{ title: "Tasks", value: "tasks" },
	{ title: "Notes", value: "notes" },
];

const selectTab = (tab: string) => {
	activeTab.value = tab;
};
</script>

<template>
	<div class="home flex">
		<aside class="flex">
			<div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:border-gray-200">
				<a>
					<img class="w-auto h-6" src="https://www.specifi.co.uk/wp-content/uploads/2019/10/Specifi2020.png" alt="" />
				</a>

				<a class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-indigo-500 hover:text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
				</a>
			</div>

			<div class="py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:border-gray-200">
				<h2 class="px-5 text-lg font-medium text-gray-800 mb-5">Workspaces</h2>
				<Categories />
			</div>
		</aside>

		<div class="container dark:border-gray-200">
			<Navbar />

			<CategoryProgress />

			<div class="task-tabs">
				<ul class="tabs">
					<li v-for="tab in tabs" :key="tab.value" class="tab" :class="[activeTab === tab.value ? 'tab-selected' : '']" @click="activeTab = tab.value">{{ tab.title }}</li>
				</ul>
			</div>

			<div class="tasks">
				<TaskKanban />
			</div>
		</div>
	</div>
</template>

<style scoped>
.avatar {
	height: 30px;
	width: 30px;
}

.container {
	display: flex;
	flex-direction: column;
}

.task-tabs {
	padding: 15px;
	display: flex;
	justify-content: space-between;
}
.tabs {
	display: flex;
}
.tab {
	margin-right: 25px;
	color: #9ca3af;
	font-weight: 500;
	cursor: pointer;
}
.tab-selected {
	color: #6366f1;
	border-bottom: 2px solid #6366f1;
}
.tasks {
	padding: 15px;
	display: flex;
	justify-content: space-between;
	height: 100%;
	background-color: #f1f5f9;
}
</style>
