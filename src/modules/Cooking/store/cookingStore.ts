import { create } from "zustand";

export const useCookingStore = create<CookingStore>((set) => ({
  timeToCook: 20,
  rotationAngle: 0, // Начальный угол
  decrementTime: (value) =>
    set((state) => ({
      timeToCook: Math.max(state.timeToCook - value, 0),
    })),
  setTime: (value) => set(() => ({ timeToCook: value })),
  incrementAngle: (value) =>
    set((state) => ({
      rotationAngle: (state.rotationAngle + value) % 360, // Ограничиваем угол до 360
    })),
}));
