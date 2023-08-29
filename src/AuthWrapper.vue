/* * CREATED AUTH WRAPPER TO ALWAYS FRESH DATA OF LOGGED IN USER */
<script setup lang="ts">
// @ts-nocheck
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuth from "./hooks/useAuth";

const route = useRoute();
const router = useRouter();
const { me } = useAuth();
onMounted(async () => {
	try {
		await router.isReady();
		if (route.name == "home") await me();
	} catch (e) {
		localStorage.removeItem("UID");
		location.reload();
	}
});
</script>

<template>
	<slot></slot>
</template>
