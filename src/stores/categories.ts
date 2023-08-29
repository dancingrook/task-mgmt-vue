import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categories", {
	state: () => ({
		category: {},
	}),
	actions: {
		saveCategory(category: any){
			this.category = category;
		},
	},
});
