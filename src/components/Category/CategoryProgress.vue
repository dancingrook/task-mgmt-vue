<script setup lang="ts">
// @ts-nocheck
import { useCategoryStore } from "../../stores/categories";
import { FETCH_USERS } from "../../api/user";
import { inject, ref, computed, watch } from "vue";

const categoryStore = useCategoryStore();
const emitter = inject("emitter");

const totalTasks = ref(0);
const completedTasks = ref(0);

watch(
	() => categoryStore.category,
	() => {
		totalTasks.value = categoryStore.category.tasks_count;
		completedTasks.value = categoryStore.category.completed_tasks_count;
	},
	{
		deep: true,
	}
);

// a computed ref
const percentage = computed(() => {
	try {
		if (totalTasks.value === 0) return 0;
		return Math.floor((completedTasks.value / totalTasks.value) * 100);
	} catch (e) {
		return 0;
	}
});

//called from Tasks List
emitter.on("update-progress", ({ prevStatus, updatedStatus }) => {
	if (updatedStatus === "done") completedTasks.value++;
	if (prevStatus == "done") completedTasks.value--;
});
</script>

<template>
	<div class="task-container">
		<div class="category-container">
			<div class="category-info">
				<img class="category-image" :src="`https://ui-avatars.com/api/?name=${categoryStore.category.name}`" alt="avatar" />
				<div class="category-details">
					<span class="category-title"> {{ categoryStore.category.name }}</span>
					<div class="bg-gray-200 rounded-full h-2.5 progress-bar">
						<div class="bg-indigo-500 h-2.5 rounded-full" style="width: 60%" :style="{ width: `${percentage}%` }"></div>
					</div>

					<span class="completion-percentage">{{ percentage ?? 0 }} % complete</span>
				</div>
			</div>
		</div>
		<div class="team-members">
			<div class="flex -space-x-3">
				<img
					v-for="user in categoryStore.category.invited_users"
					:key="user.id"
					class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-500"
					:src="`https://ui-avatars.com/api/?name=${user.name}`"
					alt=""
				/>
			</div>
			<button class="button ml-4" @click="emitter.emit('invite-members', categoryStore.category.id)">+ Invite Member</button>
		</div>
	</div>
</template>

<style scoped>
.category-container {
	width: 30%;
}
.category-info {
	display: flex;
}
.category-details {
	margin-left: 5px;
	width: 100%;
}
.category-title {
	color: #4b5563;
}
.progress-bar {
	margin-top: 8px;
	margin-bottom: 4px;
}
.category-image {
	height: 50px;
	width: 50px;
	border-radius: 50%;
}
.completion-percentage {
	color: #9ca3af;
	font-size: 12px;
}

.team-members {
	display: flex;
	align-items: center;
}
.task-container {
	padding: 15px;
	display: flex;
	justify-content: space-between;
}
.button {
	padding: 8px;
	border-radius: 5px;
	background-color: #6366f1;
	color: white;
}
</style>
