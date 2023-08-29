// @ts-nocheck
import axios from "./axios";
interface Category {
	id: number;
	name: string;
}

const URL = import.meta.env.VITE__API_URI;

const FETCH_USERS = async (): Promise<Category[]> => {
	const data = await axios.get(`${URL}/api/users`);
	return data.data;
};


export { FETCH_USERS };
