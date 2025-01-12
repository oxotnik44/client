import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance"; // Убедитесь, что путь правильный

const fetchProductCard = async (
  idProduct: number | undefined
): Promise<ProductCard> => {
  const res = await fetch(`${API_URL_CLIENT}products/product/${idProduct}`);
  if (!res.ok) throw new Error("Ошибка при загрузке карты продукта");

  const data = await res.json();

  // Возвращаем объект без полей category и cells
  const { category, cells, ...productData } = data;
  return productData;
};

// Хук для получения данных продукта с использованием react-query
export const useProductCard = (idProduct: number | undefined) => {
  return useQuery<ProductCard, Error>({
    queryKey: ["productCard", idProduct],
    queryFn: () => fetchProductCard(idProduct),
    enabled: !!idProduct, // Запрос выполняется только если idProduct определен
  });
};
