<template>
	<draggable :list="list" @change="log" :group="{ name: 'tasks', pull: true }" ghost-class="ghost" :emptyInsertThreshold="500">
		<TaskCard v-for="task in list" :task="task" :key="task.id" />
		<div style="height: 200px" />
	</draggable>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import TaskCard from "./TaskCard.vue";
export default defineComponent({
	props: ["status", "list", "dragged"],
	components: {
		draggable: VueDraggableNext,
		TaskCard: TaskCard,
	},
	data() {
		return {
			enabled: true,
			dragging: false,
		};
	},
	methods: {
		log(event) {
			if ("added" in event) {
				this.dragged({
					taskId: event.added.element.id,
					currentStatus: event.added.element.status,
					updates: {
						status: this.status,
					},
				});
			}
		},
	},
});
</script>
