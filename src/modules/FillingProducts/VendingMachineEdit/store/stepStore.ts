import { create } from "zustand";

type Step = "chooseAction" | "keyboard" | "replaceProduct";

type ProductAction = "addProduct" | "removeProduct" | "replaceProduct";

interface StepStore {
  step: Step;
  productAction: ProductAction; // Состояние для управления действиями с товарами
  selectedCount: number; // Состояние для выбранного количества
  currentCount: number; // Текущее количество товаров
  setStep: (newStep: Step) => void; // Метод для изменения шага
  setCurrentCount: (currentCount: number) => void; // Метод для изменения текущего количества
  setProductAction: (action: ProductAction) => void; // Метод для изменения productAction
  setSelectedCount: (count: number) => void; // Метод для изменения selectedCount
}

export const useStepStore = create<StepStore>((set) => ({
  step: "chooseAction",
  productAction: "" as ProductAction,
  selectedCount: 0, // Изначальное значение
  currentCount: 0, // Изначальное значение для текущего количества
  setStep: (newStep) => set({ step: newStep }),
  setCurrentCount: (currentCount) => set({ currentCount }), // Исправлено: теперь изменяет currentCount
  setProductAction: (action: ProductAction) => set({ productAction: action }),
  setSelectedCount: (count) => set({ selectedCount: count }),
}));
