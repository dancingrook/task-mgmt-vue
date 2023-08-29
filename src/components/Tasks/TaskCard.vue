<script setup lang="ts">
// @ts-nocheck
import { inject, ref, reactive, computed } from "vue";
import { ListBulletIcon, PaperClipIcon, ChatBubbleLeftRightIcon, EllipsisHorizontalIcon, TrashIcon } from "@heroicons/vue/24/outline";
import useTasks from "../../hooks/useTasks";

const emitter = inject("emitter");
const showMenu = ref(false);

const { deleteTask } = useTasks();

const { task } = defineProps({
	task: Object,
});

const onClick = () => {
	emitter.emit("show-task", task);
};

//callled to TaskList.vue
const onDelete = async () => {
	if (!confirm("Do you really want to do this?")) {
		return false;
	}
	try {
		deleteTask(task);
		emitter.emit(`task-deleted-${task.status}`, task.id);
	} catch (e) {}
};

const tagClass = computed(() => {
	if (!task.priority) return "tag";
	if (task.priority === "medium") return "medium-tag";
	return "high-tag";
});

const tagNameClass = computed(() => {
	if (!task.priority) return "tag-name";
	if (task.priority === "medium") return "medium-tag-name";
	return "high-tag-name";
});
</script>

<template>
	<div class="task-card" @click="onClick">
		<div class="task-tags">
			<div class="tag" :class="[tagClass]">
				<span class="tag-name" v-if="!task.priority">Go Easy</span>
				<span v-else class="tag-name" :class="[tagNameClass]">{{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }}</span>
			</div>
			<div>
				<EllipsisHorizontalIcon @click.stop="showMenu = !showMenu" class="anchor h-5 w-5" />
				<div v-if="showMenu" class="menu">
					<div class="menu-item" @click.stop="onDelete">
						<TrashIcon class="h-3 w-3" />
						<span style="margin-left: 5px">Delete</span>
					</div>
				</div>
			</div>
		</div>

		<h2 class="task-name">{{ task.title }}</h2>
		<p class="task-description">
			{{ task.description.substring(0, 200) }}
		</p>

		<div class="divider"></div>

		<div class="task-metadatas">
			<div class="flex -space-x-3">
				<img class="w-6 h-6 border-2 border-white rounded-full dark:border-gray-500" src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Luna" alt="avatar" />
				<img class="w-6 h-6 border-2 border-white rounded-full dark:border-gray-500" src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Whiskers" alt="avatar" />
				<img class="w-6 h-6 border-2 border-white rounded-full dark:border-gray-500" src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Tigger" alt="avatar" />
			</div>
			<div class="task-tools">
				<div class="task-tools-item">
					<PaperClipIcon class="h-5 w-5" />
					<span class="task-tools-count">2</span>
				</div>

				<div class="task-tools-item">
					<ChatBubbleLeftRightIcon class="h-5 w-5" />
					<span class="task-tools-count">6</span>
				</div>

				<div class="task-tools-item">
					<ListBulletIcon class="h-5 w-5" />
					<span class="task-tools-count">2/5</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.task-card {
	cursor: pointer;
	margin-bottom: 12px;
	padding: 15px;
	background-color: white;
	border-radius: 10px;
}
.task-name {
	font-weight: 500;
	color: #64748b;
	font-size: 14px;
}
.task-description {
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 12px;
	line-height: 20px;
	color: #9ca3af;
}

.divider {
	margin-top: 8px;
	margin-bottom: 8px;
	border-bottom: 2px solid #f1f5f9;
}
.task-metadatas {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.task-tools {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	color: #9ca3af;
}
.task-tools-item {
	display: flex;
	margin-left: 12px;
}
.task-tools-count {
	font-size: 14px;
	margin-left: 4px;
}
.task-tags {
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
}

.tag {
	padding: 6px;
	background-color: #dcfce7; /** will be dynamic */
	border-radius: 10px;
}
.medium-tag {
	background-color: #fef3c7; /** will be dynamic */
}

.high-tag {
	background-color: #fee2e2;
}

.tag-name {
	font-size: 12px;
	color: #22c55e; /** will be dynamic */
	font-weight: 500;
}

.medium-tag-name {
	color: #f59e0b; /** will be dynamic */
}

.high-tag-name {
	color: #ef4444;
}

span {
	font-size: 14px;
}
</style>
