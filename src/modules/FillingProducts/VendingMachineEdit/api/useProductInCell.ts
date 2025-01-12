// src/modules/vendingMachine/hooks/useProductInCell.ts
import { useQuery } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";
import { ProductData } from "../types/productTypes";

// Функция для запроса данных о продукте в ячейке
const fetchProductInCell = async (id: string): Promise<ProductData> => {
  const res = await fetch(`${API_URL_CLIENT}products/cell/${id}`);
  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных о товаре в ячейке");
  }
  return res.json();
};

// Хук для получения данных о продукте в ячейке
export const useProductInCell = (id: string) => {
  return useQuery<ProductData, Error>({
    queryKey: ["productInCell", id],
    queryFn: () => fetchProductInCell(id),
  });
};
