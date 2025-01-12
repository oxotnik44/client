import { create } from "zustand";

interface ContactsState {
  isVisible: boolean;
  changeVisibility: (isVisible: boolean) => void;
}

const useContactsStore = create<ContactsState>((set) => ({
  isVisible: false, // Начальное состояние
  changeVisibility: (isVisible: boolean) => set({ isVisible }),
}));

export { useContactsStore };
