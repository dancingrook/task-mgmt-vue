<script setup lang="ts">
// @ts-nocheck
import { inject, ref, reactive } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { FETCH_USERS } from "../../api/user";
import { INVITE_MEMBERS } from "../../api/category";
import { useQuery } from "vue-query";
import { useCategoryStore } from "../../stores/categories";
import uniqBy from "lodash/uniqBy";

const categoryStore = useCategoryStore();
const emitter = inject("emitter");

const show = ref(false);
const inputs = reactive({
	userId: null,
	categoryId: null,
});
const options = ref([]);

emitter.on("invite-members", async (categoryId: number) => {
	inputs.userId = null;
	inputs.categoryId = categoryId;

	await FETCH_USERS().then((data) => {
		options.value = data;
		show.value = true;
	});
});

const handleSubmit = async () => {
	try {
		let data = await INVITE_MEMBERS(inputs);
		let category = categoryStore.category;
		inputs.userId = null;
		inputs.categoryId = null;

		categoryStore.saveCategory({
			...category,
			invited_users: uniqBy([...category.invited_users, ...data], user => user.id),
		});

		show.value = false;
	} catch (e) {
		console.log(e);
	}
};

function addTag(newTag) {
	const tag = {
		name: newTag,
		code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
	};
	this.options.push(tag);
	this.value.push(tag);
}
</script>

<template>
	<transition name="modal" v-if="show">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container bg-gray-100">
					<div class="modal-header">
						<span class="modal-title">Select User to Invite</span>

						<button @click="show = false">
							<XCircleIcon style="color: red" class="h-5 w-5" />
						</button>
					</div>

					<form @submit.prevent="handleSubmit">
						<div class="modal-body">
							<select v-model="inputs.userId" name="priority" class="priorities">
								<option value="" disabled>Select a user</option>
								<option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
							</select>
							<div class="modal-footer">
								<button class="submit" type="submit">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</transition>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
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
