// src/modules/vendingMachine/api/useKeepProducts.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL_CLIENT } from "src/shared/api/http/axios-instance";

// Функция для добавления товаров
const keepProducts = async (id: string, count: number) => {
  const promises = Array.from({ length: count }).map(() =>
    fetch(`${API_URL_CLIENT}products/cell/${id}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upload_date: new Date().toISOString(),
        expiration_date: "2 00:10:00",
      }),
    })
  );

  const responses = await Promise.all(promises);
  responses.forEach((res) => {
    if (!res.ok) {
      throw new Error("Ошибка при добавлении товара");
    }
  });
};

// Хук для использования мутации
export const useKeepProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; count: number }) =>
      keepProducts(params.id, params.count),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productInCell", variables.id],
      });
    },
    onError: (error) => {
      console.error("Ошибка при добавлении товара:", error);
    },
  });
};
