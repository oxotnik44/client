import { create } from "zustand";

export const useCategoriesStore = create<CategoryStore>((set) => ({
  firstCategoryId: 0, // Начальное значение
  categories: [], // Начальное состояние категорий
  setFirstCategoryId: (id: number) => set({ firstCategoryId: id }), // Метод для обновления id
  setCategories: (categories: Category[]) => set({ categories }), // Метод для обновления всех категорий
}));
