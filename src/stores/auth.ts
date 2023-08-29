// @ts-nocheck
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		loggedInUser: {},
		authenticated: false,
	}),
	actions: {
		saveLoggedInUser(user: object) {
			this.loggedInUser = user;
			this.authenticated = true;
		},
	},
});
