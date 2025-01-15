import React from "react";
import { useStepStore } from "../store/stepStore";

type ActionButtonsProps = {
  currentCount: number; // Текущее количество товаров
  onAction: (action: "finish" | "withdraw", count?: number) => void;
  setVisible: (value: boolean) => void;
  setStep: (newStep: "chooseAction" | "keyboard" | "replaceProduct") => void; // Тип для Zustand
  isMaxCount: boolean;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentCount,
  setVisible,
  setStep,
  isMaxCount,
}) => {
  const { setProductAction, setSelectedCount } = useStepStore();

  // Универсальная функция для обработки действий кнопок
  const handleButtonClick = (
    action: "addProduct" | "replaceProduct" | "removeProduct",
    step: "chooseAction" | "keyboard" | "replaceProduct",
    condition?: boolean,
    alertMessage?: string
  ) => {
    if (condition) {
      alert(alertMessage);
      return;
    }
    setVisible(true);
    setStep(step);
    setProductAction(action);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      {/* Кнопка "Затарить" */}
      <button
        onClick={() => {
          setSelectedCount(0);
          handleButtonClick(
            "addProduct",
            "keyboard",
            isMaxCount,
            "Товар полон"
          );
        }}
        className={`px-8 py-4 text-xl rounded-lg shadow-md ${
          currentCount
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-yellow-500 text-white hover:bg-yellow-600"
        }`}
      >
        Затарить
      </button>

      {/* Кнопка "Заменить товар" */}
      <button
        onClick={() => handleButtonClick("replaceProduct", "replaceProduct")}
        className="px-8 py-4 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
      >
        Заменить товар
      </button>

      {/* Кнопка "Изъять товары" */}
      {currentCount > 0 && (
        <button
          onClick={() => {
            setSelectedCount(0), handleButtonClick("removeProduct", "keyboard");
          }}
          className="px-8 py-4 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
        >
          Изъять товары
        </button>
      )}
    </div>
  );
};
