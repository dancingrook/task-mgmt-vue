// @ts-nocheck
import axios from "./axios";

const URL = import.meta.env.VITE__API_URI;

const ME = async () => {
	try {
		const data = await axios.get(`${URL}/api/me`);
		return data.data;
	} catch (e) {
		throw e.response.data;
	}
};

const LOGIN = async (inputs) => {
	await axios.get(`${URL}/sanctum/csrf-cookie`);
	try {
		const data = await axios.post(`${URL}/api/login`, inputs);
		return data.data;
	} catch (e) {
		throw e.response.data;
	}
};

const REGISTER = async (inputs) => {
	await axios.get(`${URL}/sanctum/csrf-cookie`);
	try {
		const data = await axios.post(`${URL}/api/register`, inputs);
		return data.data;
	} catch (e) {
		throw e.response.data;
	}
};

const LOGOUT = async () => {
	try {
		const data = await axios.post(`${URL}/api/logout`);
		return data.data;
	} catch (e) {
		throw e.response.data;
	}
};

export { LOGIN, ME, LOGOUT, REGISTER };
