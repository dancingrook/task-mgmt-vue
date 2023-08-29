// @ts-nocheck
import axios from "./axios";
interface Category {
	id: number;
	name: string;
}

const URL = import.meta.env.VITE__API_URI;

const FETCH_CATEGORIES = async (): Promise<Category[]> => {
	const data = await axios.get(`${URL}/api/categories`);
	return data.data;
};

const INVITE_MEMBERS = async (inputs) => {
	const data = await axios.post(`${URL}/api/category/invite-users`, {
		categoryId: inputs.categoryId,
		userIds: [inputs.userId],
	});
	return data.data;
};

export { FETCH_CATEGORIES, INVITE_MEMBERS };
