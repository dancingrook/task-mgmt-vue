// @ts-nocheck
import axios from "axios";
axios.defaults.withCredentials = true;

interface Task {
	id: number;
	title: string;
	description: string;
	created_at: Date;
	status: string;
}

interface PaginatedTasks {
	current_page: number;
	data: Task[];
	total: string;
	last_page: number;
}

const URL = import.meta.env.VITE__API_URI;

const FETCH_TASKS = async ({ status, categoryId, search, page }: any): Promise<PaginatedTasks> => {
	const data = await axios.get(
		`${URL}/api/tasks?${new URLSearchParams({
			status,
			categoryId,
			search,
			page,
		})}`
	);
	return data.data;
};

const UPDATE_TASK = async (taskId: number, updates: object): Promise<any> => {
	const data = await axios.put(`${URL}/api/task/${taskId}`, { ...updates });
	return data.data;
};

const CREATE_TASK = async (task: object): Promise<any> => {
	const data = await axios.post(`${URL}/api/task`, task);
	return data.data;
};

const DELETE_TASK = async (task: object): Promise<any> => {
	const data = await axios.delete(`${URL}/api/task/${task.id}`);
	return data.data;
};

export { FETCH_TASKS, UPDATE_TASK, CREATE_TASK, DELETE_TASK };
