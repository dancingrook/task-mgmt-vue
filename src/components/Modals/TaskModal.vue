<script setup lang="ts">
// @ts-nocheck
import { inject, ref, reactive } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import useTasks from "../../hooks/useTasks";

const emitter = inject("emitter");

const show = ref(false);

const inputs = reactive({});
const taskId = ref(null);

const priorities = [
	{ title: "Go Easy", value: "" },
	{ title: "Medium", value: "medium" },
	{ title: "High", value: "high" },
];

emitter.on("create-task", ({ status, categoryId }) => {
	taskId.value = null;
	inputs.title = "";
	inputs.description = "";
	inputs.category_id = categoryId;
	inputs.priority = "";
	show.value = true;
	inputs.status = status;
});

emitter.on("show-task", (task: object) => {
	taskId.value = task.id;
	inputs.title = task.title;
	inputs.description = task.description;
	inputs.priority = task.priority ?? "";
	show.value = true;
});

const { createTask, updateTask } = useTasks();

const handleSubmit = () => {
	if (taskId.value) updateTask({ taskId: taskId.value, updates: inputs });
	else createTask(inputs);

	show.value = false;
};
</script>

<template>
	<transition name="modal" v-if="show">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container bg-gray-100">
					<div class="modal-header">
						<span class="modal-title">Task Details</span>

						<button @click="show = false">
							<XCircleIcon style="color: red" class="h-5 w-5" />
						</button>
					</div>

					<form @submit.prevent="handleSubmit">
						<div class="modal-body">
							<input
								v-model="inputs.title"
								class="input bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="Title"
								required
							/>

							<select v-model="inputs.priority" name="priority" class="priorities">
								<option disabled>Select a priority</option>
								<option value="" :selected="inputs.priority === null ? 'selected' : false">Go Easy</option>
								<option value="medium" :selected="inputs.priority === 'medium' ? 'selected' : false">Medium</option>
								<option value="high" :selected="inputs.priority === 'high' ? 'selected' : false">High</option>
							</select>

							<textarea
								v-model="inputs.description"
								rows="10"
								class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="Description"
								required
							/>
							<div class="modal-footer">
								<button class="submit" type="submit">{{ taskId ? "Update" : "Save" }}</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 500px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-title {
	font-size: 20px;
	font-weight: 500;
}

.modal-body {
	margin: 20px 0;
	margin-bottom: 0px;
}

.modal-default-button {
	float: right;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.cancel {
	padding: 8px;
	background-color: #d14d4d;
	color: white;
	border-radius: 8px;
	margin-right: 10px;
}
.submit {
	padding: 8px;
	background-color: #6366f1;
	color: white;
	border-radius: 8px;
}

input,
textarea {
	margin-bottom: 15px;
}

.priorities {
	width: 100%;
	height: 34px;
	margin-bottom: 14px;
	border-radius: 3px;
	padding: 6px;
}
</style>
