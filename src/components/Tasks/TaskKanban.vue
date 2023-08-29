<script setup lang="ts">
// @ts-nocheck
import { defineAsyncComponent, ref, inject } from "vue";
import { EllipsisHorizontalIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

const TaskList = defineAsyncComponent(() => import("./TaskList.vue"));
const emitter = inject("emitter");
const route = useRoute();

const statuses = [
	{ title: "Backlog", value: "backlog", color: "#fbbf24" },
	{ title: "Doing", value: "doing", color: "#1b429b" },
	{ title: "Testing", value: "testing", color: "#eb9b13" },
	{ title: "Done", value: "done", color: "#0ea513" },
];

</script>

<template>
	<div class="task-column" v-for="status in statuses" :key="status.value">
		<div class="task-status">
			<div class="task-title">
				<span class="dot" :style="{ backgroundColor: status.color }"></span>
				<h2>{{ status.title }}</h2>
				<a
					title="Add New Task"
					class="show-modal"
					@click="
						emitter.emit('create-task', {
							status: status.value,
							categoryId: route.query.c,
						})
					"
				>
					<PlusCircleIcon class="ml-2 cursor-pointer h-5 w-5" />
				</a>
			</div>
			<EllipsisHorizontalIcon class="h-5 w-5" />
		</div>

		<TaskList :status="status.value" :key="status" />
	</div>
</template>

<style scoped>
.task-column {
	display: flex;
	flex-direction: column;
	width: 23%;
}
.task-status {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 500;
	color: #64748b;
	padding-bottom: 20px;
}
.task-title {
	display: flex;
	align-items: center;
}
.dot {
	height: 7px;
	width: 7px;
	border-radius: 50%;
	margin-right: 8px;
}
.task-list {
	margin-top: 10px;
	align-items: center;
}
</style>
