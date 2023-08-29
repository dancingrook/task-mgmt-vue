<script setup lang="ts">
// @ts-nocheck
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import useAuth from "../../hooks/useAuth";

const router = useRouter();
const inputs = reactive({});
const msg = ref("");

const { login } = useAuth();

const onSubmit = async () => {
	try {
		await login(inputs);
		location.reload();
	} catch (e) {
		msg.value = e.message ? e.message : "Email or Password do not match";
	}
};
</script>

<template>
	<div class="login-container">
		<div class="login-form">
			<p class="text-gray-500 text-xl text-left cursor-pointer mb-5">Login</p>

			<form @submit.prevent="onSubmit">
				<p class="text-red-400 text-xs text-left cursor-pointer mb-5">{{ msg }}</p>
				<div class="input-field">
					<input v-model="inputs.email" required class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none bg-white" type="text" placeholder="Email" />
				</div>
				<div class="input-field">
					<input
						v-model="inputs.password"
						required
						class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none bg-white"
						type="password"
						placeholder="Password"
					/>
				</div>

				<button class="button appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none bg-indigo-500" type="submit">Login</button>
			</form>
			<p class="text-blue-500 text-left cursor-pointer mt-5" @click="router.push('/register')">Create Account</p>
		</div>
		<div class="login-background bg-indigo-300" style="background-image: url('https://wallpaperaccess.com/full/1930875.jpg')"></div>
	</div>
</template>
<style scoped>
.login-container {
	height: 100vh;
	background-color: #f1f5f9;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	align-content: center;
}
.login-background {
	background-color: red;
	width: 80%;
	height: 100%;
}
.login-form {
	height: 100%;
	width: 20%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.input-field {
	margin-bottom: 15px;
}

.form-buttons {
	color: white;
	text-align: center;
	align-items: center;
	cursor: pointer;
}
.button {
	color: white;
	border-radius: 5px;
}
.form-title {
	font-size: 18px;
	margin-bottom: 8px;
	font-weight: 400;
}
</style>
