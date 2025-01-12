import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance"; // Убедитесь, что путь правильный
import { Product } from "../types/productsTypes";

// Функция запроса для получения продуктов по категории
const fetchCategoryProducts = async (
  id: number | undefined
): Promise<Product[]> => {
  if (!id) {
    throw new Error("Category ID is required");
  }
  const res = await fetch(
    `${API_URL_CLIENT}products/product?category_id=${id}`
  );
  if (!res.ok) throw new Error("Ошибка при загрузке продуктов");
  return res.json();
};

// Хук для получения продуктов по категории с использованием react-query
export const useCategoryProducts = (categoryId: number | undefined) => {
  return useQuery<Product[], Error>({
    queryKey: ["categoryProducts", categoryId], // Используем categoryId как часть ключа
    queryFn: () => fetchCategoryProducts(categoryId), // Передаем categoryId в функцию
  });
};
