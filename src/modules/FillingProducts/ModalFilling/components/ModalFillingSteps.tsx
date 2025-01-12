import { ProductSelect } from "src/modules/FillingProducts/ModalFilling/components/ProductSelect";

interface ModalFillingStepsProps {
  step: "chooseAction" | "keyboard" | "replaceProduct";
  setStep: React.Dispatch<
    React.SetStateAction<"chooseAction" | "keyboard" | "replaceProduct">
  >;
  onClose: () => void;
  maxCount: number;
  selectedCount: number;
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
  onAction: (action: "keep" | "replace", selectedCount?: number) => void;
}

export const ModalFillingSteps: React.FC<ModalFillingStepsProps> = ({
  step,
  setStep,
  onClose,
  maxCount,
  selectedCount,
  setSelectedCount,
}) => {
  // Функция для обновления selectedCount с ограничением maxCount
  const handleNumberClick = (num: number) => {
    if (num <= maxCount) {
      setSelectedCount(num); // Заменяем введённое значение
    } else {
      setSelectedCount(maxCount); // Ограничиваем максимумом
    }
  };

  switch (step) {
    case "chooseAction":
      return (
        <>
          <h2 className="text-xl font-bold mb-4">Количество товара равно 0</h2>
          <p className="mb-4">Что вы хотите сделать?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setStep("keyboard")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Оставить текущий товар
            </button>
            <button
              onClick={() => setStep("replaceProduct")}
              className="px-6 py-3 bg-red-500 text-white rounded-lg"
            >
              Заменить товар
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-gray-300 text-black rounded-lg"
          >
            Отмена
          </button>
        </>
      );

    case "replaceProduct":
      return (
        <>
          <h2 className="text-xl font-bold mb-4">Выберите новый товар</h2>
          <ProductSelect onClose={onClose} />
        </>
      );

    case "keyboard":
      return (
        <>
          <h2 className="text-xl font-bold mb-4">Введите количество товара</h2>
          <div className="text-2xl font-bold mb-4 text-center">
            {selectedCount}
          </div>
          <p className="text-center mb-4 text-sm text-gray-500">
            Максимум: {maxCount}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg text-lg hover:bg-gray-300"
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-4 mb-4">
            <button
              onClick={() => setSelectedCount(0)} // Просто сбрасываем поле
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Сбросить
            </button>
            <button
              onClick={() => setSelectedCount(maxCount)} // Устанавливаем максимум
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Затарить полностью
            </button>
          </div>
        </>
      );

    default:
      return null;
  }
};
