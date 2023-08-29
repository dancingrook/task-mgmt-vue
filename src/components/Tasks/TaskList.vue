<script setup lang="ts">
// @ts-nocheck
import Draggable from "./Draggable.vue";
import { ref, watch, inject } from "vue";
import { useRoute } from "vue-router";
import useTasks from "../../hooks/useTasks";
const emitter = inject("emitter");

const { status } = defineProps({
	status: String,
});

const route = useRoute();

const categoryId = ref(route.query.c);
const search = ref(null);
const { list, page, totalPage, updateTask, isLoading, deleteTask } = useTasks(categoryId, search, status);

watch(
	() => route.query,
	() => {
		page.value = 1;
		list.value = [];
		totalPage.value = null;
		categoryId.value = route.query.c;
		search.value = route.query.search ?? "";
	}
);

emitter.on(`task-edited-${status}`, (updatedTask: any) => {
	list.value.map((task) => {
		if (task.id === updatedTask.id) {
			task.title = updatedTask.title;
			task.description = updatedTask.description;
			task.priority = updatedTask.priority;
			return task;
		}
		return task;
	});
});

emitter.on(`task-created-${status}`, (newTask: any) => {
	list.value = [newTask, ...list.value];
});

//called from TaskCard.vue
emitter.on(`task-deleted-${status}`, (taskId) => {
	list.value = list.value.filter((task) => task.id !== taskId);
});

const handleScroll = (el: any) => {
	if (el.srcElement.offsetHeight + el.srcElement.scrollTop >= el.srcElement.scrollHeight - 10) {
		if (page.value < totalPage.value) page.value = page.value + 1;
	}
};

const dragged = (taskData) => {
	updateTask({
		taskId: taskData.taskId,
		updates: taskData.updates,
	});
	emitter.emit("update-progress", {
		prevStatus: taskData.currentStatus,
		updatedStatus: status,
	});
};
</script>

<template>
	<div class="column" @scroll="handleScroll">
		<div v-if="isLoading">Loading...</div>
		<Draggable :key="status" :status="status" :list="list" :dragged="dragged" />
	</div>
</template>

<style scoped>
.column {
	max-height: 70vh;
	overflow-y: hidden;
	width: 100%;
	scrollbar-gutter: stable;
}

.column:hover {
	overflow-y: auto;
}

::-webkit-scrollbar {
	width: 5px;
	border-radius: 20px;
}

::-webkit-scrollbar-track {
	box-shadow: inset 1 1 5px grey;
}

.column::-webkit-scrollbar-thumb {
	height: 0px;
	background: #e5e5e5;
	border-radius: 10px;
}
</style>
