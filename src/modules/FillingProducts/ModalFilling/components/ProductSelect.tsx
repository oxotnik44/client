import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProducts } from "../api/fetchProducts";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useProductInCell } from "../../VendingMachineEdit/api/useProductInCell";

interface ModalProps {
  onClose: () => void;
}

export const ProductSelect: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchProducts(); // Получаем список товаров
  const { mutateAsync: updateProduct } = useUpdateProduct(); // Мутация для обновления товара
  const { refetch } = useProductInCell(id || "");

  const handleProductSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) {
      setResponseMessage("Пожалуйста, выберите товар.");
      return;
    }

    const productId = parseInt(selectedProduct);

    try {
      const result = await updateProduct({
        id: id || "",
        productId: productId,
        count: 0,
        maxCount: 10,
      }); // Передаем параметры в одном объекте
      setResponseMessage(`Товар обновлен: ${result.message || "успешно"}`);
      refetch();
      onClose(); // Закрываем модальное окно после успешного выполнения
    } catch (error) {
      setResponseMessage("Произошла ошибка при обновлении товара.");
    }
  };

  if (isLoading) {
    return <div>Загрузка товаров...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Выберите товар</h2>

      <div className="mb-4">
        <select
          value={selectedProduct || ""}
          onChange={handleProductSelect}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>
            Выберите товар
          </option>
          {data?.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.price / 100} ₽
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div>
          <h3 className="text-xl font-bold">Выбранный товар:</h3>
          <p>Товар ID: {selectedProduct}</p>
        </div>
      )}

      <button
        onClick={handleUpdateProduct}
        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg"
      >
        Обновить товар
      </button>

      {responseMessage && (
        <div className="mt-4 text-center text-lg">
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};
