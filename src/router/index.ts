// @ts-nocheck
const UID = localStorage.getItem("UID");
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Auth/Login.vue"),
			beforeEnter: async () => {
				if (UID) return "/";
			},
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/Auth/Register.vue"),
			beforeEnter: async () => {
				if (UID) return "/";
			},
		},
		{
			path: "/",
			name: "home",
			component: () => import("../views/Index.vue"),
			beforeEnter: async () => {
				if (!UID) return "/login";
			},
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
	],
});

export default router;
