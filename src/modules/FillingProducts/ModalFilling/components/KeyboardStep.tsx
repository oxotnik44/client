import { useParams } from "react-router-dom"; // Импортируем useParams для получения параметра из URL
import { useFinishFilling } from "src/modules/FillingProducts/VendingMachineEdit/api/useFinishFilling";
import { useWithdrawProducts } from "src/modules/FillingProducts/VendingMachineEdit/api/useWithdrawProducts";

interface KeyboardStepProps {
  selectedCount: number;
  setSelectedCount: (count: number) => void;
  maxCount: number;
  currentCount: number;
  productAction: "addProduct" | "removeProduct" | "replaceProduct" | ""; // Добавлено "replaceProduct"
  onClose: () => void;
  products: { id: string; name: string; image: string }[];
}

export const KeyboardStep: React.FC<KeyboardStepProps> = ({
  selectedCount,
  setSelectedCount,
  maxCount,
  currentCount,
  productAction,
  onClose,
  products,
}) => {
  const { id } = useParams<{ id: string }>(); // Извлекаем id как строку из URL
  const { mutateAsync: finishFilling } = useFinishFilling(); // Хук для затаривания
  const { mutateAsync: withdrawProducts } = useWithdrawProducts();

  // Обработчик клика по числам
  const handleNumberClick = (num: number) => {
    // Проверяем для добавления товара
    if (productAction === "addProduct" && num <= maxCount - currentCount) {
      setSelectedCount(num);
    }

    // Проверяем для удаления товара
    if (productAction === "removeProduct" && num <= currentCount) {
      setSelectedCount(num);
    }
  };

  const handleConfirm = async () => {
    if (!id) {
      console.error("ID не найден в URL.");
      return;
    }

    try {
      if (productAction === "addProduct") {
        console.log(selectedCount);
        await finishFilling({ id, selectedCount }); // Выполняем запрос для затаривания
        onClose();
      }

      if (productAction === "removeProduct") {
        await withdrawProducts({
          id,
          productIds: products.map((p) => p.id),
          selectedCount, // Количество для удаления
        });
        onClose();
      }

      setSelectedCount(0); // Сбрасываем выбранное количество после завершения
    } catch (error) {
      console.error("Ошибка при обработке запроса:", error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Введите количество товара</h2>
      <div className="text-2xl font-bold mb-4 text-center">{selectedCount}</div>
      <p className="text-center mb-4 text-base text-black">
        Текущее: {currentCount}
      </p>
      <p className="text-center mb-4 text-base text-black">
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
      <div className="flex gap-4 justify-center mt-10 mb-4">
        <button
          onClick={() => setSelectedCount(0)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Сбросить
        </button>
        {productAction === "addProduct" && (
          <button
            onClick={() => setSelectedCount(maxCount - currentCount)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Затарить полностью
          </button>
        )}
        {productAction === "removeProduct" && (
          <button
            onClick={() => setSelectedCount(currentCount)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Удалить все
          </button>
        )}
      </div>
      <div className="flex gap-4 justify-center mt-4">
        {productAction === "addProduct" && (
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-green-500 text-white rounded-lg"
          >
            Затарить
          </button>
        )}
        {productAction === "removeProduct" && (
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-red-500 text-white rounded-lg"
          >
            Удалить
          </button>
        )}
      </div>
    </>
  );
};
