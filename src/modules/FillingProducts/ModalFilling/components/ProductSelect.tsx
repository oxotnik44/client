import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductInCell } from "src/modules/FillingProducts/VendingMachineEdit/api/useProductInCell";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

interface ModalProps {
  onClose: () => void; // Исправлено: передаём функцию onClose
}

export const ProductSelect: React.FC<ModalProps> = ({ onClose }) => {
  const [data, setData] = useState<any[]>([]); // Храним данные товаров
  const [error, setError] = useState<string | null>(null); // Храним ошибку
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null); // Состояние для выбранного товара
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Сообщение от сервера
  const { id } = useParams();
  const { refetch } = useProductInCell(id || "");

  useEffect(() => {
    // Функция для загрузки товаров
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL_CLIENT}products/all-product`); // Замените на ваш API
        if (!response.ok) {
          throw new Error("Ошибка при загрузке товаров");
        }
        const products = await response.json();
        setData(products);
      } catch (err) {
        setError("Произошла ошибка при загрузке товаров");
      } finally {
        setIsLoading(false); // После завершения запроса, меняем состояние загрузки
      }
    };

    fetchProducts(); // Вызов функции загрузки при монтировании компонента
  }, []);

  const handleProductSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value); // Обновляем выбранный товар
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) {
      setResponseMessage("Пожалуйста, выберите товар.");
      return;
    }

    const productId = parseInt(selectedProduct); // Преобразуем в число

    const dataToUpdate = {
      product_id: productId,
      count: 0, // Здесь можно задать нужное количество
      max_count: 10, // Максимальное количество
    };

    try {
      const response = await fetch(`${API_URL_CLIENT}products/cell/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении товара");
      }

      const result = await response.json();
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

  if (error) {
    return <div>{error}</div>;
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
          {data.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.price/100} ₽
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
