// modules/stepStore.ts
import { create } from "zustand";

type Step = "chooseAction" | "keyboard" | "replaceProduct";

type ProductAction = "addProduct" | "removeProduct" | "";

interface StepStore {
  step: Step;
  productAction: ProductAction; // Состояние для управления действиями с товарами
  selectedCount: number; // Состояние для выбранного количества
  setStep: (newStep: Step) => void;
  setProductAction: (action: ProductAction) => void; // Метод для изменения productAction
  setSelectedCount: (count: number) => void; // Метод для изменения selectedCount
}

export const useStepStore = create<StepStore>((set) => ({
  step: "chooseAction",
  productAction: "addProduct",
  selectedCount: 0, // Изначальное значение
  setStep: (newStep) => set({ step: newStep }),
  setProductAction: (action) => set({ productAction: action }),
  setSelectedCount: (count) => set({ selectedCount: count }), // Устанавливаем значение
}));
