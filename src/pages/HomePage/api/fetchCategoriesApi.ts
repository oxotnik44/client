import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance"; // Убедитесь, что путь правильный

// Функция для получения категорий
const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL_CLIENT}products/category`);
  if (!res.ok) throw new Error("Ошибка при загрузке категорий");
  return res.json();
};

// Хук для получения данных категорий с использованием react-query
export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
