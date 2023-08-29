<script setup lang="ts">
import { RouterView } from "vue-router";
import { defineAsyncComponent, ref } from "vue";

const TaskModal = defineAsyncComponent(() => import("./components/Modals/TaskModal.vue"));
const InviteMembers = defineAsyncComponent(() => import("./components/Modals/InviteMembers.vue"));
const Login = defineAsyncComponent(() => import("./views/Auth/Login.vue"));
const AuthWrapper = defineAsyncComponent(() => import("./AuthWrapper.vue"));
</script>

<template>
	<div class="app">
		<AuthWrapper>
			<RouterView />
		</AuthWrapper>
		<TaskModal />
		<InviteMembers />
	</div>
</template>
