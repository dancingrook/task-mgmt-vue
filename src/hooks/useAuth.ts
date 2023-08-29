// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "vue-query";
import { LOGIN, ME, LOGOUT, REGISTER } from "../api/auth";
import { useAuthStore } from "../stores/auth";

type LOGIN_INPUTS = {
	email: string;
	password: string;
};

export default function useAuth() {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();

	const loginMutation = useMutation({ mutationFn: LOGIN });
	const logoutMutation = useMutation({ mutationFn: LOGOUT });
	const registerMutation = useMutation({ mutationFn: REGISTER });

	const me = async () => {
		try {
			const data = await queryClient.fetchQuery({ queryKey: "me", queryFn: ME });
			authStore.saveLoggedInUser(data);
			localStorage.setItem("UID", data.id);
		} catch (e) {
			throw e;
		}
	};

	const register = async (inputs) => {
		try {
			const data = await registerMutation.mutateAsync(inputs);
			localStorage.setItem("UID", data.id);
			return data;
		} catch (e) {
			throw e;
		}
	};

	const login = async (inputs: LOGIN_INPUTS) => {
		try {
			const data = await loginMutation.mutateAsync(inputs);
			localStorage.setItem("UID", data.id);
			return data;
		} catch (e) {
			throw e;
		}
	};

	const logout = async () => {
		try {
			const data = await logoutMutation.mutateAsync();
			localStorage.removeItem("UID");
			return data;
		} catch (e) {
			throw e;
		}
	};

	return { login, me, logout, register };
}
