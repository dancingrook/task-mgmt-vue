// @ts-nocheck
import { ref, inject } from "vue";
import { useQuery, useMutation, useQueryClient } from "vue-query";
import { FETCH_TASKS, UPDATE_TASK, CREATE_TASK, DELETE_TASK } from "../api/tasks";

export default function useTasks(categoryId, search, status) {
	const list = ref([]);
	const page = ref(1);
	const totalPage = ref(null);
	const queryClient = useQueryClient();
	const emitter = inject("emitter");

	const { isLoading } = useQuery({
		queryKey: [`tasks`, status, categoryId, search, page],
		queryFn: () => FETCH_TASKS({ status, categoryId: categoryId.value, search: search.value ? search.value : "", page: page.value }).then((data) => data),
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		enabled: categoryId ? true : false,
		select: (data) => {
			list.value = [...list.value, ...data.data];
			page.value = data.current_page;
			totalPage.value = data.last_page;
		},
	});

	const useUpdateMutation = () => {
		return useMutation(
			({ taskId, updates }: any) => {
				return UPDATE_TASK(taskId, updates);
			},
			{
				onSuccess: (data) => {
					//listened on TaskList according to status
					emitter.emit(`task-edited-${data.status}`, data);
				},
			}
		);
	};

	const { mutate: updateTask } = useUpdateMutation();

	const useCreateMutation = () => {
		return useMutation((task: object) => CREATE_TASK(task), {
			onSuccess: (data) => {
				//listened on TaskList according to status
				emitter.emit(`task-created-${data.status}`, data);
			},
		});
	};

	const { mutate: createTask } = useCreateMutation();

	const useDeleteMutation = () => {
		return useMutation((task: object) => DELETE_TASK(task), {
			onSuccess: (data) => {
				return true
			},
		});
	};

	const { mutate: deleteTask } = useDeleteMutation();

	const refetchQuery = (queryKey) => {
		queryClient.refetchQueries({ queryKey });
	};

	return { list, page, search, totalPage, isLoading, createTask, updateTask, refetchQuery, deleteTask };
}
